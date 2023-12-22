import { DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaList } from 'src/app/models/pessoa.model';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
    selector: 'app-exportacao',
    templateUrl: './exportacao.component.html',
    styleUrls: ['./exportacao.component.css']
})
export class ExportacaoComponent implements OnDestroy {
    pessoas: PessoaList[] = [];
    loadingPessoa = true;
    filtro: Filtro = new Filtro;
    subscription: Subscription[] = [];
    erro: string = '';
    loading = false;

    @ViewChild('template') template: TemplateRef<any>;
    @ViewChild('icon') icon: TemplateRef<any>;

    datasFiltro?: boolean;
    modal: Modal = new Modal;

    constructor(
        private pessoaService: PessoaService,
        private pessoaOperacaoService: PessoaOperacaoService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private datePipe: DatePipe,
        private modalService: ModalService,
    ) {
        var list = this.pessoaService.list.subscribe(res => this.pessoas = res)
       this.subscription.push(list)

        lastValueFrom(this.pessoaService.getList())
            .then(res => {
                this.loadingPessoa = false;
                this.pessoas = res;
            });

            setTimeout(() => {
                this.modal = this.modalService.addModal(this.modal, 'exportar operacao');
            }, 200);
    }

    ngAfterViewInit(): void {
        this.modal.id =  0;
        this.modal.template = this.template;
        this.modal.style = { 'max-width': '400px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.icon = this.icon;
        this.modal.title = 'Exportar Operações';
        this.modal.routerBack = ['../'];
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modalService.removeModal(this.modal.id);
    }

    datasChanged() {
        if (this.datasFiltro) {
            delete this.filtro.data;

        } else if (this.datasFiltro == false) {
            delete this.filtro.de;
            delete this.filtro.ate;
        }
        else if (this.datasFiltro == undefined) {
             delete this.filtro.data;
            delete this.filtro.de;
            delete this.filtro.ate;
        }
    }

    exportar() {
        this.loading = true;
        lastValueFrom(this.pessoaOperacaoService.exportacao(this.filtro))
        .then((res: any) => {
            var blob = new Blob([res], { type: 'application/pdf' })
            const data = window.URL.createObjectURL(blob);

            var link = document.createElement('a');
            link.href = data;
            link.download = `Relatorio_Operacoes_${this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')}`;
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));


        this.loading = false;

    })
    .catch(res => {
            this.loading = false;
            this.toastr.error('Não foi possível extrair relatório.')
            this.erro = 'Não foi possível extrair relatório.';

        });
    }

}

export class Filtro {
    pessoa_Id: number = undefined as unknown as number;
    de?: Date;
    ate?: Date;
    data?: Date;
}

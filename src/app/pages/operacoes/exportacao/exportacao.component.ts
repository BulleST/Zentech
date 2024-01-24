import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaskApplierService } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { IConfig } from 'ngx-mask';
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
        private mask: MaskApplierService,
        private currencyPipe: CurrencyPipe,
    ) {
        var list = this.pessoaService.list.subscribe(res => this.pessoas = res)
        this.subscription.push(list);


    }

    async ngAfterViewInit() {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.style = { 'max-width': '400px' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.icon = this.icon;
        this.modal.title = 'Exportar Operações';
        this.modal.routerBack = ['../'];
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        if (this.pessoas.length == 0) {
            this.loadingPessoa = true;
            await lastValueFrom(this.pessoaService.getList(true))
                .then(res => {
                    this.loadingPessoa = false;
                    this.pessoas = JSON.parse(JSON.stringify(res));
                    this.pessoas =  this.pessoas.map(x => {
                      x.dataCadastro = this.mask.applyMask(new Date(x.dataCadastro).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }), 'dd/MM/yyyy') as unknown as Date;
                        x.saldoAtual = this.currencyPipe.transform(x.saldoAtual, 'BRL', '', '1.2') as unknown as number;
                        x.cpf = this.mask.applyMask( x.cpf.toString().padStart(11, '0'), '000.000.000-00');
                        return x
                    });
                });
        }
        setTimeout(() => {
            this.modal = this.modalService.addModal(this.modal, 'exportar operacao');
        }, 200);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modalService.removeModal(this.modal);
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

    async exportar() {
        this.loading = true;
        await lastValueFrom(this.pessoaOperacaoService.exportacao(this.filtro))
        this.loading = false;
    }

}

export class Filtro {
    pessoa_Id: number = undefined as unknown as number;
    de?: Date;
    ate?: Date;
    data?: Date;
}

import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaList } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Modal } from 'src/app/utils/modal';

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
    routeBackOptions: any;
    erro: string = '';
    loading = false;

    @ViewChild('template') template: TemplateRef<any>;
    @ViewChild('icon') icon: TemplateRef<any>;

    constructor(
        private pessoaService: PessoaService,
        private activatedRoute: ActivatedRoute,
        private modal: Modal,
        private toastr: ToastrService,
    ) {
        lastValueFrom(this.pessoaService.getList())
            .then(res => {
                this.loadingPessoa = false;
                this.pessoas = res;
            });

    }
    
    ngAfterViewInit(): void {
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '400px', overflow: 'visible' })
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);
        this.modal.title.next('Exportar Operações')
        this.modal.routerBack.next(['../']);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }
    voltar() {
        this.modal.voltar(this.modal.routerBack.value, this.routeBackOptions);
    }

}

export class Filtro {
    pessoa_Id: number = undefined as unknown as number;
    de?: Date;
    ate?: Date;
    data?: Date;
}

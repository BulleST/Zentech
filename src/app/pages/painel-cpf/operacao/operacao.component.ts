import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PessoaOperacaoRequest, PessoaOperacaoStatus } from 'src/app/models/pessoa-operacao.model';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { Modal } from 'src/app/utils/modal';
import { getError } from 'src/app/utils/error';
import { Crypto } from 'src/app/utils/crypto';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-operacao',
    templateUrl: './operacao.component.html',
    styleUrls: ['./operacao.component.css']
})
export class OperacaoComponent implements OnDestroy {
    modalOpen = false;
    objeto: PessoaOperacaoRequest = new PessoaOperacaoRequest;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    routerBack: string[] = ['../../'];
    routeBackOptions: any;
    status: PessoaOperacaoStatus[] = [];
    loadingStatus = true;
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: Modal,
        private pessoaService: PessoaService,
        private pessoaOperacaoService: PessoaOperacaoService,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private toastr: ToastrService,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };

        lastValueFrom(this.pessoaOperacaoService.getStatus())
        .then(res => {
            this.loadingStatus = false;
            this.status = res;
        });

        this.objeto.data = this.datepipe.transform(this.objeto.data,'yyyy-MM-ddThh:mm' ) as unknown as Date;
        var params = activatedRoute.params.subscribe(p => {
            if (p['pessoa_id']) {
                this.objeto.pessoa_Id = this.crypto.decrypt(p['pessoa_id']);
                lastValueFrom(this.pessoaService.get(this.objeto.pessoa_Id))
                    .then(res => {
                    })
                    .catch(res => {
                        this.voltar();
                    })
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);


    }
    ngAfterViewInit(): void {
        this.modal.title.next('Cadastrar Operação')
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '600px', overflow: 'visible' })
        this.modal.routerBack.next(this.routerBack);
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

    send(model: NgForm) {
        this.loading = true;
        this.erro = '';

        lastValueFrom(this.pessoaOperacaoService.create(this.objeto))
            .then(res => {
                if (res.sucesso) {
                    lastValueFrom(this.pessoaOperacaoService.getList());
                    this.voltar();
                } else {
                    this.erro = res.mensagem;
                    this.toastr.error(res.mensagem);
                }
                this.loading = false;
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }
}

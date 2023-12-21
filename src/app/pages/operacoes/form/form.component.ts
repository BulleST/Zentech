import { DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaOperacaoRequest, PessoaOperacaoStatus } from 'src/app/models/pessoa-operacao.model';
import { PessoaList } from 'src/app/models/pessoa.model';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: PessoaOperacaoRequest = new PessoaOperacaoRequest;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    status: PessoaOperacaoStatus[] = [];
    loadingStatus = true;
    pessoas: PessoaList[] = [];
    loadingPessoa = true;
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = true;
    pessoa_id: number = 0;
    modal: Modal = new Modal;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private pessoaService: PessoaService,
        private pessoaSaldoService: PessoaSaldoService,
        private pessoaOperacaoService: PessoaOperacaoService,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private toastr: ToastrService,
    ) {

        lastValueFrom(this.pessoaOperacaoService.getStatus())
            .then(res => {
                this.loadingStatus = false;
                this.status = res;
            });

         var list = this.pessoaService.list.subscribe(res => this.pessoas = res)
        this.subscription.push(list)

        lastValueFrom(this.pessoaService.getList())
            .then(res => {
                this.loadingPessoa = false;
                this.pessoas = res;
            });

    }
    ngAfterViewInit(): void {

        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '600px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['operacao_id']) {
                this.objeto.id = this.crypto.decrypt(x['operacao_id']);
                this.modal.title = 'Editar Operação';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;

                lastValueFrom(this.pessoaOperacaoService.get(this.objeto.id))
                    .then(res => {
                        res.data = this.datepipe.transform(res.data, 'yyyy-MM-ddThh:mm') as unknown as Date;
                        res.num_Op = res.num_Op.toString().padStart(4, '0') as unknown as number;

                        this.objeto = res;
                        this.pessoa_id = this.objeto.pessoa_Id;
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'moeda');
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })
            } else {
                this.modal.title = 'Cadastrar Operação';
                this.modal.routerBack = ['../'];

                this.isEditPage = false;

                this.objeto.data = this.datepipe.transform(this.objeto.data, 'yyyy-MM-ddThh:mm') as unknown as Date;
                
                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'moeda');
                }, 200);
            }
        });
        this.subscription.push(params);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modalService.removeModal(this.modal.id);
    }
    send() {
        this.loading = true;
        this.erro = '';

        this.request()
            .then(res => {
                if (res.sucesso == true) {
                    lastValueFrom(this.pessoaService.getList());
                    lastValueFrom(this.pessoaSaldoService.getList(this.objeto.pessoa_Id));
                    lastValueFrom(this.pessoaOperacaoService.getListById(this.objeto.pessoa_Id));
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

    request() {
        if (this.objeto.id == 0)
            return lastValueFrom(this.pessoaOperacaoService.create(this.objeto));

        if (this.isEditPage)
            this.objeto.pessoa_Id = this.pessoa_id;

        return lastValueFrom(this.pessoaOperacaoService.edit(this.objeto));
    }
}

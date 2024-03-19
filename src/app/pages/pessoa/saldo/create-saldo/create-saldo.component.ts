import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaSaldoRequest } from 'src/app/models/pessoa-saldo.model';
import { PessoaList } from 'src/app/models/pessoa.model';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { insertOrReplace } from 'src/app/utils/service-list';

@Component({
    selector: 'app-create-saldo',
    templateUrl: './create-saldo.component.html',
    styleUrls: ['./create-saldo.component.css']
})
export class CreateSaldoComponent implements OnDestroy {
    faDollarSign = faDollarSign;
    objeto: PessoaSaldoRequest = new PessoaSaldoRequest;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    pessoa?: PessoaList;

    @ViewChild('template') template: TemplateRef<any>;
    @ViewChild('icon') icon: TemplateRef<any>;
    modal: Modal = new Modal;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private pessoaSaldoService: PessoaSaldoService,
        private pessoaService: PessoaService,
        private crypto: Crypto
    ) {
        
    }

    ngAfterViewInit(): void {
        this.modal.title = 'Cadastrar Saldo';
        this.modal.template = this.template;
        this.modal.style = { 'max-width': '500px' };
        this.modal.routerBack = ['../../'];
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        this.modal.icon = this.icon;

        var parent = this.activatedRoute.parent?.snapshot.paramMap.has('pessoa_id');
        var child = this.activatedRoute.snapshot.paramMap.has('pessoa_id');
        var paramsSubscriber = parent ? this.activatedRoute.parent?.params : child ? this.activatedRoute.params : this.voltar();
        if (paramsSubscriber) {
            var params = paramsSubscriber.subscribe(x => {
                if (x['pessoa_id']) {
                    this.objeto.pessoa_Id = this.crypto.decrypt(x['pessoa_id']);
                    if (this.pessoaService.list.value.length == 0){
                        lastValueFrom(this.pessoaService.getList()).then(res => {
                            this.getPessoa();
                        });
                    } else {
                        this.getPessoa();
                    }
                    setTimeout(() => {
                        this.modal = this.modalService.addModal(this.modal, 'create saldo');
                    }, 200);
                } else {
                    this.voltar();
                }
            });
            this.subscription.push(params);
        }
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modalService.removeModal(this.modal);
    }


    getPessoa() {
        var pessoa = this.pessoaService.list.value.find(x => x.id == this.objeto.pessoa_Id);
        this.pessoa = pessoa;
        return pessoa
    }

    send() {
        this.loading = true;
        this.erro = '';

        lastValueFrom(this.pessoaSaldoService.create(this.objeto))
            .then(res => {
                this.loading = false;
                if (res.sucesso) {
                    if (res.objeto) {
                        insertOrReplace(this.pessoaService, res.objeto['pessoa']);
                        insertOrReplace(this.pessoaSaldoService, res.objeto['saldo']);
                    } else {
                        lastValueFrom(this.pessoaSaldoService.getList(this.objeto.pessoa_Id));
                        lastValueFrom(this.pessoaService.getList());
                    }

                    lastValueFrom(this.pessoaService.get(this.objeto.pessoa_Id));
                    this.voltar();
                } 
                else {
                    this.erro = res.mensagem ?? "Não foi possível atribuir saldo.";
                }
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }
}

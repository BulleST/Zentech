import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaOperacaoRequest, PessoaOperacaoStatus } from 'src/app/models/pessoa-operacao.model';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { getError } from 'src/app/utils/error';
import { Crypto } from 'src/app/utils/crypto';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Moeda } from 'src/app/models/moeda.model';
import { MoedaService } from 'src/app/services/moeda.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { insertOrReplace } from 'src/app/utils/service-list';

@Component({
    selector: 'app-form-operacao',
    templateUrl: './form-operacao.component.html',
    styleUrls: ['./form-operacao.component.css']
})
export class FormOperacaoComponent implements OnDestroy {
    faEdit = faEdit;
    faTrash = faTrash;

    objeto: PessoaOperacaoRequest = new PessoaOperacaoRequest;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    status: PessoaOperacaoStatus[] = [];
    loadingStatus = true;
    isEditPage = false;
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    modal: Modal = new Modal;

    moedas: Moeda[] = [];
    loadingMoedas = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private pessoaService: PessoaService,
        private pessoaOperacaoService: PessoaOperacaoService,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private router: Router,
        private moedaService: MoedaService,
    ) {
        lastValueFrom(this.pessoaOperacaoService.getStatus())
            .then(res => {
                this.loadingStatus = false;
                this.status = res;
            });

        lastValueFrom(this.moedaService.getList())
            .then(res => this.moedas = res)
            .finally(() => this.loadingMoedas = false);

        var moedas = this.moedaService.list.subscribe(res => this.moedas = res);
        this.subscription.push(moedas);
    }
    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '800px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        this.modal.routerBack = ['../../'];

        var parent = this.activatedRoute.parent?.snapshot.paramMap.has('pessoa_id');
        var child = this.activatedRoute.snapshot.paramMap.has('pessoa_id');
        if (parent || child) {
            var paramsSubscriber = parent ? this.activatedRoute.parent?.params : child ? this.activatedRoute.params : undefined;

        } else {
            this.voltar();
            return;
        }

        if (paramsSubscriber) {
            var params = paramsSubscriber.subscribe(x => {
                if (x['pessoa_id']) {
                    this.objeto.pessoa_Id = this.crypto.decrypt(x['pessoa_id']);

                } else {
                    this.voltar();
                }
            });
            this.subscription.push(params);
        }
        var params = this.activatedRoute.params.subscribe(res => {
            if (res['operacao_id']) {
                var id = res['operacao_id'];
                this.objeto.id = this.crypto.decrypt(id) as number;
                this.modal.title = 'Editar Operação';
                this.modal.routerBack = ['../../../'];
                this.isEditPage = true;
                lastValueFrom(this.pessoaOperacaoService.get(this.objeto.id))
                    .then(res => {
                        this.loading = false;
                        res.dataCadastro = this.datepipe.transform(res.dataCadastro, 'yyyy-MM-ddThh:mm') as unknown as Date;
                        res.dataTransacao = this.datepipe.transform(res.dataTransacao, 'yyyy-MM-dd') as unknown as Date;
                        res.num_Op = (res.num_Op ? res.num_Op.toString().padStart(4, '0') : '') as unknown as number;
                        this.objeto = res;

                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'moeda');
                        }, 200);
                    })
                    .catch(res => {
                        this.loading = false;
                        this.voltar()
                    })
            } else {
                this.modal.title = 'Cadastrar Operação';
                this.modal.routerBack = ['../../'];
                this.isEditPage = false;
                this.objeto.dataCadastro = this.datepipe.transform(this.objeto.dataCadastro, 'yyyy-MM-ddThh:mm') as unknown as Date;
                this.objeto.dataTransacao = this.datepipe.transform(this.objeto.dataTransacao, 'yyyy-MM-dd') as unknown as Date;
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
        this.modalService.removeModal(this.modal);
    }


    moedaEditar(moeda: Moeda) {
        var idEncrypted = this.crypto.encrypt(moeda.id);
        this.router.navigate(['moeda', idEncrypted], { relativeTo: this.activatedRoute })
    }

    moedaExcluir(id: number) {
        var idEncrypted = this.crypto.encrypt(id);
        this.router.navigate(['moeda', 'excluir', idEncrypted], { relativeTo: this.activatedRoute })
    }


    request() {
        if (this.objeto.id == 0)
            return lastValueFrom(this.pessoaOperacaoService.create(this.objeto));

        return lastValueFrom(this.pessoaOperacaoService.edit(this.objeto));
    }

    send() {
        this.loading = true;
        this.erro = '';

        this.request()
            .then(res => {
                this.loading = false;
                if (res.sucesso) {
                    if (res.objeto) {
                        insertOrReplace(this.pessoaService, res.objeto['pessoa']);
                        insertOrReplace(this.pessoaOperacaoService, res.objeto['operacao'], 'listOperacaoPorPessoa');
                    } else {
                        lastValueFrom(this.pessoaOperacaoService.getListById(this.objeto.pessoa_Id));
                        lastValueFrom(this.pessoaOperacaoService.getList());
                        lastValueFrom(this.pessoaService.getList());
                    }

                    lastValueFrom(this.pessoaService.get(this.objeto.pessoa_Id));
                    this.voltar();
                } 
                else {
                    this.erro = res.mensagem ?? `Não foi possível ${ (this.isEditPage ? "editar" : "cadastrar") } operação.`;
                }
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }

}

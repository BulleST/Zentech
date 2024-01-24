import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Moeda } from 'src/app/models/moeda.model';
import { Paises } from 'src/app/models/pais.model';
import { PessoaOperacaoList, PessoaOperacaoRequest, PessoaOperacaoStatus } from 'src/app/models/pessoa-operacao.model';
import { Pessoa, PessoaList, pessoaColumns } from 'src/app/models/pessoa.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { MoedaService } from 'src/app/services/moeda.service';
import { PaisesService } from 'src/app/services/paises.service';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { insertOrReplace } from 'src/app/utils/service-list';
import { Table } from 'src/app/utils/table';
import { MaskApplierService } from 'ngx-mask';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    faEdit = faEdit;
    faTrash = faTrash;

    objeto: PessoaOperacaoRequest = new PessoaOperacaoRequest;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    status: PessoaOperacaoStatus[] = [];
    loadingStatus = true;
    pessoas: PessoaList[] = [];
    loadingPessoa = false;
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = true;
    pessoa_id: number = 0;
    pessoaSelected?: PessoaOperacaoList;
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
        private mask: MaskApplierService,
        private currencyPipe: CurrencyPipe,
        private moedaService: MoedaService,
        private router: Router,
        private loadingUtils: LoadingService,
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
        this.modal.style = { 'max-width': '700px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(async x => {
            if (x['operacao_id']) {
                this.objeto.id = this.crypto.decrypt(x['operacao_id']);
                this.modal.title = 'Editar Operação';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;
                this.pessoaChange();
                lastValueFrom(this.pessoaOperacaoService.get(this.objeto.id))
                    .then(res => {
                        res.num_Op = (res.num_Op ? res.num_Op.toString().padStart(4, '0') : '') as unknown as number;
                        res.dataCadastro = this.datepipe.transform(res.dataCadastro, 'yyyy-MM-ddThh:mm') as unknown as Date;
                        res.dataTransacao = this.datepipe.transform(res.dataTransacao, 'yyyy-MM-dd') as unknown as Date;

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

                var list = this.pessoaService.list.subscribe(res => this.pessoas = res)
                this.subscription.push(list);

                if (this.pessoas.length == 0) {
                    this.loadingPessoa = true;
                    this.loadingUtils.addLoadingRequest();
                    this.loadingUtils.message.next('Carregando lista de pessoas')
                    lastValueFrom(this.pessoaService.getList(true))
                        .then(res => {
                            this.loadingUtils.removeLoadingRequest();
                            this.loadingPessoa = false;
                            this.pessoas = JSON.parse(JSON.stringify(res));
                            this.pessoas = this.pessoas.map(x => {
                                x.dataCadastro = this.datepipe.transform(x.dataCadastro, 'yyyy-MM-ddThh:mm') as unknown as Date;
                                x.saldoAtual = this.currencyPipe.transform(x.saldoAtual, 'BRL', '', '1.2') as unknown as number;
                                x.cpf = this.mask.applyMask(x.cpf.toString().padStart(11, '0'), '000.000.000-00');
                                return x
                            });
                        });
                }


                this.modal.title = 'Cadastrar Operação';
                this.modal.routerBack = ['../'];

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


    pessoaChange() {
        this.pessoaSelected = this.pessoaOperacaoService.list.value.find(x => x.id == this.objeto.id) as PessoaOperacaoList;
    }

    moedaEditar(moeda: Moeda) {
        var idEncrypted = this.crypto.encrypt(moeda.id);
        this.router.navigate(['moeda', idEncrypted], { relativeTo: this.activatedRoute })
    }

    moedaExcluir(id: number) {
        var idEncrypted = this.crypto.encrypt(id);
        this.router.navigate(['moeda', 'excluir', idEncrypted], { relativeTo: this.activatedRoute })
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
                        insertOrReplace(this.pessoaOperacaoService, res.objeto['operacao']);
                    } else {
                        lastValueFrom(this.pessoaOperacaoService.getListById(this.objeto.pessoa_Id));
                        lastValueFrom(this.pessoaOperacaoService.getList());
                        lastValueFrom(this.pessoaService.getList());
                    }
                    this.voltar();
                }
                else {
                    this.erro = res.mensagem ?? `Não foi possível ${(this.isEditPage ? "editar" : "cadastrar")} operação.`;
                }
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

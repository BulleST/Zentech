import { PaisesService } from './../../../services/paises.service';
import { InstituicaoFinanceiraService } from './../../../services/instituicao-financeira.service';
import { ContratoTipoService } from './../../../services/contrato-tipo.service';
import { ContratoTipo } from './../../../models/contrato-tipo.model';
import { Contrato } from './../../../models/contrato.model';
import { ContratoService } from './../../../services/contrato.service';
import { Contrato_List } from './../../../models/contrato.model';
import { ContratoStatus } from './../../../models/contrato.model';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { CepService } from 'src/app/services/cep-service.service';
import { Cidades } from 'src/app/models/cidade.model';
import { CidadesService } from 'src/app/services/cidades.service';
import { SelectItem } from 'primeng/api';
import { ContratoEvento } from 'src/app/models/contrato-evento.model';
import { InstituicaoFinanceiraList } from 'src/app/models/instituicao-financeira.model';
import { ContratoEventoService } from 'src/app/services/contrato-evento.service';
import { Paises } from 'src/app/models/pais.model';
import { Modal } from 'src/app/services/modal.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice_List } from 'src/app/models/invoice.model';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {

    objeto: Contrato = new Contrato;
    teste: Contrato_List[]
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    routeBackOptions: any;
    cidade_id: number = 0
    status: ContratoStatus[] = [];
    loadingStatus = true;
    contratos: Contrato_List[] = [];
    loadingPessoa = true;
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = true;
    id: number = 0;
    numEndereco: any;
    localidade: any;
    bairro: any;
    uf: any;
    ddd: any;
    item: any = '';
    modal: Modal = new Modal;

    coffeeIcon = faCoffee;
    selectedCity: any;
    cidadesDropdown: SelectItem[] = [];

    cepPreenchido: boolean = false;
    larguraResponsiva: number = 50;

    tipos: ContratoTipo[] = []
    loadingTipo = true;


    eventos: ContratoEvento[] = []
    loadingEvento = true;


    instituicoes: InstituicaoFinanceiraList[] = []
    loadingInstituicao = true;

    paises: Paises[] = []
    loadingPais = true;


    cidades: Cidades[] = []
    loadingCidade = true;

    invoices: Invoice_List[] = []
    loadingInvoice = true;

    selectedInvoice?: Invoice_List



    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private pessoaSaldoService: PessoaSaldoService,
        private contratoService: ContratoService,
        private contratoTipoService: ContratoTipoService,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private toastr: ToastrService,
        private cepService: CepService,
        private cidadesService: CidadesService,
        private instituicaoFinanceiraService: InstituicaoFinanceiraService,
        private contratoEventoService: ContratoEventoService,
        private paisesService: PaisesService,
        private router: Router,
        private invoiceService: InvoiceService

    ) {
        library.add(faCoffee);



        this.routeBackOptions = { relativeTo: this.activatedRoute };

        lastValueFrom(this.contratoService.getList())
            .then(res => this.contratos = res)
            .finally(() => console.log('ok'));

        var contratos = this.contratoService.list.subscribe(res => this.contratos = res);
        this.subscription.push(contratos);




        lastValueFrom(this.invoiceService.getList())
            .then(res => this.invoices = res)
            .finally(() => console.log('ok'));

        var invoices = this.invoiceService.list.subscribe(
            res => {
                this.invoices = res.map(x => {
                    x.filter = x.id + '-' + x.nomeBanco + '-' + x.nomeBeneficiario + '-' + x.cnpjBeneficiario + '-' + x.valor + '-' + x.dataInvoice
                    console.log('teste', x.filter)
                    return x
                })

            }
        );
        this.subscription.push(invoices);


        lastValueFrom(this.contratoEventoService.getList())
            .then(res => this.eventos = res)
            .finally(() => this.loadingEvento = false);

        var eventos = this.contratoEventoService.list.subscribe(res => this.eventos = res);
        this.subscription.push(eventos);



        lastValueFrom(this.contratoTipoService.getList())
            .then(res => this.tipos = res)
            .finally(() => this.loadingTipo = false);

        var tipos = this.contratoTipoService.list.subscribe(res => this.tipos = res);
        this.subscription.push(tipos);
        lastValueFrom(this.instituicaoFinanceiraService.getList())
            .then(res => {
                this.loadingInstituicao = false;
                this.instituicoes = res;
                console.log(this.instituicoes)
            });

        lastValueFrom(this.paisesService.getPais())
            .then(res => {
                this.loadingPais = false;
                this.paises = res;

            });



    }



    encryptId(id: any): string {
        const encryptedId = this.crypto.encrypt(id);
        return encryptedId !== null ? encryptedId : ''; // Se encryptedId for null, retorna uma string vazia ('')
    }
    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '650px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(x => {

            if (x['contrato_id']) {


                this.objeto.id = this.crypto.decrypt(x['contrato_id']);
                this.modal.title = 'Editar Contrato';
                console.log('testeee')
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;
                lastValueFrom(this.contratoService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        this.selectedInvoice = this.invoices.find(x => x.id == this.objeto.invoice_Id)
                        console.log(this.objeto, 'this.selectedInvoice', this.selectedInvoice)
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'contrato');
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })

            } else {

                this.modal.title = 'Cadastrar Contrato';
                this.modal.routerBack = ['../'];

                this.isEditPage = false;
                // this.objeto.cidade_Id = 5270;
                setTimeout(() => {
                    console.log('oiiiiieiei')
                    this.modal = this.modalService.addModal(this.modal, 'contrato');
                }, 200);
            }
        });
        this.subscription.push(params);
    }


    invoiceChange() {
        this.objeto.invoice_Id = this.selectedInvoice?.id ?? undefined as unknown as number
        console.log(this.selectedInvoice, this.selectedInvoice?.id)
    }



    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modalService.removeModal(this.modal.id);
    }


    fileDownload() {
        this.loading = true;
        lastValueFrom(this.contratoService.file(this.objeto.id))
            .then(res => {
                this.loading = false;
            })
            .catch(res => {
                this.loading = false;
            })

    }

    send(form: NgForm, salvarEBaixar: boolean) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = 'Campos inválidos';
            return;
        }
        this.erro = '';
        this.loading = true;
        this.erro = '';

        return lastValueFrom(this.contratoService.post(this.objeto))
            .then(res => {
                if (res.sucesso != false) {
                    if (salvarEBaixar && this.isEditPage) {
                        lastValueFrom(this.contratoService.file(this.objeto.id))
                            .then(res => {
                                this.loading = false;
                            })
                            .catch(res => {
                                this.loading = false;
                            })
                    } else {
                        this.voltar();
                    }
                } else {
                    this.erro = res.mensagem;
                    this.toastr.error(res.mensagem);
                    console.log(this.objeto)
                }
                this.loading = false;
            })
            .catch(res => {
                console.log(this.objeto)
                this.loading = false;
                this.erro = getError(res);
            })

    }

    // No seu arquivo .ts correspondente



}

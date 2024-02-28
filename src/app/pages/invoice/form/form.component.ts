import { DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { BancoList, BancoRequest } from 'src/app/models/banco.model';
import { BeneficiarioList, BeneficiarioRequest } from 'src/app/models/beneficiario.model';
import { Contrato, Contrato_List } from 'src/app/models/contrato.model';
import { InstituicaoFinanceiraList } from 'src/app/models/instituicao-financeira.model';
import { Invoice, InvoiceRequest } from 'src/app/models/invoice.model';
import { Moeda } from 'src/app/models/moeda.model';
import { BancoService } from 'src/app/services/banco.service';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { InstituicaoFinanceiraService } from 'src/app/services/instituicao-financeira.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { MoedaService } from 'src/app/services/moeda.service';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { NgForm } from '@angular/forms';
import { tabChanged } from 'src/app/utils/tabview';
import { ContratoTipo } from 'src/app/models/contrato-tipo.model';
import { ContratoEvento } from 'src/app/models/contrato-evento.model';
import { Paises } from 'src/app/models/pais.model';
import { faArrowLeft, faArrowRight, faCheck, faEdit, faPenClip, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from 'src/app/parts/loading/loading';
import { ContratoTipoService } from 'src/app/services/contrato-tipo.service';
import { ContratoEventoService } from 'src/app/services/contrato-evento.service';
import { PaisesService } from 'src/app/services/paises.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    faEdit = faEdit;
    faTrash = faTrash;
    faArrowRight = faArrowRight;
    faArrowLeft = faArrowLeft;
    faPenClip = faPenClip;
    faCheck = faCheck;
    objeto: InvoiceRequest = new InvoiceRequest;
    erro: string = '';
    loading = false;
    loadingInvoiceFile = false;
    loadingContratoFile = false;
    loadingSwiftFile = false;
    loadingContratoBicolunadoFile = false;

    subscription: Subscription[] = [];

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    modal: Modal = new Modal;
    isEditPage = true;
    activeIndex = 2;

    tipos: ContratoTipo[] = []
    loadingTipo = true;

    eventos: ContratoEvento[] = []
    loadingEvento = true;

    beneficiarios: BeneficiarioList[] = [];
    loadingBeneficiarios = false;
    beneficiarioSelected?: BeneficiarioRequest;
    bancoBeneficiarioSelected?: BancoRequest;

    paises: Paises[] = []
    loadingPais = true;

    moedas: Moeda[] = [];
    loadingMoedas = true;

    instituicaoFinanceira: InstituicaoFinanceiraList[] = [];
    loadingInstituicaoFinanceira = true;

    alterarConta = false;
    podeExcluir = false;

    assinaturaUploadedFile?: File;
    assinaturaIsUploaded = false;
    alterarRepresentanteLegal = false;


    assinadoRepresentanteLegal = false;
    assinadoIntermediadora = false;
    certificadoAssinaturaIncluido = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private toastr: ToastrService,
        private moedaService: MoedaService,
        private beneficiarioService: BeneficiarioService,
        private bancoService: BancoService,
        private instituicaoFinanceiraService: InstituicaoFinanceiraService,
        private invoiceService: InvoiceService,
        private contratoService: ContratoService,
        private contratoTipoService: ContratoTipoService,
        private contratoEventoService: ContratoEventoService,
        private paisesService: PaisesService,
        private modalService: ModalService,
        private loadingService: LoadingService,
        private router: Router,
        private accountService: AccountService,
    ) {
        this.podeExcluir = this.accountService.accountValue?.perfilAcesso_Id == 1;


        lastValueFrom(this.moedaService.getList())
            .then(res => this.moedas = res)
            .finally(() => this.loadingMoedas = false);

        var moedas = this.moedaService.list.subscribe(res => this.moedas = res);
        this.subscription.push(moedas);

        lastValueFrom(this.paisesService.getList())
            .then(res => this.paises = res)
            .finally(() => this.loadingPais = false);

        lastValueFrom(this.beneficiarioService.getList())
            .then(res => {
                this.beneficiarios = res;
                this.loadingBeneficiarios = false;
            })
        var beneficiarios = this.beneficiarioService.list.subscribe(res => this.beneficiarios = res);
        this.subscription.push(beneficiarios);

        lastValueFrom(this.instituicaoFinanceiraService.getList())
            .then(res => this.instituicaoFinanceira = res)
            .finally(() => this.loadingInstituicaoFinanceira = false);

        var instituicaoFinanceira = this.instituicaoFinanceiraService.list.subscribe(res => this.instituicaoFinanceira = res);
        this.subscription.push(instituicaoFinanceira);

        lastValueFrom(this.contratoTipoService.getList())
            .then(res => this.tipos = res)
            .finally(() => this.loadingTipo = false);

        lastValueFrom(this.contratoEventoService.getList())
            .then(res => this.eventos = res)
            .finally(() => this.loadingEvento = false);

        lastValueFrom(this.paisesService.getList())
            .then(res => this.paises = res)
            .finally(() => this.loadingPais = false);

    }

    ngAfterViewInit(): void {

        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '1100px' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        var params = this.activatedRoute.params.subscribe(x => {
            if (x['invoice_id']) {
                this.objeto.invoice.id = this.crypto.decrypt(x['invoice_id']);
                this.modal.title = 'Editar Invoice';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;

                lastValueFrom(this.invoiceService.get(this.objeto.invoice.id))
                    .then(async res => {
                        res.contrato.numContrato = res.invoice.id.toString();
                        res.invoice.data = this.datepipe.transform(res.invoice.data, 'yyyy-MM-ddTHH:mm') as unknown as Date;
                        res.contrato.data = this.datepipe.transform(res.contrato.data, 'yyyy-MM-ddTHH:mm') as unknown as Date;
                        res.contrato.dataLiquidacao = this.datepipe.transform(res.contrato.dataLiquidacao, 'yyyy-MM-dd') as unknown as Date;
                      
                        res.contrato.dataAssinaturaRepresentanteLegal = this.datepipe.transform(res.contrato.dataAssinaturaRepresentanteLegal, 'yyyy-MM-ddTHH:mm') as unknown as Date;
                        res.contrato.dataAssinaturaIntermediadora = this.datepipe.transform(res.contrato.dataAssinaturaIntermediadora, 'yyyy-MM-ddTHH:mm') as unknown as Date;
                        res.contrato.dataCertificadoAssinatura = this.datepipe.transform(res.contrato.dataCertificadoAssinatura, 'yyyy-MM-ddTHH:mm') as unknown as Date;
                       
                        this.assinadoRepresentanteLegal = res.contrato.dataAssinaturaRepresentanteLegal != null && res.contrato.dataAssinaturaRepresentanteLegal != undefined;
                        this.assinadoIntermediadora = res.contrato.dataAssinaturaIntermediadora != null && res.contrato.dataAssinaturaIntermediadora != undefined;
                        this.certificadoAssinaturaIncluido = res.contrato.dataCertificadoAssinatura != null && res.contrato.dataCertificadoAssinatura != undefined;

                        this.objeto = res;
                        this.objeto.contrato = new Contrato(res.contrato);
                        await this.beneficiarioChange();

                        this.calculaMoedaNacional();
                        this.calculaVET();

                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'invoice');
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar()
                    })
            } else {

                this.modal.title = 'Cadastrar Invoice';
                this.modal.routerBack = ['../'];

                this.isEditPage = false;
                this.objeto.invoice.data = this.datepipe.transform(this.objeto.invoice.data, 'yyyy-MM-ddTHH:mm') as unknown as Date;
                this.objeto.contrato.dataLiquidacao = this.datepipe.transform(this.objeto.contrato.dataLiquidacao, 'yyyy-MM-dd') as unknown as Date;
                this.objeto.contrato.data = this.datepipe.transform(this.objeto.contrato.data, 'yyyy-MM-ddTHH:mm') as unknown as Date;
                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'invoice');
                }, 200);
            }
        });
        this.subscription.push(params);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    encryptId(id: any): string {
        const encryptedId = this.crypto.encrypt(id);
        return encryptedId !== null ? encryptedId : ''; // Se encryptedId for null, retorna uma string vazia ('')
    }

    voltar() {
        this.modalService.removeModal(this.modal);
    }

    tabChanged(index: number) {
        this.activeIndex = index;
        tabChanged(index)
    }

    async beneficiarioChange() {
        if (this.objeto.invoice.beneficiario_Id) {
            this.loadingBeneficiarios = true;

            await lastValueFrom(this.beneficiarioService.get(this.objeto.invoice.beneficiario_Id))
                .then(async (res: BeneficiarioRequest) => {
                    res.pais_Id = (this.paises.find(x => x.id == res.pais_Id)?.nome ?? '') as unknown as number;
                    this.objeto.invoice.conta = res.conta;

                    this.objeto.contrato.nomeRepresentanteLegal = res.nomeRepresentanteLegal;
                    this.objeto.contrato.codigoRepresentanteLegal = res.codigoRepresentanteLegal;
                    this.objeto.contrato.assinaturaRepresentanteLegal = res.assinaturaRepresentanteLegal;

                    this.beneficiarioSelected = res;

                    await lastValueFrom(this.bancoService.get(res.banco_Id))
                        .then(res => {
                            res.pais_Id = (this.paises.find(x => x.id == res.pais_Id)?.nome ?? '') as unknown as number;
                            this.bancoBeneficiarioSelected = res;
                        })
                        .catch(res => this.toastr.error('Não foi possível carregar dados do banco.'));
                })
                .catch(res => this.toastr.error('Não foi possível carregar dados do beneficiário.'));

            this.loadingBeneficiarios = false;
        } else {
            delete this.beneficiarioSelected;
            delete this.bancoBeneficiarioSelected;
        }
    }


    moedaEditar(moeda: Moeda) {
        var idEncrypted = this.crypto.encrypt(moeda.id);
        this.router.navigate(['moeda', idEncrypted], { relativeTo: this.activatedRoute })
    }

    moedaExcluir(id: number) {
        var idEncrypted = this.crypto.encrypt(id);
        this.router.navigate(['moeda', 'excluir', idEncrypted], { relativeTo: this.activatedRoute })
    }

    async invoiceDownload() {
        if (this.objeto.invoice.id == 0) {
            this.toastr.error('Você deve primeiro salvar os dados para fazer o download.')
            return
        }
        this.loadingInvoiceFile = true;
        this.loadingService.message.next('Carregando documento invoice.')
        await lastValueFrom(this.invoiceService.file(this.objeto.invoice.id))
        this.loadingInvoiceFile = false;
        this.loadingService.message.next('');
    }

    async contratoDownload() {
        if (this.objeto.invoice.id == 0) {
            this.toastr.error('Você deve primeiro salvar os dados para fazer o download.')
            return
        }
        this.loadingContratoFile = true;
        this.loadingService.message.next('Carregando Contrato.')
        await lastValueFrom(this.contratoService.contrato(this.objeto.contrato.id))
        this.loadingContratoFile = false;
        this.loadingService.message.next('');
    }

    async swiftDownload() {
        if (this.objeto.invoice.id == 0) {
            this.toastr.error('Você deve primeiro salvar os dados para fazer o download.')
            return
        }
        this.loadingSwiftFile = true;
        this.loadingService.message.next('Carregando Swift.')
        await lastValueFrom(this.invoiceService.fileSwift(this.objeto.invoice.id))
        this.loadingSwiftFile = false;
        this.loadingService.message.next('');
    }

    async contratoBicolunadoDownload() {
        if (this.objeto.contrato.id == 0) {
            this.toastr.error('Você deve primeiro salvar os dados para fazer o download.')
            return
        }
        this.loadingContratoBicolunadoFile = true;
        this.loadingService.message.next('Carregando Contrato Bicolunado.')
        await lastValueFrom(this.contratoService.contratoBicolunado(this.objeto.contrato.id))
        this.loadingContratoBicolunadoFile = false;
        this.loadingService.message.next('');
    }

    async kitDownload() {
        if (this.objeto.invoice.id == 0) {
            this.toastr.error('Você deve primeiro salvar os dados para fazer o download.')
            return
        }

        this.loading = true;
        await lastValueFrom(this.invoiceService.kitZip(this.objeto.invoice.id));
        this.loading = false;
    }

    calculaMoedaNacional() {
        if (this.objeto.invoice.valor && this.objeto.contrato.taxa) {
            this.objeto.contrato.valorNacional = this.objeto.invoice.valor * this.objeto.contrato.taxa;
        }
    }

    calculaVET() {
        if (this.objeto.invoice.valor && this.objeto.contrato.valorNacional) {
            // VET = (Valor Moeda Nacional + ( Valor Moeda Nacional * 0.38 )) / Valor Invoice
            this.objeto.contrato.vet = (this.objeto.contrato.valorNacional + (this.objeto.contrato.valorNacional * (0.38 / 100))) / this.objeto.invoice.valor;
        }
    }

    fileChange(event: any) {
        var file = event.target.files[0] as File;
        this.assinaturaUploadedFile = file;
        console.log(file)

        if (file) {
            var reader = new FileReader();
            var c = this;
            reader.onload = function (e) {
                var src = e.target?.result as string;
                c.objeto.contrato.assinaturaRepresentanteLegal = src;
                c.assinaturaIsUploaded = true;
            }
            reader.onerror = function (e) {
                c.toastr.error('Não foi possível realizar upload');
            }
            var a = reader.readAsDataURL(file)

        } else {
            this.toastr.error('Selecione uma imagem para salvar.')
        }
    }


    alterarDadosRepresentanteLegal() {
        this.alterarRepresentanteLegal = !this.alterarRepresentanteLegal;

        if (!this.alterarRepresentanteLegal) { 
            this.objeto.contrato.assinaturaRepresentanteLegal = this.beneficiarioSelected ? this.beneficiarioSelected.assinaturaRepresentanteLegal : '';
            this.objeto.contrato.nomeRepresentanteLegal = this.beneficiarioSelected ? this.beneficiarioSelected.nomeRepresentanteLegal : '';
            this.objeto.contrato.codigoRepresentanteLegal = this.beneficiarioSelected ? this.beneficiarioSelected.codigoRepresentanteLegal : '';
            this.assinaturaIsUploaded = false;
            delete this.assinaturaUploadedFile;
        }
    }

    readonlyRepresentanteLegal() {
        var camposPreenchidos = false;
        if (this.objeto.contrato.nomeRepresentanteLegal && this.objeto.contrato.codigoRepresentanteLegal && this.objeto.contrato.assinaturaRepresentanteLegal) {
            camposPreenchidos = true;
        }
        var eReadOnly = (camposPreenchidos && !this.alterarRepresentanteLegal) || !this.alterarRepresentanteLegal;
        return eReadOnly;
    }

    async assinarRepresentanteLegal() {
        if (!this.objeto.contrato.assinaturaRepresentanteLegal) {
            this.toastr.error('Inclua uma assinatura válida para assinar.')
            return;
        }
        if (!this.beneficiarioSelected) {
            this.toastr.error('Selecione um beneficiário para assinar.')
            return;
        }
        this.loading = true;
        await lastValueFrom(this.contratoService.assinarRepresentanteLegal(this.objeto.contrato.id))
        .then(res => {
            if (res.sucesso) {
                this.assinadoRepresentanteLegal = true;
                this.objeto.contrato = res.objeto;
            } else {
                this.erro = res.mensagem;
            }
        })
        .catch(res => {
            this.erro = getError(res);
        })
        this.loading = false;
    }

    async assinarMAC() {
        this.loading = true;
        await lastValueFrom(this.contratoService.assinarMAC(this.objeto.contrato.id))
        .then(res => {
            if (res.sucesso) {
                this.assinadoIntermediadora = true;
                this.objeto.contrato = res.objeto;
            } else {
                this.erro = res.mensagem;
            }
        })
        .catch(res => {
            this.erro = getError(res);
        })
        this.loading = false;
    }

    async certificadoAssinatura() {
        this.loading = true;
        await lastValueFrom(this.contratoService.certificadoAssinatura(this.objeto.contrato.id))
        .then(res => {
            if (res.sucesso) {
                this.certificadoAssinaturaIncluido = true;
                this.objeto.contrato = res.objeto;
            } else {
                this.erro = res.mensagem;
            }
        })
        .catch(res => {
            this.erro = getError(res);
        })
        this.loading = false;
    }

    async send(invoice: NgForm, contrato: NgForm) {
        this.loading = false;
        this.erro = '';
        if (invoice.invalid) {
            this.toastr.error('Campos inválidos em invoice.');
            this.erro = 'Campos inválidos em invoice.';
            return;
        }
        if (contrato.invalid) {
            this.toastr.error('Campos inválidos em contrato.');
            this.erro = 'Campos inválidos em contrato.';
            return;
        }

        if (!this.isEditPage) {
            this.objeto.contrato.invoice_Id = 0;
        }
        return await this.request()
            .then(async res => {
                if (res.sucesso == true) {

                    this.alterarRepresentanteLegal = false;

                    this.objeto.contrato.id = res.objeto.contrato.id;
                    this.objeto.contrato.invoice_Id = res.objeto.invoice.id;
                    this.objeto.invoice.id = res.objeto.invoice.id;
                    this.objeto.contrato.numContrato = this.objeto.invoice.id.toString();
                    if (!this.isEditPage) {
                        await lastValueFrom(this.invoiceService.edit(this.objeto));
                    }

                    var a = this.crypto.encrypt(this.objeto.invoice.id);
                    if (!this.isEditPage) {
                        this.modalService.removeModalAnimation(this.modal.id);
                        this.router.navigate(['../editar', a], { relativeTo: this.activatedRoute })
                    }
                    await lastValueFrom(this.invoiceService.getList());

                } else {
                    this.erro = res.mensagem;
                    this.toastr.error(res.mensagem);
                }
            })

            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })
    }

    request() {
        if (this.isEditPage)
            return lastValueFrom(this.invoiceService.edit(this.objeto));

        return lastValueFrom(this.invoiceService.create(this.objeto));
    }

}

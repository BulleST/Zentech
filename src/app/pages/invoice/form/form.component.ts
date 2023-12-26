import { DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { BancoList } from 'src/app/models/banco.model';
import { BeneficiarioList } from 'src/app/models/beneficiario.model';
import { Contrato_List } from 'src/app/models/contrato.model';
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
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from 'src/app/parts/loading/loading';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    faEdit = faEdit;
    faTrash = faTrash;

    objeto: InvoiceRequest = new InvoiceRequest;
    erro: string = '';
    loading = false;
    loadingInvoiceFile = false;
    loadingContratoFile = false;
    loadingSwiftFile = false;

    subscription: Subscription[] = [];

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    modal: Modal = new Modal;
    isEditPage = true;
    activeIndex = 0;

    tipos: ContratoTipo[] = []
    loadingTipo = true;

    eventos: ContratoEvento[] = []
    loadingEvento = true;

    paises: Paises[] = []
    loadingPais = true;

    beneficiarios: BeneficiarioList[] = [];
    loadingBeneficiarios = false;
    beneficiarioSelected?: BeneficiarioList = new BeneficiarioList;

    instituicaoFinanceira: InstituicaoFinanceiraList[] = [];
    loadingInstituicaoFinanceira = false;

    moedas: Moeda[] = [];
    loadingMoedas = false;

    
    constructor(
        private activatedRoute: ActivatedRoute,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private toastr: ToastrService,
        private moedaService: MoedaService,
        private beneficiarioService: BeneficiarioService,
        private instituicaoFinanceiraService: InstituicaoFinanceiraService,
        private invoiceService: InvoiceService,
        private contratoService: ContratoService,
        private modalService: ModalService,
        private loadingService: LoadingService,
        private router: Router,
    ) {

        lastValueFrom(this.moedaService.getList())
            .then(res => this.moedas = res)
            .finally(() => this.loadingMoedas = false);

        var moedas = this.moedaService.list.subscribe(res => this.moedas = res);
        this.subscription.push(moedas);

        lastValueFrom(this.beneficiarioService.getList())
            .then(res => this.beneficiarios = res)
            .finally(() => this.loadingBeneficiarios = false);

        var beneficiarios = this.beneficiarioService.list.subscribe(res => this.beneficiarios = res);
        this.subscription.push(beneficiarios);

        lastValueFrom(this.instituicaoFinanceiraService.getList())
            .then(res => this.instituicaoFinanceira = res)
            .finally(() => this.loadingInstituicaoFinanceira = false);

        var instituicaoFinanceira = this.instituicaoFinanceiraService.list.subscribe(res => this.instituicaoFinanceira = res);
        this.subscription.push(instituicaoFinanceira);

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
                        res.invoice.dataInvoice = this.datepipe.transform(res.invoice.dataInvoice, 'yyyy-MM-ddThh:mm') as unknown as Date;
                        res.contrato.dataLiquidacao = this.datepipe.transform(res.contrato.dataLiquidacao, 'yyyy-MM-dd') as unknown as Date;
                        res.contrato.data = this.datepipe.transform(res.contrato.data, 'yyyy-MM-ddThh:mm') as unknown as Date;
                        this.objeto = res;
                        await this.beneficiarioChange();

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
                this.objeto.contrato.pais_Id = 30;
                this.objeto.invoice.dataInvoice = this.datepipe.transform(this.objeto.invoice.dataInvoice, 'yyyy-MM-ddThh:mm') as unknown as Date;
                this.objeto.contrato.dataLiquidacao = this.datepipe.transform(this.objeto.contrato.dataLiquidacao, 'yyyy-MM-dd') as unknown as Date;
                this.objeto.contrato.data = this.datepipe.transform(this.objeto.contrato.data, 'yyyy-MM-ddThh:mm') as unknown as Date;
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
        this.modalService.removeModal(this.modal.id);
    }

    tabChanged(index: number) {
        tabChanged(index)
    }

    async beneficiarioChange() {
        if (this.objeto.invoice.beneficiario_Id) {
            this.loadingBeneficiarios = true;
            if (this.beneficiarios.length == 0) {
                await lastValueFrom(this.beneficiarioService.getList());
            }
            this.beneficiarioSelected = this.beneficiarios.find(x => x.id == this.objeto.invoice.beneficiario_Id);
            this.loadingBeneficiarios = false;
        }
    }
    
   async invoiceDownload() {
        if (this.objeto.invoice.id == 0) {
            this.toastr.error('Você deve primeiro salvar os dados para fazer o download.')
            return
        }
        this.loadingInvoiceFile = true;
        this.loadingService.message.next('Carregando documento invoice.')
        await lastValueFrom(this.invoiceService.file(this.objeto.invoice.id))
            .then(res => {
                this.loadingInvoiceFile = false;
            })
            .catch(res => {
                this.loadingInvoiceFile = false;
                this.toastr.error('Não foi possível fazer download')
            });
            this.loadingService.message.next('');
    } 

    async contratoDownload() {
        if (this.objeto.invoice.id == 0) {
            this.toastr.error('Você deve primeiro salvar os dados para fazer o download.')
            return
        }
        this.loadingContratoFile = true;
        this.loadingService.message.next('Carregando Contrato.')
        await  lastValueFrom(this.contratoService.file(this.objeto.contrato.id))
            .then(res => {
                this.loadingContratoFile = false;
            })
            .catch(res => {
                this.loadingContratoFile = false;
            });
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
            .then(res => {
                this.loadingSwiftFile = false;
            })
            .catch(res => {
                this.loadingSwiftFile = false;
            });
        this.loadingService.message.next('');
    }

    async filesDownload() {
        if (this.objeto.invoice.id == 0) {
            this.toastr.error('Você deve primeiro salvar os dados para fazer o download.')
            return
        }

        this.loading = true;
        await this.invoiceDownload();
        await this.contratoDownload();
        await this.swiftDownload();
        
        this.loading = false;
    }

   
    moedaEditar(moeda: Moeda) {
        var idEncrypted = this.crypto.encrypt(moeda.id);
        this.router.navigate(['moeda', idEncrypted], { relativeTo: this.activatedRoute })
    }

    moedaExcluir(id: number) {
        var idEncrypted = this.crypto.encrypt(id);
        this.router.navigate(['moeda', 'excluir', idEncrypted], { relativeTo: this.activatedRoute })
    }

    send(invoice: NgForm, contrato: NgForm) {
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

        this.request()
            .then(async res => {
                if (res.sucesso == true) {
                    await lastValueFrom(this.invoiceService.getList());
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
        if (this.isEditPage)
            return lastValueFrom(this.invoiceService.edit(this.objeto.invoice));
        
        return lastValueFrom(this.invoiceService.create(this.objeto.invoice));
    }
}

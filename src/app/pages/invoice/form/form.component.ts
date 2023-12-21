import { DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { BancoList } from 'src/app/models/banco.model';
import { BeneficiarioList } from 'src/app/models/beneficiario.model';
import { Contrato_List } from 'src/app/models/contrato.model';
import { InstituicaoFinanceiraList } from 'src/app/models/instituicao-financeira.model';
import { Invoice } from 'src/app/models/invoice.model';
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

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: Invoice = new Invoice;
    erro: string = '';
    loading = false;

    subscription: Subscription[] = [];

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    modal: Modal = new Modal;
    isEditPage = true;

    contratos: Contrato_List[] = [];
    loadingContratos = false;

    beneficiarios: BeneficiarioList[] = [];
    loadingBeneficiarios = false;

    instituicaoFinanceira: InstituicaoFinanceiraList[] = [];
    loadingInstituicaoFinanceira = false;

    moedas: Moeda[] = [];
    loadingMoedas = false;

    bancos: BancoList[] = [];
    loadingBancos = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private toastr: ToastrService,
        private moedaService: MoedaService,
        private contratoService: ContratoService,
        private beneficiarioService: BeneficiarioService,
        private instituicaoFinanceiraService: InstituicaoFinanceiraService,
        private bancoService: BancoService,
        private invoiceService: InvoiceService,
        private modalService: ModalService,
    ) {

        lastValueFrom(this.moedaService.getList())
            .then(res => this.moedas = res)
            .finally(() => this.loadingMoedas = false);

        var moedas = this.moedaService.list.subscribe(res => this.moedas = res);
        this.subscription.push(moedas);

        lastValueFrom(this.contratoService.getList())
            .then(res => this.contratos = res)
            .finally(() => this.loadingContratos = false);

        var contratos = this.contratoService.list.subscribe(res => this.contratos = res);
        this.subscription.push(contratos);

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

        lastValueFrom(this.bancoService.getList())
            .then(res => this.bancos = res)
            .finally(() => this.loadingBancos = false);

        var bancos = this.bancoService.list.subscribe(res => this.bancos = res);
        this.subscription.push(bancos);
    }


    ngAfterViewInit(): void {

        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '900px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['invoice_id']) {
                this.objeto.id = this.crypto.decrypt(x['invoice_id']);

                this.modal.title = 'Editar Invoice';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;

                lastValueFrom(this.invoiceService.get(this.objeto.id))
                    .then(res => {
                        res.dataInvoice = this.datepipe.transform(res.dataInvoice, 'yyyy-MM-ddThh:mm') as unknown as Date;
                        this.objeto = res;

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
                this.objeto.dataInvoice = this.datepipe.transform(this.objeto.dataInvoice, 'yyyy-MM-ddThh:mm') as unknown as Date;
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

    send(form: NgForm, salvarEBaixar: boolean) {
        this.loading = false;
        this.erro = '';
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = 'Campos inválidos';
            return;
        }

        this.request()
            .then(async res => {
                if (res.sucesso == true) {
                    lastValueFrom(this.invoiceService.getList());
                    if (salvarEBaixar && this.isEditPage) {
                        this.loading = true;
                        lastValueFrom(this.invoiceService.file(this.objeto.id))
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
                }
                this.loading = false;
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }

    fileDownload() {
        this.loading = true;
        lastValueFrom(this.invoiceService.file(this.objeto.id))
            .then(res => {
                this.loading = false;
            })
            .catch(res => {
                this.loading = false;
            })

    }

    request() {
        if (this.objeto.id == 0)
            return lastValueFrom(this.invoiceService.create(this.objeto));

        return lastValueFrom(this.invoiceService.edit(this.objeto));
    }
}

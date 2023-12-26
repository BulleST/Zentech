import { PaisesService } from './../../../services/paises.service';
import { InstituicaoFinanceiraService } from './../../../services/instituicao-financeira.service';
import { ContratoTipoService } from './../../../services/contrato-tipo.service';
import { ContratoTipo } from './../../../models/contrato-tipo.model';
import { Contrato } from './../../../models/contrato.model';
import { ContratoService } from './../../../services/contrato.service';
import { Contrato_List } from './../../../models/contrato.model';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { ContratoEvento } from 'src/app/models/contrato-evento.model';
import { InstituicaoFinanceiraList } from 'src/app/models/instituicao-financeira.model';
import { ContratoEventoService } from 'src/app/services/contrato-evento.service';
import { Paises } from 'src/app/models/pais.model';
import { Modal } from 'src/app/services/modal.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice_List } from 'src/app/models/invoice.model';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: Contrato = new Contrato;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    routeBackOptions: any;
    contratos: Contrato_List[] = [];
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = true;
    id: number = 0;
    item: any = '';
    modal: Modal = new Modal;

    tipos: ContratoTipo[] = []
    loadingTipo = true;

    eventos: ContratoEvento[] = []
    loadingEvento = true;

    instituicoes: InstituicaoFinanceiraList[] = []
    loadingInstituicao = true;

    paises: Paises[] = []
    loadingPais = true;

    invoices: Invoice_List[] = []
    loadingInvoice = true;

    selectedInvoice?: Invoice_List


    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private contratoService: ContratoService,
        private crypto: Crypto,
        private toastr: ToastrService,
        private paisesService: PaisesService,
    ) {
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
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;
                lastValueFrom(this.contratoService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        this.selectedInvoice = this.invoices.find(x => x.id == this.objeto.invoice_Id)
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
                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'contrato');
                }, 200);
            }
        });
        this.subscription.push(params);
    }


    invoiceChange() {
        this.objeto.invoice_Id = this.selectedInvoice?.id ?? undefined as unknown as number
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
                }
                this.loading = false;
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }
}

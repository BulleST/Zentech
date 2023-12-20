import { Invoice_List } from './../../../models/invoice.model';
import { DocumentoSwiftRequest } from './../../../models/documento-swift';
import { DocumentoSwiftService } from '../../../services/documento-swift.service';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Cidades } from 'src/app/models/cidade.model';
import { NgForm, NgModel } from '@angular/forms';
import { CepService } from 'src/app/services/cep-service.service';
import { CidadesService } from 'src/app/services/cidades.service';
import { validateCEP } from 'src/app/utils/validate-cep';
import { validateCNPJ } from 'src/app/utils/validate-cnpj';
import { InvoiceService } from 'src/app/services/invoice.service';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: DocumentoSwiftRequest = new DocumentoSwiftRequest;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = true;

    modal: Modal = new Modal;
    invoices: Invoice_List[] = [];
    loadingInvoice = true;

    cepPreenchido: boolean = false;
    loadingCNPJ = false;
    loadingCep = false;
    @ViewChild('cep') cep: NgModel;



  selectedInvoice?: Invoice_List
    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private documentoSwiftService: DocumentoSwiftService,
        private crypto: Crypto,
        private toastr: ToastrService,
        private cepService: CepService,
        private invoiceService: InvoiceService
    ) {



            lastValueFrom(this.invoiceService.getList())
            .then(res => this.invoices = res)
            .finally(() => console.log('ok'));

          var invoices = this.invoiceService.list.subscribe(
            res => {this.invoices =  res.map(x=>{
              x.filter = x.id + '-' + x.nomeBanco + '-' +  x.nomeBeneficiario + '-' + x.cnpjBeneficiario + '-'+ x.valor + '-' + x.dataInvoice
              console.log('teste',x.filter)
              return x
            })

            }
            );
          this.subscription.push(invoices);
    }

    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '600px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['documento-swift_id']) {
                this.objeto.id = this.crypto.decrypt(x['documento-swift_id']);

                this.modal.title = 'Editar Documento Swifti';
                this.modal.routerBack = ['../../'];

                this.isEditPage = true;
                lastValueFrom(this.documentoSwiftService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        this.selectedInvoice = this.invoices.find(x=> x.id == this.objeto.invoice_Id)
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'documento-swift');
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })

            } else {
                this.modal.title = 'Cadastrar Documento Swift';
                this.modal.routerBack = ['../'];
                this.isEditPage = false;


                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'documento-swift');
                }, 200);
            }
        });
        this.subscription.push(params);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    invoiceChange(){
      this.objeto.invoice_Id = this.selectedInvoice?.id ?? undefined as unknown as number
    }


    voltar() {
        this.modalService.removeModal(this.modal.id);
    }





    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = 'Campos inválidos';
            return;
        }
        this.erro = '';
        return lastValueFrom(this.documentoSwiftService.post(this.objeto))
            .then(res => {
                if (res.sucesso != false) {
                    lastValueFrom(this.documentoSwiftService.getList());
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

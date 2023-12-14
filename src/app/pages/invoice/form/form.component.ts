import { DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal';

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
    routeBackOptions: any;
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = true;
    
    contratos: any[] = [];
    loadingContratos = false;

    beneficiarios: any[] = [];
    loadingBeneficiarios = false;

    instituicaoFinanceira: any[] = [];
    loadingInstituicaoFinanceira = false;

    moedas: any[] = [];
    loadingMoedas = false;

    bancos: any[] = [];
    loadingBancos = false;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: Modal,
        private invoiceService: InvoiceService,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private toastr: ToastrService,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };


    }
    ngAfterViewInit(): void {
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '900px', overflow: 'visible' })
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['invoice_id']) {
                this.objeto.id = this.crypto.decrypt(x['invoice_id']);
                this.modal.title.next('Editar Invoice')
                this.modal.routerBack.next(['../../']);
                this.isEditPage = true;

                lastValueFrom(this.invoiceService.get(this.objeto.id))
                    .then(res => {
                        res.dataInvoice = this.datepipe.transform(res.dataInvoice, 'yyyy-MM-ddThh:mm') as unknown as Date;
                        this.objeto = res;

                        setTimeout(() => {
                            this.modal.setOpen(true);
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })
            } else {
                this.modal.title.next('Cadastrar Invoice');
                this.modal.routerBack.next(['../']);
                this.isEditPage = false;
                this.objeto.dataInvoice = this.datepipe.transform(this.objeto.dataInvoice, 'yyyy-MM-ddThh:mm') as unknown as Date;
                setTimeout(() => {
                    this.modal.setOpen(true);
                }, 200);
            }
        });
        this.subscription.push(params);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar(this.modal.routerBack.value, this.routeBackOptions);
    }

    send() {
        this.loading = false;
        this.erro = '';

        this.request()
            .then(res => {
                if (res.successo == true) {
                    lastValueFrom(this.invoiceService.getList());
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
            return lastValueFrom(this.invoiceService.create(this.objeto));
        
        return lastValueFrom(this.invoiceService.edit(this.objeto));
    }
}

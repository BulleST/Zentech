import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
    faTrash = faTrash;
    id: number = 0;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    routerBack: string[] = ['../../'];
    routeBackOptions: any;

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: Modal,
        private invoiceService: InvoiceService,
        private crypto: Crypto,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };


        var params = activatedRoute.params.subscribe(p => {
            if (p['invoice_id']) {
                this.id = this.crypto.decrypt(p['invoice_id']);
                lastValueFrom(this.invoiceService.get(this.id))
                    .then(res => {
                        setTimeout(() => {
                            this.modal.setOpen(true);
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);


    }
    ngAfterViewInit(): void {
        this.modal.title.next('Excluir registro')
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '400px' })
        this.modal.routerBack.next(this.routerBack);
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }


    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }


    send() {
        this.loading = true;
        this.erro = '';

        lastValueFrom(this.invoiceService.delete(this.id))
            .then(res => {
                lastValueFrom(this.invoiceService.getList());
                this.voltar();
                this.loading = false;
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }
}

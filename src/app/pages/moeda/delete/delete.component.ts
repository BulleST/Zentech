import { MoedaService } from 'src/app/services/moeda.service';
import { Moeda } from 'src/app/models/moeda.model';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';

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
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    modal: Modal = new Modal;
    objeto: Moeda = new Moeda;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private crypto: Crypto,
        private moedaService: MoedaService,
    ) { }



    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '400px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        this.modal.routerBack = ['../../../'];
        this.modal.title = 'Excluir registro';

        var params = this.activatedRoute.params.subscribe(p => {
            if (p['moeda_id']) {
                this.id = this.crypto.decrypt(p['moeda_id']);
                this.modal = this.modalService.addModal(this.modal, 'tipo');
            } else {
                this.modal.routerBack = ['../../'];
                this.voltar();
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

    send() {
        this.loading = true;
        this.erro = '';

        lastValueFrom(this.moedaService.delete(this.id))
            .then(res => {
                this.loading = false;
                if (res.sucesso) {
                    lastValueFrom(this.moedaService.getList());
                    this.voltar();
                } else {
                    this.erro = res.mensagem;
                }
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })
    }
}

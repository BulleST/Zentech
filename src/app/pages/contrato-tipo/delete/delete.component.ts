import { ContratoTipoService } from './../../../services/contrato-tipo.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { BancoService } from 'src/app/services/banco.service';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { ContratoTipo } from 'src/app/models/contrato-tipo.model';

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
    tipoId: number = 0
    objeto: ContratoTipo[]
    nome: string = ''

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private crypto: Crypto,
        private contratoTipoService: ContratoTipoService
    ) { }



    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '400px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        this.modal.routerBack = ['../../..'];
        this.modal.title = 'Excluir registro';

        this.activatedRoute.params.subscribe(params => {
            const encryptedId = params['tipo_id'];
            if (encryptedId) {
                const decryptedId = this.crypto.decrypt(encryptedId);
                this.id = decryptedId

                var obj = this.activatedRoute.params.subscribe(p => {
                    if (p['tipo_id']) {
                        this.id = this.crypto.decrypt(p['tipo_id']);
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'tipo');
                        }, 300);
                    } else {
                        this.voltar();
                    }
                });
                this.subscription.push(obj);
            }
        });
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

        lastValueFrom(this.contratoTipoService.delete(this.id))
            .then(res => {
                this.loading = false;
                if (res.sucesso) {
                    lastValueFrom(this.contratoTipoService.getList());
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

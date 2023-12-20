import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { InstituicaoFinanceiraService } from 'src/app/services/instituicao-financeira.service';
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

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private instituicaoFinanceiraService: InstituicaoFinanceiraService,
        private crypto: Crypto,
    ) { }
    
    ngAfterViewInit(): void {
        this.modal.id =  0;
        this.modal.template =  this.template;
        this.modal.icon =  this.icon;
        this.modal.style =  { 'max-width': '400px', overflow: 'visible' };
        this.modal.activatedRoute =  this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        this.modal.routerBack = ['../../'];
        this.modal.title = 'Excluir registro';

        
        var params = this.activatedRoute.params.subscribe(p => {
            if (p['instituicaoFinanceira_id']) {
                try {
                    this.id = this.crypto.decrypt(p['instituicaoFinanceira_id']);
                    setTimeout(() => {
                        this.modal = this.modalService.addModal(this.modal, 'delete instituicao-financeira');
                    }, 200);
                } catch(e) {
                    this.voltar();
                }
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

   
    voltar() {
        this.modalService.removeModal(this.modal.id);
    }


    send() {
        this.loading = true;
        this.erro = '';

        lastValueFrom(this.instituicaoFinanceiraService.delete(this.id))
            .then(res => {
                this.loading = false;
                if (res.sucesso) {
                    lastValueFrom(this.instituicaoFinanceiraService.getList());
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

import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Moeda } from 'src/app/models/moeda.model';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { MoedaService } from 'src/app/services/moeda.service';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: Moeda = new Moeda;
    erro: string = '';
    loading = false;
    loadingCep = false;
    subscription: Subscription[] = [];
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = false;
    modal: Modal = new Modal;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private crypto: Crypto,
        private toastr: ToastrService,
        private moedaService: MoedaService,

    ) {
    }


    ngAfterViewInit(): void {
        this.modal.id =  0;
        this.modal.template =  this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '600px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['moeda_id']) {
                this.objeto.id = this.crypto.decrypt(x['moeda_id']);
                this.modal.title = 'Editar Moeda';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;
                lastValueFrom(this.moedaService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'moeda');
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })
            } else {
                this.modal.title = 'Cadastrar Moeda';
                this.modal.routerBack = ['../'];
                this.isEditPage = false;
                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'moeda');
                }, 200);
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

    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = 'Campos inválidos';
            return;
        }
        this.erro = '';
        return lastValueFrom(this.moedaService.send(this.objeto))
            .then(res => {
                this.loading = false;
                if (res.sucesso == true) {
                    lastValueFrom(this.moedaService.getList());
                    this.voltar();
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

}

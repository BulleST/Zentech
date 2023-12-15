import { BancoService } from './../../../services/banco.service';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { BancoRequest } from 'src/app/models/banco.model';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: BancoRequest = new BancoRequest;
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
        private bancoService: BancoService,
    ) {
    }


    ngAfterViewInit(): void {
        this.modal.id =  0;
        this.modal.template =  this.template;
        this.modal.icon =  this.icon;
        this.modal.style =  { 'max-width': '600px', overflow: 'visible' };
        this.modal.activatedRoute =  this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['banco_id']) {
                this.objeto.id = this.crypto.decrypt(x['banco_id']);
                this.modal.title = 'Editar Banco';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;
                lastValueFrom(this.bancoService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal);
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })

            } else {

                this.modal.title = 'Cadastrar Banco';
                this.modal.routerBack = ['../'];

                this.isEditPage = false;
                this.objeto.cidade_Id = 5270;
                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal);
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

    send(model: BancoRequest) {
        const cepSemHifen = this.objeto.cep.replace('-', '');
        this.objeto.cep = cepSemHifen
        this.request()
            .then(res => {
                this.loading = false;
                if (res.sucesso == true) {
                    lastValueFrom(this.bancoService.getList());
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

    request() {
        if (this.objeto.id == 0)
            return lastValueFrom(this.bancoService.create(this.objeto));

        return lastValueFrom(this.bancoService.edit(this.objeto));
    }
}

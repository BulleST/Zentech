import { ContratoEventoService } from './../../../services/contrato-evento.service';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { NgForm } from '@angular/forms';
import { ContratoEvento } from 'src/app/models/contrato-evento.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: ContratoEvento = new ContratoEvento;
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
        private contratoEventoService: ContratoEventoService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '450px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        this.route.params.subscribe(params => {
            const eventId = params['evento_id'];

            var teste = this.activatedRoute.params.subscribe(x => {
                const encryptedId = params['evento_id'];
                if (encryptedId) {
                    const decryptedId = this.crypto.decrypt(encryptedId);

                    this.modal.title = 'Editar evento';
                    this.modal.routerBack = ['../../..'];
                    this.isEditPage = true;
                    lastValueFrom(this.contratoEventoService.get(decryptedId))
                        .then(res => {
                            this.objeto = res;
                            setTimeout(() => {
                                this.modal = this.modalService.addModal(this.modal, 'evento');
                            }, 200);
                        })
                        .catch(res => {
                            this.voltar();
                        })
                } else {
                    this.modal.title = 'Cadastrar evento';
                    this.modal.routerBack = ['../'];
                    this.isEditPage = false;
                    setTimeout(() => {
                        this.modal = this.modalService.addModal(this.modal, 'evento');
                    }, 200);
                }
            });
            this.subscription.push(teste);


        });




    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }



    voltar() {
        this.modalService.removeModal(this.modal);

    }

    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = 'Campos inválidos';
            return;
        }
        this.erro = '';
        return lastValueFrom(this.contratoEventoService.send(this.objeto))
            .then(res => {
                this.loading = false;
                if (res.sucesso == true) {
                    lastValueFrom(this.contratoEventoService.getList());
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

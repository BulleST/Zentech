import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { NgForm } from '@angular/forms';
import { Representante } from 'src/app/models/representante.model';
import { RepresentanteService } from 'src/app/services/representante.service';
import { insertOrReplace } from 'src/app/utils/service-list';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    faUserTie = faUserTie;
    objeto: Representante = new Representante;
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
        private representanteService: RepresentanteService,
    ) {
    }


    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '600px' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };


        var params = this.activatedRoute.params.subscribe(x => {
            if (x['representante_id']) {
                this.objeto.id = this.crypto.decrypt(x['representante_id']);
                this.modal.title = 'Editar Representante';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;
                lastValueFrom(this.representanteService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'Representante');
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })
            } else {
                this.modal.title = 'Cadastrar Representante';
                this.modal.routerBack = ['../'];
                this.isEditPage = false;
                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'Representante');
                }, 200);
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

    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = 'Campos inválidos';
            return;
        }
        this.erro = '';
        this.request()
            .then(res => {
                this.loading = false;
                if (res.sucesso == true) {
                    if (res.objeto) {
                        insertOrReplace(this.representanteService, res.objeto)
                    } else {
                        lastValueFrom(this.representanteService.getList());
                    }
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
    request() {
        if (this.objeto.id == 0)
            return lastValueFrom(this.representanteService.create(this.objeto));

        return lastValueFrom(this.representanteService.edit(this.objeto));
    }

}

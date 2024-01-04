import { LogService } from 'src/app/services/log';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { LogRequest } from 'src/app/models/log-model';
import { NgForm, NgModel } from '@angular/forms';
import { CepService } from 'src/app/services/cep-service.service';
import { validateCEP } from 'src/app/utils/validate-cep';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Paises } from 'src/app/models/pais.model';
import { PaisesService } from 'src/app/services/paises.service';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: LogRequest = new LogRequest;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = false;
    modal: Modal = new Modal;

    loadingPaises = true;
    paises: Paises[] = [];

    @ViewChild('cep') cep: NgModel;
    cepPreenchido = false;
    executaCEP: boolean = true;
    loadingCep = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private crypto: Crypto,
        private toastr: ToastrService,
        private logService: LogService,
        private cepService: CepService,
        private paisesService: PaisesService
    ) {
        lastValueFrom(this.paisesService.getList())
            .then(res => {
                this.loadingPaises = false;
                this.paises = res;
            });
    }


    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '650px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['log_id']) {
                this.objeto.id = this.crypto.decrypt(x['log_id']);
                this.modal.title = 'Editar Log';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;
                lastValueFrom(this.logService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        // this.objeto.cep = this.objeto.cep.toString().padStart(8, '0') as unknown as number;

                        // this.paisChange();

                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'banco');
                        }, 200);
                    })
                    .catch((res: any) => {
                        this.voltar();
                    })

            } else {

                this.modal.title = 'Cadastrar Log';
                this.modal.routerBack = ['../'];
                this.isEditPage = false;



                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'banco');
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

        // this.request()
        //     .then(res => {
        //         this.loading = false;
        //         if (res.sucesso == true) {
        //             lastValueFrom(this.logService.getList());
        //             this.voltar();
        //         } else {
        //             this.erro = res.mensagem;
        //             this.toastr.error(res.mensagem);
        //         }
        //     })
        //     .catch(res => {
        //         this.loading = false;
        //         this.erro = getError(res);
        //     })

    }

    // request() {
    //     if (this.objeto.id == 0)
    //         return lastValueFrom(this.logService.create(this.objeto));

    //     return lastValueFrom(this.logService.edit(this.objeto));
    // }
}

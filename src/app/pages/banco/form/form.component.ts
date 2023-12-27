import { BancoService } from './../../../services/banco.service';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { BancoRequest } from 'src/app/models/banco.model';
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
    objeto: BancoRequest = new BancoRequest;
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
        private bancoService: BancoService,
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
            if (x['banco_id']) {
                this.objeto.id = this.crypto.decrypt(x['banco_id']);
                this.modal.title = 'Editar Banco';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;
                lastValueFrom(this.bancoService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        this.objeto.cep = this.objeto.cep.toString().padStart(8, '0') as unknown as number;

                        this.paisChange();

                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'banco');
                        }, 200);
                    })
                    .catch((res: any) => {
                        this.voltar();
                    })

            } else {

                this.modal.title = 'Cadastrar Banco';
                this.modal.routerBack = ['../'];
                this.isEditPage = false;
                this.objeto.pais_Id = 30;


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

    paisChange() {
        this.executaCEP = this.objeto.pais_Id == 30;
        this.cepPreenchido = false;
    }

    limpaEndereco() {
        this.objeto.cep = '' as unknown as number;
        this.objeto.bairro = '';
        this.objeto.cidade = '';
        this.objeto.numero = '';
        this.objeto.complemento = '';
        this.objeto.logradouro = '';
    }


    buscaCEP(input: NgModel) {
        if (this.executaCEP == true) {
            this.loadingCep = true;
            input.control.setErrors(null);
            this.cepPreenchido = false


            if (!this.validaCEP(input)) {
                this.toastr.error('CEP inválido.');
                input.control.setErrors({ invalid: true })
                return;
            }

            lastValueFrom(this.cepService.buscar(this.objeto.cep))
                .then(data => {
                    if (data.erro == true) {
                        this.toastr.error('CEP inválido.');
                        input.control.setErrors({ invalid: true })
                        return;
                    } else {
                        this.objeto.logradouro = data.logradouro;
                        this.objeto.bairro = data.bairro
                        this.objeto.cidade = data.localidade;
                        this.objeto.estado = data.uf;
                        this.cepPreenchido = true
                    }
                })
                .catch(res => {
                    this.toastr.error('Não foi possível carregar CEP')
                })
                .finally(() => this.loadingCep = false)

        }


    }

    validaCEP(input: NgModel) {
        this.loadingCep = true;
        if (!this.objeto.cep.toString().trim()) {
            input.control.setErrors({ required: true });
            this.loadingCep = false;
            return false
        }
        else if (this.objeto.cep.toString().length < 8) {
            input.control.setErrors({ invalid: true });
            this.loadingCep = false;
            return false;
        } else if (!validateCEP(this.objeto.cep)) {
            input.control.setErrors({ invalid: true });
            this.loadingCep = false;
            return false;
        } else {
            this.loadingCep = false;
            input.control.setErrors(null);
            return true;
        }
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

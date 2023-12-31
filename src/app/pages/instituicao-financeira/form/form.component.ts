import { InstituicaoFinanceiraService } from 'src/app/services/instituicao-financeira.service';
import { InstituicaoFinanceiraRequest } from '../../../models/instituicao-financeira.model';
import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { NgForm, NgModel } from '@angular/forms';
import { CepService } from 'src/app/services/cep-service.service';
import { validateCEP } from 'src/app/utils/validate-cep';
import { validateCNPJ } from 'src/app/utils/validate-cnpj';
import { Paises } from 'src/app/models/pais.model';
import { PaisesService } from 'src/app/services/paises.service';
import { insertOrReplace } from 'src/app/utils/service-list';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy, AfterViewInit {
    objeto: InstituicaoFinanceiraRequest = new InstituicaoFinanceiraRequest;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = true;

    modal: Modal = new Modal;

    loadingPaises = true;
    paises: Paises[] = [];

    loadingCNPJ = false;
    @ViewChild('cnpj') cnpj: NgModel;
    
    @ViewChild('cep') cep: NgModel;
    cepPreenchido = false;
    executaCEP: boolean = true;
    loadingCep = false;

    
    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private instituicaoFinanceiraService: InstituicaoFinanceiraService,
        private crypto: Crypto,
        private toastr: ToastrService,
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
        this.modal.style = { 'max-width': '800px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['instituicaoFinanceira_id']) {
                this.objeto.id = this.crypto.decrypt(x['instituicaoFinanceira_id']);
                this.modal.title = 'Editar Instituição Financeira';
                this.modal.routerBack = ['../../'];

                this.isEditPage = true;
                lastValueFrom(this.instituicaoFinanceiraService.get(this.objeto.id))
                    .then(res => {
                        // res.codigoRegistro = res.codigoRegistro.toString().padStart(14, '0') as unknown as number;
                        // res.cep = res.cep.toString().padStart(8, '0') as unknown as number;
                        this.objeto = res;
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'instituicao financeira');
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })

            } else {
                this.modal.title = 'Cadastrar Instituição Financeira';
                this.modal.routerBack = ['../'];
                this.isEditPage = false;
                this.objeto.pais_Id = 30;

                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'instituicao financeira');
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

    validaCNPJ(input: NgModel) {
        this.erro = '';
        this.loadingCNPJ = true;

        if (this.objeto.codigoRegistro.toString().length < 14) {
            input.control.setErrors({ invalid: true });
            this.loadingCNPJ = false;
            return false;
        }

        if (!this.objeto.codigoRegistro || parseInt(this.objeto.codigoRegistro) == 0) {
            input.control.setErrors({ required: true });
            this.loadingCNPJ = false;
            return false;
        }

        var valid = validateCNPJ(this.objeto.codigoRegistro);
        if (!valid) {
            input.control.setErrors({ invalid: true });
            this.loadingCNPJ = false;
            return false;

            return;
        } else {
            this.loadingCNPJ = false;
            input.control.setErrors(null);
            return true;
        }
        return;
    }

    send(form: NgForm) {
        this.erro = '';
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = 'Campos inválidos';
            return;
        }

        // if (!this.validaCNPJ(this.cnpj)) {
        //     this.toastr.error('CNPJ inválido');
        //     this.erro = 'CNPJ inválido';
        //     return;
        // }
        // if (!this.validaCEP(this.cep)) {
        //     this.toastr.error('CEP inválido');
        //     this.erro = 'CEP inválido';
        //     return;
        // }

        return lastValueFrom(this.instituicaoFinanceiraService.post(this.objeto))
            .then(res => {
                if (res.sucesso != false) {
                    if (res.objeto) {
                        insertOrReplace(this.instituicaoFinanceiraService, res.objeto)
                    } else {
                        lastValueFrom(this.instituicaoFinanceiraService.getList());
                    }
                    this.voltar();
                } else {
                    this.erro = res.mensagem;
                }
                this.loading = false;
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })
    }
}

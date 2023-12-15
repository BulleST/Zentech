import { InstituicaoFinanceiraService } from 'src/app/services/instituicao-financeira.service';
import { InstituicaoFinanceiraRequest, InstituicaoFinanceiraStatus } from '../../../models/instituicao-financeira.model';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { ModalUtils } from 'src/app/utils/modal';
import { CepService } from 'src/app/services/cep-service.service';

import { InstituicaoFinanceiraList } from '../../../models/instituicao-financeira.model';
import { Cidades } from 'src/app/models/banco.model';
import { CidadesService } from 'src/app/services/cidades.service';
import { SelectItem } from 'primeng/api';
import { NgModel } from '@angular/forms';
import { validateCnpj } from 'src/app/utils/validate-cnpj';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: InstituicaoFinanceiraRequest = new InstituicaoFinanceiraRequest;
    teste: InstituicaoFinanceiraList[]
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    routeBackOptions: any;
    cidade_id: number = 0
    status: InstituicaoFinanceiraStatus[] = [];
    loadingStatus = true;
    instituicoes: InstituicaoFinanceiraList[] = [];
    loadingPessoa = true;
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = true;
    id: number = 0;
    numEndereco: any;
    localidade: any;
    bairro: any;
    uf: any;
    ddd: any;
    item: any = '';
    cidades: Cidades[] = []
    cidadesid = this.cidades
    selectedCity: any;
    cidadesDropdown: SelectItem[] = [];

    cepPreenchido: boolean = false;
    larguraResponsiva: number = 50;
    loadingCNPJ = false;


    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalUtils,
        private instituicaoFinanceiraService: InstituicaoFinanceiraService,
        private crypto: Crypto,
        private toastr: ToastrService,
        private cepService: CepService,
        private cidadesService: CidadesService
    ) {




        this.routeBackOptions = { relativeTo: this.activatedRoute };

        lastValueFrom(this.cidadesService.getCidade())
            .then(res => {
                this.loadingStatus = false;
                this.cidades = res;
            });

        console.log("linha63", this.instituicaoFinanceiraService.getList())
        lastValueFrom(this.instituicaoFinanceiraService.getList()) //n
            .then(res => {
                this.loadingPessoa = false;
                this.instituicoes = res;
            });


    }



    buscaCEP() {
        this.cepService.buscar(this.objeto.cep).subscribe((data) => {
            this.objeto.cep = data.cep;
            // this.objeto.bairro = data.bairro
            var logradouro = data.logradouro + ", " + data.localidade + " - " + data.uf
            this.objeto.logradouro = logradouro
            if (this.objeto.cep.length == 9) {

                this.cepPreenchido = true
            } // Verifica se o CEP possui 8 dígitos
            // console.log(this.objeto.logradouro);
        });

        if (this.objeto.cep.length === 8) { // Verifica se o CEP possui 8 dígitos
            this.cepService.buscar(this.objeto.cep).subscribe((data: any) => {


                // Define cepPreenchido como true para desabilitar os outros campos
                this.cepPreenchido = true;
            });
        }

    }

    blur(event: any) {
        if (this.isEditPage == false) {
            this.buscaCEP();
            if (this.objeto.cep.length === 9) { }
            console.log(this.buscaCEP);
            console.log('res', this.isEditPage)
        }
        else {
            console.log('test')
            console.log('res', this.isEditPage)
        }
    }



    ngAfterViewInit(): void {
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '600px', overflow: 'visible' })
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);
        var params = this.activatedRoute.params.subscribe(x => {
            if (x['id']) {
                this.objeto.id = this.crypto.decrypt(x['id']);
                var teste = lastValueFrom(this.instituicaoFinanceiraService.get(this.id))
                this.modal.title.next('Editar Instituição Financeira')
                this.modal.routerBack.next(['../../']);
                this.isEditPage = true;
                // this.objeto = this.paraedit
                console.log('olaa', this.objeto, this.objeto.id)
                lastValueFrom(this.instituicaoFinanceiraService.get(this.objeto.id))
                    .then(res => {

                        console.log('certo')

                        this.objeto = res;
                        this.cidade_id = this.objeto.cidade_Id;
                        setTimeout(() => {
                            this.modal.setOpen(true);
                        }, 200);
                    })
                    .catch(res => {
                        console.log('errado')
                        this.voltar();
                    })

            } else {
                this.modal.title.next('Cadastrar Instituição Financeira');
                this.modal.routerBack.next(['../']);
                this.isEditPage = false;
                setTimeout(() => {
                    this.modal.setOpen(true);
                }, 200);
            }
        });
        this.subscription.push(params);
    }





    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar(this.modal.routerBack.value, this.routeBackOptions);
    }

    // send() {
    //   this.loading = true;
    //   this.erro = '';
    //   lastValueFrom(this.instituicaoFinanceiraService.post(this.objeto))
    //     .then(res => {
    //       if (res.successo != false) {
    //         lastValueFrom(this.instituicaoFinanceiraService.getList());
    //         this.voltar();
    //       } else {
    //         this.erro = res.mensagem;
    //         this.toastr.error(res.mensagem);
    //         console.log('erro1')
    //       }
    //       this.loading = false;
    //     })
    //     .catch(res => {
    //       this.loading = false;
    //       this.erro = getError(res);
    //       console.log('erro2')
    //     })

    // }
    validaCNPJ(input: NgModel) {
        this.erro = '';
        this.loadingCNPJ = true;

        if (!this.objeto.cnpj || this.objeto.cnpj == 0) {
            setTimeout(() => {
                input.control.setErrors({ required: true });
            }, 300);
            this.loadingCNPJ = false;
            return;
        }

        var valid = validateCnpj(this.objeto.cnpj);
        if (!valid) {
            setTimeout(() => {
                input.control.setErrors({ invalid: true });
            }, 300);
            this.loadingCNPJ = false;
            return;
        } else {
            this.loadingCNPJ = false;
            setTimeout(() => {
                input.control.setErrors(null);
            }, 300);
            this.erro = '';
        }
        return;
    }

    send() {

        const cepSemHifen = this.objeto.cep.replace('-', '');
        this.objeto.cep = cepSemHifen
        const cnpj: string = this.objeto.cnpj.toString();
        const cnpjsemHifen = cnpj.replace(/[./-]/g, '');
        const numeroCnpj = Number(cnpjsemHifen);
        this.objeto.cnpj = numeroCnpj

        return lastValueFrom(this.instituicaoFinanceiraService.post(this.objeto))
            .then(res => {
                if (res.sucesso != false) {
                    lastValueFrom(this.instituicaoFinanceiraService.getList());
                    this.voltar();
                } else {
                    this.erro = res.mensagem;
                    this.toastr.error(res.mensagem);
                }
                this.loading = false;
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }



}

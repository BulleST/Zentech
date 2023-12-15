import { BancoService } from './../../../services/banco.service';
import { InstituicaoFinanceiraStatus } from '../../../models/instituicao-financeira.model';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal';
import { CepService } from 'src/app/services/cep-service.service';
import { BancoList, Cidades } from 'src/app/models/banco.model';
import { BancoRequest } from 'src/app/models/banco.model';
import { NgModel } from '@angular/forms';
import { CidadesService } from 'src/app/services/cidades.service';
import { validateCEP } from 'src/app/utils/validate-cep';


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
    routeBackOptions: any;
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    @ViewChild('cep') cep: NgModel;
    isEditPage = true;
    cepCarregado = false;
    cepPreenchido = false;

    cidades: Cidades[] = [];
    loadingCidades = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: Modal,
        private crypto: Crypto,
        private toastr: ToastrService,
        private cepService: CepService,
        private bancoService: BancoService,
        private cidadeService: CidadesService
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };
        lastValueFrom(this.cidadeService.getCidade())
        .then(res => {
            this.cidades = res;
            this.loadingCidades = false;
        })
    }


    ngAfterViewInit(): void {
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '600px', overflow: 'visible' })
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['banco_id']) {
                this.objeto.id = this.crypto.decrypt(x['banco_id']);
                this.modal.title.next('Editar Banco')
                this.modal.routerBack.next(['../../']);
                this.isEditPage = true;
                lastValueFrom(this.bancoService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        setTimeout(() => {
                            this.buscaCEP(this.cep)
                            this.modal.setOpen(true);
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })

            } else {
                this.modal.title.next('Cadastrar Banco');
                this.modal.routerBack.next(['../']);
                this.isEditPage = false;
                this.objeto.cidade_Id = 5270;
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

    
    buscaCEP(input: NgModel) {
        this.loadingCep = true;
        input.control.setErrors(null);

        if (!this.validaCep(input)) {
            this.toastr.error('CEP inválido.');
            input.control.setErrors({invalid: true})
            this.cepCarregado = false;
            return;
        }
        this.cepCarregado = false;
        this.cepPreenchido = false

        lastValueFrom( this.cepService.buscar(this.objeto.cep))
        .then(data => {
            if (data.erro == true) {
                this.toastr.error('CEP inválido.');
                input.control.setErrors({invalid: true})
                this.cepCarregado = false;
                this.cepPreenchido = false
                return;

            } else {
                this.objeto.logradouro = data.logradouro + " , " + data.bairro + " - " + data.uf;

                var localidade = data.localidade.toLowerCase();

                var cidade = this.cidades.find(x => {
                    var cid = x.nomeCidade.toLowerCase()
                    var uf = x.sigla.toLowerCase();
                    return (cid == localidade || localidade.includes(cid) || cid.includes(localidade)) && data.uf.toLowerCase() == uf;
                })
                if (cidade) {
                    this.objeto.cidade_Id = cidade.id;
                }
                this.cepCarregado = false;
                this.cepPreenchido = false

                this.cepCarregado = true
            }
        })
        .catch(res => {
            this.toastr.error('Não foi possível carregar CEP')
            this.cepCarregado = false;
        })
        .finally(() => this.loadingCep = false)

    }

    validaCep(input: NgModel) {
		this.loadingCep = true;

        if (!this.objeto.cep.trim()) {
            setTimeout(() => {
                input.control.setErrors({ required: true });
            }, 300);
			this.loadingCep = false;
            return false
        }
        else if (this.objeto.cep.trim().length != 8) {
            setTimeout(() => {
                input.control.setErrors({ invalid: true });
            }, 300);
			this.loadingCep = false;
            return false
        } else if (!validateCEP(this.objeto.cep)) {
            setTimeout(() => {
                input.control.setErrors({ invalid: true });
            }, 300);
			this.loadingCep = false;
            return false;
        } else {
            this.loadingCep = false;
            setTimeout(() => {
                input.control.setErrors(null);
            }, 300);
            return true;
        }
    }

    
    voltar() {
        this.modal.voltar(this.modal.routerBack.value, this.routeBackOptions);
    }

    send() {
        const cepSemHifen = this.objeto.cep.replace('-', '');
        this.objeto.cep = cepSemHifen
        this.request()
            .then(res => {
                if (res.sucesso == true) {
                    lastValueFrom(this.bancoService.getList());
                    // lastValueFrom(this.pessoaSaldoService.getList(this.objeto.pessoa_Id));
                    // lastValueFrom(this.pessoaOperacaoService.getListById(this.objeto.pessoa_Id));
                    // lastValueFrom(this.pessoaOperacaoService.getList());
                    this.voltar();
                    console.log('certo')
                    console.log('rese', this.objeto.cidade_Id)
                } else {
                    this.erro = res.mensagem;
                    this.toastr.error(res.mensagem);
                    console.log('certo n')
                }
                this.loading = false;
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
                console.log('erro')
            })

    }

    request() {
        if (this.objeto.id == 0)
            return lastValueFrom(this.bancoService.create(this.objeto));

        return lastValueFrom(this.bancoService.edit(this.objeto));
    }
}

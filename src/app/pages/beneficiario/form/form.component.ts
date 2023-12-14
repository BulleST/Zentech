import { PaisesService } from './../../../services/paises.service';
import { BeneficiarioService } from './../../../services/beneficiario.service';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal';
import { Response } from 'src/app/helpers/request-response.interface';
import { CepService } from 'src/app/services/cep-service.service';
import { BancoList } from 'src/app/models/banco.model';
import { data } from 'jquery';
import { BeneficiarioRequest, BeneficiarioList } from 'src/app/models/beneficiario.model';
import { CidadesService } from 'src/app/services/cidades.service';
import { Cidades } from 'src/app/models/banco.model';
import { BancoService } from 'src/app/services/banco.service';
import { Paises } from 'src/app/models/pais.model';
import { SelectItem } from 'primeng/api';
import { NgModel } from '@angular/forms';
@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: BeneficiarioRequest = new BeneficiarioRequest;
    erro: string = '';
    loading = false;
    loadingCep = false;
    subscription: Subscription[] = [];
    routeBackOptions: any;
    
    loadingBanco = true;
    bancos: BancoList[];

    loadingCidades = true;
    cidades: Cidades[];
    cidadesGrouped: any[] = [];

    loadingBeneficiario = true;
    beneficiarios: BeneficiarioList[] = [];
    
    loadingPaises = true;
    paises: Paises[];


    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    @ViewChild('cep') cepInput: NgModel;

    isEditPage = true;
    cepCarregado = false;
    

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: Modal,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private toastr: ToastrService,
        private cepService: CepService,
        private beneficiarioService: BeneficiarioService,
        private cidadesService: CidadesService,
        private bancoService: BancoService,
        private paisesService: PaisesService
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };
        lastValueFrom(this.bancoService.getList())
            .then(res => {
                this.loadingBanco = false;
                this.bancos = res;
            });
        lastValueFrom(this.cidadesService.getCidade())
            .then(res => {
                this.loadingCidades = false;
                this.cidades = res;
                this.groupCidades();
            });
        lastValueFrom(this.paisesService.getPais())
            .then(res => {
                this.loadingPaises = false;
                this.paises = res;
            });

        lastValueFrom(this.beneficiarioService.getList()) //n
            .then(res => {
                this.loadingBeneficiario = false;
                this.beneficiarios = res;
            });

    }


    ngAfterViewInit(): void {

        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '600px', overflow: 'visible' })
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['id']) {
                this.objeto.id = this.crypto.decrypt(x['id']);
                this.modal.title.next('Editar Beneficiário')
                this.modal.routerBack.next(['../../']);
                this.isEditPage = true;
                lastValueFrom(this.beneficiarioService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        setTimeout(() => {
                            this.modal.setOpen(true);
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })


            } else {
                this.modal.title.next('Cadastrar Beneficiário');

                this.objeto.pais_Id = 30;
                this.objeto.cidade_Id = 5270;

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

    buscaCEP() {
        if (!this.validaCep()) {
            this.toastr.error('CEP inválido.');
            this.cepInput.control.setErrors({invalid: true})
            this.cepCarregado = false;
            return;
        }
        this.loadingCep = true;
        this.cepInput.control.setErrors(null);

        lastValueFrom( this.cepService.buscar(this.objeto.cep))
        .then(data => {
            this.objeto.logradouro = data.logradouro + " , " + data.bairro + " - " + data.uf;
            this.cepCarregado = true
        })
        .catch(res => {
            this.toastr.error('Não foi possível carregar CEP')
            this.cepCarregado = false;
        })
        .finally(() => this.loadingCep = false)

    }

    validaCep() {
        if (!this.objeto.cep.trim()) {
            return false
        }
        if (this.objeto.cep.trim().length != 8) {
            return false
        }
        return true
    }

    blur() {
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


    voltar() {
        this.modal.voltar(this.modal.routerBack.value, this.routeBackOptions);
    }

    groupCidades() {
        var list = this.groupBy(this.cidades, (cid: any) => cid.estado_Id);
        this.cidadesGrouped = list;
        console.log(list)
    }


    groupBy(list: any[], keyGetter: any) {
        const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                map.set(key, [item]);  
            } else {
                collection.push(item);
             }
            });


            var a: any[] = [];
            map.forEach((item, key) => {
            var cidade = this.cidades.find(x => x.estado_Id = key)!;
            a.push({
                estado_Id: key,
                sigla: cidade.sigla,
                nomeEstado: cidade.nomeEstado,
                cidades: item,
            })
            
        })
        console.log(a)


        return a;
    }

    send() {
        const cepSemHifen = this.objeto.cep.replace('-', '');
        this.objeto.cep = cepSemHifen
        console.log(this.objeto)
        this.loading = true;
        this.erro = '';

        return lastValueFrom(this.beneficiarioService.post(this.objeto))
            .then(res => {
                if (res.successo != false) {
                    lastValueFrom(this.beneficiarioService.getList());
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

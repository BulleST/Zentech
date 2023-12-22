import { PaisesService } from './../../../services/paises.service';
import { BeneficiarioService } from './../../../services/beneficiario.service';

import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { BeneficiarioList, BeneficiarioRequest } from 'src/app/models/beneficiario.model';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { BancoList } from 'src/app/models/banco.model';
import { CepService } from 'src/app/services/cep-service.service';
import { CidadesService } from 'src/app/services/cidades.service';
import { BancoService } from 'src/app/services/banco.service';
import { NgForm, NgModel } from '@angular/forms';
import { Paises } from 'src/app/models/pais.model';
import { Cidades } from 'src/app/models/cidade.model';
import { validateCEP } from 'src/app/utils/validate-cep';
import { validateCNPJ } from 'src/app/utils/validate-cnpj';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: BeneficiarioRequest = new BeneficiarioRequest;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    isEditPage = true;
    modal: Modal = new Modal;

    cepCarregado = false;
    loadingCep = false;
    loadingCNPJ = false;

    loadingBanco = true;
    bancos: BancoList[];
    cepPreenchido= false
    loadingCidades = true;
    cidades: Cidades[];
    cidadesGrouped: any[] = [];

    loadingBeneficiario = true;
    beneficiarios: BeneficiarioList[] = [];

    loadingPaises = true;
    paises: Paises[] = [];

    @ViewChild('cep') cep: NgModel;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private crypto: Crypto,
        private toastr: ToastrService,
        private beneficiarioService: BeneficiarioService,
        private cepService: CepService,
        private cidadesService: CidadesService,
        private bancoService: BancoService,
        private paisesService: PaisesService
    ) {

        console.log('beneficiario')

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

        lastValueFrom(this.beneficiarioService.getList())
            .then(res => {
                this.loadingBeneficiario = false;
                this.beneficiarios = res;
            });
    }
    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '600px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        var params = this.activatedRoute.params.subscribe(x => {
            if (x['beneficiario_id']) {
                this.objeto.id = this.crypto.decrypt(x['beneficiario_id']);

                this.modal.title = 'Editar Beneficiário';
                this.modal.routerBack = ['../../'];

                this.isEditPage = true;
                lastValueFrom(this.beneficiarioService.get(this.objeto.id))
                    .then(res => {
                        res.cnpj = res.cnpj.toString().padStart(14, '0') as unknown as number;
                        res.cep = res.cep.toString().padStart(8, '0');
                        this.objeto = res;
                        setTimeout(() => {
                            this.buscaCEP(this.cep)
                        }, 500);
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'beneficiario');
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })
            } else {
                this.modal.title = 'Cadastrar Beneficiário';
                this.modal.routerBack = ['../'];
                this.isEditPage = false;
                this.objeto.pais_Id = 30;
                this.objeto.cidade_Id = 5270;

                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'beneficiario');
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


    buscaCEP(input: NgModel) {
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
                  this.cepPreenchido = true

              }
          })
          .catch(res => {
              this.toastr.error('Não foi possível carregar CEP')
          })
          .finally(() => this.loadingCep = false)

  }

    validaCEP(input: NgModel) {
      this.loadingCep = true;
      if (!this.objeto.cep.trim()) {
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

    if (this.objeto.cnpj.toString().length < 14) {
        input.control.setErrors({ invalid: true });
        this.loadingCNPJ = false;
        return false;
    }

    if (!this.objeto.cnpj || this.objeto.cnpj == 0) {
        input.control.setErrors({ required: true });
        this.loadingCNPJ = false;
        return false;
    }

    var valid = validateCNPJ(this.objeto.cnpj);
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


    groupCidades() {
        var list = this.groupBy(this.cidades, (cid: any) => cid.estado_Id);
        this.cidadesGrouped = list;
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
        return a;
    }
    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = 'Campos inválidos';
            return;
        }
        this.erro = '';
        this.loading = true;
        this.erro = '';

        return lastValueFrom(this.beneficiarioService.post(this.objeto))
            .then(res => {
                if (res.sucesso != false) {
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

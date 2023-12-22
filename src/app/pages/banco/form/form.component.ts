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
import { CidadesService } from 'src/app/services/cidades.service';
import { validateCEP } from 'src/app/utils/validate-cep';
import { Cidades } from 'src/app/models/cidade.model';
import { Modal, ModalService } from 'src/app/services/modal.service';


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
    cepPreenchido = false;
    cidades: Cidades[] = [];
    loadingCidades = false;

    @ViewChild('cep') cep: NgModel;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private crypto: Crypto,
        private toastr: ToastrService,
        private bancoService: BancoService,
        private cepService: CepService,
        private cidadeService: CidadesService
    ) {
        console.log('banco')
        lastValueFrom(this.cidadeService.getCidade())
            .then(res => {
                this.cidades = res;
                this.loadingCidades = false;
            })
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
                        this.objeto.cep = this.objeto.cep.toString().padStart(8, '0');
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'banco');
                        }, 200);
                    })
                    .catch(res => {
                        console.log(res)
                        this.voltar();
                    })

            } else {

                this.modal.title = 'Cadastrar Banco';
                this.modal.routerBack = ['../'];

                this.isEditPage = false;
                this.objeto.cidade_Id = 5270;
                setTimeout(() => {
                    console.log('oi')
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

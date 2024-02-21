import { validateCPF } from 'src/app/utils/validate-cpf';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { NgForm } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { insertOrReplace } from 'src/app/utils/service-list';
import { NgModel } from '@angular/forms';
import { validateRG } from 'src/app/utils/validate-rg';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: Empresa = new Empresa;
    erro: string = '';
    loading = false;
    loadingCep = false;
    subscription: Subscription[] = [];
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = false;
    modal: Modal = new Modal;

    fileUploaded = false;
    fileSrc = '';
    fileName = '';
    fileLoading = false;



    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private crypto: Crypto,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
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
            if (x['empresa_id']) {
                this.objeto.id = this.crypto.decrypt(x['empresa_id']);
                this.modal.title = 'Editar Empresa';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;
                lastValueFrom(this.empresaService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;

                        this.fileSrc = res.logoDataUri;
                        this.fileLoading = false;
                        this.fileName = '';
                        this.fileUploaded = true;


                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'Empresa');
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })
            } else {
                this.modal.title = 'Cadastrar Empresa';
                this.modal.routerBack = ['../'];
                this.isEditPage = false;
                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'Empresa');
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

    fileChange(event: any) {
        var file = event.target.files[0] as File;

        this.importarNovamente();

        if (file) {
            this.fileLoading = true;
            var reader = new FileReader();
            var c = this;
            reader.onload = function(e) {
                var src = e.target?.result as string;
                c.fileSrc = src;
                c.fileUploaded = true;
                c.fileLoading = false;
                c.fileName = file.name;
                c.objeto.logoDataUri = src;
            }
            reader.onerror = function(e) {
                c.fileLoading = false;
                c.toastr.error('Não foi possível realizar upload');
            }

            var a = reader.readAsDataURL(file)

        } else {
            this.toastr.error('Selecione uma imagem para salvar.')
        }
    }


    validaCPF(input: NgModel, doc: number) {
      if (!input) {
          return;
      }
      if (!doc || doc == 0) {
          input.control.setErrors({ required: true });
          return;
      }

      if (input.name == 'cpfSocioDiretor') {
          var valid = validateCPF(doc)
          if (!valid) {
              input.control.setErrors({ invalid: true });
              return;
          }
      }

      var lista: any[] = []
      var existe = lista.filter(x => x.cpf == doc);
      if (existe.length > 0) {
          input.control.setErrors({ jaCadastrado: true });
          return;
      }

      input.control.setErrors(null);
  }


  validaRG(input: NgModel, doc: number) {
    if (!input) {
        return;
    }
    if (!doc || doc == 0) {
        input.control.setErrors({ required: true });
        return;
    }

    if (input.name == 'rgSocioDiretor') { // Supondo que o nome do campo para o RG seja 'rgSocioDiretor'
        var valid = validateRG(doc); // Assumindo que você tenha uma função chamada validateRG para validar o RG
        if (!valid) {
            input.control.setErrors({ invalid: true });
            return;
        }
    }

    var lista: any[] = []; // Supondo que esta lista contenha os registros existentes
    var existe = lista.filter(x => x.rg == doc);
    if (existe.length > 0) {
        input.control.setErrors({ jaCadastrado: true });
        return;
    }

    input.control.setErrors(null);
}


    importarNovamente() {
        this.fileUploaded = false;
        this.fileSrc = '';
        this.fileName = '';
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
                        insertOrReplace(this.empresaService, res.objeto)
                    } else {
                        lastValueFrom(this.empresaService.getList());
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
            return lastValueFrom(this.empresaService.create(this.objeto));

        return lastValueFrom(this.empresaService.edit(this.objeto));
    }

}

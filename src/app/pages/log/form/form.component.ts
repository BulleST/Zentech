import { UsuarioService } from 'src/app/services/user.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { LogService } from 'src/app/services/log-service';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { LogRequest } from 'src/app/models/log-model';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Empresa } from 'src/app/models/empresa.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
  obj: LogRequest = new LogRequest;
  erro: string = '';
  loading = false;
  subscription: Subscription[] = [];
  @ViewChild('template') template: TemplateRef<any>
  @ViewChild('icon') icon: TemplateRef<any>
  isEditPage = false;
  modal: Modal = new Modal;

  loadingUsuarios = true;
  usuarios: Usuario[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private crypto: Crypto,
    private toastr: ToastrService,
    private logService: LogService,
    private usuarioService: UsuarioService
  ) {

      lastValueFrom(this.usuarioService.getList())
      .then(res => {
        this.loadingUsuarios = false;
        this.usuarios = res;
      });

      var usuarios = this.usuarioService.list.subscribe(res => this.usuarios = res);
      this.subscription.push(usuarios);
  }


  ngAfterViewInit(): void {
    this.modal.id = 0;
    this.modal.template = this.template;
    this.modal.icon = this.icon;
    this.modal.style = { 'max-width': '650px', overflow: 'visible' };
    this.modal.activatedRoute = this.activatedRoute;
    this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

    var params = this.activatedRoute.params.subscribe(x => {
      if (x['log-acoes_id']) {
        this.obj.id = this.crypto.decrypt(x['log-acoes_id']);
        this.modal.title = 'Detalhes:'.concat(this.obj.objeto);
        this.modal.routerBack = ['../../'];
        this.isEditPage = true;
        lastValueFrom(this.logService.get(this.obj.id))
          .then(res => {
            this.obj = res;
            this.modal.title = 'Detalhes: ' + (this.obj.acao);
            const obj = JSON.parse(this.obj.objeto);
            const entries = Object.entries(obj);
            const inputs = entries.map(([key, value]) => ({
              key,
              value,
              class: key === 'Logradouro' ? 'col-5' : 'col-4'
            }));

            this.obj.inputs = inputs;

            setTimeout(() => {
              this.modal = this.modalService.addModal(this.modal, 'log-acoes');
            }, 200);
          })
          .catch((res: any) => {
            this.voltar();
          })

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


}

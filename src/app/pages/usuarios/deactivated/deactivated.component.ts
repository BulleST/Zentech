import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AccountService } from 'src/app/services/account.service';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/user.service';
import { Crypto } from 'src/app/utils/crypto';

@Component({
    selector: 'app-deactivated',
    templateUrl: './deactivated.component.html',
    styleUrls: ['./deactivated.component.css']
})
export class DeactivatedComponent {
    objeto: Usuario = new Usuario;
    loading = false;
    erro: string = '';
    subscription: Subscription[] = [];
    modal: Modal = new Modal;
    @ViewChild('template') template: TemplateRef<any>;
    // @ViewChild('icon') icon: TemplateRef<any>;
    podeAtivar = true;
    habilitar = false;
    account?: Account;
    isUser = false;

    constructor(
        private usuarioService: UsuarioService,
        private modalService: ModalService,
        private activatedRoute: ActivatedRoute,
        private crypto: Crypto,
        private accountService: AccountService,
        private toastr: ToastrService
    ) {
        this.account = this.accountService.accountValue;
    }
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    ngAfterViewInit(): void {

        this.modal.id = 0;
        this.modal.template = this.template;
        // this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '400px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['usuario_id']) {
                this.objeto.id = this.crypto.decrypt(x['usuario_id']);

                this.isUser = this.account?.id == this.objeto.id
                this.modal.routerBack = ['../../'];
                
                lastValueFrom(this.usuarioService.get(this.objeto.id))
                .then(res => {
                        this.objeto = res;
                        this.habilitar = !(this.objeto.dataDesativado == null || this.objeto.dataDesativado == undefined);
                        this.objeto.ativo = !this.habilitar;
                        var account = this.accountService.accountValue;
                        if (this.habilitar) {
                            this.modal.title = 'Habilitar Usuário';
                        } else {
                            this.modal.title = 'Desabilitar Usuário';
                        }

                        if (account?.perfilAcesso_Id == Role.Master && res.perfilAcesso_Id == Role.Admin) {
                            this.podeAtivar = false;
                            var a = this.habilitar ? 'habilitar' : 'desabilitar';
                            this.toastr.info(`Você não tem permissão para ${a} uma conta administradora.`);
                            this.erro = `Você não tem permissão para ${a} uma conta administradora.`;
                        }
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'usuario');
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);
    }

    voltar() {
        this.modalService.removeModal(this.modal);
    }
    send() {
        this.loading = true;
        this.erro = '';
        // Enviar para a API
        lastValueFrom(this.usuarioService.deactivated(this.objeto.id, this.habilitar))
            .then(async res => {
                if (this.habilitar && this.isUser) {
                    this.accountService.logout();
                }
                var list = await lastValueFrom(this.usuarioService.getList());

                this.voltar();
            })
            .finally(() => this.loading = false)
    }

}

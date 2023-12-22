import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { AccountService } from 'src/app/services/account.service';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/user.service';
import { Crypto } from 'src/app/utils/crypto';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
    faKey = faKey;
    userLogado?: Account;
    objeto: Usuario = new Usuario;
    loading = false;
    erro: string = '';
    subscription: Subscription[] = [];
    modal: Modal = new Modal;
    @ViewChild('template') template: TemplateRef<any>;
    @ViewChild('icon') icon: TemplateRef<any>;
    podeResetar = true;

    constructor(
        private activatedRoute: ActivatedRoute,
        private usuarioService: UsuarioService,
        private accountService: AccountService,
        private crypto: Crypto,
        private toastr: ToastrService,
        private modalService: ModalService,
        private alertService: AlertService,
    ) {  }

    
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    ngAfterViewInit(): void {

        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '500px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        this.modal.title = 'Resetar Senha';
        this.modal.routerBack = ['../../'];

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['usuario_id']) {
                this.objeto.id = this.crypto.decrypt(x['usuario_id']);

                lastValueFrom(this.usuarioService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        var account = this.accountService.accountValue;
                        if (account?.perfilAcesso_Id == Role.Master && res.perfilAcesso_Id == Role.Admin) {
                            this.toastr.info('Você não tem permissão para resetar a senha de uma conta administradora.');
                            this.erro = 'Você não tem permissão para resetar a senha de uma conta administradora.';
                            this.podeResetar = false;
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
        this.modalService.removeModal(this.modal.id);
    }
    send() {
        
        this.loading = true;
        lastValueFrom(this.accountService.forgotPassword(this.objeto.email))
            .then(res => {
                this.voltar();
                this.toastr.success('Operação concluída com sucesso')
                this.alertService.success(res['message']);
                if (this.objeto.email == this.userLogado?.email) {
                    this.accountService.logout();
                }
            })
            .catch()
            .finally(() => this.loading = false);
    }
}

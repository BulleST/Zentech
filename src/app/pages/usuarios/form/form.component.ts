import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PerfilAcesso, Role, perfil } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AccountService } from 'src/app/services/account.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/user.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent {
    faUser = faUser;
    objeto: Usuario = new Usuario;
    loading = false;
    erro: string = '';
    isEditPage: boolean = false;

    perfil: PerfilAcesso[] = [];
    subscription: Subscription[] = [];
    emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    modal: Modal = new Modal;
    @ViewChild('template') template: TemplateRef<any>;
    @ViewChild('icon') icon: TemplateRef<any>;

    podeEditar = true;
    account?: Account;

    constructor(
        private usuarioService: UsuarioService,
        private accountService: AccountService,
        private empresaService: EmpresaService,
        private modalService: ModalService,
        private activatedRoute: ActivatedRoute,
        private crypto: Crypto,
        private toastr: ToastrService
    ) {

        this.perfil = perfil;
        this.account = this.accountService.accountValue;

        this.empresaService.empresaSelected.subscribe(res => {
            this.perfil = [];
            if (this.account?.perfilAcesso_Id == Role.Admin) {
                this.perfil = [
                    { id: 2, perfil: 'Master' },
                    { id: 3, perfil: 'Consultor' },
                ];

                if (res.id == 27) {
                    this.perfil.unshift({ id: 1, perfil: 'Admin' })
                }
            } else if (this.account?.perfilAcesso_Id == Role.Master) {
                this.perfil = [
                    { id: 2, perfil: 'Master' },
                    { id: 3, perfil: 'Consultor' },
                ];
            } else if (this.account?.perfilAcesso_Id == Role.Consultor) {
                this.perfil = [
                    { id: 3, perfil: 'Consultor' },
                ];
            }
        })




    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }
    ngAfterViewInit(): void {

        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '900px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(x => {
            if (x['usuario_id']) {
                this.objeto.id = this.crypto.decrypt(x['usuario_id']);

                this.modal.title = 'Editar Usuário';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;

                lastValueFrom(this.usuarioService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        if (this.account?.perfilAcesso_Id == Role.Master && res.perfilAcesso_Id == Role.Admin) {
                            this.podeEditar = false;
                            this.toastr.info('Você não tem permissão para editar uma conta administradora.')
                        } else {

                        }
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'usuario');
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar()
                    })
            } else {

                this.modal.title = 'Cadastrar Usuário';
                this.modal.routerBack = ['../'];

                this.isEditPage = false;
                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'usuario');
                }, 200);
            }
        });
        this.subscription.push(params);
    }

    voltar() {
        this.modalService.removeModal(this.modal);
    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = '';
        this.request()
            .then(async res => {
                await lastValueFrom(this.usuarioService.getList());
                this.voltar();

            })
            .catch(res => {
                this.erro = getError(res);
            })
            .finally(() => this.loading = false);
        console.log(this.objeto)
    }


    request() {
        if (this.objeto.id == 0)
            return lastValueFrom(this.usuarioService.create(this.objeto));

        return lastValueFrom(this.usuarioService.edit(this.objeto));
    }
}

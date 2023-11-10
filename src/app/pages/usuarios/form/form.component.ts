import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PerfilAcesso } from 'src/app/models/account-perfil.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/user.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy, AfterViewInit {
    faUsers = faUsers;

    modalOpen = false;
    objeto: Usuario = new Usuario;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    routerBack: string[] = ['../'];
    routeBackOptions: any;
    isEditPage = false;
    emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    title = '';
    perfil: PerfilAcesso[] = [];
    loadingPerfil = true;
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: Modal,
        private userService: UsuarioService,
        private crypto: Crypto
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };


        lastValueFrom(this.userService.getPerfilAcesso())
            .then(res => this.perfil = res)
            .catch()
            .finally(() => this.loadingPerfil = false);

        var params = activatedRoute.params.subscribe(p => {
            if (p['usuario_id']) {
                this.isEditPage = true;
                this.title = 'Editar usuário';
                this.objeto.id = this.crypto.decrypt(p['usuario_id']);
                this.routerBack = ['../../']

                lastValueFrom(this.userService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;

                        setTimeout(() => {
                            this.modal.setOpen(true);
                        }, 200);
                    })
                    .catch(res => this.voltar())
                    .finally(() => this.loading = false);


            } else {
                this.isEditPage = false;
                this.routerBack = ['../'];
                this.title = 'Cadastrar usuário';
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

    ngAfterViewInit(): void {
        this.modal.title.next(this.title)
        this.modal.template.next(this.template)
        this.modal.icon.next(this.icon);
        this.modal.style.next({ 'max-width': '600px' })
        this.modal.routerBack.next(this.routerBack);
        this.modal.activatedRoute.next(this.activatedRoute);

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = '';

        if (this.isEditPage) {
            lastValueFrom(this.userService.edit(this.objeto))
                .then(async res => await this.then(res))
                .catch(res => this.erro = getError(res))
                .finally(() => this.loading = false);

        } else {
            lastValueFrom(this.userService.create(this.objeto))
                .then(async res => await this.then(res))
                .catch(res => this.erro = getError(res))
                .finally(() => this.loading = false);
        }
    }

    async then(res: Usuario) {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
        var users = await lastValueFrom(this.userService.getList());
    }

}
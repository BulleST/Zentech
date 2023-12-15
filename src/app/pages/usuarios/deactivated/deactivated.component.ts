import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AccountService } from 'src/app/services/account.service';
import { UsuarioService } from 'src/app/services/user.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalUtils } from 'src/app/utils/modal';

@Component({
    selector: 'app-deactivated',
    templateUrl: './deactivated.component.html',
    styleUrls: ['./deactivated.component.css']
})
export class DeactivatedComponent implements OnDestroy {

    erro: string = '';
    loading = false;
    objeto: Usuario = new Usuario;
    subscription: Subscription[] = [];
    routerBack: string[] = ['../../'];
    routeBackOptions: any;
    title = '';

    isUser: boolean = false;
    account?: Account;

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    constructor(
        private activatedRoute: ActivatedRoute,
        public userService: UsuarioService,
        private accountService: AccountService,
        private modal: ModalUtils,
        private crypto: Crypto,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };

        var params = activatedRoute.params.subscribe(p => {
            if (p['usuario_id']) {
                this.objeto.id = this.crypto.decrypt(p['usuario_id']);

                lastValueFrom(this.userService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        this.title = (this.objeto.ativo ? 'Desabilitar' : 'Habilitar') + 'usuário';
                        setTimeout(() => {
                            this.modal.setOpen(true);
                        }, 200);
                    })
                    .catch(res => this.voltar())
                    .finally(() => { });

            } else {
                this.voltar();
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
        this.modal.style.next({ 'max-width': '600px' })
        this.modal.routerBack.next(this.routerBack);
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);

    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }
    send() {
        this.loading = true;
        this.erro = '';
        var enabled = !!this.objeto.dataDesativado;
        // Enviar para a API
        lastValueFrom(this.userService.deactivated(this.objeto.id, enabled))
            .then(async res => {
                if (this.isUser && (res as Usuario).dataDesativado && (res as Usuario).email == this.account?.email) {
                    this.accountService.logout();
                }
                await lastValueFrom(this.userService.getList());
                this.voltar();
            })
            .finally(() => this.loading = false)
    }

}

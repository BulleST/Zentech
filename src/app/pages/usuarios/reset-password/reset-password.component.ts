import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AccountService } from 'src/app/services/account.service';
import { UsuarioService } from 'src/app/services/user.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalUtils } from 'src/app/utils/modal';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnDestroy {

    faTimes = faTimes;
    modalOpen = false;
    erro: string = '';
    loading = false;
    objeto: Usuario = new Usuario;
    subscription: Subscription[] = [];

    userLogado?: Account;
    
    routerBack: string[] = ['../../'];
    routeBackOptions: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalUtils,
        private userService: UsuarioService,
        private accountService: AccountService,
        private crypto: Crypto,
    ) {

        this.userLogado = this.accountService.accountValue;
        this.routeBackOptions = { relativeTo: this.activatedRoute };
        
        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        var params = this.activatedRoute.params.subscribe(res => {
            if (res['usuario_id']) {
                this.objeto.id = this.crypto.decrypt(res['usuario_id']);
                lastValueFrom(this.userService.get(this.objeto.id))
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
                this.voltar();
            }
        });
        this.subscription.push(params);

        
       
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

    send() {
        this.loading = true;
        lastValueFrom(this.userService.resetPassword(this.objeto.id))
        .then(res => {
            this.voltar();
            if (this.objeto.email == this.userLogado?.email) {
                this.accountService.logout();
            }
        })
        .catch()
        .finally(() => this.loading = false);
    }

}

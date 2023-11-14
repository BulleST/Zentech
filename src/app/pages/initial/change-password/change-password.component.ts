import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Account, ChangePassword } from 'src/app/models/account.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { AccountService } from 'src/app/services/account.service';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
faKey= faKey;
    objeto: ChangePassword = new ChangePassword;
    loading = false;
    modalOpen = false;
    erro = '';
    account?: Account;
    subscription: Subscription[] = [];
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    routerBack: string[] = ['..'];
    routeBackOptions: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private modal: Modal,
        private toastr: ToastrService,
        private loadingUtils: LoadingService,
        private accountService: AccountService,
        ) { 
        var account = this.accountService.account.subscribe(res => this.account = res);
        this.subscription.push(account);

        setTimeout(() => {
            this.modalOpen = true;
        }, 200);
    }

    ngOnInit(): void { }

    voltar() {
        this.modalOpen = false;
        setTimeout(() => {
            this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        }, 200);

    }

    send(form: NgForm) { 
        this.erro = '';
        this.loading = true;
        this.loadingUtils.loading.next(true);
        if (form.invalid) {
            this.erro = 'Formulário inválido';
            this.toastr.error('Formulário inválido');
            return;
        }
        if (this.objeto.confirmPassword != this.objeto.password) {
            this.erro = 'Senha e confirmação de senha devem ser iguais';
            this.toastr.error('Senha e confirmação de senha devem ser iguais');
            return;
        }
        lastValueFrom(this.accountService.changePassword(this.objeto))
        .then(res => {
            this.voltar();
        })
        .catch(res => {
            var e = getError(res);
            this.erro = e;
            this.toastr.error(e);
        })
        .finally(() => {
            this.loading = false;
        })

        setTimeout(() => {
            this.loading = false;
            this.loadingUtils.loading.next(false);
        }, 300);}
}

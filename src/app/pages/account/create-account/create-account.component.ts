import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronCircleLeft, faEnvelope, faLock, faPhone, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { LoadingService } from 'src/app/parts/loading/loading';
import { Subscription, lastValueFrom } from 'rxjs';
import { getError } from 'src/app/utils/error';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./../account.component.css', './create-account.component.css']
})
export class CreateAccountComponent implements OnDestroy {
    faChevronCircleLeft = faChevronCircleLeft;
    faEnvelope = faEnvelope;
    faLock = faLock;
    faUnlock = faUnlock;
    faUser = faUser;
    faPhone = faPhone;

    objeto = new Register;
    loading: boolean = false;
    erro = '';
    subscription: Subscription[] = [];
    emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    constructor(
        private toastr: ToastrService,
        private router: Router,
        private loadingUtils: LoadingService,
        private accountService: AccountService,
        private alertService: AlertService,
    ) { 
        var loading = this.loadingUtils.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    send(form: NgForm) {
        console.log(form)
        this.loadingUtils.loading.next(true);
        this.objeto.telefoneCelular = parseInt(this.objeto.telefoneCelular.toString());
        this.objeto.acceptTerms = true;
        lastValueFrom(this.accountService.register(this.objeto))
        .then(res => {
            this.router.navigate(['account', 'login']);
            this.toastr.success('Operação concluida com sucesso!')
            this.alertService.success('Um link de verificação de conta foi enviado para o email cadastrado. Siga as instruções para completar o cadastro.');
            this.loadingUtils.loading.next(false);
        })
        .catch(res => {
            this.loadingUtils.loading.next(false);
            this.erro = getError(res);
        });
    }

}

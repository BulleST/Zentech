import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronCircleLeft, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { ResetPassword } from 'src/app/models/account.model';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { AccountService } from 'src/app/services/account.service';
import { getError } from 'src/app/utils/error';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./../account.component.css']
})
export class ResetPasswordComponent {
    faChevronCircleLeft = faChevronCircleLeft;
    faLock = faLock;
    faUnlock = faUnlock;

    objeto: ResetPassword = new ResetPassword;
    loading = false;
    erro = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
    ) {
        this.objeto.token = this.activatedRoute.snapshot.queryParams['token'];
        // if (this.objeto.token == '' || this.objeto.token == undefined) {
        //     this.router.navigate(['account', 'error']);
        // }
    }

    send() {
        lastValueFrom(this.accountService.resetPassword(this.objeto))
            .then((res) => {
                this.erro = '';
                this.alertService.success(res['message']);
                this.router.navigate(['account', 'login']);
            })
            .catch((res) => {
                this.erro = getError(res)
            })
            .finally(() => {
                this.loading = false;
            });
    }
}

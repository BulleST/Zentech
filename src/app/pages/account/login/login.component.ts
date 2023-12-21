import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { Login } from 'src/app/models/account.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { AccountService } from 'src/app/services/account.service';
import { getError } from 'src/app/utils/error';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./../account.component.css']
})
export class LoginComponent {
    login = new Login;
    loading: boolean = false;
    rememberMe: boolean = false;
    showHide: boolean = false;
    err = '';
    // emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    faEnvelope = faEnvelope;
    faLock = faLock;
    faUnlock = faUnlock;

    constructor(
        private accountService: AccountService,
        private loadingHelper: LoadingService,
        private router: Router
    ) {
        this.loadingHelper.loading.subscribe(res => this.loading = res);
    }

    send() {
        this.loadingHelper.loading.next(true);
        lastValueFrom(this.accountService.login(this.login))
            .then(res => { })
            .catch(res => {
                this.err = getError(res)
            });
    }

}

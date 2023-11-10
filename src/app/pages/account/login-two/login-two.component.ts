import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { Login } from 'src/app/models/account.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { AccountService } from 'src/app/services/account.service';
import { getError } from 'src/app/utils/error';

@Component({
  selector: 'app-login-two',
  templateUrl: './login-two.component.html',
  styleUrls: ['./login-two.component.css']
})
export class LoginTwoComponent {
    login = new Login;
    loading: boolean = false;
    err = '';
    // emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    faEnvelope = faEnvelope;
    faLock = faLock;
    faUnlock = faUnlock;
    rememberMe: boolean = false;
    showHide: boolean = false;
    
    constructor(
        private accountService: AccountService,
        private loadingHelper: LoadingService,
        private router: Router
    ) { 
        this.loadingHelper.loading.subscribe(res => this.loading = res);
    }

    logar() {
        this.loadingHelper.loading.next(true);
        lastValueFrom(this.accountService.login(this.login))
        .then(res => { })
        .catch(res => {
            this.err = getError(res)
        });
    }

}

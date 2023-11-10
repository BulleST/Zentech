import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class LoginComponent{
    login = new Login;
    loading: boolean = false;
    err = '';
    emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    constructor(
        private accountService: AccountService,
        private loadingHelper: LoadingService,
        private router: Router
    ) { 
        this.loadingHelper.loading.subscribe(res => this.loading = res);
    }

    send(form: NgForm) {
        this.loadingHelper.loading.next(true);
        lastValueFrom(this.accountService.login(this.login))
        .then(res => { })
        .catch(res => {
            this.err = getError(res)
        });
    }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { getError } from 'src/app/utils/error';
import { Table } from 'src/app/utils/table';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./../account.component.css', './verify-email.component.css']
})
export class VerifyEmailComponent {

    loading = true;
    erro = '';
    mensagemSucesso = '';
    faChevronCircleLeft = faChevronCircleLeft;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
    ) {

        const token = this.activatedRoute.snapshot.queryParams['token'];
        this.router.navigate([], { relativeTo: this.activatedRoute, replaceUrl: true });
        
        lastValueFrom(this.accountService.verifyEmail(token))
        .then((res) => {
                this.erro = '';
                this.mensagemSucesso = res.message;
                this.loading = false;
            })
            .catch((res) => {
                this.erro = getError(res)
                this.mensagemSucesso = '';
                this.loading = false;
            })
            .finally(() => this.loading = false)
    }
}

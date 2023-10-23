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
    styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {

    loading = false;
    erro = '';
    mensagemSucesso = '';
    faChevronCircleLeft = faChevronCircleLeft;
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private toastrService: ToastrService,
        private table: Table
    ) {
        const token = this.activatedRoute.snapshot.queryParams['token'];
        this.router.navigate([], { relativeTo: this.activatedRoute, replaceUrl: true });
        lastValueFrom(this.accountService.verifyEmail(token))
            .then((res) => {
                this.erro = '';
                this.mensagemSucesso = res.message;
            })
            .catch((res) => {
                console.error(res)
                this.erro = getError(res)
                this.mensagemSucesso = '';
            })
            .finally(() => this.loading = false)
    }
}

import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCreditCard, faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { AccountService } from 'src/app/services/account.service';
import { getError } from 'src/app/utils/error';
import { ModalUtils } from 'src/app/utils/modal';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnDestroy {
    faCreditCard = faCreditCard;
    faKey = faKey;
    modalOpen = false;
    objeto: any;
    subscription: Subscription[] = [];
    loading = false;
    mensagemErro = '';
    erro: string = '';
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    routerBack: string[] = ['..'];
    routeBackOptions: any;

    constructor(
        private router: Router,
        private modal: ModalUtils,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private loadingUtils: LoadingService,

    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };
        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);
        this.objeto = {
            name: 'User teste',
            email: 'teste@gmail.com',
            telefoneCelular: 11111111111
        }

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    ngAfterViewInit(): void {
        this.modal.title.next('Minha conta')
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '800px' })
        this.modal.routerBack.next(this.routerBack);
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);

    }

    voltar() {
        this.modal.setOpen(false);
        setTimeout(() => {
            this.router.navigate(['..']);
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

        var obj = {
            name: this.objeto?.name ?? '',
            telefoneCelular: this.objeto?.telefoneCelular ?? 0,
            email: this.objeto?.email ?? '',
        };

        setTimeout(() => {
            this.loading = false;
            this.loadingUtils.loading.next(false);
        }, 300);
    }
}

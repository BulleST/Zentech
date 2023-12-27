import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Account, ChangePassword } from 'src/app/models/account.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { AccountService } from 'src/app/services/account.service';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { getError } from 'src/app/utils/error';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
    faKey= faKey;
    objeto: ChangePassword = new ChangePassword;
    loading = false;
    erro = '';
    account?: Account;
    subscription: Subscription[] = [];
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    routerBack: string[] = ['..'];
    modal: Modal = new Modal;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private loadingUtils: LoadingService,
        private accountService: AccountService,
        private modalService: ModalService,
        ) { 

        console.log('change-password')
        var account =  this.accountService.accountSubject.subscribe(res => {
            if (!res)
                this.voltar()
            else {
                this.account = res;
                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'change-password');
                }, 200);
            }
        });
        this.subscription.push(account);

    }

    ngAfterViewInit(): void {
        
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '400px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        this.modal.routerBack = ['../'];
        this.modal.title = 'Alterar Senha'
    }

    voltar() {
        this.modalService.removeModal(this.modal);
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
            this.erro = getError(res);
        })
        .finally(() => {
            this.loading = false;
        })

        setTimeout(() => {
            this.loading = false;
            this.loadingUtils.loading.next(false);
        }, 300);}
}

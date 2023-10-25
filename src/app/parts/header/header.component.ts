import { AfterViewInit, Component } from '@angular/core';
import { faIdCard, faKey, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { Header } from 'src/app/utils/header';
import { AlertService } from '../alert/alert.service';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
    Role = Role;
    faSignOut = faSignOut;
    faIdCard = faIdCard;
    faKey = faKey;
    faUser = faUser;
    menuHeaderOpen = false;
    userLogado?: Account;
    nomeAbreviado = '';
    perfil = '';
    subscription: Subscription[] = [];

    homeActive = true;

    constructor(
        private accountService: AccountService,
        private header: Header,
        private alertService: AlertService,
        private router: Router
    ) {

        this.router.events.subscribe(res => {
            if(res instanceof NavigationEnd)
                this.homeActive = res.url == '/'
        })

        this.userLogado = this.accountService.accountValue;
        var account = this.accountService.account.subscribe(async res => {
            this.userLogado = res;
            if (res) {
                this.perfil = Role[res.perfilAcesso_Id]
                let array = res?.name.split(' ')
                if (array.length == 1) {
                    this.nomeAbreviado = array[0];
                } else {
                    this.nomeAbreviado = array[0] + ' ' + array[array.length - 1];
                }

                if (res.passwordReset == undefined && window.location.pathname.includes('my-account/change-password') == false) {
                    this.alertService.info(`
                        <h5>Atenção</h5>
                        <h6>Sua conta não está protegida!</h6>
                        <p>Após sua conta ter sido cadastrada a senha padrão não foi alterada, isso torna sua conta vulnerável à acessos não autorizados.</p>
                        <p>Por favor, altere sua senha em <a href="./my-account/change-password">/my-account/change-password</a>.</p>
                    `)
                }
            }
        });
        this.subscription.push(account);

        var menuHeaderOpen = this.header.menuHeaderOpen.subscribe(res => this.menuHeaderOpen = res);
        this.subscription.push(menuHeaderOpen);

    }

    ngAfterViewInit(): void {
        this.header.clickOut();
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    toggleMenuHeader(): void {
        // this.menuHeaderOpen = !this.menuHeaderOpen;
        this.header.toggleMenuHeader();
    }

    sair() {
        this.accountService.logout();
    }
}


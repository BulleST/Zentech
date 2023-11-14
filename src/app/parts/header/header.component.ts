import { AfterViewInit, Component, HostListener } from '@angular/core';
import { faBars, faIdCard, faKey, faSignOut, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { Header } from 'src/app/utils/header';
import { AlertService } from '../alert/alert.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';

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
    faBars = faBars;
    faTimes = faTimes;

    menuMinhaContaOpen = false;
    menuMobileOpen = false;
    userLogado?: Account;
    nomeAbreviado = '';
    perfil = '';
    subscription: Subscription[] = [];

    homeActive = true;

    isMobile: boolean = false;

    constructor(
        private accountService: AccountService,
        private header: Header,
        private alertService: AlertService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private mobile: IsMobile,
    ) {
        this.mobile.set();

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

        var minhaContaOpen = this.header.minhaContaOpen.subscribe(res => this.menuMinhaContaOpen = res);
        this.subscription.push(minhaContaOpen);

        var mobileSubs = this.mobile.value.subscribe(res => this.isMobile = res == 'sm' || res == 'md')
        this.subscription.push(mobileSubs);
        
        var menuMobileOpen = this.header.menuMobileOpen.subscribe(res => this.menuMobileOpen = res);
        this.subscription.push(menuMobileOpen);

    }

    ngAfterViewInit(): void {
        this.header.clickOut();
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    @HostListener('window:resize', ['$event'])
    set() {
       this.mobile.set();
    }
    toggleMenuMinhaConta(): void {
        this.header.toggleMenuMinhaConta();
    }

    toggleMenuMobile() {
        this.header.toggleMenuMobile()
    }

    sair() {
        this.accountService.logout();
    }

    minhaConta() {
        this.router.navigate([this.router.url, 'minha-conta'], { relativeTo: this.activatedRoute, skipLocationChange: false, replaceUrl: true })
    }
}


import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faCity, faHandHoldingDollar, faIdCard, faLink, faMagnifyingGlass, faPercent, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Header } from 'src/app/utils/header';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy {
    Role = Role;
    faHandHoldingDollar = faHandHoldingDollar;
    faMagnifyingGlass = faMagnifyingGlass;
    faUsers = faUsers;
    faPercent = faPercent;
    faCity = faCity;
    faIdCard = faIdCard;
    faLink = faLink;
    menuOpen: boolean = false;
    subscription: Subscription[] = [];
    gfg: any[] = [];
    homeActive = true;


    constructor(
        private header: Header,
        private router: Router,
    ) {
       var events = this.router.events.subscribe(res => {
            if(res instanceof NavigationEnd)
                this.homeActive = res.url == '/' || res.url == '/minha-conta' || res.url == '/minha-conta/change-password'
        })
        this.subscription.push(events);

        this.menuOpen = this.header.menuAsideOpen.value;
        var open = this.header.menuAsideOpen.subscribe(res => this.menuOpen = res);
        this.subscription.push(open);
        this.setMenu();
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    toggleAside() {
        this.header.toggleMenuAside();
    }
  
    setMenu() {
        var i = 1;
        this.gfg = [
            {
                id: i++,
                label: 'Bancos',
                routerLink: "/banco",
                visible: true,
            },
            {
                id: i++,
                label: 'Beneficiários',
                routerLink: "/beneficiario",
                visible: true,
            },
            {
                id: i++,
                label: 'Contratos',
                routerLink: "/contrato",
                visible: true,
            },
            {
                id: i++,
                label: 'Instituições Financeiras',
                routerLink: "/instituicao-financeira",
                visible: true,
            },
            {
                id: i++,
                label: 'Invoice',
                routerLink: "/invoice",
                visible: true,
            },
            {
                id: i++,
                label: 'New Clickk Buyers',
                routerLink: "/painel-cpf",
                visible: true,
            },
            {
                id: i++,
                label: 'Pró Câmbio',
                routerLink: "/operacoes",
                visible: true,
            },
            {
                id: i++,
                label: 'Swift',
                routerLink: "/swift",
                visible: true,
            },
            {
                id: i++,
                label: 'Usuários',
                routerLink: "/usuarios",
                visible: true,
            },
        ];
    }
    
}

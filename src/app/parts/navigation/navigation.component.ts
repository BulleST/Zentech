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
    items: any[] = [];
    homeActive = true;

    padding = 0;


    constructor(
        private header: Header,
        private router: Router,
    ) {
        var events = this.router.events.subscribe(res => {
            if (res instanceof NavigationEnd)
                this.homeActive = res.url == '/' || res.url == '/home' || res.url == '/minha-conta' || res.url == '/minha-conta/change-password'
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
        this.items = [
            {
                id: i++,
                label: 'Painel CPF',
                paddingLeft: 0,
                items: [
                    {
                        id: i++,
                        label: 'New Clickk Buyers',
                        routerLink: "/painel-cpf/pessoas",
                        paddingLeft: 10,
                    },
                    {
                        id: i++,
                        label: 'Pró Câmbio',
                        routerLink: "/painel-cpf/operacoes",
                        paddingLeft: 10,
                    },
                ]
            },
            {
                id: i++,
                label: 'Painel de Documentos',
                paddingLeft: 0,
                items: [
                    {
                        id: i++,
                        label: 'Bancos',
                        routerLink: "/banco",
                        paddingLeft: 10,
                    },
                    {
                        id: i++,
                        label: 'Beneficiários',
                        routerLink: "/beneficiario",
                        paddingLeft: 10,
                        items: [
                            { 
                                id: i++,
                                label: 'Representantes',
                                routerLink: "/representante",
                                paddingLeft: 25,
                            }
                        ]
                    },
                    {
                        id: i++,
                        label: 'Instituições Financeiras',
                        routerLink: "/instituicao-financeira",
                        paddingLeft: 10,
                    },
                    {
                        id: i++,
                        label: 'Invoice',
                        routerLink: "/invoice",
                        paddingLeft: 10,
                        items: [
                            // {
                            //     id: i++,
                            //     label: 'Swift',
                            //     routerLink: "/swift",
                            //     paddingLeft: 25,
                            // },
                            {
                                id: i++,
                                label: 'Contratos',
                                routerLink: "/contrato",
                                paddingLeft: 25,
                            },
                        ]
                    },
                ]
            },
            // {
            //     id: i++,
            //     label: 'Empresas',
            //     routerLink: "/empresa",
            //     paddingLeft: 0,
            // },
            {
                id: i++,
                label: 'Usuários',
                routerLink: "/usuarios",
                paddingLeft: 0,
            },
        ];
    }

    addPadding() {
        this.padding = parseInt(this.padding.toString()) + 5
        return this.padding;
    }

}

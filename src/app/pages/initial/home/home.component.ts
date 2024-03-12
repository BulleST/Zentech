import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
// declare var require: any
// const ColorThief = require('colorthief');
declare var ColorThief: any

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, AfterViewInit {
    homeActive = true;
    subscription: Subscription[] = [];
    empresa?: Empresa = new Empresa;
    colors: any[] = [];
    constructor(
        private router: Router,
        private empresaService: EmpresaService,
    ) {

        var e = this.router.events.subscribe(res => {
            if (res instanceof NavigationEnd) {
                this.homeActive = false
                this.homeActive = res.url == '/' || res.url == '/home' || res.url == '/minha-conta' || res.url == '/minha-conta/change-password'

            }
        })
        this.subscription.push(e)
    }

    ngAfterViewInit(): void {
        var empresa = this.empresaService.empresaSelected.subscribe(res => this.empresa = res.empresa);
        this.subscription.push(empresa);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(e => e.unsubscribe());
        $('.home__background').remove()
    }
}
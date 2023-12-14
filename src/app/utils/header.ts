import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as $ from 'jquery';
import { Crypto } from "./crypto";
import { Table } from "./table";

@Injectable({
    providedIn: 'root'
})
export class Header {
    menuMobileOpen = new BehaviorSubject<boolean>(false);
    minhaContaOpen = new BehaviorSubject<boolean>(false);

    constructor(
        private crypto: Crypto, 
        private table: Table,
    ) {

    }

    toggleMenuMobile(): void {
        this.setMenuMobile(!this.menuMobileOpen.value);
    }

    setMenuMobile(value: boolean) {
        var encryted = this.crypto.encrypt(value) ?? '';
        localStorage.setItem('navigation', encryted);
        this.menuMobileOpen.next(value);
    }


    toggleMenuMinhaConta(): void {
        this.minhaContaOpen.next(!this.minhaContaOpen.value);
    }

    openMenuMinhaConta() {
        this.minhaContaOpen.next(true);
    }

    closeMenuMinhaConta() {
        this.minhaContaOpen.next(false);
    }

    clickOut() {
        var classe = this;
        $('body').on('click', function (e) {
            classe.closeMenuMinhaConta();
            classe.setMenuMobile(false);
        });
        
        $('.header__userLogado').on('click', function (e) {
            e.stopPropagation();
        });

        $('.btn-mobile').on('click', function (e) {
            e.stopPropagation();
        });

        $('.header').on('click', function (e) {
            e.stopPropagation();
        });
    }
}
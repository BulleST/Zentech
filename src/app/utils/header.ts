import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as $ from 'jquery';
import { Crypto } from "./crypto";
import { Table } from "./table";

@Injectable({
    providedIn: 'root'
})
export class Header {
    menuAsideOpen = new BehaviorSubject<boolean>(false);
    minhaContaOpen = new BehaviorSubject<boolean>(false);

    constructor(
        private crypto: Crypto, 
        private table: Table,
    ) {

    }

    toggleMenuAside(): void {
        this.setMenuAside(!this.menuAsideOpen.value);
    }

    setMenuAside(value: boolean) {
        console.log('setMenuAside', value)
        var encryted = this.crypto.encrypt(value) ?? '';
        localStorage.setItem('navigation', encryted);
        this.menuAsideOpen.next(value);
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
        // var classe = this;
        // $('body').on('click', function (e) {
        //     console.log('body click')
        //     classe.closeMenuMinhaConta();
        //     classe.setMenuAside(false);
        // });
        
        // $('.navigation-toggle-content').on('click', function (e) {
        //     console.log('btn click')
        //     classe.setMenuAside(true);
        // });
        
        // $('.navigation-content*').each((i, el) => {
        //     $(el).on('click', function (e) {
        //         console.log('navigation-content * click')
        //         e.stopPropagation();
        //     });
        // })
        // $('.navigation-content').on('click', function (e) {
        //     console.log('navigation-content click')
        //     e.stopPropagation();
        // });
    }
}
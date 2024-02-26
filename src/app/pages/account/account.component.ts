import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {

    route = ''
    constructor(
        private router: Router
    ) {

        this.router.events.subscribe(res => {
            if (res instanceof NavigationEnd) {
              try {
                console.log(res.url)
                var a = res.url;
                var b = a.split('/')
                var c = b[2].split('?')[0]
                this.route = c;
              } catch (e) {

              }
            }
        })
    }

}

import { AfterViewInit, Component, ElementRef, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, AfterViewInit {
    homeActive = true;
    subscriptions: Subscription[] = [];

    constructor(
        private router: Router
    ) {
        var e = this.router.events.subscribe(res => {
            if (res instanceof NavigationEnd) {
                this.homeActive = false
                this.homeActive = res.url == '/'
                
            }
        })
        this.subscriptions.push(e)
    }

   async ngAfterViewInit() {
        $('.home').append(`<div class="home__background" style="background-image: url(assets/img/logo-animation.gif)" ></div>`)
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(e => e.unsubscribe());
        $('.home__background').remove()
    }
}
async function toDataUri(src: string) {
    var a = await fetch(src);
    var b = await a.blob();
    var reader = new FileReader();
    var c = reader.readAsDataURL(b);
    return new Promise(resolve => {
        reader.onloadend = (a) => {
            resolve(reader.result)
        }
    });

}

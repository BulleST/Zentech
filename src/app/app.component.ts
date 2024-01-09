import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router, RouterStateSnapshot } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    title = 'ZenTech';
    constructor(private router: Router) {

    }

    ngOnDestroy(): void {
        localStorage.removeItem('tip')
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/parts/loading/loading';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnDestroy {

    loading = false;
    loadingRequest: boolean[] = [];
    subscription: Subscription[] = [];
    message: string = '';

    constructor(
        private loadingUtils: LoadingService,
    ) {
        var loading = this.loadingUtils.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);
        var loadingRequests = this.loadingUtils.loadingRequests.subscribe(res => this.loadingRequest = res);
        this.subscription.push(loadingRequests);
        var message = this.loadingUtils.message.subscribe(res => this.message = res);
        this.subscription.push(message);
    }
    
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

}

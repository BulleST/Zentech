import { Component, EventEmitter, HostListener, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription, catchError, lastValueFrom, of } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Header } from 'src/app/utils/header';
import { SwipeService } from 'src/app/utils/swipe';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-initial',
    templateUrl: './initial.component.html',
    styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnDestroy {

    subscription: Subscription[] = [];
    private swipeCoord?: [number, number];
    private swipeTime?: number;
    navigationOpen = false;

    constructor(
        private swipeService: SwipeService,
        private table: Table,
        private header: Header,
        private accountService: AccountService,
    ) {
        var open = this.header.menuAsideOpen.subscribe(res => this.navigationOpen = res);
        this.subscription.push(open);

        lastValueFrom(this.accountService.refreshToken())
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    swipe(e: TouchEvent, when: string): void {
        const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        const time = new Date().getTime();
        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }
        else if (when === 'end') {
            const direction = [coord[0] - this.swipeCoord![0], coord[1] - this.swipeCoord![1]];
            const duration = time - this.swipeTime!;
            if (duration < 1000
                && Math.abs(direction[0]) > 30
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
                if (direction[0] < 0) {
                    //next
                    this.swipeService.swipePrevious();
                } else {
                    //previous
                    this.swipeService.swipeNext();
                }
            }
        }
    }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Crypto } from './crypto';
import { CurrencyPipe, DatePipe } from '@angular/common';
// // import { MaskApplierService } from 'ngx-mask';
import { Column, FilterType, MaskType } from '../helpers/column.interface';
import { MenuTableLink } from '../helpers/menu-links.interface';
import { NgxMaskApplierService } from 'ngx-mask/lib/ngx-mask-applier.service';
import { NgxMaskService } from 'ngx-mask';

@Injectable({
    providedIn: 'root'
})
export class Table {

    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    selectedItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    selected: BehaviorSubject<any | undefined> = new BehaviorSubject<any | undefined>(undefined);

    currentPage = new BehaviorSubject<number>(1);


    constructor(
        private toastr: ToastrService,
        private crypto: Crypto,
        private currency: CurrencyPipe,
        private mask:  NgxMaskService,
        private datePipe: DatePipe,
    ) { }

    initialize() {
        this.resetSelection();
    }

    resetSelection() {
        this.selected.next(undefined)
        this.fecharMenuTable();
    }

    onRowSelect(event: any) {
        let row: any = event.data;
        if (event && event.originalEvent && event.originalEvent.target) {

            let target = event.originalEvent.target;
            if (row != undefined) {
                this.selected.next(row);
                this.exibirMenuTable(target);
            }
        }

    }

    onRowUnselect(event?: any) {
        this.selected.next(undefined)
        this.fecharMenuTable();
    }


    fecharMenuTable() {
        $('.actions-nav').css({
            'display': 'none',
            'opacity': 0,
            'visibility': 'hidden',
        });
    }

    exibirMenuTable(target: any) {
        var td = $(target).closest('td');
        let tr = $(td).parent('tr');
        let btnActions: JQuery<HTMLElement> = $(tr).find('.actions__toggle')
        if (tr && td && btnActions) {
            let height = $(tr).height() ?? 0
            let trTop = ($(tr).offset()?.top ?? 0);
            let top = trTop + height - (height * 0.1);
            setTimeout(() => {
                let left = ($(btnActions).offset()?.left ?? 0) - ($('.actions-nav').width() ?? 0) + 10;
                $('.actions-nav').css({
                    'display': 'flex',
                    'top': top + 'px',
                    'left': left + 'px',
                    'opacity': 1,
                    'visibility': 'visible',
                });
            }, 10);
        }
    }

    formatCellData(row: any, col: Column): any {
        var value = this.getCellValue(row, col);
    }

    getCellValue(row: any, col: Column) {
        const nestedProperties: string[] = col.field.split('.');
        let value: any = row;
        for (const prop of nestedProperties) {
            value = value ? value[prop] ?? undefined : undefined;
        }

        value = value ?? ''
        return value;
    }

    encryptParams(tableLinks: MenuTableLink[]) {
        return tableLinks.map(link => {
            if (link.paramsFieldName != undefined && link.paramsFieldName.length) {
                var paramnsMap = link.paramsFieldName.map(p => {
                    const nestedProperties: string[] = p.split('.');
                    let value: any = this.selected.value;
                    for (const prop of nestedProperties) {
                        value = value ? value[prop] ?? undefined : undefined;
                    }
                    return this.crypto.encrypt(value) ?? '';
                })
                link.fullRoute = [].concat(link.routePath as never[], paramnsMap as never[])
            } else {
                link.fullRoute = link.routePath;
            }
            return link;
        });
    }

    currentPageChange() {
        var currentPage = parseInt($(`.p-paginator-page.p-highlight`).text()) ?? 1
        this.currentPage.next(currentPage);
    }

    goToCurrentPage() {
        setTimeout(() => {
            $('p-table').find('p-paginator').find('.p-paginator-pages').find(`.p-paginator-page:contains(${this.currentPage.value})`).trigger('click')
        }, 100);
    }

}

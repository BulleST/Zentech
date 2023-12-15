import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Crypto } from './crypto';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MaskApplierService } from 'ngx-mask';
import { Column, FilterType, MaskType } from '../helpers/column.interface';
import { MenuTableLink } from '../helpers/menu-links.interface';

@Injectable({
    providedIn: 'root'
})
export class Table {

    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    // selectedItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    selected: BehaviorSubject<any | undefined> = new BehaviorSubject<any | undefined>(undefined);

    currentPage = new BehaviorSubject<number>(1);


    constructor(
        private toastr: ToastrService,
        private crypto: Crypto,
        private currency: CurrencyPipe,
        private mask: MaskApplierService,
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
        var td = target.tagName == 'TD' ? target : $(target).parents('td')
        let tr = $(td).parent('tr');
        let btnActions: JQuery<HTMLElement> = $(tr).find('.actions__toggle')
        if (tr && td && btnActions) {
            let top = ($(tr).offset()?.top ?? 0) + 5;
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
        // try {
            if (col.maskType && value != undefined && value.toString().trim()) {
                if (col.maskType == MaskType.number) {
                    // console.log('0', value)
                    value = this.currency.transform(value, 'BRL', '', col.decimal);
                    // console.log('0', value)
                }
                else if (col.maskType == MaskType.mask && col.mask) {
                    // console.log('1', value)
                    value = value.toString().padStart( col.mask.length, '0');
                    value = this.mask.applyMask(value, col.mask);
                    // console.log('1', value)
                }
                else if (col.maskType == MaskType.percentage) {
                    // console.log('2', value)
                    value = this.currency.transform(value, 'BRL', '', col.decimal) + '%';
                    // console.log('2', value)
                }
                else if (col.maskType == MaskType.money) {
                    // console.log('3', value)
                    value = this.currency.transform(value, 'BRL', col.moeda, col.decimal)
                    // console.log('3', value)
                }
                else if (col.maskType == MaskType.cnpj) {
                    // console.log('4', value)
                    value = this.mask.applyMask(value.toString().padStart(14, '0'), '00.000.000/0000-00');
                    // console.log('4', value)
                }
                else if (col.maskType == MaskType.cpf) {
                    // console.log('5')
                    value = this.mask.applyMask(value.toString().padStart(11, '0'), '000.000.000-00');
                    // console.log('5')
                }
                else if (col.maskType == MaskType.cpfcnpj) {
                    // console.log('6', value)
                    var pj = row['pj'];
                    value = value.toString().padStart(pj ? 14 : 11);
                    value = this.mask.applyMask(value, pj ? '00.000.000/0000-00' : '000.000.000-00');
                    // console.log('6', value)
                }
                else if (col.maskType == MaskType.rg) {
                    // console.log('7', value)
                    value = this.mask.applyMask(value.toString().padStart(9, '0'), '00.000.000-0');
                    // console.log('7', value)
                }
                else if (col.maskType == MaskType.any && col.mask) {
                    // console.log('8', value)
                    value = this.mask.applyMask(value, col.mask);
                    // console.log('8', value)
                }
                else if (col.maskType == MaskType.date) {
                    // console.log('9', value)
                    value = this.datePipe.transform(value, 'dd/MM/yyyy', 'UTC', 'pt-BR');
                    // console.log('9', value)
                }
                else if (col.maskType == MaskType.dateTime) {
                    // console.log('10', value)
                    value = this.datePipe.transform(new Date(value), 'dd/MM/yyyy HH:mm', 'UTC', 'pt-BR');
                    // console.log('10', value)
                }
                else if (col.maskType == MaskType.telefoneCelular) {
                    // console.log('11', value)
                    value = this.mask.applyMask(value.toString(), (value.toString().length == 10 ? '(00)  0000-0000' : '(00) 0.0000-0000'))
                    // console.log('11', value)
                }
                else if (col.maskType == MaskType.substring) {
                    if (col.substringLength && value.length > col.substringLength) {
                        // console.log('12', value)
                        value = value.substring(0, col.substringLength) + '...'
                        // console.log('12', value)
                    }
                }
                else if (col.maskType == MaskType.options && col.values && col.values.length) {
                    // console.log('13', value)
                    var opt = col.values.find(x => x.value == value);
                    value = opt!.output;
                    row['optionValue'] = opt
                    // console.log('13', value)
                }
                else {
                    // console.log('14', value)
                    return value ?? 'N/A';
                }

            }
            return value ?? 'N/A';
        // } catch(e) {
        //     return value
        // }
    }

    getCellValue(row: any, col: Column) {
        const nestedProperties: string[] = col.field.split('.');

      [
        { dados: {
            pessoa: {
                nome: '',
                cpf: '',
            }
        }}
    ]

        let value: any = row;
        for (const prop of nestedProperties) {
            value = value ? value[prop] ?? undefined : undefined;
        }
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

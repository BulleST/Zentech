import { AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnDestroy, QueryList, SimpleChanges, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ColumnFilter } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Column, MaskType } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Role } from 'src/app/models/account-perfil.model';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-list-shared',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListSharedComponent implements OnDestroy, OnChanges, AfterViewInit, AfterViewChecked /*, AfterViewChecked*/ {
    maskType = MaskType;
    faFilter = faFilter;
    faTimes = faTimes;
    faEllipsisV = faEllipsisV;

    @Input() list: any[] = [];
    @Input() filterLink = true;
    @Input() filterTable = true;
    @Input() paginator: boolean = true;
    @Input() sortTable = true;
    @Input() menuTable = true;
    @Input() selectable = true;
    @Input() columns: Column[] = [];
    @Input() tableLinks: MenuTableLink[] = [];
    @Input() showResultLength = true;
    @Input() loading: boolean;

    @Input() topActions: TemplateRef<any>;
    @Input() tableFooter: TemplateRef<any>;
    @Input() rowActions: TemplateRef<any>;

    selected?: any;
    filters: string[] = [];
    routeRow: string[] = [];
    Role = Role;

    subscription: Subscription[] = [];
    first = 2;
    formatedList: any = [];

    @ViewChild('rowActions') rowActionsTemplate: TemplateRef<any>;
    @ViewChildren('overlayPanel') logos: QueryList<OverlayPanel>;

    constructor(
        private table: Table,
        private router: Router,
    ) {
        this.table.currentPage.next(1);

        var loading = this.table.loading.subscribe(res => this.loading = !!res);
        this.subscription.push(loading);

        if (this.selectable) {
            var selected = this.table.selected.subscribe(res => this.selected = res);
            this.subscription.push(selected);
        }
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['list']) {
            this.list = changes['list'].currentValue;
            this.formatedList = changes['list'].currentValue;
            if (this.list.length > 0 && this.columns.length > 0) {
                this.formata();
            }
        }
        if (changes['columns']) {
            this.columns = changes['columns'].currentValue;
            this.filters = this.columns.map(x => x.field)
        }
        if (changes['selectable']) this.selectable = changes['selectable'].currentValue;
        if (changes['filterLink']) this.filterLink = changes['filterLink'].currentValue;
        if (changes['filterTable']) this.filterTable = changes['filterTable'].currentValue;
        if (changes['paginator']) this.paginator = changes['paginator'].currentValue;
        if (changes['sortTable']) this.sortTable = changes['sortTable'].currentValue;
        if (changes['menuTable']) this.menuTable = changes['menuTable'].currentValue;
        if (changes['tableLinks']) this.tableLinks = changes['tableLinks'].currentValue;
        if (changes['topActions']) this.topActions = changes['topActions'].currentValue;
        if (changes['tableFooter']) this.tableFooter = changes['tableFooter'].currentValue;
        if (changes['rowActions']) this.rowActions = changes['rowActions'].currentValue;
        if (changes['showResultLength']) this.showResultLength = changes['showResultLength'].currentValue;
        if (changes['loading']) this.loading = changes['loading'].currentValue;
    }

    ngAfterViewInit(): void { }

    ngAfterViewChecked(): void {
        this.table.currentPageChange();
    }


    formata() {
        this.table.loading.next(true);
        var list = JSON.parse(JSON.stringify(this.formatedList));
        list.every((row: any) => {
            this.columns.every(col => {
                try {
                    row[col.field] = this.formatCellData(row, col);
                } catch (e) {
                    console.error(e);
                }
                return col;
            })
            return row;
        })

        this.formatedList = Object.assign([], list);
        this.table.loading.next(false);
    }


    onRowSelect(event: any) {
        this.table.onRowSelect(event);
    }

    onRowUnselect(event: any) {
        this.table.onRowUnselect(event)
    }

    formatCellData(row: any, col: Column): any {
        var value = this.table.formatCellData(row, col);
        return value
    }

    getCellValue(row: any, col: Column): any {
        return this.table.getCellValue(row, col);
    }


    evalRowActions(str: any, item: any) {
        return eval(str) as boolean
    }

    filterDate(value: any, filterCallback: any, filterEl: ColumnFilter) {
        if (value)
            filterCallback(value);
        else
            filterEl.clearFilter();
    }

    filterNumeric(event: any, filterCallback: any, filterEl: ColumnFilter) {
        var value = event.target.value.replaceAll('.', '')
        value = parseFloat(value.replaceAll(',', '.'))
        if (value)
            filterCallback(value);
        else
            filterEl.clearFilter();
    }

    filterCol(value: any, filterCallback: any, filterEl: ColumnFilter) {
        filterCallback(value);
        $(filterEl.el.nativeElement).find('.p-column-filter-menu-button').trigger('click');
        setTimeout(() => {
            $(filterEl.el.nativeElement).find('.p-column-filter-menu-button').trigger('click');
        }, 50);

    }

    getOptionValue(row: any, col: Column, field: string) {
        if (col.values) {
            var value = this.table.getCellValue(row, col);
            var opt = col.values.find(x => x.value == value) as any;
            return opt[field];
        }
        return null;
    }

    filterColOption(value: any, filter: any) {
        value = value != undefined && value != null ? value.value : undefined;
        filter(value);
    }

    setDate(date: string) {
        return new Date(date) ?? 'N/A'
    }

    closeOverlays() {
        this.logos.forEach(item => {
            item.hide();
        });
    }
    

}


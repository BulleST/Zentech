import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, QueryList, SimpleChanges, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ColumnFilter, TableCheckbox } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Column, MaskType } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Role } from 'src/app/models/account-perfil.model';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';
import { Table } from 'src/app/utils/table';
import { Table as TablePrime } from 'primeng/table';
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
    faBell = faBell;

    @Input() list: any[] = [];
    @Input() filterLink = true;
    @Input() filterTable = true;
    @Input() paginator: boolean = true;
    @Input() sortTable = true;
    @Input() menuTable = true;
    @Input() selectable = true;
    @Input() selectionMode: 'multiple' | 'single' = 'single';
    @Input() columns: Column[] = [];
    @Input() tableLinks: MenuTableLink[] = [];
    @Input() showResultLength = true;
    @Input() loading: boolean;

    @Input() topActions: TemplateRef<any>;
    @Input() tableFooter: TemplateRef<any>;
    @Input() rowActions: TemplateRef<any>;

    selected?: any;
    selectedItems?: any[];
    filters: string[] = [];
    routeRow: string[] = [];
    Role = Role;

    selectedAll = false;
    subscription: Subscription[] = [];
    first = 2;

    @ViewChild('rowActions') rowActionsTemplate: TemplateRef<any>;
    @ViewChildren('overlayPanel') logos: QueryList<OverlayPanel>;
    @ViewChild('scrollTipBtn') scrollTipBtn: ElementRef;
    @ViewChild('dt') dt: TablePrime;
    @ViewChildren('row') row: QueryList<HTMLTableRowElement>;
    @ViewChildren('checkbox') checkbox: QueryList<TableCheckbox>;


    visible = false;
    position: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'bottomleft';

    screen = ScreenWidth.lg;

    constructor(
        private table: Table,
        private router: Router,
        private isMobile: IsMobile
    ) {
        this.table.currentPage.next(1);

        var loading = this.table.loading.subscribe(res => this.loading = !!res);
        this.subscription.push(loading);

        var screen = this.isMobile.value.subscribe(res => {
            this.screen = res;

        });
        this.subscription.push(screen);

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
        if (changes['checkboxActions']) this.rowActions = changes['rowActions'].currentValue;
        if (changes['showResultLength']) this.showResultLength = changes['showResultLength'].currentValue;
        if (changes['loading']) this.loading = changes['loading'].currentValue;
        if (changes['selectionMode']) {
            this.selectionMode = changes['selectionMode'].currentValue;
            if(this.selectionMode == 'multiple') {
                var selected = this.table.selectedItems.subscribe(res => {
                    this.selectedItems = res;
                    this.selectedAll = this.list.length > 0 && this.selectedItems.length == this.list.length;
                    if (this.dt) {
                        this.dt.selectAll = this.selectedAll;
                    }
                    this.table.fecharMenuTable();
                });
                this.subscription.push(selected);
            }
        }
    }

    ngAfterViewInit(): void {
        this.getVisible();
    }

    setVisible() {
        this.visible = !this.visible;
        localStorage.setItem('tip', this.visible.toString());
    }

    getVisible() {
        var visible = localStorage.getItem('tip');
        if (!visible) {
            this.visible = true;
            localStorage.setItem('tip', this.visible.toString());
        }
    }

    ngAfterViewChecked(): void {
        this.table.currentPageChange();
    }

    onRowSelect(event: any) {
        this.table.onRowSelect(event);
    }
    
    onRowUnselect(event: any) {
        this.selectedAll = false;
        this.table.onRowUnselect(event)
    }

    selectAllChange(e: any) {
        if (this.selectionMode == 'multiple' ) {
            this.table.selectedItems.next(e);
            if (e.length == 1) {
                this.table.selected.next(e[0]);
            } else {
                this.table.selected.next(undefined);
            }
        } else {
         
            this.table.selected.next(e);   
        }
    }

    selectAllClick(selected: boolean) {
        this.table.fecharMenuTable();
        this.loading = true;
        this.checkbox.forEach(item => {
            item.checked = selected;
            item.dt.updateSelectionKeys();
        });
        this.loading = false;
        if (selected) {
            this.selectAllChange(this.list);
        } else {
            this.selectAllChange([]);
        }
    }

    checked(item: any) {
        var checked = this.selectedItems && this.selectedItems.length > 0 ? this.selectedItems?.findIndex(x => x.id == item.id) : -1; 
        return checked != -1;
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
            var opt = col.values.find(x => x.value.toString().toUpperCase() == value.toString().toUpperCase()) as any;
            if (opt) {
                return opt[field];
            } else {
                return '';
            }
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

    clear(table: TablePrime) {
        table.clear();
    }


    validateNullUndefinedEmpty(item: any) {
        if (item == null) {
            return false;
        } else if (item == undefined) {
            return false;
        } else if (item.toString().trim() == '') {
            return false;
        } else {
            return true;
        }
    }
}


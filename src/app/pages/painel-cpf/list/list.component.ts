import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faFilter, faList } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { Column, MaskType } from 'src/app/helpers/column.interface';
import { PessoaList, pessoaColumns } from 'src/app/models/pessoa.model';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    maskType = MaskType;
    faFilter = faFilter;
    faCreditCard = faCreditCard;
    loading = false;
    list: PessoaList[] = [];
    filters: string[] = [];
    columns = pessoaColumns;

    constructor(
        private table: Table,
        private router: Router
    ) { 
        var index = 0;
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index.toString().padStart(11, '0'), inclusao: new Date(new Date().getFullYear(), index, new Date().getDate()), status: index % 2 == 0, saldo: index.toString().padEnd(5, '0') })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index.toString().padStart(11, '0'), inclusao: new Date(), status: index % 2 == 0, saldo: index.toString().padEnd(5, '0') })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index.toString().padStart(11, '0'), inclusao: new Date(), status: index % 2 == 0, saldo: index.toString().padEnd(5, '0') })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index.toString().padStart(11, '0'), inclusao: new Date(), status: index % 2 == 0, saldo: index.toString().padEnd(5, '0') })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index.toString().padStart(11, '0'), inclusao: new Date(), status: index % 2 == 0, saldo: index.toString().padEnd(5, '0') })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index.toString().padStart(11, '0'), inclusao: new Date(), status: index % 2 == 0, saldo: index.toString().padEnd(5, '0') })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index.toString().padStart(11, '0'), inclusao: new Date(), status: index % 2 == 0, saldo: index.toString().padEnd(5, '0') })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index.toString().padStart(11, '0'), inclusao: new Date(), status: index % 2 == 0, saldo: index.toString().padEnd(5, '0') })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index.toString().padStart(11, '0'), inclusao: new Date(), status: index % 2 == 0, saldo: index.toString().padEnd(5, '0') })
        this.list.push({id: ++index, nome: 'Pessoa ' + index, cpf: index.toString().padStart(11, '0'), inclusao: new Date(), status: index % 2 == 0, saldo: index.toString().padEnd(5, '0') })
    }

    ngAfterViewChecked(): void {
        setTimeout(() => {
            this.table.currentPageChange();
        }, 200);
    }
    getCellData(row: any, col: Column): any {
        return this.table.getCellData(row, col);
    }

    gelCellTitle(row: any, col: Column) {
        const nestedProperties: string[] = col.field.split('.');
        let title: any = row;
        for (const prop of nestedProperties) {
            title = title ? title[prop] ?? undefined : undefined;
        }
        return title;
    }

}

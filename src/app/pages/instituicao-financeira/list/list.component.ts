import { InstituicaoFinanceiraService } from 'src/app/services/instituicao-financeira.service';

import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { PessoaList } from 'src/app/models/pessoa.model';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { pessoaOperacaoAllColumns } from 'src/app/models/pessoa-operacao.model';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';
import { instituicaoFinanceiraColumns } from 'src/app/models/instituicao-financeira.model';
import * as dados from 'dados.json'
import { InstituicaoFinanceiraList } from 'src/app/models/instituicao-financeira.model';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    faFilePdf = faFilePdf;
    maskType = MaskType;
    list: InstituicaoFinanceiraList[] = []
    tableLinks: MenuTableLink[] = [];

    columns = instituicaoFinanceiraColumns;
    subscription: Subscription[] = [];
    screen: ScreenWidth = ScreenWidth.lg;
    dados: [
      {
      razaoSocial: "oi",
     }

    ]


    constructor(
        private table: Table,
        private instituicaoFinanceiraService: InstituicaoFinanceiraService,
        private isMobile: IsMobile
    ) {
        var list = this.instituicaoFinanceiraService.list.subscribe(res => {
            this.list = Object.assign([], res)

        });
        this.subscription.push(list);
        var mob = this.isMobile.value.subscribe(res => this.screen = res);
        this.subscription.push(mob);

        lastValueFrom(this.instituicaoFinanceiraService.getList());

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [

                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                    { label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] },
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }



}

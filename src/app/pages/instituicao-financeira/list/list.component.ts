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
import { AccountService } from 'src/app/services/account.service';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
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
  empresaSelected?: Empresa;
  columns = instituicaoFinanceiraColumns;
  subscription: Subscription[] = [];
  loading = false;

  constructor(
    private table: Table,
    private instituicaoFinanceiraService: InstituicaoFinanceiraService,
    private accountService: AccountService,
    private empresaService: EmpresaService
  ) {
    var list = this.instituicaoFinanceiraService.list.subscribe(res => this.list = Object.assign([], res));
    this.subscription.push(list);

    var loading = this.instituicaoFinanceiraService.loading.subscribe(res => this.loading = res);
    this.subscription.push(loading);


    var empresa = this.empresaService.empresaSelected.subscribe(async res => {
      this.empresaSelected = res.empresa;
      if (res && res.id) {
        await lastValueFrom(this.instituicaoFinanceiraService.getList(true));
      }
    });
    this.subscription.push(empresa);
    lastValueFrom(this.instituicaoFinanceiraService.getList(true));

    var selected = this.table.selected.subscribe(res => {
      if (res) {
        this.tableLinks = [
          { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
        ];

        if (this.accountService.accountValue?.perfilAcesso_Id != 3) {
          this.tableLinks.push({ label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] })
        }
        this.tableLinks = this.table.encryptParams(this.tableLinks);
      }
    });
    this.subscription.push(selected);

  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }
  getList() {
    lastValueFrom(this.instituicaoFinanceiraService.getList(true));
  }




}

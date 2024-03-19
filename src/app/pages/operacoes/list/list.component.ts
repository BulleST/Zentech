import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaOperacaoList, pessoaOperacaoAllColumns } from 'src/app/models/pessoa-operacao.model';
import { faFilePdf, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { getError } from 'src/app/utils/error';
import { LoadingService } from 'src/app/parts/loading/loading';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    providers: [ConfirmationService]
})
export class ListComponent {
    faFilePdf = faFilePdf;
    faTrash = faTrash;
    maskType = MaskType;
    list: PessoaOperacaoList[] = [];
    tableLinks: MenuTableLink[] = [];
    columns = pessoaOperacaoAllColumns;
    subscription: Subscription[] = [];
    loading = false;
    empresaSelected?: Empresa;

    selectedItems: PessoaOperacaoList[] = [];

    constructor(
        private table: Table,
        private pessoaOperacaoService: PessoaOperacaoService,
        private pessoaService: PessoaService,
        private accountService: AccountService,
        private empresaService: EmpresaService,
        private confirmationService: ConfirmationService,
        private toastr: ToastrService,
        private loadingService: LoadingService,
    ) {
        var list = this.pessoaOperacaoService.list.subscribe(res => this.list = Object.assign([], res));
        this.subscription.push(list);

        var loading = this.pessoaOperacaoService.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);

        if (this.pessoaService.list.value.length == 0) {
            lastValueFrom(this.pessoaService.getList(true));
        }
        var empresa = this.empresaService.getEmpresa().subscribe(async res => {
            this.empresaSelected = res.empresa;
            this.table.onRowUnselect();
            this.table.selectedItems.next([]);
            if (res && res.id) {
                await lastValueFrom(this.pessoaOperacaoService.getList(true));
            }
        });
        this.subscription.push(empresa);

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Detalhes', routePath: ['detalhes'], paramsFieldName: ['id'] },
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                ];
                if (this.accountService.accountValue?.perfilAcesso_Id != 3) {
                    this.tableLinks.push({ label: 'Excluir', routePath: ['excluir'], paramsFieldName: ['id'] })
                }

                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);
        
        var selectedItems = this.table.selectedItems.subscribe(res => this.selectedItems = res);
        this.subscription.push(selectedItems);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }

    getList() {
        lastValueFrom(this.pessoaOperacaoService.getList(true));
    }

    excluirLista(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Tem certeza que deseja excluir essas linhas? \n Esses registros não poderão ser recuperados. \n Esse processo pode demorar, não feche a aba do seu navegador.',
            header: 'Excluir linhas',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon:"none",
            acceptButtonStyleClass:"btn btn-primary",
            acceptLabel: "Excluir",
            rejectIcon:"none",
            rejectLabel: "Cancelar",
            rejectButtonStyleClass:"btn btn-grey me-2",
            closeOnEscape: true,
            dismissableMask: true,
            accept: () => {
                this.excluirListaConfirmed(event);
            },
            reject: () => {
            }
        });
    }

    excluirListaConfirmed(event: Event) {
        var ids = this.selectedItems.map(x => x.id);

        this.loadingService.message.next('Excluindo registros. Essa operação pode demorar, não feche esta aba.');
        this.pessoaOperacaoService.loading.next(true);
        lastValueFrom(this.pessoaOperacaoService.deleteList(ids))
        .then(res => {
            this.getList();
            this.loadingService.message.next('');
            this.pessoaOperacaoService.loading.next(false);
            if (res.sucesso) {
                this.toastr.success('Exclusão concluída com sucesso')
            } else {
                this.toastr.error('Ocorreu um erro na exclusão.');
                this.confirmationService.confirm({
                    target: event.target as EventTarget,
                    message: res.mensagem,
                    header: 'Excluir linhas falhou',
                    icon: 'pi pi-times',
                    acceptIcon:"none",
                    acceptButtonStyleClass:"btn btn-primary",
                    acceptLabel: "OK",
                    rejectVisible: false,
                    closeOnEscape: true,
                    dismissableMask: true,
                    accept: () => {},
                    reject: () => {}
                });
            }
        })
        .catch(res => {
            this.pessoaOperacaoService.loading.next(false);
            this.loadingService.message.next('');
            this.toastr.error('Ocorreu um erro na exclusão.');
                this.confirmationService.confirm({
                    target: event.target as EventTarget,
                    message: getError(res),
                    header: 'Excluir linhas falhou',
                    icon: 'pi pi-times',
                    acceptIcon:"none",
                    acceptButtonStyleClass:"btn btn-primary",
                    acceptLabel: "OK",
                    rejectVisible: false,
                    closeOnEscape: true,
                    dismissableMask: true,
                    accept: () => {},
                    reject: () => {}
                });
            })
    }

}

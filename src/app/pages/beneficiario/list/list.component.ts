import { BeneficiarioList, beneficiarioColumns } from './../../../models/beneficiario.model';
import { BeneficiarioService } from './../../../services/beneficiario.service';
import { Component } from '@angular/core';
import { MaskType } from 'src/app/helpers/column.interface';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { IsMobile, ScreenWidth } from 'src/app/utils/mobile';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaSelected, EmpresaService } from 'src/app/services/empresa.service';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    faFilePdf = faFilePdf;
    maskType = MaskType;
    list: BeneficiarioList[] = []
    tableLinks: MenuTableLink[] = [];
    columns = beneficiarioColumns;
    subscription: Subscription[] = [];
    // empresaSelected?: Empresa;

    constructor(
        private table: Table,
        private beneficiarioService: BeneficiarioService,
        // private empresaService: EmpresaService,
    ) {
        var list = this.beneficiarioService.list.subscribe(res => this.list = res);
        this.subscription.push(list);
        
        // var empresa = this.empresaService.empresaSelected.subscribe(async res => {
        //     this.empresaSelected = res.empresa;
        //     console.log(this.empresaSelected)
        //     if (res && res.id) {
        //         await lastValueFrom(this.beneficiarioService.getList(res.id));
        //     }
        // });
        // this.subscription.push(empresa);

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

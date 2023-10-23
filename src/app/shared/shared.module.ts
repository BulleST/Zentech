import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TableModule } from "primeng/table";
import { ToastrModule } from "ngx-toastr";
import { NgxMaskModule } from "ngx-mask";

import { ListSharedComponent } from "./list/list.component";
import { ModalComponent } from './modal/modal.component';

@NgModule({
    declarations: [
        ListSharedComponent,
        ModalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FontAwesomeModule,
        TableModule,
        NgxMaskModule.forChild(),
        ToastrModule,
    ],
    exports: [
        ListSharedComponent,
        ModalComponent,
    ],
})
export class SharedModule {

}

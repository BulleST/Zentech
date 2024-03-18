import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { ToastrModule } from "ngx-toastr";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { ToastModule } from "primeng/toast";
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        CalendarModule,
        DialogModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        FontAwesomeModule,
        NgxMaskDirective,
        NgxMaskPipe,
        OverlayPanelModule,
        TabViewModule,
        TableModule,
        ToastrModule,
        ToastModule,
        CheckboxModule,
    ],
    exports: [
        CommonModule,
        CalendarModule,
        DialogModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        FontAwesomeModule,
        NgxMaskDirective,
        NgxMaskPipe,
        OverlayPanelModule,
        TabViewModule,
        TableModule,
        ToastrModule,
        ToastModule,
        CheckboxModule,
    ],
    providers: [
        provideNgxMask()
    ]
})
export class LibrariesModule {

}

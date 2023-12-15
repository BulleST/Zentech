import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Crypto } from 'src/app/utils/crypto';

@Component({
    selector: 'app-p-dropdown-actions',
    templateUrl: './p-dropdown-actions.component.html',
    styleUrls: ['./p-dropdown-actions.component.css']
})
export class PDropdownActionsComponent implements OnChanges {
    faTrash = faTrash;
    faEdit = faEdit;
    faPlus = faPlus;

    @Input() options: any[] = [];
    @Input() path: string = '';
    @Input() required: boolean = true;
    @Input() loading: boolean = true;
    @Input() value: number = undefined as unknown as number;
    @Output() valueChanges: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private crypto: Crypto,
    ) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['options'])
            this.options = changes['options'].currentValue;
        if (changes['path'])
            this.path = changes['path'].currentValue;
        if (changes['value'])
            this.value = changes['value'].currentValue;
        if (changes['required'])
            this.required = changes['required'].currentValue;
        if (changes['loading'])
            this.loading = changes['loading'].currentValue;

    }

    formPath(routePath: string, id?: number) {
        this.valueBackup();
        if (id)
            this.router.navigate([routePath, this.crypto.encrypt(id)], { relativeTo: this.activatedRoute })
        else
            this.router.navigate([routePath], { relativeTo: this.activatedRoute })
    }

    delete(id: number, routePath?: string) {
        this.valueBackup();
        this.router.navigate([routePath, 'delete', this.crypto.encrypt(id)], { relativeTo: this.activatedRoute })
    }

    valueBackup() {
        var idBackup = this.value;
        setTimeout(() => {
            this.value = idBackup;
        }, 200)
    }

    valueChange(value: number) {
        this.valueChanges.emit(value);
    }
}

import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModel, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-input-date',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }] // Permite validação de form pai em input de componente filho
})
export class InputDateComponent implements OnChanges, AfterViewInit {

    @Input() type: 'date' | 'datetime-local';

    @Input() valueInput: Date | undefined;
    @Input() inputId: string = '';
    @Input() min?: string = '1900-01-01';
    @Input() max?: string ;
    @Input() required: boolean = false;
    @Input() readonly: boolean = false;
    @Input() showErrorMessage: boolean = true;
    @Input() disabled = false;
    @Input() error: ValidationErrors | null;

    @Output() valueChanges: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() ngModelChanged: EventEmitter<NgModel> = new EventEmitter<NgModel>();
    @ViewChild('data') data: NgModel;
    viewInit = false;

    constructor(
        private toastrService: ToastrService,
        private datepipe: DatePipe,
    ) { 
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['valueInput']) this.valueInput = changes['valueInput'].currentValue;
        if (changes['inputId']) this.inputId = changes['inputId'].currentValue;
        if (changes['min']) this.min = changes['min'].currentValue;
        if (changes['max']) {
            this.max = changes['max'].currentValue;
            if (this.max == 'hoje') {
                this.max = this.datepipe.transform(new Date(), 'yyyy-MM-dd') as string;
            }
        }
        if (changes['required']) this.required = changes['required'].currentValue;
        if (changes['showErrorMessage']) this.showErrorMessage = changes['showErrorMessage'].currentValue;
        if (changes['readonly']) this.readonly = changes['readonly'].currentValue;
        if (changes['disabled']) this.disabled = changes['disabled'].currentValue;
        if (changes['type']) this.type = changes['type'].currentValue;

        if (this.type && this.valueInput) {
            if(this.type == 'date' && (this.valueInput as unknown as string ).length > 10) {
                this.valueInput = this.valueInput.toString().substring(0,10) as unknown as Date;
                this.inputChanged();
            }
        }
    }

    ngAfterViewInit(): void {
        this.viewInit = true;
    }

    setErrors(errors: ValidationErrors | null) {
        this.error = errors;
        this.data.control.setErrors(this.error)
    }


    validate( ) {
        if (!this.valueInput && this.required ) {
            this.data.control.setErrors(Object.assign({}, { required: true }));
            valid = false;
            return valid;
        } else {
            if (this.valueInput) {
                var valueDate = new Date(this.valueInput);
                var min = this.min ? new Date(this.min) : undefined;
                var max = this.max ? new Date(this.max) : undefined;
                var valid = true;
                if (this.required == true && !this.valueInput.toString().trim()) {
                    this.data.control.setErrors(Object.assign({}, { required: true }));
                    valid = false;
                }
                else if (max != undefined && (valueDate > max)) {
                    this.toastrService.error('O valor máximo é ' + this.max);
                    this.data.control.setErrors(Object.assign({}, { max: true }));
                    valid = false;
                }
                else if (min != undefined && (valueDate < min)) {
                    this.toastrService.error('O valor mínimo é ' + this.min);
                    this.data.control.setErrors(Object.assign({}, { min: true }));
                    valid = false;
                }
                return valid;
            }
            
        }
        return true;
    }



    inputChanged() {
        this.valueChanges.emit(this.valueInput);
        this.ngModelChanged.emit(this.data)
    }

}


class FormatNumber {
    value: number = 0;
    min?: number;
    max?: number;
    skip: number = 0;
    allowNegativeNumbers: boolean = true;
}
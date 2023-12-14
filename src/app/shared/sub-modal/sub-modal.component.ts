import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sub-modal',
  templateUrl: './sub-modal.component.html',
  styleUrls: ['./sub-modal.component.css']
})
export class SubModalComponent implements OnChanges {
    @Input() title: string = '';
    @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() modalOpen: boolean;
    @Input() template: TemplateRef<any>;
    @Input() style?: object = { 'max-width': '1000px' };
    @Input() icon?: TemplateRef<any>;

    constructor(
    ) {
    }

    voltar() {
        this.onClose.emit(true);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['title']) this.title = changes['title'].currentValue;
        if (changes['icon']) this.icon = changes['icon'].currentValue;
        if (changes['template']) this.template = changes['template'].currentValue;
        if (changes['style']) this.style = changes['style'].currentValue;
            
        if (changes['modalOpen']) {
            setTimeout(() => {
                this.modalOpen = changes['modalOpen'].currentValue;
            }, 300);
        }
    }
}



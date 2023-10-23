import { Component, EventEmitter, HostListener, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'src/app/utils/modal';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent {

    title = '';
    template: TemplateRef<any> | undefined = undefined;
    style: object = { 'max-width': '1000px' };
    routerBack: string[] = [];
    activatedRoute: ActivatedRoute | undefined = undefined;
    onClose = new EventEmitter();
    icon: TemplateRef<any> | undefined = undefined;

    constructor(private modal: Modal) {
        this.modal.setOpen(false);

        this.modal.title.subscribe(res => this.title = res);
        this.modal.template.subscribe(res => this.template = res);
        this.modal.style.subscribe(res => this.style = res);
        this.modal.routerBack.subscribe(res => this.routerBack = res);
        this.modal.activatedRoute.subscribe(res => this.activatedRoute = res);
        this.modal.onClose.subscribe(res => this.onClose = res);
        this.modal.icon.subscribe(res => this.icon = res);

    }

    @HostListener('paste', ['$event'])
    paste(e: ClipboardEvent) {
        console.log('oi')

        this.modal.onPaste.emit(e);
      
    }

}

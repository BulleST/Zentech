import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { ContratoEvento } from 'src/app/models/contrato-evento.model';
import { ContratoTipo } from 'src/app/models/contrato-tipo.model';
import { InvoiceRequest } from 'src/app/models/invoice.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { ContratoEventoService } from 'src/app/services/contrato-evento.service';
import { ContratoTipoService } from 'src/app/services/contrato-tipo.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { getError } from 'src/app/utils/error';

@Component({
  selector: 'app-form-contrato',
  templateUrl: './form-contrato.component.html',
  styleUrls: ['./form-contrato.component.css']
})
export class FormContratoComponent implements OnChanges {
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight

    tipos: ContratoTipo[] = []
    loadingTipo = true;

    eventos: ContratoEvento[] = []
    loadingEvento = true;

    subscription: Subscription[] = [];

    @Input() objeto: InvoiceRequest = new InvoiceRequest;
    @Input() erro: string = '';
    @Input() loading: boolean = false;
    @Input() isEditPage: boolean = false;
    @Input() form: NgForm;
    @Input() podeBaixarPDF: boolean = false;
    @Input() readonly: boolean = false;


    @Output() erroChange = new EventEmitter<string>();
    @Output() loadingChange = new EventEmitter<boolean>();
    @Output() podeBaixarChanged = new EventEmitter<boolean>();
    @Output() tabChanged = new EventEmitter<number>();
    @Output() objetoChanged = new EventEmitter<InvoiceRequest>()

    constructor(
        private contratoTipoService: ContratoTipoService,
        private contratoEventoService: ContratoEventoService,
        private toastr: ToastrService,
        private contratoService: ContratoService,
        private loadingService: LoadingService,
        ) {
        lastValueFrom(this.contratoTipoService.getList())
            .then(res => this.tipos = res)
            .finally(() => this.loadingTipo = false);

        lastValueFrom(this.contratoEventoService.getList())
            .then(res => this.eventos = res)
            .finally(() => this.loadingEvento = false);
        
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['objeto']) this.objeto = changes['objeto'].currentValue;
        if (changes['erro']) this.erro = changes['erro'].currentValue;
        if (changes['loading']) this.loading = changes['loading'].currentValue;
        if (changes['isEditPage']) this.isEditPage = changes['isEditPage'].currentValue;
        if (changes['form']) this.form = changes['form'].currentValue;
        if (changes['podeBaixarPDF']) this.podeBaixarPDF = changes['podeBaixarPDF'].currentValue;
        if (changes['readonly']) this.readonly = changes['readonly'].currentValue;
    }

    calcula() {
        this.objetoChanged.emit(this.objeto);
    }


    async contratoDownload() {
        if (this.objeto.invoice.id == 0) {
            this.toastr.error('Você deve primeiro salvar os dados para fazer o download.')
            return
        }
        this.loading = true;
        this.loadingService.message.next('Carregando Contrato.')
        
        try {
            await lastValueFrom(this.contratoService.contrato(this.objeto.contrato.id))
        } catch (e: any) {
            this.erro = getError(e);
            this.loading = false;
            this.loadingService.message.next('');
        }
    }
    proximo() {
        this.objetoChanged.emit(this.objeto);
        this.tabChanged.emit(2);
    }

    anterior() {
        this.objetoChanged.emit(this.objeto);
        this.tabChanged.emit(0);
    }

}

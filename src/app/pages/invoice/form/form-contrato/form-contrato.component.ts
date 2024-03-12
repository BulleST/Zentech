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

    @Output() erroChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() podeBaixarChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() tabChanged: EventEmitter<number> = new EventEmitter<number>();
    @Output() send: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    }

    calculaMoedaNacional() {
        if (this.objeto.invoice.valor && this.objeto.contrato.taxa) {
            this.objeto.contrato.valorNacional = this.objeto.invoice.valor * this.objeto.contrato.taxa;
        }
    }

    calculaVET() {
        if (this.objeto.invoice.valor && this.objeto.contrato.valorNacional) {
            // VET = (Valor Moeda Nacional + ( Valor Moeda Nacional * 0.38 )) / Valor Invoice
            this.objeto.contrato.vet = (this.objeto.contrato.valorNacional + (this.objeto.contrato.valorNacional * (0.38 / 100))) / this.objeto.invoice.valor;
        }
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
            console.log(e)
            this.erro = getError(e);
            this.loading = false;
            this.loadingService.message.next('');
        }
    }
    proximo() {
        this.tabChanged.emit(2)
    }

    anterior() {
        this.tabChanged.emit(0)
    }

}

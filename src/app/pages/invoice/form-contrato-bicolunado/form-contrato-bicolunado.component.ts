import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { faArrowLeft, faArrowRight, faCheck, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { BeneficiarioRequest } from 'src/app/models/beneficiario.model';
import { InvoiceRequest } from 'src/app/models/invoice.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { ContratoService } from 'src/app/services/contrato.service';
import { getError } from 'src/app/utils/error';

@Component({
    selector: 'app-form-contrato-bicolunado',
    templateUrl: './form-contrato-bicolunado.component.html',
    styleUrls: ['./form-contrato-bicolunado.component.css'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }] // Permite validação de form pai em input de componente filho
})
export class FormContratoBicolunadoComponent implements OnChanges {
    faPenClip = faPenClip;
    faCheck = faCheck;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;

    @Input() objeto: InvoiceRequest = new InvoiceRequest;
    @Input() beneficiarioSelected?: BeneficiarioRequest;
    @Input() erro: string = '';
    @Input() loading: boolean = false;
    @Input() podeBaixarPDF: boolean = false;

    assinadoRepresentanteLegal = false;
    assinadoIntermediadora = false;
    certificadoAssinaturaIncluido = false;

    assinaturaUploadedFile?: File;
    assinaturaIsUploaded = false;
    alterarRepresentanteLegal = false;
    loadingContratoBicolunadoFile = false;

    podeAssinarRepresentanteLegal: boolean = false;

    @Output() erroChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() podeBaixarChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() send: EventEmitter<any> = new EventEmitter<any>();
    @Output() tabChanged: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private contratoService: ContratoService,
        private toastr: ToastrService,
        private loadingService: LoadingService,
    ) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['objeto']) {
            this.objeto = changes['objeto'].currentValue;
            console.log('oi', this.objeto )
            this.setPodeBaixarChange()

        }
        if (changes['beneficiarioSelected']) this.beneficiarioSelected = changes['beneficiarioSelected'].currentValue;
        if (changes['erro']) this.erro = changes['erro'].currentValue;
        if (changes['loading']) this.loading = changes['loading'].currentValue;
        if (changes['podeBaixarPDF']) this.podeBaixarPDF = changes['podeBaixarPDF'].currentValue;
    }

    alterarDadosRepresentanteLegal() {
        this.alterarRepresentanteLegal = !this.alterarRepresentanteLegal;

        if (!this.alterarRepresentanteLegal) { 
            this.objeto.contrato.assinaturaRepresentanteLegal = this.beneficiarioSelected ? this.beneficiarioSelected.assinaturaRepresentanteLegal : '';
            this.objeto.contrato.nomeRepresentanteLegal = this.beneficiarioSelected ? this.beneficiarioSelected.nomeRepresentanteLegal : '';
            this.objeto.contrato.codigoRepresentanteLegal = this.beneficiarioSelected ? this.beneficiarioSelected.codigoRepresentanteLegal : '';
            this.assinaturaIsUploaded = false;
            delete this.assinaturaUploadedFile;
        }
    }

    readonlyRepresentanteLegal() {
        var camposPreenchidos = false;
        if (this.objeto.contrato.nomeRepresentanteLegal && this.objeto.contrato.codigoRepresentanteLegal && this.objeto.contrato.assinaturaRepresentanteLegal) {
            camposPreenchidos = true;
        }
        var eReadOnly = (camposPreenchidos && !this.alterarRepresentanteLegal) || !this.alterarRepresentanteLegal;
        return eReadOnly;
    }

    async assinarRepresentanteLegal() {
        if (!this.objeto.contrato.assinaturaRepresentanteLegal) {
            this.toastr.error('Inclua uma assinatura válida para assinar.')
            return;
        }
        if (!this.objeto.invoice.beneficiario_Id) {
            this.toastr.error('Selecione um beneficiário para assinar.')
            return;
        }


        this.loadingChange.emit(true);
        await lastValueFrom(this.contratoService.assinarRepresentanteLegal(this.objeto.contrato.id))
        .then(res => {
            if (res.sucesso) {
                this.assinadoRepresentanteLegal = true;
                this.objeto.contrato = res.objeto;
                this.setPodeBaixarChange();
            } else {
                this.erroChange.emit(res.mensagem);
            }
        })
        .catch(res => {
            this.erroChange.emit(getError(res));
        })
        this.loadingChange.emit(false);
    }
    async assinarMAC() {
        this.loadingChange.emit(true);
        await lastValueFrom(this.contratoService.assinarMAC(this.objeto.contrato.id))
        .then(res => {
            if (res.sucesso) {
                this.assinadoIntermediadora = true;
                this.objeto.contrato = res.objeto;
                this.setPodeBaixarChange();
            } else {
                this.erroChange.emit(res.mensagem);
            }
        })
        .catch(res => {
            this.erroChange.emit(getError(res));
        })
        this.loadingChange.emit(false);
    }

    fileChange(event: any) {
        var file = event.target.files[0] as File;
        this.assinaturaUploadedFile = file;

        if (file) {
            var reader = new FileReader();
            var c = this;
            reader.onload = function (e) {
                var src = e.target?.result as string;
                c.objeto.contrato.assinaturaRepresentanteLegal = src;
                c.assinaturaIsUploaded = true;
            }
            reader.onerror = function (e) {
                c.toastr.error('Não foi possível realizar upload');
            }
            var a = reader.readAsDataURL(file)

        } else {
            this.toastr.error('Selecione uma imagem para salvar.')
        }
    }

    async certificadoAssinatura() {
        this.loadingChange.emit(true);
        await lastValueFrom(this.contratoService.certificadoAssinatura(this.objeto.contrato.id))
        .then(res => {
            if (res.sucesso) {
                this.certificadoAssinaturaIncluido = true;
                this.objeto.contrato = res.objeto;
                this.setPodeBaixarChange();
            } else {
                this.erroChange.emit(res.mensagem);
            }
        })
        .catch(res => {
            this.erroChange.emit(getError(res));
        })
        this.loadingChange.emit(false);
    }

    async contratoBicolunadoDownload() {
        if (this.objeto.contrato.id == 0) {
            this.toastr.error('Você deve primeiro salvar os dados para fazer o download.')
            return
        }
        this.loadingContratoBicolunadoFile = true;
        this.loadingService.message.next('Carregando Contrato Bicolunado.')

        try {
            await lastValueFrom(this.contratoService.contratoBicolunado(this.objeto.contrato.id))
        } catch (e: any) {
            console.log(e)
            this.erroChange.emit(getError(e));
            this.loadingContratoBicolunadoFile = false;
            this.loadingService.message.next('');
        }
    }

    setPodeBaixarChange() {
        this.assinadoRepresentanteLegal = this.objeto.contrato.dataAssinaturaRepresentanteLegal != null && this.objeto.contrato.dataAssinaturaRepresentanteLegal != undefined;
        this.assinadoIntermediadora = this.objeto.contrato.dataAssinaturaIntermediadora != null && this.objeto.contrato.dataAssinaturaIntermediadora != undefined;
        this.certificadoAssinaturaIncluido = this.objeto.contrato.dataCertificadoAssinatura != null && this.objeto.contrato.dataCertificadoAssinatura != undefined;
        this.podeBaixarPDF = this.assinadoRepresentanteLegal 
                            && this.assinadoIntermediadora 
                            && this.certificadoAssinaturaIncluido
                            && this.objeto.contrato.id != 0;
        this.podeBaixarChanged.emit(this.podeBaixarPDF);
        this.podeAssinarRepresentanteLegal = !!(this.objeto.contrato.nomeRepresentanteLegal && this.objeto.contrato.codigoRepresentanteLegal && this.objeto.contrato.assinaturaRepresentanteLegal);
    }


    sendValues() {
        this.send.emit(true);
        this.alterarRepresentanteLegal = false;
    }
    
    proximo() {
        this.tabChanged.emit(3)
    }

    anterior() {
        this.tabChanged.emit(1)
    }
}

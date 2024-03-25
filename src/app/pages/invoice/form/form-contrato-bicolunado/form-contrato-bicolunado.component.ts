import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { faArrowLeft, faArrowRight, faCheck, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { BeneficiarioRequest } from 'src/app/models/beneficiario.model';
import { Empresa } from 'src/app/models/empresa.model';
import { InvoiceRequest } from 'src/app/models/invoice.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { ContratoService } from 'src/app/services/contrato.service';
import { EmpresaSelected, EmpresaService } from 'src/app/services/empresa.service';
import { InvoiceService } from 'src/app/services/invoice.service';
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
    @Input() readonly: boolean = false;
    @Input() empresa: Empresa;
    @Input() isEditPage: boolean = false;
    @Input() form: NgForm;


    certificadoAssinaturaIncluido = false;
    assinatura_Contratante: Assinatura = new Assinatura;
    assinatura_Intermediadora: Assinatura = new Assinatura;
    loadingContratoBicolunadoFile = false;
    empresaSelected?: Empresa;

    @Output() erroChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() podeBaixarChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() tabChanged: EventEmitter<number> = new EventEmitter<number>();
    @Output() objetoChanged = new EventEmitter<InvoiceRequest>();
    @Output() send = new EventEmitter<boolean>();

    constructor(
        private contratoService: ContratoService,
        private toastr: ToastrService,
        private loadingService: LoadingService,
        private invoiceService: InvoiceService,
        private empresaService: EmpresaService
    ) {
        this.empresaService.getEmpresa().subscribe(res => this.empresaSelected = res.empresa)

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['objeto']) {
            this.objeto = changes['objeto'].currentValue;
            
            this.assinatura_Contratante.alterarDados = false;
            this.assinatura_Intermediadora.alterarDados = false;

            this.setContratante(this.objeto.contrato.nomeRepresentanteLegal, this.objeto.contrato.codigoRepresentanteLegal, this.objeto.contrato.assinaturaRepresentanteLegal);
            this.setIntermediadora(this.objeto.contrato.assinaturaIntermediadora);
            this.setPodeBaixarChange();
        }
        if (changes['beneficiarioSelected']) {
            this.beneficiarioSelected = changes['beneficiarioSelected'].currentValue;
            this.setContratante(this.beneficiarioSelected?.nomeRepresentanteLegal, this.beneficiarioSelected?.codigoRepresentanteLegal, this.beneficiarioSelected?.assinaturaRepresentanteLegal);
            this.setPodeBaixarChange();
        };
        if (changes['erro']) this.erro = changes['erro'].currentValue;
        if (changes['loading']) this.loading = changes['loading'].currentValue;
        if (changes['podeBaixarPDF']) this.podeBaixarPDF = changes['podeBaixarPDF'].currentValue;
        if (changes['readonly']) this.readonly = changes['readonly'].currentValue;
        if (changes['empresa']) this.empresa = changes['empresa'].currentValue;
        if (changes['isEditPage']) {
            this.isEditPage = changes['isEditPage'].currentValue;
        };
        if (changes['form']) this.form = changes['form'].currentValue;
    }

    alterarDados_Contratante() {
        this.assinatura_Contratante.alterarDados = !this.assinatura_Contratante.alterarDados;

        if (!this.assinatura_Contratante.alterarDados) {
            this.setContratante(this.beneficiarioSelected?.nomeRepresentanteLegal, this.beneficiarioSelected?.codigoRepresentanteLegal, this.beneficiarioSelected?.assinaturaRepresentanteLegal)
            this.assinatura_Contratante.isUploaded = false;
            delete this.assinatura_Contratante.file;
        }
    }

    alterarDados_Intermediadora() {
        this.assinatura_Intermediadora.alterarDados = !this.assinatura_Intermediadora.alterarDados;

        if (!this.assinatura_Intermediadora.alterarDados) {
            this.setIntermediadora(this.objeto.contrato.assinaturaIntermediadora)
            this.assinatura_Intermediadora.isUploaded = false;
            delete this.assinatura_Intermediadora.file;
        }
    }

    readonly_Contratante() {
        var camposPreenchidos = false;
        if (this.objeto.contrato.nomeRepresentanteLegal && this.objeto.contrato.codigoRepresentanteLegal && this.objeto.contrato.assinaturaRepresentanteLegal) {
            camposPreenchidos = true;
        }
        var eReadOnly = (camposPreenchidos && !this.assinatura_Contratante.alterarDados) || !this.assinatura_Contratante.alterarDados;
        return eReadOnly;
    }


    async assinar_Contratante() {
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
                    this.objeto.contrato = res.objeto;
                    var contrato = res.objeto;
                    this.assinatura_Contratante.alterarDados = false;
                    this.setContratante(contrato.nomeRepresentanteLegal, contrato.codigoRepresentanteLegal, contrato.assinaturaRepresentanteLegal);
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

    async assinar_Intermediadora() {
        this.loadingChange.emit(true);
        await lastValueFrom(this.contratoService.assinarMAC(this.objeto.contrato.id))
            .then(res => {
                if (res.sucesso) {
                    var contrato = res.objeto;
                    this.objeto.contrato = contrato;
                    this.assinatura_Intermediadora.alterarDados = false;
                    this.setIntermediadora(contrato.assinaturaIntermediadora);
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
            this.erroChange.emit(getError(e));
            this.loadingContratoBicolunadoFile = false;
            this.loadingService.message.next('');
        }
    }

    setPodeBaixarChange() {
        // this.certificadoAssinaturaIncluido = !!this.objeto.contrato.dataCertificadoAssinatura;
        // // Pode baixar PDF se as assinaturas e certificados estão incluidos
        // this.podeBaixarPDF = this.assinatura_Contratante.assinado
        //     && this.assinatura_Intermediadora.assinado
        //     && this.certificadoAssinaturaIncluido
        //     && this.objeto.contrato.id != 0;

        this.podeBaixarPDF = this.objeto.contrato.id != 0;

        this.podeBaixarChanged.emit(this.podeBaixarPDF);
    }

    setContratante(nome?: string, codigo?: string, assinatura?: string) {
        this.objeto.contrato.nomeRepresentanteLegal = nome;
        this.objeto.contrato.codigoRepresentanteLegal = codigo;
        this.objeto.contrato.assinaturaRepresentanteLegal = assinatura;

        this.assinatura_Contratante.uri = assinatura;
        this.assinatura_Contratante.assinado = !!this.objeto.contrato.dataAssinaturaRepresentanteLegal; // Se tiver data, está assinado
        this.assinatura_Contratante.podeAssinar = !!(this.objeto.contrato.nomeRepresentanteLegal  // Nome está preenchido
                                                        && this.objeto.contrato.codigoRepresentanteLegal  // Código está preenchido
                                                        && this.objeto.contrato.assinaturaRepresentanteLegal // Assinatura está preenchido
                                                        && !this.assinatura_Contratante.assinado // Não foi assinado
                                                        && this.isEditPage); // Se for tela de edição
    }

    setIntermediadora(assinatura?: string) {
        this.objeto.contrato.assinaturaIntermediadora = assinatura;
        this.assinatura_Intermediadora.uri = assinatura;
        this.assinatura_Intermediadora.assinado = !!this.objeto.contrato.dataAssinaturaIntermediadora; // Se tiver data, está assinado
        this.assinatura_Intermediadora.podeAssinar = !!(assinatura // Assinatura está preenchido
                                                        && !this.assinatura_Intermediadora.assinado // Não foi assinado
                                                        && this.isEditPage); // Se for tela de edição
    }

    proximo() {
        this.objetoChanged.emit(this.objeto);
            this.tabChanged.emit(3)
    }

    anterior() {
        this.objetoChanged.emit(this.objeto);
        this.tabChanged.emit(1)
    }
}


class Assinatura {
    uri?: string;
    file?: File;
    isUploaded: boolean = false;
    assinado: boolean = false;
    podeAssinar: boolean = false;
    erro: string = '';
    alterarDados = false;

    fileChange(event: any, component: FormContratoBicolunadoComponent) {
        var file = event.target.files[0] as File;
        this.file = file;

        if (file) {
            var reader = new FileReader();
            var c = this;
            reader.onload = function (e) {
                var src = e.target?.result as string;
                c.isUploaded = true;
                c.uri = src;
                if (event.target.id == '_assinatura_Contratante') {
                    component.objeto.contrato.assinaturaRepresentanteLegal = src;
                    var nome = component.objeto.contrato.nomeRepresentanteLegal;
                    var codigo = component.objeto.contrato.codigoRepresentanteLegal;
                    component.setContratante(nome, codigo, src)
                } else {/////fff
                    component.objeto.contrato.assinaturaIntermediadora = src;
                    component.setIntermediadora(src)
                }
                // component.setFormValid();
            }
            reader.onerror = function (e) {
                c.erro = 'Não foi possível realizar upload';
            }
            var a = reader.readAsDataURL(file)

        } else {
            this.erro = 'Selecione uma imagem para salvar.';
        }
    }
}
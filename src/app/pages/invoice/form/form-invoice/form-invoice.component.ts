import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { BancoRequest } from 'src/app/models/banco.model';
import { BeneficiarioList, BeneficiarioRequest } from 'src/app/models/beneficiario.model';
import { InstituicaoFinanceiraList } from 'src/app/models/instituicao-financeira.model';
import { InvoiceRequest } from 'src/app/models/invoice.model';
import { Moeda } from 'src/app/models/moeda.model';
import { Paises } from 'src/app/models/pais.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { AccountService } from 'src/app/services/account.service';
import { BancoService } from 'src/app/services/banco.service';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { InstituicaoFinanceiraService } from 'src/app/services/instituicao-financeira.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { MoedaService } from 'src/app/services/moeda.service';
import { PaisesService } from 'src/app/services/paises.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';

@Component({
    selector: 'app-form-invoice',
    templateUrl: './form-invoice.component.html',
    styleUrls: ['./form-invoice.component.css'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }] // Permite validação de form pai em input de componente filho
})
export class FormInvoiceComponent implements OnChanges {
    faEdit = faEdit;
    faTrash = faTrash;
    faArrowRight = faArrowRight;
    beneficiarios: BeneficiarioList[] = [];
    loadingBeneficiarios = false;
    beneficiarioSelected?: BeneficiarioRequest;
    bancoBeneficiarioSelected?: BancoRequest;

    paises: Paises[] = [];
    loadingPais = true;

    moedas: Moeda[] = [];
    loadingMoedas = true;

    instituicaoFinanceira: InstituicaoFinanceiraList[] = [];
    loadingInstituicaoFinanceira = true;

    podeExcluirMoeda = false;
    alterarConta = false;
    subscription: Subscription[] = [];
    
    @Input() objeto: InvoiceRequest = new InvoiceRequest;
    @Input() erro: string = '';
    @Input() loading: boolean = false;
    @Input() form: NgForm;
    @Input() podeBaixarPDF: boolean = false;

    @Output() erroChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() podeBaixarChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() tabChanged: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private toastr: ToastrService,
        private invoiceService: InvoiceService,
        private loadingService: LoadingService,
        private moedaService: MoedaService,
        private instituicaoFinanceiraService: InstituicaoFinanceiraService,
        private paisesService: PaisesService,
        private beneficiarioService: BeneficiarioService,
        private bancoService: BancoService,
        private crypto: Crypto,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private accountService: AccountService,
    ) {

        this.podeExcluirMoeda = this.accountService.accountValue?.perfilAcesso_Id == 1;

        lastValueFrom(this.moedaService.getList())
            .then(res => this.moedas = res)
            .finally(() => this.loadingMoedas = false);

        var moedas = this.moedaService.list.subscribe(res => this.moedas = res);
        this.subscription.push(moedas);

        lastValueFrom(this.beneficiarioService.getList())
            .then(res => {
                this.beneficiarios = res;
                this.loadingBeneficiarios = false;
            })
        var beneficiarios = this.beneficiarioService.list.subscribe(res => this.beneficiarios = res);
        this.subscription.push(beneficiarios);

        lastValueFrom(this.instituicaoFinanceiraService.getList())
            .then(res => this.instituicaoFinanceira = res)
            .finally(() => this.loadingInstituicaoFinanceira = false);

        var instituicaoFinanceira = this.instituicaoFinanceiraService.list.subscribe(res => this.instituicaoFinanceira = res);
        this.subscription.push(instituicaoFinanceira);

        lastValueFrom(this.paisesService.getList())
            .then(res => this.paises = res)
            .finally(() => this.loadingPais = false);

    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['objeto']) {
            this.objeto = changes['objeto'].currentValue;
            this.beneficiarioChange();
        }
        if (changes['beneficiarioSelected']) this.beneficiarioSelected = changes['beneficiarioSelected'].currentValue;
        if (changes['erro']) this.erro = changes['erro'].currentValue;
        if (changes['loading']) this.loading = changes['loading'].currentValue;
        if (changes['form']) this.form = changes['form'].currentValue;
        if (changes['podeBaixarPDF']) this.podeBaixarPDF = changes['podeBaixarPDF'].currentValue;
    }

    
    moedaEditar(moeda: Moeda) {
        var idEncrypted = this.crypto.encrypt(moeda.id);
        this.router.navigate(['moeda', idEncrypted], { relativeTo: this.activatedRoute })
    }

    moedaExcluir(id: number) {
        var idEncrypted = this.crypto.encrypt(id);
        this.router.navigate(['moeda', 'excluir', idEncrypted], { relativeTo: this.activatedRoute })
    }


    async beneficiarioChange() {
        if (this.objeto.invoice.beneficiario_Id) {
            this.loadingBeneficiarios = true;

            await lastValueFrom(this.beneficiarioService.get(this.objeto.invoice.beneficiario_Id))
                .then(async (res: BeneficiarioRequest) => {
                    res.pais_Id = (this.paises.find(x => x.id == res.pais_Id)?.nome ?? '') as unknown as number;
                    this.objeto.invoice.conta = res.conta;


                    this.objeto.contrato.nomeRepresentanteLegal = res.nomeRepresentanteLegal;
                    this.objeto.contrato.codigoRepresentanteLegal = res.codigoRepresentanteLegal;
                    this.objeto.contrato.assinaturaRepresentanteLegal = res.assinaturaRepresentanteLegal;

                    this.beneficiarioSelected = res;
                    this.objeto.contrato.paisPagRecExterior = res.pais_Id;
                    this.objeto.contrato.pagRecExterior = res.nome;

                    await lastValueFrom(this.bancoService.get(res.banco_Id))
                        .then(res => {
                            res.pais_Id = (this.paises.find(x => x.id == res.pais_Id)?.nome ?? '') as unknown as number;
                            this.bancoBeneficiarioSelected = res;
                        })
                        .catch(res => this.toastr.error('Não foi possível carregar dados do banco.'));
                })
                .catch(res => this.toastr.error('Não foi possível carregar dados do beneficiário.'));

            this.loadingBeneficiarios = false;
        } else {
            delete this.beneficiarioSelected;
            delete this.bancoBeneficiarioSelected;
        }
    }

    async invoiceDownload() {
        if (this.objeto.invoice.id == 0) {
            this.toastr.error('Você deve primeiro salvar os dados para fazer o download.')
            return
        }
        this.loadingChange.emit(true);
        this.loadingService.message.next('Carregando documento invoice.')

        try {
            await lastValueFrom(this.invoiceService.file(this.objeto.contrato.id))
        } catch (e: any) {
            console.log(e)
            this.erroChange.emit(getError(e));
            this.loadingChange.emit(false);
            this.loadingService.message.next('');
        }
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

    proximo() {
        this.tabChanged.emit(1)
    }

    alterarContaChange() {
        this.alterarConta = !this.alterarConta;
        if (!this.alterarConta) {
            this.objeto.invoice.conta = this.beneficiarioSelected?.conta as string;
        }
    }

}

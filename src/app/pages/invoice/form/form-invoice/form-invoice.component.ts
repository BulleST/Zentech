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
    @Input() readonly: boolean = false;

    @Output() erroChange = new EventEmitter<string>();
    @Output() loadingChange = new EventEmitter<boolean>();
    @Output() podeBaixarChanged = new EventEmitter<boolean>();
    @Output() tabChanged = new EventEmitter<number>();
    @Output() benefificarioChanged = new EventEmitter<BeneficiarioRequest>();
    @Output() objetoChanged = new EventEmitter<InvoiceRequest>();
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
    
    async ngOnChanges(changes: SimpleChanges) {
        if (changes['objeto']) {
            this.objeto = changes['objeto'].currentValue;
            await this.beneficiarioChange();
        }
        if (changes['erro']) this.erro = changes['erro'].currentValue;
        if (changes['loading']) this.loading = changes['loading'].currentValue;
        if (changes['form']) this.form = changes['form'].currentValue;
        if (changes['podeBaixarPDF']) this.podeBaixarPDF = changes['podeBaixarPDF'].currentValue;
        if (changes['readonly']) this.readonly = changes['readonly'].currentValue;
    }

    
    moedaEditar(moeda: Moeda) {
        var idEncrypted = this.crypto.encrypt(moeda.id);
        this.router.navigate(['moeda', idEncrypted], { relativeTo: this.activatedRoute })
    }

    moedaExcluir(id: number) {
        var idEncrypted = this.crypto.encrypt(id);
        this.router.navigate(['moeda', 'excluir', idEncrypted], { relativeTo: this.activatedRoute })
    }

    calcula() {
        this.objetoChanged.emit(this.objeto);
    }


    async beneficiarioChange() {
        if (this.objeto.invoice.beneficiario_Id) {
            this.loadingBeneficiarios = true;

            await lastValueFrom(this.beneficiarioService.get(this.objeto.invoice.beneficiario_Id))
                .then(async (res: BeneficiarioRequest) => {
                    res.pais_Id = (this.paises.find(x => x.id == res.pais_Id)?.nome ?? '') as unknown as number;
                    
                    console.log('beneficiarioChange', this.beneficiarioSelected?.id  != this.objeto.invoice.beneficiario_Id)
                    // Só altera a assinatura e conta se o beneficiário mudar
                    if (this.beneficiarioSelected?.id != this.objeto.invoice.beneficiario_Id) {
                        this.objeto.invoice.conta = res.conta;
                        this.objeto.contrato.nomeRepresentanteLegal = res.nomeRepresentanteLegal;
                        this.objeto.contrato.codigoRepresentanteLegal = res.codigoRepresentanteLegal;
                        this.objeto.contrato.assinaturaRepresentanteLegal = res.assinaturaRepresentanteLegal;
                    }
                    
                    
                    this.beneficiarioSelected = res;
                    this.benefificarioChanged.emit(res);
                    this.objeto.contrato.paisPagRecExterior = res.pais_Id;
                    this.objeto.contrato.pagRecExterior = res.nome;

                    this.objetoChanged.emit(this.objeto);
                    
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
            await lastValueFrom(this.invoiceService.file(this.objeto.invoice.id))
        } catch (e: any) {
            this.erroChange.emit(getError(e));
            this.loadingChange.emit(false);
            this.loadingService.message.next('');
        }
    }
    
    proximo() {
        this.objetoChanged.emit(this.objeto);
        this.tabChanged.emit(1)
    }

    alterarContaChange() {
        this.alterarConta = !this.alterarConta;
        if (!this.alterarConta) {
            this.objeto.invoice.conta = this.beneficiarioSelected?.conta as string;
        }
    }

}

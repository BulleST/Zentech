import { AfterViewInit, Component, HostListener, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCircleCheck, faCircleXmark, faTriangleExclamation, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ColumnFilter } from 'primeng/table';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaOperacaoImportacao } from 'src/app/models/pessoa-operacao.model';
import { PessoaResponse } from 'src/app/models/pessoa.model';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal';
import { validaCPF } from 'src/app/utils/validate-cpf';
import * as xlsx from 'xlsx';

@Component({
    selector: 'app-importacao',
    templateUrl: './importacao.component.html',
    styleUrls: ['./importacao.component.css']
})
export class ImportacaoComponent implements OnDestroy, AfterViewInit {
    faUpload = faUpload;
    faCircleXmark = faCircleXmark;
    faTriangleExclamation = faTriangleExclamation;
    faCircleCheck = faCircleCheck;

    loading = false;
    modalOpen = false;
    erro = '';
    subscription: Subscription[] = [];
    routerBack: string[] = ['../'];
    routeBackOptions: any;

    listErros: PessoaOperacaoImportacao[] = [];
    listAll: PessoaOperacaoImportacao[] = [];
    listOkValidation: PessoaOperacaoImportacao[] = [];
    requestResponse: PessoaResponse[] = [];

    filters = ['cpf', 'nome', 'dataNascimento', 'situacaoCPF', 'dataInscricao', 'digito', 'anoObito', 'excel_Status', 'excel_Data_Cap', 'excel_Hora_Cap', 'excel_IdNum', 'excel_Erro']

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    @ViewChild('file') file: NgModel;

    currentDateFilter = {
        dataTransacao: undefined,
    }
    retornoAPI = false;

    constructor(
        private toastr: ToastrService,
        private modal: Modal,
        private activatedRoute: ActivatedRoute,
        private pessoaOperacaoService: PessoaOperacaoService,
        private pessoaService: PessoaService,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };
        this.modal.title.next('Importar Arquivo')
        this.modal.style.next({ 'width': 'max-content', 'max-width': '95vw' })
        this.modal.routerBack.next(this.routerBack);
        this.modal.activatedRoute.next(this.activatedRoute);
        // this.modal.onPaste.subscribe(e => {
        //     this.paste(e);
        // })
    }

    ngAfterViewInit(): void {
        this.modal.template.next(this.template)
        this.modal.icon.next(this.icon);

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    primeNgDataFilter(value: Date, filterCallback: any, filter: ColumnFilter) {
        if (value) {
            filterCallback(new Date(value));
        } else {
            filter.clearFilter();
        }
    }

    ngOnDestroy(): void {
        this.modal.setOpen(false);
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
        this.modal.resetModal();
    }

    readExcel1(event: any) {
        this.loading = true;
        var file = event.target.files[0] as File;
        if (file) {
            var reader = new FileReader();
            this.listErros = [];
            this.listOkValidation = [];
            this.listAll = [];
            function readFile(classe: ImportacaoComponent) {
                reader.onload = function (event) {
                    const data = reader.result;
                    var workBook = xlsx.read(data, { type: 'binary' });
                    var jsonData = workBook.SheetNames.reduce((content: any, name: any) => {
                        const sheet = workBook.Sheets[name];
                        var text = xlsx.utils.sheet_to_txt(sheet, { blankrows: false, rawNumbers: false });
                        var rows = text.split('\n');
                        rows.splice(0, 1);
                        classe.readRows(rows, file.name);
                        return content;
                    }, {});
                    classe.loading = false;
                }
                reader.readAsBinaryString(file);
            }
            readFile(this);

        } else {
            this.toastr.info('Nenhum arquivo selecionado')
        }

    }

    readRows(rows: string[], excelName: string) {
        var id = (this.setNewId(this.listErros));
        var index = 1; // primeira linha é o header
        rows.forEach(row => {
            index = index + 1;
            id = id + 1;
            this.readCells(row, id, index, excelName);
        });
        setTimeout(() => {
            this.loading = false;
        }, 500);
    }

    readCells(row: any, id: number, linhaIndex: number, excelName: string) {
        var cells = row.split('\t');
        try {
            var dataTransacao = this.formataData(cells[0]);
            var tipoCliente = cells[1];
            var docCliente = cells[2] ? cells[2].toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').padStart(11, '0') : '';
            var nomeCliente = cells[3];
            var nomeComprador = cells[4];
            var paisCompradorVendedor = cells[5];
            var moeda = cells[6];
            var tipoTransacao = cells[7];
            var formaPagamento = cells[8];
            var valorMoedaEstrangeira = cells[9];
            var valorMoedaNacional = cells[10];
            var statusOperacao = cells[11];

            var obj: PessoaOperacaoImportacao = {
                id: id++,
                dataTransacao: dataTransacao,
                tipoCliente: tipoCliente,
                docCliente: docCliente,
                nomeCliente: nomeCliente,
                nomeComprador: nomeComprador,
                paisCompradorVendedor: paisCompradorVendedor,
                moeda: moeda,
                tipoTransacao: tipoTransacao,
                formaPagamento: formaPagamento,
                valorMoedaEstrangeira: valorMoedaEstrangeira,
                valorMoedaNacional: valorMoedaNacional,
                statusOperacao: statusOperacao,
                detalhes: '',
                sucesso: false,
                excel: 'Linha ' + linhaIndex + ' - ' + excelName,
                excelLinha: linhaIndex,
            };

            if (!dataTransacao || Number.isNaN(Date.parse(dataTransacao.toString()))) {
                // this.toastr.error('Data de transação inválida.');
                obj.detalhes = 'Data de transação inválida.';
                this.listErros.push(obj);
            }
            else if (!tipoCliente || !tipoCliente.trim()) {
                // this.toastr.error('Tipo de Cliente no Brasil é obrigatório.');
                obj.detalhes = 'Tipo de Cliente no Brasil é obrigatório.';
                this.listErros.push(obj);
            }
            else if (!docCliente || !validaCPF(docCliente)) {
                // this.toastr.error('CPF inválido.');
                obj.detalhes = 'CPF inválido.';
                this.listErros.push(obj);
            }
            else if (!nomeCliente || !nomeCliente.trim()) {
                // this.toastr.error('Nome do Cliente no Brasil é obrigatório.');
                obj.detalhes = 'Nome do Cliente no Brasil é obrigatório.';
                this.listErros.push(obj);
            }
            else if (!nomeComprador || !nomeComprador.trim()) {
                // this.toastr.error('Nome do comprador ou vendedor no exterior é obrigatório.');
                obj.detalhes = 'Nome do comprador ou vendedor no exterior é obrigatório.';
                this.listErros.push(obj);
            }
            else if (!paisCompradorVendedor || !paisCompradorVendedor.trim()) {
                // this.toastr.error('País do comprador ou vendedor no exterior é obrigatório.');
                obj.detalhes = 'País do comprador ou vendedor no exterior é obrigatório.';
                this.listErros.push(obj);
            }
            else if (!moeda || !moeda.trim()) {
                // this.toastr.error('Moeda é obrigatório.');
                obj.detalhes = 'Moeda é obrigatório.';
                this.listErros.push(obj);
            }
            else if (!tipoTransacao || !tipoTransacao.trim()) {
                // this.toastr.error('Tipo de transação é obrigatório.');
                obj.detalhes = 'Tipo de transação é obrigatório.';
                this.listErros.push(obj);
            }
            else if (!formaPagamento || !formaPagamento.trim()) {
                // this.toastr.error('Forma de pagamento é obrigatório.');
                obj.detalhes = 'Forma de pagamento é obrigatório.';
                this.listErros.push(obj);
            }
            else if (!valorMoedaEstrangeira || !valorMoedaEstrangeira.trim()) {
                // this.toastr.error('Valor na moeda estrangeira é obrigatório.');
                obj.detalhes = 'Valor na moeda estrangeira é obrigatório.';
                this.listErros.push(obj);
            }
            else if (!valorMoedaNacional || !valorMoedaNacional.trim()) {
                // this.toastr.error('Valor na moeda nacional é obrigatório.');
                obj.detalhes = 'Valor na moeda nacional é obrigatório.';
                this.listErros.push(obj);
            }
            else if (!statusOperacao || !statusOperacao.trim()) {
                // this.toastr.error('Status operação é obrigatório.');
                obj.detalhes = 'Status operação é obrigatório.';
                this.listErros.push(obj);
            }
            else {
                obj.detalhes = '';
                obj.sucesso = true;
                this.listOkValidation.push(obj)
            }
            if (this.listErros.length > 0) {
                this.modal.style.next({ 'width': '95vw', 'max-width': '95vw' })
            }
            this.listAll.push(obj);
            return obj;
        } catch(e) {
            console.error(e);
            this.toastr.error('Não foi possível importar uma linha. <br> Ignorando linha e processando próxima.');
        }
        return;

    }

    setNewId(list: any[]) {
        list = this.sortList(list);
        var id = list.length > 0 ? list[list.length - 1].id : 0
        return id + 1;
    }

    sortList(list: any[]) {
        list = list.sort((x: any, y: any) => x.id - y.id)
        return list
    }


    removeItem(item: PessoaOperacaoImportacao) {
        var pessoaIndex = this.listAll.findIndex(x => x.id == item.id && x.docCliente == item.docCliente);
        if (pessoaIndex != -1) {
            this.listAll.splice(pessoaIndex, 1);
        } else {
            this.toastr.error('Não foi possível remover item.')
        }

    }

    formataData(dataString: string, horaString?: string, where?: string) {
        try {
            var hour = 0;
            var min = 0;
            var seg = 0;
            var date = dataString.split('/')

            var year = parseInt(date[2]);
            var month = parseInt(date[1]);
            var day = parseInt(date[0]);

            if (horaString) {
                var time = horaString.split(':');
                hour = parseInt(time[0]);
                min = parseInt(time[1]);
                seg = parseInt(time[2]);
            }
            var fullDate = new Date(year, month, day, hour, min, seg);
            return fullDate;
        } catch (e) {
            return undefined as unknown as Date;
        }
    }



    send() {
        this.loading = true;
        this.erro = '';
        var list: PessoaOperacaoImportacao[] = Object.assign([], this.listOkValidation);
        list = list.map((x: PessoaOperacaoImportacao) => {
            delete x.id;
            delete x.detalhes;
            delete x.sucesso;
            delete x.excelLinha;
            delete x.statusCadastro;
            return x;
        })

        if (list.length == 0) {
            this.toastr.error('Nenhum item selecionado.');
            this.erro = 'Nenhum item selecionado.';
            return;
        }
        lastValueFrom(this.pessoaOperacaoService.importacao(list))
            .then(res => {
                this.loading = false;
                this.toastr.clear();
                if (res.successo) {
                    lastValueFrom(this.pessoaOperacaoService.getList());
                    lastValueFrom(this.pessoaService.getList());
                    this.voltar();
                } else {
                    this.toastr.error(res.mensagem);
                    this.erro = res.mensagem;
                    this.retornoAPI = true;
                }
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }
}

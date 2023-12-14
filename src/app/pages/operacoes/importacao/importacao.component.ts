import { AfterViewInit, Component, HostListener, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCircleCheck, faCircleXmark, faTriangleExclamation, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ColumnFilter } from 'primeng/table';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaOperacaoImportacao } from 'src/app/models/pessoa-operacao.model';
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

    list: PessoaOperacaoImportacao[] = [];

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
        this.modal.onPaste.subscribe(e => {
            this.paste(e);
        })
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

    @HostListener('paste', ['$event'])
    paste(e: ClipboardEvent) {
        var list = e.clipboardData?.getData('text/plain').split('\r\n') ?? [];
        var id = this.setNewId(this.list);
        for (var item of list) {
            var cells = item.split('\t');
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

                if (Number.isNaN(Date.parse(dataTransacao.toString()))) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Data de transação inválida.');
                } 
                else if (!tipoCliente.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Tipo de Cliente no Brasil não foi preenchido corretamente.');
                } 
                else if (!validaCPF(docCliente)) {
                    this.toastr.error('Não foi possível importar essa linha. <br> CPF inválido.');
                } 
                else if (!nomeCliente.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Nome do Cliente no Brasil não foi preenchido corretamente.');
                } 
                else if (!nomeComprador.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Nome do comprador ou vendedor no exterior não foi preenchido corretamente.');
                } 
                else if (!paisCompradorVendedor.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> País do comprador ou vendedor no exterior não foi preenchido corretamente.');
                } 
                else if (!moeda.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Moeda não foi preenchido corretamente.');
                } 
                else if (!tipoTransacao.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Tipo de transação não foi preenchido corretamente.');
                } 
                else if (!formaPagamento.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Forma de pagamento não foi preenchido corretamente.');
                } 
                else if (!valorMoedaEstrangeira.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Valor na moeda estrangeira não foi preenchido corretamente.');
                } 
                else if (!valorMoedaNacional.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Valor na moeda nacional não foi preenchido corretamente.');
                } 
                else if (!statusOperacao.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Status operação não foi preenchido corretamente.');
                } 
                else {
                    var pessoa: PessoaOperacaoImportacao = {
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
                    };
                    this.list.push(pessoa);
                }
            } catch (e) {
                this.toastr.error('Não foi possível importar linha. <br> Ignorando linha e processando próxima.');
            }
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
        var files = event.target.files as FileList;
        var reader = new FileReader();
        function readFile(index: number, classe: ImportacaoComponent) {
            if (index >= files.length) {
                classe.file.reset();
                return
            };

            var file = files[index];
            reader.onload = function (event) {
                const data = reader.result;
                var workBook = xlsx.read(data, { type: 'binary' });

                var jsonData = workBook.SheetNames.reduce((content: any, name: any) => {
                    const sheet = workBook.Sheets[name];
                    let id = classe.setNewId(classe.list);
                    content[name] = xlsx.utils.sheet_to_json(sheet, { rawNumbers: false }) as any[];
                    content[name].forEach((row: any) => {
                        try {
                            var prop = Object.entries(row) as [string, string][];

                            var dataTransacao = classe.formataData(prop[0][1]);
                            var tipoCliente = prop[1][1];
                            var docCliente = prop[2][1] ? prop[2][1].toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').padStart(11, '0') : '';
                            var nomeCliente = prop[3][1];
                            var nomeComprador = prop[4][1];
                            var paisCompradorVendedor = prop[5][1];
                            var moeda = prop[6][1];
                            var tipoTransacao = prop[7][1];
                            var formaPagamento = prop[8][1];
                            var valorMoedaEstrangeira = prop[9][1];
                            var valorMoedaNacional = prop[10][1];
                            var statusOperacao = prop[11][1];

                            if (Number.isNaN(Date.parse(dataTransacao.toString()))) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Data de transação inválida.');
                            } 
                            else if (!tipoCliente.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Tipo de Cliente no Brasil não foi preenchido corretamente.');
                            } 
                            else if (!validaCPF(docCliente)) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> CPF inválido.');
                            } 
                            else if (!nomeCliente.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Nome do Cliente no Brasil não foi preenchido corretamente.');
                            } 
                            else if (!nomeComprador.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Nome do comprador ou vendedor no exterior não foi preenchido corretamente.');
                            } 
                            else if (!paisCompradorVendedor.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> País do comprador ou vendedor no exterior não foi preenchido corretamente.');
                            } 
                            else if (!moeda.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Moeda não foi preenchido corretamente.');
                            } 
                            else if (!tipoTransacao.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Tipo de transação não foi preenchido corretamente.');
                            } 
                            else if (!formaPagamento.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Forma de pagamento não foi preenchido corretamente.');
                            } 
                            else if (!valorMoedaEstrangeira.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Valor na moeda estrangeira não foi preenchido corretamente.');
                            } 
                            else if (!valorMoedaNacional.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Valor na moeda nacional não foi preenchido corretamente.');
                            } 
                            else if (!statusOperacao.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Status operação não foi preenchido corretamente.');
                            } 
                            else {
                                var pessoa: PessoaOperacaoImportacao = {
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
                                };
                                classe.list.push(pessoa);
                            }
                        } catch(e) {
                            console.error(e);
                            classe.toastr.error('Não foi possível importar uma linha. <br> Ignorando linha e processando próxima.');
                        } 
                        return content;
                    });
                }, {});

                readFile(index + 1, classe)
            }
            reader.readAsBinaryString(file);
        }
        readFile(0, this);

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
        var pessoaIndex = this.list.findIndex(x => x.id == item.id && x.docCliente == item.docCliente);
        if (pessoaIndex != -1) {
            this.list.splice(pessoaIndex, 1);
        } else {
            this.toastr.error('Não foi possível remover item.')
        }

    }

    formataData(dataString: string, horaString?: string, where?: string) {
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
    }


    send() {
        this.loading = true;
        this.erro = '';
        var list: PessoaOperacaoImportacao[] = Object.assign([], this.list);
        list = list.map(x => {
            delete x.id;
            delete x.statusCadastro;
            return x
        })

        if (list.length == 0) {
            this.toastr.error('Nenhum item selecionado.');
            this.erro = 'Nenhum item selecionado.';
            return;
        }
        lastValueFrom(this.pessoaOperacaoService.importacao(list))
            .then(res => {
                lastValueFrom(this.pessoaOperacaoService.getList());
                lastValueFrom(this.pessoaService.getList());
                this.loading = false;
                if (res.find(x => x.statusCadastro != 'OK')) {
                    this.toastr.clear();
                    this.toastr.error('Alguns registros não puderam ser salvos.');
                    this.erro = 'Alguns registros não puderam ser salvos.';
                    this.list = res;
                    this.retornoAPI = true;
                } else {
                    this.voltar();
                }
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }
}

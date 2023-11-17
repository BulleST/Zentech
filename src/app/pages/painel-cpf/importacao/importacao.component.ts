import { AfterViewInit, Component, HostListener, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCircleCheck, faCircleXmark, faTriangleExclamation, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ColumnFilter } from 'primeng/table';
import { Subscription, lastValueFrom, throwError } from 'rxjs';
import { PessoaImportacao, PessoaResponse } from 'src/app/models/pessoa.model';
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

    list: any[] = [];

    filters = ['cpf', 'nome', 'dataNascimento', 'situacao', 'dataInscricao', 'digito', 'anoObito', 'excel_Status', 'excel_Data_Cap', 'excel_Hora_Cap', 'excel_IdNum', 'excel_Erro']

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    @ViewChild('file') file: NgModel;

    requestResponse: PessoaResponse[] = [];
    currentDateFilter = {
        dataNascimento: undefined,
        dataInscricao: undefined,
        excel_Data_Cap: undefined,
    }
    constructor(
        private toastr: ToastrService,
        private modal: Modal,
        private activatedRoute: ActivatedRoute,
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
                var cpf = cells[0] ? cells[0].toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').padStart(11, '0') : '';
                var nome = cells[1];
                var dataNascimento = this.formataData(cells[2]);
                var situacao = cells[3];
                var dataInscricao = this.formataData(cells[4]);
                var digito = cells[5];
                var excel_Controle = cells[6];
                var anoObito = cells[7];
                var excel_Status = cells[8];
                var excel_Data_Cap = this.formataData(cells[9]);
                var excel_Hora_Cap = this.formataData(cells[9], cells[10]);
                var excel_IdNum = cells[11];

                if (!validaCPF(cpf)) {
                    this.toastr.error('Não foi possível importar essa linha. <br> CPF inválido.');
                } else if (!nome.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Nome não foi preenchido corretamente.');
                } else if (Number.isNaN(Date.parse(dataNascimento.toString()))) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Data de nascimento inválida.');
                } else if (!situacao.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Situação não foi preenchido corretamente.');
                } else if (Number.isNaN(Date.parse(dataInscricao.toString()))) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Data de inscrição inválida.');
                } else if (!digito.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Dígito não foi preenchido corretamente.');
                } else if (!excel_Controle.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Controle não foi preenchido corretamente.');
                } else if (!anoObito.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Ano Óbito não foi preenchido corretamente.');
                } else if (!excel_Status.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Status não foi preenchido corretamente.');
                } else if (Number.isNaN(Date.parse(excel_Data_Cap.toString()))) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Data de captação inválida.');
                } else if (Number.isNaN(Date.parse(excel_Hora_Cap.toString())) ) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Horário de captação inválido.');
                } else if (!excel_IdNum.trim()) {
                    this.toastr.error('Não foi possível importar essa linha. <br> Id Num não foi preenchido corretamente.');
                } else {
                    var obj: any = {
                        id: id++,
                        cpf: cpf,
                        nome: nome,
                        dataNascimento: dataNascimento,
                        situacao: situacao,
                        dataInscricao: dataInscricao,
                        digito: digito,
                        excel_Controle: excel_Controle,
                        anoObito: anoObito,
                        excel_Status: excel_Status,
                        excel_Data_Cap: excel_Data_Cap,
                        excel_Hora_Cap: excel_Hora_Cap,
                        excel_IdNum: cells[11],
                        excel_Erro: cells[12] ?? undefined,
                    }
                    this.list.push(obj)

                }
            } catch (e) {
                this.toastr.error('Não foi possível importar linha. <br> Ignorando linha e processando próxima.');
            }
        }

        this.validarListas();
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
                classe.validarListas();
                return
            };

            var file = files[index];
            reader.onload = function (event) {
                const data = reader.result;
                var workBook = xlsx.read(data, { type: 'binary' });
                var jsonData = workBook.SheetNames.reduce((content: any, name: any) => {
                    const sheet = workBook.Sheets[name];
                    content[name] = xlsx.utils.sheet_to_json(sheet, { rawNumbers: false }) as pessoa[];
                    var id = classe.setNewId(classe.list);
                    content[name].forEach((item: pessoa) => {
                        try {
                            var cpf = item.CPF  ? item.CPF .toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').padStart(11, '0') : '';
                            var dataNascimento = classe.formataData(item.Data_Nascimento);
                            var dataInscricao = classe.formataData(item.Data_Inscricao);
                            var excel_Data_Cap = classe.formataData(item.data_cap);
                            var excel_Hora_Cap = classe.formataData(item.data_cap, item.hora_cap);

                            if (!validaCPF(cpf)) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> CPF inválido.');
                            } else if (!item.Nome.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Nome não foi preenchido corretamente.');
                            } else if (Number.isNaN(Date.parse(dataNascimento.toString()))) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Data de nascimento inválida.');
                            } else if (!item.Situacao.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Situação não foi preenchido corretamente.');
                            } else if (Number.isNaN(Date.parse(dataInscricao.toString()))) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Data de inscrição inválida.');
                            } else if (!item.Digito.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Dígito não foi preenchido corretamente.');
                            } else if (!item.Controle.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Controle não foi preenchido corretamente.');
                            } else if (!item.ano_obito.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Ano Óbito não foi preenchido corretamente.');
                            } else if (!item.Status.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Status não foi preenchido corretamente.');
                            } else if (Number.isNaN(Date.parse(excel_Data_Cap.toString()))) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Data de captação inválida.');
                            } else if (Number.isNaN(Date.parse(excel_Hora_Cap.toString())) ) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Horário de captação inválido.');
                            } else if (!item.idnum.trim()) {
                                classe.toastr.error('Não foi possível importar essa linha. <br> Id Num não foi preenchido corretamente.');
                            } else {
                                var pessoa = {
                                    id: id++,
                                    cpf: cpf,
                                    nome: item.Nome,
                                    dataNascimento: dataNascimento,
                                    situacao: item.Situacao,
                                    dataInscricao: dataInscricao,
                                    digito: item.Digito,
                                    excel_Controle: item.Controle,
                                    anoObito: item.ano_obito,
                                    excel_Status: item.Status,
                                    excel_Data_Cap: excel_Data_Cap,
                                    excel_Hora_Cap: excel_Hora_Cap,
                                    excel_IdNum: item.idnum,
                                    excel_Erro: item.TIPO_ERRO ?? undefined,
                                };
                                classe.list.push(pessoa);
                            }
    
                        } catch(e) {
                            classe.toastr.error('Não foi possível importar uma linha. <br> Ignorando linha e processando próxima.');
                        } 
                    })
                    return content;
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

    validarListas() {
        var lista = this.list;
        var valueArr = lista.map((item: any) => item.cpf);
        var isDuplicate = valueArr.filter((item, idx) => {
            var firstIndex = lista.findIndex(x => x.cpf == item)

            if (!validaCPF(item)) lista[idx]['isValid'] = false;
            else lista[idx]['isValid'] = true;

            if (valueArr.indexOf(item) != idx) {
                lista[idx]['isDuplicate'] = true;
                lista[firstIndex]['isDuplicate'] = true;
            } else {
                lista[idx]['isDuplicate'] = false;
                lista[firstIndex]['isDuplicate'] = false;
            }
            return valueArr.indexOf(item) != idx
        });
    }

    removeItem(item: PessoaImportacao) {
        var pessoaIndex = this.list.findIndex(x => x.id == item.id && x.cpf == item.cpf);
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
        var list: PessoaImportacao[] = Object.assign([], this.list);
        list = list.map((x: any) => {
            delete x.isValid;
            delete x.id;
            delete x.isDuplicate;
            return x
        })

        if (list.length == 0) {
            this.toastr.error('Nenhum item selecionado.');
            this.erro = 'Nenhum item selecionado.';
            return;
        }
        lastValueFrom(this.pessoaService.create(list))
            .then(res => {
                lastValueFrom(this.pessoaService.getList());
                this.loading = false;
                this.requestResponse = res;
                if (res.find(x => x.sucesso == false)) {
                    this.toastr.error('Alguns registros não puderam ser salvos.');
                    this.erro = 'Alguns registros não puderam ser salvos.';
                    this.list = this.list.map(item => {
                        var response = this.requestResponse.find(x => x.cpf.toString().padStart(11, '0') == item.cpf && x.nome == item.nome);
                        item.sucesso = response?.sucesso;
                        item.detalhes = response?.detalhes;
                        return item
                    })
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

interface pessoa extends Object {
    id: number;
    CPF: string;
    Controle: string;
    Data_Inscricao: string;
    Data_Nascimento: string;
    Digito: string;
    Nome: string;
    Situacao: string;
    Status: string;
    ano_obito: string;
    data_cap: string;
    hora_cap: string;
    idnum: string;
    TIPO_ERRO: string;
}
import { AfterViewInit, Component, HostListener, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCircleCheck, faCircleXmark, faTriangleExclamation, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ColumnFilter } from 'primeng/table';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaImportacao, PessoaResponse } from 'src/app/models/pessoa.model';
import { LoadingService } from 'src/app/parts/loading/loading';
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

    listErros: PessoaImportacao[] = [];
    listOkValidation: PessoaImportacao[] = [];
    listAll: PessoaImportacao[] = [];
    filters = ['cpf', 'nome', 'dataNascimento', 'situacaoCPF', 'dataInscricao', 'digito', 'anoObito', 'excel_Status', 'excel_Data_Cap', 'excel_Hora_Cap', 'excel_IdNum', 'excel_Erro']

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
                        var text = xlsx.utils.sheet_to_txt(sheet, { blankrows: false });
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
            var cpf: string = cells[0] ? cells[0].toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').padStart(11, '0') : '';
            var nome: string = cells[1];
            var dataNascimento = this.formataData(cells[2]);
            var situacaoCPF: string = cells[3];
            var dataInscricao = cells[4] ? this.formataData(cells[4]) : '';
            var digito: string = cells[5];
            var excel_Controle: string = cells[6];
            var anoObito: string = cells[7];
            var pep: string = cells[8];
            var excel_Status: string = cells[9];
            var excel_Data_Cap = cells[10] ? this.formataData(cells[10]) : '';
            var excel_Hora_Cap = cells[11] ? this.formataData(cells[10], cells[11]) : '';
            var lote_id: string = cells[12];
            var excel_IdNum: string = cells[13];
            var excel_Erro: string = cells[14];

            var obj: PessoaImportacao = {
                id: id,
                cpf: cpf,
                nome: nome,
                dataNascimento: dataNascimento,
                situacaoCPF: situacaoCPF,
                dataInscricao: dataInscricao as unknown as Date,
                digito: digito,
                excel_Controle: excel_Controle,
                anoObito: anoObito,
                pep: pep,
                excel_Status: excel_Status,
                excel_Data_Cap: excel_Data_Cap as unknown as Date,
                excel_Hora_Cap: excel_Hora_Cap as unknown as Date,
                lote_id: lote_id,
                excel_IdNum: excel_IdNum,
                excel_Erro: excel_Erro ?? undefined,
                detalhes: '',
                sucesso: false,
                excel: 'Linha ' + linhaIndex + ' - ' + excelName,
                excelLinha: linhaIndex,
            };

            if (  pep && ( pep.toLowerCase() == 'NÃO' 
                || pep.toLowerCase() == 'NAO' 
                || pep.toLowerCase() == 'N' 
                || pep.toLowerCase() == 'Ñ')) {
                   pep = 'NÃO' 
            } 

            if (!cpf || !cpf.trim()) {
                obj.detalhes = 'CPF é obrigatório';
                this.listErros.push(obj)
            } else if (!validaCPF(cpf)) {
                obj.detalhes += 'CPF inválido';
                this.listErros.push(obj)
            } else if (!nome || !nome.trim()) {
                obj.detalhes += 'Nome é obrigatório.';
                this.listErros.push(obj)
            } else if (!cells[2] || !cells[2].trim()) {
                obj.detalhes += 'Data de Nascimento é obrigatória.';
                this.listErros.push(obj)
            } else if (Number.isNaN(Date.parse(dataNascimento.toString()))) {
                obj.detalhes += 'Data de Nascimento inválida.';
                this.listErros.push(obj)
            } else if (cells[4] && Number.isNaN(Date.parse(dataInscricao.toString()))) {
                obj.detalhes += 'Data de Inscrição inválida.';
                this.listErros.push(obj)
            } else if (cells[10] && Number.isNaN(Date.parse(excel_Data_Cap.toString()))) {
                obj.detalhes += 'Data de Captação inválida.';
                this.listErros.push(obj)
            } else if (cells[11] && Number.isNaN(Date.parse(excel_Hora_Cap.toString()))) {
                obj.detalhes += 'Hora de Captação inválida.';
                this.listErros.push(obj)
            } else if (pep && pep != '' && (pep.toLowerCase() != 'NÃO' || pep.toLowerCase() != 'NAO' || pep.toLowerCase() != 'N' || pep.toLowerCase() != 'Ñ')) {
                obj.detalhes += 'PEP inválido. Valor deve ser NÃO ou N.';
                this.listErros.push(obj)
            } else {
                obj.detalhes = '';
                obj.sucesso = true;
                this.listOkValidation.push(obj)
            }
            if (this.listErros.length > 0) {
                this.modal.style.next({ 'width': '95vw', 'max-width': '95vw' })
            }
            this.listAll.push(obj)
            return obj;

        } catch (e) {
            console.error(e)
            this.toastr.error('Não foi possível importar excel. Modelo inválido!');
            return;
        }

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

    removeItem(item: PessoaImportacao) {
        var pessoaIndex = this.listErros.findIndex(x => x.id == item.id && x.cpf == item.cpf);
        if (pessoaIndex != -1) {
            this.listErros.splice(pessoaIndex, 1);
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
            // if (Number.isNaN(Date.parse(fullDate.toString()))) {
            //     return undefined as unknown as Date;
            // }
            return fullDate;
        } catch (e) {
            return undefined as unknown as Date;
        }
    }

    send() {
        this.loading = true;
        this.erro = '';
        var list: PessoaImportacao[] = Object.assign([], this.listOkValidation);
        list = list.map((x: PessoaImportacao) => {
            delete x.id;
            delete x.detalhes;
            delete x.sucesso;
            delete x.excelLinha;
            return x;
        })

        if (list.length == 0) {
            this.toastr.error('Nenhum item selecionado.');
            this.erro = 'Nenhum item selecionado.';
            this.loading = false;
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

                    this.requestResponse.forEach(res => {
                        var items = this.listOkValidation.filter(x => x.cpf == res.cpf.toString() && x.nome == res.nome).map(x => {
                            x.sucesso = res.sucesso;
                            x.detalhes = res.detalhes;
                            return x;
                        });
                        this.listErros.concat(items);
                        console.log('items', items)
                    })
                    
                    console.log('listErros', this.listErros)
                    if (this.listErros.length > 0) {
                        this.modal.style.next({ 'width': '95vw', 'max-width': '95vw' })
                    }
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
    pep: string;
    data_cap: string;
    hora_cap: string;
    lote_id: string;
    idnum: string;
    TIPO_ERRO: string;
}
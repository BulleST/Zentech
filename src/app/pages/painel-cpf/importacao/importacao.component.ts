import { AfterViewInit, Component, HostListener, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCircleCheck, faCircleXmark, faTriangleExclamation, faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaImportacao } from 'src/app/models/pessoa-crud.model';
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
    activeIndex: number[] = [];
    files: file[] = [];
    filters = [ 'cpf', 'nome', 'dataNascimento', 'situacao', 'dataInscricao', 'digito',  'anoObito', 'excel_Status', 'excel_Data_Cap', 'excel_Hora_Cap', 'excel_IdNum', 'excel_Erro' ]

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    constructor(
        private toastr: ToastrService,
        private modal: Modal,
        private activatedRoute: ActivatedRoute,
        private pessoaService: PessoaService
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

    setActive() {
        this.activeIndex = Array.of(this.files.length).map(x => x == 0 ? 0 : x - 1)
    }


    @HostListener('paste', ['$event'])
    paste(e: ClipboardEvent) {
        this.activeIndex = [];
        var list = e.clipboardData?.getData('text/plain').split('\r\n').map(x => x.trim()).filter(x => x != '') ?? [];
        var id = this.setNewId(this.files.map(x => x.pages.map(y => y.list).flat(1)).flat(1));

        for (var item of list) {
            var cells = item.split('\t');
            var obj = {
                id: id++,
                cpf: cells[0].toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').padStart(11, '0') ?? '-',
                nome: cells[1] ?? '-',
                dataNascimento: cells[2],
                situacao: cells[3],
                dataInscricao: cells[4],
                digito: cells[5],
                excel_Controle: cells[6],
                anoObito: cells[7],
                excel_Status: cells[8],
                excel_Data_Cap: cells[9],
                excel_Hora_Cap: cells[10],
                excel_IdNum: cells[11],
                excel_Erro: cells[12],
                isValid: true,
                isDuplicate: true,
            }

            var indexCtrlV = this.files.findIndex(x => x.id == 0);
            var ctrlV: file | undefined = this.files[indexCtrlV];

            if (indexCtrlV != -1 && ctrlV && ctrlV.pages.length > 0 ) {
                ctrlV.pages[0].list.push(obj)
            } else {
                ctrlV = {
                    id: 0,
                    nome: 'Copiado da área de transferência',
                    pages: [ { id: 0, nome: '', list: [obj] } ] 
                }
                this.files.push(ctrlV)
            }            
        }

        this.validarListas();
        this.setActive();

        
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
        this.activeIndex = [];
        var files = event.target.files as FileList;
        var reader = new FileReader();
        function readFile(index: number, classe: ImportacaoComponent) {
            
            if (index >= files.length) {
                classe.validarListas();
                classe.setActive();
                return
            };

            var file = files[index];
            var fileModel: file = { id: classe.setNewId(classe.files), nome: file.name, pages: [] };

            reader.onload = function (event) {
                const data = reader.result;
                var workBook = xlsx.read(data, { type: 'binary' });
                var jsonData = workBook.SheetNames.reduce((content: any, name: any) => {

                    const sheet = workBook.Sheets[name];
                    content[name] = xlsx.utils.sheet_to_json(sheet, {rawNumbers: false}) as pessoa[];
                    
                    var id = classe.setNewId(classe.files.map(x => x.pages.map(y => y.list)).flat(1));
                    var pagina: page = {
                        id: classe.setNewId(classe.files.map(x => x.pages).flat(1)),
                        nome: name,
                        list: content[name].map((item: pessoa) => {
                            return {
                                id: id++,
                                cpf: item.CPF ? item.CPF.toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').padStart(11, '0'): '-',
                                nome: item.Nome ?? '-',
                                dataNascimento: item.Data_Nascimento ?? '-',
                                situacao: item.Situacao ?? '-',
                                dataInscricao:  item.Data_Inscricao ?? '-',
                                digito: item.Digito ?? '-',
                                excel_Controle: item.Controle ?? '-',
                                anoObito: item.ano_obito ?? '-',
                                excel_Status: item.Status ?? '-',
                                excel_Data_Cap: item.data_cap ?? '-',
                                excel_Hora_Cap: item.hora_cap ?? '-',
                                excel_IdNum: item.idnum ?? '-',
                                excel_Erro: item.TIPO_ERRO ?? '-',
                                isDuplicate: false, 
                                isValid: true,
                            } ;
                        })
                    }
                    fileModel.pages.push(pagina);
                    return content;
                }, {});

                classe.files.push(fileModel)

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
        var lista = this.files.map(x => x.pages.map(y => y.list).flat(1)).flat(1)
        var valueArr = lista.map((item: any) => item.cpf);
        var isDuplicate = valueArr.filter((item, idx) => { 
            var firstIndex = lista.findIndex(x => x.cpf == item)

            if (!validaCPF(item)) lista[idx]['isValid'] = false;
            else lista[idx]['isValid'] = true;
            
            if (valueArr.indexOf(item) != idx ) {
                lista[idx]['isDuplicate'] = true;
                lista[firstIndex]['isDuplicate'] = true;
            } else {
                lista[idx]['isDuplicate'] = false;
                lista[firstIndex]['isDuplicate'] = false;
            }
            return valueArr.indexOf(item) != idx 
        });
    }

    removeItem(item: PessoaImportacao, page: page, file: file){
        var fileIndex = this.files.findIndex(x => x.id == file.id);
        var pageIndex = file.pages.findIndex(x => x.id == page.id);
        var pessoaIndex = page.list.findIndex(x => x.id == item.id && x.cpf == item.cpf);
        if (fileIndex != -1 && pageIndex != -1 && pessoaIndex != -1) {
            this.files[fileIndex].pages[pageIndex].list.splice(pessoaIndex, 1);
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
        var fullDate = new Date(year, month, day, hour, min, seg).toISOString();
        return fullDate;
    }


    send() {
        this.loading = true;
        this.erro = '';
        var list = this.files.map(x => x.pages).flat(1).map(x => x.list).flat(1);
        list = list.map(x => {
            var dataCapUnformatted = x.excel_Data_Cap;

            x.dataNascimento = this.formataData(x.dataNascimento, undefined, 'dataNascimento');
            x.dataInscricao = this.formataData(x.dataInscricao, undefined, 'dataInscricao');
            x.excel_Data_Cap = this.formataData(x.excel_Data_Cap, undefined, 'excel_Data_Cap');
            x.excel_Hora_Cap = this.formataData(dataCapUnformatted,  x.excel_Hora_Cap, 'excel_Hora_Cap');
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
            this.voltar();
            this.loading = false;
        })
        .catch(res => {
            this.loading = false;
            this.erro = getError(res);
        })

    }
}

interface file {
    id: number;
    pages: page[];
    nome: string;

}
interface page {
    id: number;
    nome: string;
    list: any[];
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
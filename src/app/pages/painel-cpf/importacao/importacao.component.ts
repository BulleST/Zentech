import { AfterViewInit, Component, HostListener, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCircleCheck, faCircleXmark, faTriangleExclamation, faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PessoaRequestMany } from 'src/app/models/pessoa.model';
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
    filters = ['id', 'cpf', 'nome', 'dataNascimento', 'situacao', 'dataInscricao', 'digito', 'controle', 'anoObito', 'status', 'dataCap', 'horaCap', 'idNum', 'tipoErro', ]

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    constructor(
        private toastr: ToastrService,
        private modal: Modal,
        private activatedRoute: ActivatedRoute,
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
                dataNascimento: cells[2] ?? '-',
                situacao: cells[3] ?? '-',
                dataInscricao: cells[4] ?? '-',
                digito: cells[5] ?? '-',
                controle: cells[6] ?? '-',
                anoObito: cells[7] ?? '-',
                status: cells[8] ?? '-',
                dataCap: cells[9] ?? '-',
                horaCap: cells[10] ?? '-',
                idNum: cells[11] ?? '-',
                tipoErro: cells[12] ?? '-',
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
                                cpf: item.CPF.toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').padStart(11, '0') ?? '-',
                                nome: item.Nome ?? '-',
                                dataNascimento: item.Data_Nascimento ?? '-',
                                situacao: item.Situacao ?? '-',
                                dataInscricao: item.Data_Inscricao ?? '-',
                                digito: item.Digito ?? '-',
                                controle: item.Controle ?? '-',
                                anoObito: item.ano_obito ?? '-',
                                status: item.Status ?? '-',
                                dataCap: item.data_cap ?? '-',
                                horaCap: item.hora_cap ?? '-',
                                idNum: item.idnum ?? '-',
                                tipoErro: item.TIPO_ERRO ?? '',
                            }
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

    removeItem(item: PessoaRequestMany, page: page, file: file){
        var fileIndex = this.files.findIndex(x => x.id == file.id);
        var pageIndex = file.pages.findIndex(x => x.id == page.id);
        var pessoaIndex = page.list.findIndex(x => x.id == item.id && x.cpf == item.cpf);
        if (fileIndex != -1 && pageIndex != -1 && pessoaIndex != -1) {
            this.files[fileIndex].pages[pageIndex].list.splice(pessoaIndex, 1);
        } else {
            this.toastr.error('Não foi possível remover item.')
        }

    }
    send(model: NgForm) {
        this.loading = true;
        this.erro = '';

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
    list: PessoaRequestMany[];
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
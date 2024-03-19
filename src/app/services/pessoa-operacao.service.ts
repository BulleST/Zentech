import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { PessoaOperacaoImportacao, PessoaOperacaoList, PessoaOperacaoRequest, PessoaOperacaoStatus } from '../models/pessoa-operacao.model';
import { Response } from '../helpers/request-response.interface';
import { Filtro } from '../pages/operacoes/exportacao/exportacao.component';
import { DatePipe } from '@angular/common';
import { getError } from '../utils/error';
import { EmpresaService } from './empresa.service';

@Injectable({
    providedIn: 'root'
})
export class PessoaOperacaoService {
    url = environment.url;
    list = new BehaviorSubject<PessoaOperacaoList[]>([]);
    listOperacaoPorPessoa = new BehaviorSubject<PessoaOperacaoList[]>([]);
    status = new BehaviorSubject<PessoaOperacaoStatus[]>([]);
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private datePipe: DatePipe,
        private empresaService: EmpresaService,
    ) { }


    getStatus() {
        return this.http.get<PessoaOperacaoStatus[]>(`${this.url}/operacaoStatus/`)
            .pipe(tap({
                next: list => {
                    this.status.next(list);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de status da operação.')
            }));
    }
    getList(loading: boolean = false) {
        this.loading.next(loading);
        this.table.loading.next(true);
        var empresaId = this.empresaService.getEmpresa().value.id as unknown as number;
        return this.http.get<PessoaOperacaoList[]>(`${this.url}/operacao/list/empresa/${empresaId}`)
            .pipe(tap({
                next: list => {
                    this.list.next(list);
                    this.loading.next(false);
                    this.table.loading.next(false);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de operações.'),
                finalize: () => {
                    this.loading.next(false);
                    this.table.loading.next(false);
                },
            }));
    }

    getListByPessoaId(pessoa_Id: number, loading: boolean = false) {
        this.loading.next(loading);
        this.table.loading.next(true);
        return this.http.get<PessoaOperacaoList[]>(`${this.url}/operacao/list/pessoa/${pessoa_Id}`)
            .pipe(tap({
                next: list => {
                    this.listOperacaoPorPessoa.next(list);
                    this.loading.next(false);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de operações.'),
                  finalize: () => {
                    this.loading.next(false);
this.table.loading.next(false);
                },
            }));
    }

    get(id: number) {
        return this.http.get<PessoaOperacaoRequest>(`${this.url}/operacao/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }

    create(request: PessoaOperacaoRequest) {
        return this.http.post<Response>(`${this.url}/operacao`, request);
    }

    edit(request: PessoaOperacaoRequest) {
        return this.http.put<Response>(`${this.url}/operacao`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/operacao/${id}`);
    }


    deleteList(ids: number[]) {
        var empresaId = this.empresaService.getEmpresa().value.id as unknown as number;
        return this.http.post<Response>(`${this.url}/operacao/excluir/list/${empresaId}`, {Ids: ids});
    }

    exportacao(request: Filtro) {
        var empresaId = this.empresaService.getEmpresa().value.id as unknown as number;
        return this.http.post(`${this.url}/operacao/exportar-pdf/${empresaId}`, request, { responseType: 'blob' })
            .pipe(tap({
                next: res => {
                    var blob = new Blob([res], { type: 'application/pdf' })
                    const data = window.URL.createObjectURL(blob);

                    var link = document.createElement('a');
                    link.href = data;
                    link.download = `Relatorio_Operacoes_${this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')}`;
                    // this is necessary as link.click() does not work on the latest firefox
                    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                },
                error: res => {
                    this.toastr.error(getError(res))
                    this.toastr.error('Não foi possível carregar operações para exportação.')
                }
            }));
    }

    exportacaoOperacao(id: number) {
        return this.http.post(`${this.url}/operacao/exportar-pdf-operacao/${id}`, {}, { responseType: 'blob' })
            .pipe(tap({
                next: res => {
                    var blob = new Blob([res], { type: 'application/pdf' })
                    const data = window.URL.createObjectURL(blob);
                    var link = document.createElement('a');
                    link.href = data;
                    link.download = `Relatorio_Operacao_${this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')}`;
                    // this is necessary as link.click() does not work on the latest firefox
                    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                },
                error: res => {
                    this.toastr.error(getError(res))
                    this.toastr.error('Não foi possível carregar operações para exportação.')
                }
            }));
    }

    importarArquivo(file: File) {
        var data = new FormData();
        data.append('file', file);
        var empresaId = this.empresaService.getEmpresa().value.id as unknown as number;
        return this.http.post<Response>(`${this.url}/operacao/importa-excel/${empresaId}`, data);
    }

}


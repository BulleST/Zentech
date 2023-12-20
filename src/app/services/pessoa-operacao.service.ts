import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { PessoaOperacaoImportacao, PessoaOperacaoList, PessoaOperacaoRequest, PessoaOperacaoStatus } from '../models/pessoa-operacao.model';
import { Response } from '../helpers/request-response.interface';
import { Filtro } from '../pages/operacoes/exportacao/exportacao.component';

@Injectable({
    providedIn: 'root'
})
export class PessoaOperacaoService {
    url = environment.url;
    list = new BehaviorSubject<PessoaOperacaoList[]>([]);
    listOperacaoPorPessoa = new BehaviorSubject<PessoaOperacaoList[]>([]);
    status = new BehaviorSubject<PessoaOperacaoStatus[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
    ) { }

    getList() {
        this.table.loading.next(true);
        return this.http.get<PessoaOperacaoList[]>(`${this.url}/operacao/`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                this.list.next(list);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar listagem de operações.')
        }));
    }

    getListById(pessoa_Id: number) {
        this.table.loading.next(true);
        return this.http.get<PessoaOperacaoList[]>(`${this.url}/operacao/pessoa/${pessoa_Id}`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                this.listOperacaoPorPessoa.next(list);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar listagem de operações.')
        }));
    }

    getStatus() {
        return this.http.get<PessoaOperacaoStatus[]>(`${this.url}/operacaoStatus/`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                this.status.next(list);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar listagem de status da operação.')
        }));
    }

    get(id: number) {
        return this.http.get<PessoaOperacaoRequest>(`${this.url}/operacao/${id}`, { headers: new HttpHeaders({ 'loading': 'false' })});
    }

    create(request: PessoaOperacaoRequest ) {
        return this.http.post<Response>(`${this.url}/operacao`, request);
    }

    importacao(request: PessoaOperacaoImportacao[]) {
      return this.http.post<Response>(`${this.url}/operacao/import`, request);
  }


    edit(request: PessoaOperacaoRequest) {
        return this.http.put<Response>(`${this.url}/operacao`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/operacao/${id}`);
    }

    exportacao(request: Filtro) {
        return this.http.post(`${this.url}/operacao/exportar-pdf`, request, {responseType: 'blob'});
    }

}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { PessoaOperacao, PessoaOperacaoRequest, PessoaOperacaoStatus } from '../models/pessoa-operacao.model';
import { Response } from '../helpers/request-response.interface';

@Injectable({
    providedIn: 'root'
})
export class PessoaOperacaoService {
    url = environment.url;
    list = new BehaviorSubject<PessoaOperacao[]>([]);
    status = new BehaviorSubject<PessoaOperacaoStatus[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
    ) { }

    getList() {
        this.table.loading.next(true);
        return this.http.get<PessoaOperacao[]>(`${this.url}/operacao/`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                list = list.map(x => {
                    x.dataOperacao = new Date(x.dataOperacao);
                    return x;
                })
                this.list.next(list);
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

    create(request: PessoaOperacaoRequest) {
        return this.http.post<Response>(`${this.url}/operacao`, request);
    }

    edit(request: PessoaOperacaoRequest) {
        return this.http.put(`${this.url}/operacao`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/operacao/${id}`);
    }

}

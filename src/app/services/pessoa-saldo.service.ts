import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { PessoaSaldo, PessoaSaldoRequest } from '../models/pessoa-saldo.model';
import { Response } from '../helpers/request-response.interface';

@Injectable({
    providedIn: 'root'
})
export class PessoaSaldoService {
    url = environment.url;
    list = new BehaviorSubject<PessoaSaldo[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
    ) {
    }


    getList(pessoa_Id: number) {
        this.table.loading.next(true);
        return this.http.get<PessoaSaldo[]>(`${this.url}/pessoaSaldo/${pessoa_Id}`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                list = list.map(x => {
                    x.dataConcessao = new Date(x.dataConcessao);
                    return x;
                })
                this.list.next(list);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar listagem de saldos.')
        }));
    }


    create(request: PessoaSaldoRequest) {
        return this.http.post(`${this.url}/pessoaSaldo`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/pessoaSaldo/${id}`);
    }

}

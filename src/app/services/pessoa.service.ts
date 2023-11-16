import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { PessoaList, PessoaResponse } from '../models/pessoa.model';
import { Pessoa} from '../models/pessoa.model';

@Injectable({
    providedIn: 'root'
})
export class PessoaService {
    url = environment.url;
    list = new BehaviorSubject<PessoaList[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
    ) {
    }


    getList() {
        this.table.loading.next(true);
        return this.http.get<PessoaList[]>(`${this.url}/pessoa`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                list = list.map(x => {
                    x.dataCadastro = new Date(x.dataCadastro)
                    return x;
                })
                this.list.next(Object.assign([], list));
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar listagem de pessoas.')
        }));
    }

    get(id: number) {
        return this.http.get<Pessoa>(`${this.url}/pessoa/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }
    

    create(request: any[]) {
        return this.http.post<PessoaResponse[]>(`${this.url}/pessoa`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/pessoa/${id}`);
    }

}

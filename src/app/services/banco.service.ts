import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Response } from '../helpers/request-response.interface';
import { BancoList, BancoRequest } from '../models/banco.model';
import { Cidades } from '../models/cidade.model';

@Injectable({
    providedIn: 'root'
})
export class BancoService {
    url = environment.url;
    list = new BehaviorSubject<BancoList[]>([]);
    cidades = new BehaviorSubject<Cidades[]>([]);
    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,

    ) { }




    getList() {
        this.table.loading.next(true);
        return this.http.get<BancoList[]>(`${this.url}/banco`, { headers: new HttpHeaders({ 'loading': 'false' }) })
            .pipe(tap({
                next: list => {
                    list = list.map(x => {
                        return x;
                    })
                    this.list.next(Object.assign([], list));
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de bancos.')

            }));


    }
    get(id: number) {
        return this.http.get<BancoRequest>(`${this.url}/banco/${id}`, { headers: new HttpHeaders({ 'loading': 'false' }) });
    }


    create(request: BancoRequest) {
        return this.http.post<Response>(`${this.url}/banco`, request);
    }

    edit(request: BancoRequest) {
        return this.http.put<Response>(`${this.url}/banco`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/banco/${id}`);
    }

    getCidade() {
        return this.http.get<Cidades[]>(`${this.url}/cidade/`, { headers: new HttpHeaders({ 'loading': 'false' }) })
            .pipe(tap({
                next: list => {
                    this.cidades.next(list);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de cidades.')
            }));
    }
}


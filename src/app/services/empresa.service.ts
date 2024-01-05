import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Response } from '../helpers/request-response.interface';
import { Empresa } from '../models/empresa.model';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    url = environment.url;
    list = new BehaviorSubject<Empresa[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,

    ) { }

    getList(loading: boolean = false) {
        this.table.loading.next(true);
        return this.http.get<Empresa[]>(`${this.url}/empresa`, { headers: new HttpHeaders({ 'loading': 'false' }) })
            .pipe(tap({
                next: list => {
                    list = list.map(x => {
                        return x;
                    })
                    this.list.next(Object.assign([], list));
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de Empresas.')

            }));


    }
    get(id: number) {
        return this.http.get<Empresa>(`${this.url}/empresa/${id}`, { headers: new HttpHeaders({ 'loading': 'false' }) });
    }


    create(request: Empresa) {
        return this.http.post<Response>(`${this.url}/empresa`, request);
    }

    edit(request: Empresa) {
        return this.http.put<Response>(`${this.url}/empresa`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/empresa/${id}`);
    }

}


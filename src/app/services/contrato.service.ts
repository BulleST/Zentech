import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Contrato, ContratoList } from '../models/contrato.model';
import { Response } from '../helpers/request-response.interface';

@Injectable({
    providedIn: 'root'
})
export class ContratoService {
    url = environment.url;
    list = new BehaviorSubject<ContratoList[]>([]);
    object = new BehaviorSubject<Contrato>(new Contrato);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,

    ) { }

    getList() {
        return this.http.get<ContratoList[]>(`${this.url}/contrato/`, { headers: new HttpHeaders({ 'loading': 'false' }) })
            .pipe(tap({
                next: list => {
                    this.list.next(list);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de contratos.')
            }));
    }
    get(id: number) {
        return this.http.get<Contrato>(`${this.url}/contrato/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) }).pipe(tap({
            next: object => {
                this.object.next(Object.assign({}, object));
                return of(object);
            },
            error: res => this.toastr.error('Não foi possível carregar listagem de contratos.')
        }));
    }


    create(request: Contrato) {
        return this.http.post<Response>(`${this.url}/contrato`, request);
    }

    edit(request: Contrato) {
        return this.http.put<Response>(`${this.url}/contrato`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/contrato/${id}`);
    }
}


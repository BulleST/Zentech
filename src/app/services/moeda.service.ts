import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Moeda } from '../models/moeda.model';
import { Response } from '../helpers/request-response.interface';

@Injectable({
    providedIn: 'root'
})
export class MoedaService {
    url = environment.url;
    list = new BehaviorSubject<Moeda[]>([]);
    object = new BehaviorSubject<Moeda>(new Moeda);
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,

    ) { }

    getList(loading: boolean = false) {
        return this.http.get<Moeda[]>(`${this.url}/moeda/`)
            .pipe(tap({
                next: list => {
                    this.list.next(list);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de moedas.')
            }));
    }
    get(id: number) {
        return this.http.get<Moeda>(`${this.url}/moeda/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) }).pipe(tap({
            next: object => {
                this.object.next(Object.assign({}, object));
                return of(object);
            },
            error: res => this.toastr.error('Não foi possível carregar listagem de moedas.')
        }));
    }

    send(request: Moeda) {
        return this.http.post<Response>(`${this.url}/moeda`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/moeda/${id}`);
    }
}


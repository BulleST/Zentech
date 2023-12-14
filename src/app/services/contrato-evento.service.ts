import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContratoEvento } from '../models/contrato-evento.model';

@Injectable({
    providedIn: 'root'
})
export class ContratoEventoService {
    url = environment.url;
    list = new BehaviorSubject<ContratoEvento[]>([]);
    object = new BehaviorSubject<ContratoEvento>(new ContratoEvento);

    constructor(
        private http: HttpClient,
        private toastr: ToastrService,

    ) { }

    getList() {
        return this.http.get<ContratoEvento[]>(`${this.url}/contrato_Evento/`, { headers: new HttpHeaders({ 'loading': 'false' }) })
            .pipe(tap({
                next: list => {
                    this.list.next(list);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de eventos.')
            }));
    }
    get(id: number) {
        return this.http.get<ContratoEvento>(`${this.url}/contrato_Evento/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) }).pipe(tap({
            next: object => {
                this.object.next(Object.assign({}, object));
                return of(object);
            },
            error: res => this.toastr.error('Não foi possível carregar evento.')
        }));
    }


    create(request: ContratoEvento) {
        return this.http.post<Response>(`${this.url}/contrato_Evento`, request);
    }

    edit(request: ContratoEvento) {
        return this.http.put<Response>(`${this.url}/contrato_Evento`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/contrato_Evento/${id}`);
    }
}


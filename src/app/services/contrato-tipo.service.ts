import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContratoTipo } from '../models/contrato-tipo.model';

@Injectable({
    providedIn: 'root'
})
export class ContratoTipoService {
    url = environment.url;
    list = new BehaviorSubject<ContratoTipo[]>([]);
    object = new BehaviorSubject<ContratoTipo>(new ContratoTipo);

    constructor(
        private http: HttpClient,
        private toastr: ToastrService,

    ) { }

    getList() {
        return this.http.get<ContratoTipo[]>(`${this.url}/contrato_Tipo/`, { headers: new HttpHeaders({ 'loading': 'false' }) })
            .pipe(tap({
                next: list => {
                    this.list.next(list);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de tipos.')
            }));
    }
    get(id: number) {
        return this.http.get<ContratoTipo>(`${this.url}/contrato_Tipo/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) }).pipe(tap({
            next: object => {
                this.object.next(Object.assign({}, object));
                return of(object);
            },
            error: res => this.toastr.error('Não foi possível carregar tipo.')
        }));
    }


    create(request: ContratoTipo) {
        return this.http.post<Response>(`${this.url}/contrato_Tipo`, request);
    }

    edit(request: ContratoTipo) {
        return this.http.put<Response>(`${this.url}/contrato_Tipo`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/contrato_Tipo/${id}`);
    }
}


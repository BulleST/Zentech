import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Response } from '../helpers/request-response.interface';
import { Representante } from '../models/representante.model';
import { EmpresaService } from './empresa.service';

@Injectable({
    providedIn: 'root'
})
export class RepresentanteService {
    url = environment.url;
    list = new BehaviorSubject<Representante[]>([]);
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private empresaService: EmpresaService,

    ) { }

    getList(loading: boolean = false) {
       this.loading.next(loading);
        this.table.loading.next(true);
        var empresaId = this.empresaService.empresaSelected.value.id as unknown as number;
        return this.http.get<Representante[]>(`${this.url}/representante/list/${empresaId}`)
            .pipe(tap({
                next: list => {
                    this.list.next(Object.assign([], list));
                    this.loading.next(false);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de representante.')

            }));


    }
    get(id: number) {
        return this.http.get<Representante>(`${this.url}/representante/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }


    create(request: Representante) {
        console.log(this.empresaService.empresaSelected.value)
        request.empresa_Id = this.empresaService.empresaSelected.value.id;
        return this.http.post<Response>(`${this.url}/representante`, request);
    }

    edit(request: Representante) {
        return this.http.put<Response>(`${this.url}/representante`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/representante/${id}`);
    }

}


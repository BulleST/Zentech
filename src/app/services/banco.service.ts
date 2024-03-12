import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Response } from '../helpers/request-response.interface';
import { BancoList, BancoRequest } from '../models/banco.model';
import { EmpresaService } from './empresa.service';

@Injectable({
    providedIn: 'root'
})
export class BancoService {
    url = environment.url;
    list = new BehaviorSubject<BancoList[]>([]);
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
        return this.http.get<BancoList[]>(`${this.url}/banco/list/${empresaId}`)
            .pipe(tap({
                next: list => {
                    this.loading.next(false);
                    this.list.next(Object.assign([], list));
                    return of(list);

                },
                error: res => this.toastr.error('Não foi possível carregar listagem de bancos.'),
                finalize: () => this.loading.next(false),

            }));

    }

    get(id: number) {
        return this.http.get<BancoRequest>(`${this.url}/banco/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }

    create(request: BancoRequest) {
        request.empresa_Id = this.empresaService.empresaSelected.value.id;
        return this.http.post<Response>(`${this.url}/banco`, request);
    }

    edit(request: BancoRequest) {
        request.empresa_Id = this.empresaService.empresaSelected.value.id;
        return this.http.put<Response>(`${this.url}/banco`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/banco/${id}`);
    }

}



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Response } from '../helpers/request-response.interface';
import { InstituicaoFinanceiraList, InstituicaoFinanceiraRequest } from '../models/instituicao-financeira.model';
import { EmpresaService } from './empresa.service';
@Injectable({
    providedIn: 'root'
})
export class InstituicaoFinanceiraService {
    url = environment.url;
    list = new BehaviorSubject<InstituicaoFinanceiraList[]>([]);
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
        return this.http.get<InstituicaoFinanceiraList[]>(`${this.url}/instituicaoFinanceira/list/${empresaId}`)
            .pipe(tap({
                next: list => {
                    this.loading.next(false);
                    this.list.next(Object.assign([], list));
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de pessoas.'),
                finalize: () => this.loading.next(false),

            }));
    }

    get(id: number) {
        return this.http.get<InstituicaoFinanceiraRequest>(`${this.url}/instituicaoFinanceira/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }



    post(request: InstituicaoFinanceiraRequest) {
        request.empresa_Id = this.empresaService.empresaSelected.value.id;
        return this.http.post<Response>(`${this.url}/instituicaoFinanceira`, request);
    }



    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/InstituicaoFinanceira/${id}`);
    }



}


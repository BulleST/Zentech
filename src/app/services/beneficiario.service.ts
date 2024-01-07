import { BeneficiarioList, BeneficiarioRequest } from './../models/beneficiario.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';

import { Response } from '../helpers/request-response.interface';
import { Filtro } from '../pages/operacoes/exportacao/exportacao.component';
import { EmpresaService } from './empresa.service';



@Injectable({
    providedIn: 'root'
})
export class BeneficiarioService {
    url = environment.url;
    list = new BehaviorSubject<BeneficiarioList[]>([])
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
    ) { }

    getList(/* empresaId?: number, */ loading: boolean = false) {
       this.loading.next(loading);
        this.table.loading.next(true);
        // empresaId = empresaId ?? this.empresaService.empresaSelected.value.id ?? '' as unknown as number ;
        return this.http.get<BeneficiarioList[]>(`${this.url}/beneficiario` /*/list/${empresaId} */)
            .pipe(tap({
                next: list => {
                    this.loading.next(false);
                    this.list.next(Object.assign([], list));
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de beneficiários.')

            }));
    }

    get(id: number) {
        return this.http.get<BeneficiarioRequest>(`${this.url}/beneficiario/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }

    post(request: BeneficiarioRequest) {
        request.empresa_Id = request.empresa_Id ?? this.empresaService.empresaSelected.value.id ?? undefined;
        return this.http.post<Response>(`${this.url}/beneficiario`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/Beneficiario/${id}`);
    }
}


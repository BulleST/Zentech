import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { PessoaSaldo, PessoaSaldoRequest } from '../models/pessoa-saldo.model';
import { Response } from '../helpers/request-response.interface';
import { EmpresaService } from './empresa.service';

@Injectable({
    providedIn: 'root'
})
export class PessoaSaldoService {
    url = environment.url;
    list = new BehaviorSubject<PessoaSaldo[]>([]);
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
    ) {
    }


    getList(pessoa_Id: number, loading: boolean = false) {
       this.loading.next(loading);
        this.table.loading.next(true);
        return this.http.get<PessoaSaldo[]>(`${this.url}/pessoaSaldo/${pessoa_Id}`)
        .pipe(tap({
            next: list => {
                list = list.map(x => {
                    x.dataConcessao = new Date(x.dataConcessao);
                    return x;
                })
                this.list.next(list);
                this.loading.next(false);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar listagem de saldos.'),
              finalize: () => {
                    this.loading.next(false);
this.table.loading.next(false);
                },
        }));
    }


    create(request: PessoaSaldoRequest) {
        return this.http.post<Response>(`${this.url}/pessoaSaldo`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/pessoaSaldo/${id}`);
    }

    deleteList(ids: number[]) {
        var empresaId = this.empresaService.getEmpresa().value.id as unknown as number;
        return this.http.post<Response>(`${this.url}/pessoaSaldo/${empresaId}`, {ids});
    }

}

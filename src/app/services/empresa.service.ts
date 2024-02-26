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
    empresaSelected:  BehaviorSubject<EmpresaSelected>;
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    objeto = new BehaviorSubject<Empresa | undefined>(undefined);
    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,

    ) {
        this.empresaSelected = new BehaviorSubject<EmpresaSelected>(new EmpresaSelected);

    }

    getList(loading: boolean = false) {
       this.loading.next(loading);
        this.table.loading.next(true);
        return this.http.get<Empresa[]>(`${this.url}/empresa`)
            .pipe(tap({
                next: list => {
                    list = list.map(x => {
                        x.ativo = !x.dataDesativado;
                        return x;
                    });
                    this.loading.next(false);
                    this.list.next(list);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de Empresas.'),
                finalize: () => this.loading.next(false),

            }));


    }
    get(id: number) {
        return this.http.get<Empresa>(`${this.url}/empresa/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }


    create(request: Empresa) {
        return this.http.post<Response>(`${this.url}/empresa`, request);
    }

    deactivated(id: number, ativo?: boolean) {
      return this.http.patch<Empresa>(`${this.url}/empresa/${id}/${ativo}`, {});
  }

    edit(request: Empresa) {
        return this.http.put<Response>(`${this.url}/empresa`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/empresa/${id}`);
    }

}
export class EmpresaSelected {
    empresa?: Empresa;
    id: number = 0;
}


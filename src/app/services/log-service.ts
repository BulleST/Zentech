import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { LogList, LogRequest } from '../models/log-model';
import { EmpresaService } from './empresa.service';


@Injectable({
    providedIn: 'root'
})
export class LogService {
    url = environment.url;
    list = new BehaviorSubject<LogList[]>([]);
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
        var empresaId = this.empresaService.getEmpresa().value.id as unknown as number;
        return this.http.get<LogList[]>(`${this.url}/log-acoes/list/${empresaId}`)
            .pipe(tap({
                next: list => {
                    this.list.next(list);
                    this.loading.next(false);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de log.'),
                finalize: () => {
                    this.loading.next(false);
                    this.table.loading.next(false);
                },
            }));
    }

    get(id: number) {
        return this.http.get<LogRequest>(`${this.url}/log-acoes/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }
}

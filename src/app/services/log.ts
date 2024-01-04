import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Response } from '../helpers/request-response.interface';
import { LogList, LogRequest} from '../models/log-model';
import { Cidades } from '../models/cidade.model';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    url = environment.url;
    list = new BehaviorSubject<LogList[]>([]);
    cidades = new BehaviorSubject<Cidades[]>([]);
    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,

    ) { }

    getList(loading: boolean = false) {
        this.table.loading.next(true);
        return this.http.get<LogList[]>(`${this.url}log-acoes`, { headers: new HttpHeaders({ 'loading': 'false' }) })
            .pipe(tap({
                next: list => {
                    list = list.map(x => {
                        return x;
                    })
                    this.list.next(Object.assign([], list));
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de bancos.')

            }));


    }
    get(id: number) {
        return this.http.get<LogRequest>(`${this.url}/log-acoes/${id}`, { headers: new HttpHeaders({ 'loading': 'false' }) });
    }


    create(request: LogRequest) {
        return this.http.post<Response>(`${this.url}/log-acoes`, request);
    }



    getCidade() {
        return this.http.get<Cidades[]>(`${this.url}/cidade/`, { headers: new HttpHeaders({ 'loading': 'false' }) })
            .pipe(tap({
                next: list => {
                    this.cidades.next(list);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de cidades.')
            }));
    }
}


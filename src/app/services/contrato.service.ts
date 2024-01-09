import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contrato, Contrato_List } from '../models/contrato.model';
import { Response } from '../helpers/request-response.interface';
import { DatePipe } from '@angular/common';
import { Table } from '../utils/table';

@Injectable({
    providedIn: 'root'
})
export class ContratoService {
    url = environment.url;
    list = new BehaviorSubject<Contrato_List[]>([]);
    object = new BehaviorSubject<Contrato>(new Contrato());
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private datePipe: DatePipe,
        private table: Table,

    ) { }

    getList(loading: boolean = false) {
        this.loading.next(loading);
        this.table.loading.next(true);
        return this.http.get<Contrato_List[]>(`${this.url}/contrato/`)
            .pipe(tap({
                next: list => {
                    this.loading.next(false);
                    this.list.next(list);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de contratos.')
            }));
    }

    get(id: number) {
        return this.http.get<Contrato>(`${this.url}/contrato/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }

    post(request: Contrato) {
        return this.http.post<Response>(`${this.url}/contrato`, request);
    }

    file(id: number) {
        return this.http.post(`${this.url}/contrato/exportar-pdf/${id}`, {}, { responseType: 'blob'})
            .pipe(tap({
                next: res => {
                    var blob = new Blob([res], { type: 'application/pdf' })
                    const data = window.URL.createObjectURL(blob);

                    var link = document.createElement('a');
                    link.href = data;
                    link.download = `Contrato_${this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')}`;
                    // this is necessary as link.click() does not work on the latest firefox
                    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                }
            }));
    }

}


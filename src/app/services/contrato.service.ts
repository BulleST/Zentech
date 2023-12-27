import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contrato, Contrato_List } from '../models/contrato.model';
import { Response } from '../helpers/request-response.interface';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ContratoService {
    url = environment.url;
    list = new BehaviorSubject<Contrato_List[]>([]);
    object = new BehaviorSubject<Contrato>(new Contrato());

    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private datePipe: DatePipe,

    ) { }

    getList() {
        return this.http.get<Contrato_List[]>(`${this.url}/contrato/`, { headers: new HttpHeaders({ 'loading': 'false' }) })
            .pipe(tap({
                next: list => {
                    this.list.next(list);
                    return of(list);
                },
                error: res => this.toastr.error('Não foi possível carregar listagem de contratos.')
            }));
    }

    get(id: number) {
        return this.http.get<Contrato>(`${this.url}/contrato/${id}`, { headers: new HttpHeaders({ 'loading': 'false' }) });
    }

    post(request: Contrato) {
        return this.http.post<Response>(`${this.url}/contrato`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/contrato/${id}`);
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
///////////////////
                    var url = URL.createObjectURL(res);
                    window.open(url, '_blank');
                    URL.revokeObjectURL(url);
                }
            }));
    }

}


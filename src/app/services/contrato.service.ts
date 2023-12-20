import { ContratoRequest } from './../models/contrato.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Contrato, Contrato_List } from '../models/contrato.model';
import { Response } from '../helpers/request-response.interface';

@Injectable({
    providedIn: 'root'
})
export class ContratoService {
    url = environment.url;
    list = new BehaviorSubject<Contrato_List[]>([]);
    object = new BehaviorSubject<Contrato>(new Contrato);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,

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
    return this.http.get<ContratoRequest>(`${this.url}/contrato/${id}`, { headers: new HttpHeaders({ 'loading': 'false' }) });
  }



  post(request: ContratoRequest) {
    return this.http.post<Response>(`${this.url}/contrato`, request);
  }



  delete(id: number) {
    return this.http.delete<Response>(`${this.url}/contrato/${id}`);
}

}


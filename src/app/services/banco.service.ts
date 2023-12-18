import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';

import { Response } from '../helpers/request-response.interface';
import { Filtro } from '../pages/operacoes/exportacao/exportacao.component';


import { BancoList, BancoStatus, BancoRequest, Cidades } from '../models/banco.model';

@Injectable({
    providedIn: 'root'
})
export class BancoService {


  id: number = 0;
  nome: string = '';
  cidade_Id: string =  '';
  cep: string = '';
  cNumero:string = '';
  numero: string = '';

    url = environment.url;
    list = new BehaviorSubject<BancoList[]>([

    ]);
    // list = new BehaviorSubject<BancoList[]>([]);
    listOperacaoPorPessoa = new BehaviorSubject<BancoList[]>([]);
    cidades = new BehaviorSubject<Cidades[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,

    ) { }








  //   get(id: number) {
  //     var objeto = this.list.value.find(x=>x.id == id)
  //     var lista = this.list
  //     return  of(objeto ,lista);
  // }


  get(id: number) {
    return this.http.get<BancoRequest>(`${this.url}/banco/${id}`, { headers: new HttpHeaders({ 'loading': 'false' })});
}


    create(request: BancoRequest) {
        return this.http.post<Response>(`${this.url}/Banco`, request);
    }

    getList() {
      this.table.loading.next(true);
      return this.http.get<BancoList[]>(`${this.url}/Banco`, { headers: new HttpHeaders({ 'loading': 'false' })})
      .pipe(tap({
          next: list => {
              list = list.map(x => {
                  return x;
              })
              this.list.next(Object.assign([], list));
              return of(list);
          },
          error: res => this.toastr.error('Não foi possível carregar listagem de pessoas.')

      }));


    }

    edit(request: BancoRequest) {
        return this.http.put<Response>(`${this.url}/Banco`, request);
    }

    delete(id: number) {
      return this.http.delete<Response>(`${this.url}/banco/${id}`);
  }





  getCidade() {
    return this.http.get<Cidades[]>(`${this.url}/cidade/`, { headers: new HttpHeaders({ 'loading': 'false' })})
    .pipe(tap({
        next: list => {
            this.cidades.next(list);
            return of(list);
        },
        error: res => this.toastr.error('Não foi possível carregar listagem de status da operação.')
    }));
}


}


import { BeneficiarioList, BeneficiarioRequest } from './../models/beneficiario.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';

import { Response } from '../helpers/request-response.interface';
import { Filtro } from '../pages/operacoes/exportacao/exportacao.component';



@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {


  id: number = 0;
  nome: string = '';
  cidade_Id: string = '';
  cep: string = '';
  cNumero: string = '';
  numero: string = '';

  url = environment.url;
  list = new BehaviorSubject<BeneficiarioList[]>([
    {
      id: 10,
      nome: 'teste',
      cep: 'teste',
      uf: 'teste',
      cidade: 'teste',
      logradouro: 'teste',
      numero: 'teste',
      codigoSwift: 'teste',
      conta: 'teste',
      representante: 'teste',
      cnpj: 11111111111111,
      nomeBanco: 'teste',
      nomePais: 'teste',
    }
  ]);




  constructor(
    private table: Table,
    private http: HttpClient,
    private toastr: ToastrService,

  ) { }




  getList() {
    this.table.loading.next(true);
    return this.http.get<BeneficiarioList[]>(`${this.url}/beneficiario`, { headers: new HttpHeaders({ 'loading': 'false' }) })
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


  get(id: number) {
    return this.http.get<BeneficiarioRequest>(`${this.url}/beneficiario/${id}`, { headers: new HttpHeaders({ 'loading': 'false' }) });
  }



  post(request: BeneficiarioRequest) {
    return this.http.post<Response>(`${this.url}/beneficiario`, request);
  }



  delete(id: number) {
    return this.http.delete(`${this.url}/Beneficiario/${id}`);
}


}


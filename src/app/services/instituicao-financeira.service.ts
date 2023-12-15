
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { PessoaOperacaoImportacao, PessoaOperacaoList, PessoaOperacaoRequest, PessoaOperacaoStatus } from '../models/pessoa-operacao.model';
import { Response } from '../helpers/request-response.interface';
import { Filtro } from '../pages/operacoes/exportacao/exportacao.component';
import { InstituicaoFinanceiraList, InstituicaoFinanceiraStatus, InstituicaoFinanceiraRequest } from '../models/instituicao-financeira.model';
@Injectable({
    providedIn: 'root'
})
export class InstituicaoFinanceiraService {




    url = environment.url;
    list = new BehaviorSubject<InstituicaoFinanceiraList[]>([
    ]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,

    ) { }

    getList() {
      this.table.loading.next(true);
      return this.http.get<InstituicaoFinanceiraList[]>(`${this.url}/instituicaoFinanceira`, { headers: new HttpHeaders({ 'loading': 'false' })})
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
      return this.http.get<InstituicaoFinanceiraRequest>(`${this.url}/instituicaoFinanceira/${id}`, { headers: new HttpHeaders({ 'loading': 'false' })});
  }



    post(request: InstituicaoFinanceiraRequest) {
        return this.http.post<Response>(`${this.url}/instituicaoFinanceira`, request);
    }





    delete(id: number) {
      return this.http.delete<Response>(`${this.url}/InstituicaoFinanceira/${id}`);
  }



}


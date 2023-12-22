import { BeneficiarioList, BeneficiarioRequest } from '../models/beneficiario.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { DocumentoSwiftRequest } from '../models/documento-swift';
import { DocumentoSwift_List } from '../models/documento-swift';
import { Response } from '../helpers/request-response.interface';
import { Filtro } from '../pages/operacoes/exportacao/exportacao.component';



@Injectable({
  providedIn: 'root'
})
export class DocumentoSwiftService {


  id: number = 0;
  nome: string = '';
  cidade_Id: string = '';
  cep: string = '';
  cNumero: string = '';
  numero: string = '';
  list = new BehaviorSubject<DocumentoSwift_List[]>([]);
  url = environment.url;





  constructor(
    private table: Table,
    private http: HttpClient,
    private toastr: ToastrService,

  ) { }




  getList() {
    this.table.loading.next(true);
    return this.http.get<DocumentoSwift_List[]>(`${this.url}/DocumentoSwift`, { headers: new HttpHeaders({ 'loading': 'false' }) })
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
    return this.http.get<DocumentoSwiftRequest>(`${this.url}/DocumentoSwift/${id}`, { headers: new HttpHeaders({ 'loading': 'false' }) });
  }



  post(request: DocumentoSwiftRequest) {
    return this.http.post<Response>(`${this.url}/DocumentoSwift`, request);
  }



  delete(id: number) {
    return this.http.delete<Response>(`${this.url}/DocumentoSwift/${id}`);
}


}


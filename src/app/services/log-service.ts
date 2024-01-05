import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { LogList, LogRequest} from '../models/log-model';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  url = environment.url;
  list = new BehaviorSubject<LogList[]>([]);

  constructor(
      private table: Table,
      private http: HttpClient,
      private toastr: ToastrService
  ) { }

  getList(loading: boolean = false) {
      this.table.loading.next(true);
      return this.http.get<LogList[]>(`${this.url}/log-acoes`, { headers: new HttpHeaders({ 'loading': loading.toString() }) })
          .pipe(
              tap(
                  list => {
                      this.list.next(list); // Atualiza o BehaviorSubject diretamente
                  },
                  error => {
                      this.toastr.error('Não foi possível carregar listagem de logs.');
                  }
              )
          );
  }

  get(id: number) {
      return this.http.get<LogRequest>(`${this.url}/log-acoes/${id}`, { headers: new HttpHeaders({ 'loading': 'false' }) });
  }
}

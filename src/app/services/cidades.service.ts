import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Cidades } from '../models/cidade.model';

@Injectable({
    providedIn: 'root'
})
export class CidadesService {
    url = environment.url;
    cidades = new BehaviorSubject<Cidades[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,

    ) { }




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


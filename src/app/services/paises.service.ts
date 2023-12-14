import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { Paises } from '../models/pais.model';

@Injectable({
    providedIn: 'root'
})
export class PaisesService {
    url = environment.url;


    paises = new BehaviorSubject<Paises[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,

    ) { }




  getPais() {
    return this.http.get<Paises[]>(`${this.url}/pais/`, { headers: new HttpHeaders({ 'loading': 'false' })})
    .pipe(tap({
        next: list => {
            this.paises.next(list);
            return of(list);
        },
        error: res => this.toastr.error('Não foi possível carregar listagem de status da operação.')
    }));
}


}


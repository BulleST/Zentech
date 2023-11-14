import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { AccountService } from './account.service';
import { Account } from '../models/account.model';
import { PerfilAcesso, Role } from '../models/account-perfil.model';
import { PessoaList } from '../models/pessoa.model';
import { Pessoa, PessoaFormulario, PessoaImportacao } from '../models/pessoa-crud.model';

@Injectable({
    providedIn: 'root'
})
export class PessoaService {
    url = environment.url;
    list = new BehaviorSubject<PessoaList[]>([]);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private accountService: AccountService,
    ) {
    }


    getList() {
        this.table.loading.next(true);
        return this.http.get<PessoaList[]>(`${this.url}/pessoa`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                this.list.next(list);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar listagem de pessoas.')
        }));
    }

    get(id: number) {
        return this.http.get<Pessoa>(`${this.url}/pessoa/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }

    create(request: any[]) {
        return this.http.post<any>(`${this.url}/pessoa`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/pessoa/${id}`);
    }

}

import { Injectable } from '@angular/core';
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
import { EmpresaService } from './empresa.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    url = environment.url;
    list = new BehaviorSubject<Usuario[]>([]);
    objeto = new BehaviorSubject<Usuario | undefined>(undefined);
    account: Account = new Account;
    perfilAcesso = new BehaviorSubject<PerfilAcesso[]>([]);
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private accountService: AccountService,
        private empresaService: EmpresaService,
    ) {
        this.accountService.account.subscribe(res => this.account = res ?? new Account);
    }

    getObject() {
        var e = localStorage.getItem('usuario')
        if (e) {
            this.setObject(this.crypto.decrypt(e) ?? new Usuario)
        }
        return this.objeto;
    }

    setObject(value: Usuario) {
        localStorage.setItem('usuario', this.crypto.encrypt(value) ?? '')
        this.objeto.next(value);
    }

    getList(loading: boolean = false) {
       this.loading.next(loading);
        this.table.loading.next(true);
        var empresaId = this.empresaService.getEmpresa().value.id as unknown as number;
        return this.http.get<Usuario[]>(`${this.url}/usuario/list/${empresaId}`)
        .pipe(tap({
            next: list => {
                list = list.map(x => {
                    x.ativo = !x.dataDesativado;
                    return x;
                });
                this.list.next(list);
                this.loading.next(false);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar usuários.'),
              finalize: () => {
                    this.loading.next(false);
this.table.loading.next(false);
                },
        }));
    }

    get(id: number) {
        return this.http.get<Usuario>(`${this.url}/usuario/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) });
    }

    getPerfilAcesso() {
        return this.http.get<PerfilAcesso[]>(`${this.url}/perfilAcesso/getAll`)
        .pipe(tap({
            next: res => {
                this.perfilAcesso.next(res);
                return res;
            },
            error: res => this.toastr.error('Não foi possível carregar perfil.')
        }));
    }

    create(request: Usuario) {
        request.empresa_Id = this.empresaService.getEmpresa().value.id;
        return this.http.post<Usuario>(`${this.url}/usuario`, request);
    }

    edit(request: Usuario) {
        return this.http.put<Usuario>(`${this.url}/usuario`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/usuario/${id}`);
    }

    deactivated(id: number, ativo?: boolean) {
        return this.http.patch<Usuario>(`${this.url}/usuario/${id}/${ativo}`, {});
    }

    resetPassword(id: number) {
        return this.http.patch(`${this.url}/usuario/reset-password/${id}`, {});
    }
}

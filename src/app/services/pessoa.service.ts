import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { PessoaList, PessoaResponse } from '../models/pessoa.model';
import { Pessoa} from '../models/pessoa.model';

@Injectable({
    providedIn: 'root'
})
export class PessoaService {
    url = environment.url;
    list = new BehaviorSubject<PessoaList[]>([]);
    object = new BehaviorSubject<Pessoa>(new Pessoa);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
    ) {
    }


    getList() {
        this.table.loading.next(true);
        return this.http.get<PessoaList[]>(`${this.url}/pessoa`, { headers: new HttpHeaders({ 'loading': 'false' })})
        .pipe(tap({
            next: list => {
                list = list.map(x => {
                    x.dataCadastro = new Date(x.dataCadastro)
                    return x;
                })
                this.list.next(Object.assign([], list));
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar listagem de pessoas.')
        }));
    }

    get(id: number) {
        return this.http.get<Pessoa>(`${this.url}/pessoa/${id}`, { headers: new HttpHeaders({ 'loading': 'true' }) }).pipe(tap({
            next: object => {
                this.object.next(Object.assign({}, object));
                return of(object);
            },
            error: res => this.toastr.error('Não foi possível carregar listagem de pessoas.')
        }));
    }
    

    create(request: any[]) {
        return this.http.post<PessoaResponse[]>(`${this.url}/pessoa`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/pessoa/${id}`);
    }


    getPessoa(cpf: number, dataNasc: Date) {
        dataNasc = new Date(dataNasc.toString() + 'T00:00:00').toLocaleString().substring(0,10) as unknown as Date;
        return this.http.post<BRConsultaResponse>(`${this.url}/pessoa/consulta-pessoa`, {cpf, dataNasc});
    }

}


export class BRConsultaResponse  {
    CONTROLE: string = '';
    CPF: string = '';
    DATA_CAP: string = '';
    DATA_INSCRICAO: string = '';
    DATA_NASC: string = '';
    DIGITO: string = '';
    HORA_CAP: string = '';
    NOME: string = '';
    SITUACAO: string = '';
    STATUS: string = '';
    ID_CONSULTA: string = '';
    ERRO: string = '';
    RETORNO: string = '';

}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../utils/table';
import { PessoaList, PessoaResponse } from '../models/pessoa.model';
import { Pessoa} from '../models/pessoa.model';
import { Response } from '../helpers/request-response.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { EmpresaService } from './empresa.service';


@Injectable({
    providedIn: 'root'
})
export class PessoaService {
    url = environment.url;
    list = new BehaviorSubject<PessoaList[]>([]);
    object = new BehaviorSubject<Pessoa>(new Pessoa);
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private datepipe: DatePipe,
        private empresaService: EmpresaService,
    ) {
    }

    getList(loading: boolean = false) {
       this.loading.next(loading);
        this.table.loading.next(loading);
        var empresaId = this.empresaService.empresaSelected.value.id as unknown as number;
        return this.http.get<PessoaList[]>(`${this.url}/pessoa/list/empresa/${empresaId}`)
        .pipe(tap({
            next: list => {
                list = list.map(x => {
                    x.dataCadastro = new Date(x.dataCadastro);
                    return x;
                });
                this.list.next(Object.assign([], list));
                this.loading.next(false);
                return of(list);
            },
            error: res => this.toastr.error('Não foi possível carregar listagem de pessoas.'),
            finalize: () => this.loading.next(false),
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


    importarArquivo(file: File){
        var data = new FormData();
        data.append('file', file);
        var empresaId = this.empresaService.empresaSelected.value.id as unknown as number;
        return this.http.post<Response>(`${this.url}/pessoa/importa-excel/${empresaId}`, data);
    }


    post(request: Pessoa) {
        request.empresa_Id = this.empresaService.empresaSelected.value.id;
        return this.http.post<Response>(`${this.url}/pessoa`, request);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${this.url}/pessoa/${id}`);
    }


    getPessoa(cpf: number, data: Date) {
        var dataNasc = this.datepipe.transform(data, 'dd/MM/yyyy')
        return this.http.post<ConsultaResponse>(`${this.url}/pessoa/consulta-pessoa`, {cpf, dataNasc});
    }


}

export interface ConsultaResponse {
    retorno: string | BRConsulta;
    dados: any;
}


export class BRConsulta  {
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
    ERRO?: string = '';
    RETORNO?: string = '';
}

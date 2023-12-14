
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Endereco {
    cep: string;
    logradouro: string;
    localidade: string;
    bairro: string;
    uf: string;
    ddd: string;

}



@Injectable({
  providedIn: 'root'
})
export class CepService {



  constructor(private http: HttpClient) { }

  buscar(cep: string):Observable<Endereco>{
    return this.http.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/` );
  }





}

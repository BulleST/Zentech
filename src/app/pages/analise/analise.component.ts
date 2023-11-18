import { Component } from '@angular/core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaOperacaoList } from 'src/app/models/pessoa-operacao.model';
import { PessoaList } from 'src/app/models/pessoa.model';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-analise',
  templateUrl: './analise.component.html',
  styleUrls: ['./analise.component.css']
})
export class AnaliseComponent {
    faChartLine = faChartLine;
    subscription: Subscription[] = [];
    pessoasList: PessoaList[] = [];
    operacoesList: PessoaOperacaoList[] = [];


    constructor(
        private pessoaService: PessoaService,
        private pessoaSaldoService: PessoaSaldoService,
        private pessoaOperacaoService: PessoaOperacaoService,
    ) {
        lastValueFrom(pessoaService.getList());
        var a = pessoaService.list.subscribe(res => {
            this.pessoasList = res;
        });
        this.subscription.push(a);

        var b = pessoaOperacaoService.list.subscribe(res => {
            
        });
        this.subscription.push(b);

        lastValueFrom(pessoaOperacaoService.getList());
        var c = pessoaOperacaoService.list.subscribe(res => {
            this.operacoesList = res;
        });
        this.subscription.push(c);


     }

}

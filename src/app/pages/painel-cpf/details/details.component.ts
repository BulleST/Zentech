import { DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronCircleLeft, faDollarSign, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaOperacaoList } from 'src/app/models/pessoa-operacao.model';
import { PessoaSaldo } from 'src/app/models/pessoa-saldo.model';
import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { tabChanged } from 'src/app/utils/tabview';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnDestroy {
    faIdCard = faIdCard;
    faChevronCircleLeft = faChevronCircleLeft;
    faDollarSign = faDollarSign;


    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    activeIndex = 0;

    pessoa: Pessoa = new Pessoa;
    loadingPessoa = true;
    erroPessoa = '';

    saldos: PessoaSaldo[] = [];
    loadingSaldo = true;
    erroSaldo = '';
    
    operacoes: PessoaOperacaoList[] = [];
    loadingOperacoes = true;
    erroOperacoes = '';

    limiteConcedido = 0;
    limiteUtilizado = 0;
    lastIdDeleteSaldo: number = 0;


    constructor(
        private activatedRoute: ActivatedRoute,
        private pessoaService: PessoaService,
        private pessoaSaldoService: PessoaSaldoService,
        private pessoaOperacaoService: PessoaOperacaoService,
        private crypto: Crypto,
        private datepipe: DatePipe,
    ) {

        this.activeIndex = parseInt(localStorage.getItem('tabIndex') ?? '0')
        this.tabChanged(this.activeIndex);

        var object = this.pessoaService.object.subscribe(res => this.pessoa = res);
        this.subscription.push(object);
        
        var listSaldos = this.pessoaSaldoService.list.subscribe(res => {
            this.saldos = res.map(x => {
                x.dataConcessao = this.datepipe.transform(x.dataConcessao, 'dd/MM/yyyy HH:mm', 'pt-BR') as unknown as Date;
                x.idEncrypted = this.crypto.encrypt(x.id) ?? '';
                return x
            }).sort((x, y) => x.id - y.id);
            this.lastIdDeleteSaldo = res.length > 0 ? res[res.length - 1].id : 0;
            this.calculaLimiteConcedido();
        });
        this.subscription.push(listSaldos); 

        var listOperacoes = this.pessoaOperacaoService.listOperacaoPorPessoa.subscribe(res => {
            this.operacoes = Object.assign([], res);
            this.calculaLimiteUtilizado();
        });
        this.subscription.push(listOperacoes); 
        
        var params = this.activatedRoute.params.subscribe(p => {
            if (p['pessoa_id']) {
                this.loadingPessoa = true;
                this.loadingSaldo = true;
                this.pessoa.id = this.crypto.decrypt(p['pessoa_id']);
                lastValueFrom(this.pessoaService.get(this.pessoa.id))
                    .then(res => {
                        this.pessoa = res;
                    })
                    .catch(res => {
                        this.erroPessoa = getError(res);
                    })
                    .finally(() => this.loadingPessoa = false);

                lastValueFrom(this.pessoaSaldoService.getList(this.pessoa.id))
                    .then(res => {
                        this.saldos = res;
                        this.calculaLimiteConcedido();
                    })
                    .catch(res => {
                        this.erroSaldo = getError(res);
                    })
                    .finally(() => this.loadingSaldo = false);

                lastValueFrom(this.pessoaOperacaoService.getListById(this.pessoa.id))
                    .then(res => {
                        this.operacoes = res;
                        this.calculaLimiteUtilizado();
                    })
                    .catch(res => {
                        this.erroOperacoes = getError(res);
                    })
                    .finally(() => this.loadingOperacoes = false);
            } else {
            }
        });
        this.subscription.push(params);
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    tabChanged(index: number) {
        tabChanged(index)
    }

    calculaLimiteConcedido() {
        this.limiteConcedido = this.saldos.length > 0 ? this.saldos.map(x => x.valorConcedido).reduce((x, y) => x + y) : 0;
    }

    calculaLimiteUtilizado() {
        var liberados = this.operacoes.filter(x => x.statusOperacao == 'Liberado');
        this.limiteUtilizado = liberados.length > 0 ? liberados.map(x => x.valorOperacao).reduce((x, y) => x + y) : 0;
    }


}

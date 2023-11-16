import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronCircleLeft, faDollarSign, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaSaldo } from 'src/app/models/pessoa-saldo.model';
import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
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
    pessoa: Pessoa = new Pessoa;
    loadingPessoa = true;
    saldos: PessoaSaldo[] = [];
    loadingSaldo = true;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    activeIndex = 0;

    constructor(
        private activatedRoute: ActivatedRoute,
        private pessoaService: PessoaService,
        private pessoaSaldoService: PessoaSaldoService,
        private crypto: Crypto,
    ) {

        this.activeIndex = parseInt(localStorage.getItem('tabIndex') ?? '0')
        this.tabChanged(this.activeIndex)
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
                    })
                    .finally(() => this.loadingPessoa = false)

                lastValueFrom(this.pessoaSaldoService.getList(this.pessoa.id))
                    .then(res => {
                        this.saldos = res;
                    })
                    .catch(res => {
                    })
                    .finally(() => this.loadingSaldo = false)
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


}

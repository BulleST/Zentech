import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaSaldoRequest } from 'src/app/models/pessoa-saldo.model';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal';

@Component({
    selector: 'app-create-saldo',
    templateUrl: './create-saldo.component.html',
    styleUrls: ['./create-saldo.component.css']
})
export class CreateSaldoComponent implements OnDestroy {
    faDollarSign = faDollarSign;
    objeto: PessoaSaldoRequest = new PessoaSaldoRequest;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    routerBack: string[] = ['../'];
    routeBackOptions: any;


    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: Modal,
        private pessoaSaldoService: PessoaSaldoService,
        private crypto: Crypto
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);

        this.activatedRoute.parent?.params.subscribe(res => {
            if (res['pessoa_Id']) {
                var id = res['pessoa_Id']
                this.objeto.pessoa_Id = this.crypto.decrypt(id) as number
            } else {
                this.voltar();
            }
        });


    }
    ngAfterViewInit(): void {
        this.modal.title.next('Cadastrar Saldo')
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '500px' })
        this.modal.routerBack.next(this.routerBack);
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }


    send() {
        this.loading = true;
        this.erro = '';

        lastValueFrom(this.pessoaSaldoService.create(this.objeto))
            .then(res => {
                lastValueFrom(this.pessoaSaldoService.getList(this.objeto.pessoa_Id));
                this.voltar();
                this.loading = false;
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }
}

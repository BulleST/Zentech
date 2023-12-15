import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalUtils } from 'src/app/utils/modal';
import { Subscription, lastValueFrom } from 'rxjs';
import { getError } from 'src/app/utils/error';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-delete-operacao',
  templateUrl: './delete-operacao.component.html',
  styleUrls: ['./delete-operacao.component.css']
})
export class DeleteOperacaoComponent implements OnDestroy {
    faTrash = faTrash;
    id: number = 0;
    pessoa_Id: number = 0;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    routerBack: string[] = ['../../../'];
    routeBackOptions: any;

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalUtils,
        private pessoaOperacaoService: PessoaOperacaoService,
        private pessoaSaldoService: PessoaSaldoService,
        private pessoaService: PessoaService,
        private crypto: Crypto
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(res => {
            if (res['operacao_id']) {
                var id = res['operacao_id'];
                this.id = this.crypto.decrypt(id) as number;
                setTimeout(() => {
                    this.modal.setOpen(true);
                }, 200);
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);


        var parent = this.activatedRoute.parent!.params.subscribe(res => {
            if (res['pessoa_id']) {
                var id = res['pessoa_id'];
                this.pessoa_Id = this.crypto.decrypt(id) as number
            } else {
                this.voltar();
            }
        });
        this.subscription.push(parent);


    }
    ngAfterViewInit(): void {
        this.modal.title.next('Excluir Operação')
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '500px' })
        this.modal.routerBack.next(this.routerBack);
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);
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
        lastValueFrom(this.pessoaOperacaoService.delete(this.id))
            .then(res => {
                this.loading = false;
                if (res.sucesso) {
                    lastValueFrom(this.pessoaService.getList());
                    lastValueFrom(this.pessoaSaldoService.getList(this.pessoa_Id));
                    lastValueFrom(this.pessoaOperacaoService.getListById(this.pessoa_Id));
                    this.voltar();
                } else {
                    this.erro = res.mensagem;
                }
                
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }
}

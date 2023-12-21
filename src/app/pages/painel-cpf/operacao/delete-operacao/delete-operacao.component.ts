import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { Crypto } from 'src/app/utils/crypto';

import { Subscription, lastValueFrom } from 'rxjs';
import { getError } from 'src/app/utils/error';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Modal, ModalService } from 'src/app/services/modal.service';

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

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    modal: Modal = new Modal;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private pessoaOperacaoService: PessoaOperacaoService,
        private pessoaSaldoService: PessoaSaldoService,
        private pessoaService: PessoaService,
        private crypto: Crypto
    ) {



    }
    ngAfterViewInit(): void {
        this.modal.title  = 'Excluir Operação'
        this.modal.template  = this.template
        this.modal.style  = { 'max-width': '500px' }
        this.modal.routerBack  = ['../../../'];
        this.modal.activatedRoute  = this.activatedRoute;
        this.modal.icon  = this.icon;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        
        var parent = this.activatedRoute.parent!.params.subscribe(res => {
            if (res['pessoa_id']) {
                var id = res['pessoa_id'];
                this.pessoa_Id = this.crypto.decrypt(id) as number
            } else {
                this.voltar();
            }
        });
        this.subscription.push(parent);
        var params = this.activatedRoute.params.subscribe(res => {
            if (res['operacao_id']) {
                var id = res['operacao_id'];
                this.id = this.crypto.decrypt(id) as number;
                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'moeda');
                }, 200);
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    
    voltar() {
        this.modalService.removeModal(this.modal.id);
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

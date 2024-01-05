import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { Crypto } from 'src/app/utils/crypto';
import { Subscription, lastValueFrom } from 'rxjs';
import { getError } from 'src/app/utils/error';
import { ToastrService } from 'ngx-toastr';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { insertOrReplace, remove } from 'src/app/utils/service-list';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-delete-saldo',
  templateUrl: './delete-saldo.component.html',
  styleUrls: ['./delete-saldo.component.css']
})
export class DeleteSaldoComponent implements OnDestroy {
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
        private pessoaSaldoService: PessoaSaldoService,
        private pessoaService: PessoaService,
        private crypto: Crypto,
        private toastr: ToastrService,
    ) {
    }

    ngAfterViewInit(): void {
        this.modal.title = 'Excluir Saldo';
        this.modal.template = this.template;
        this.modal.style = { 'max-width': '500px' };
        this.modal.routerBack = ['../../../'];
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.icon = this.icon;
        
        var params = this.activatedRoute.params.subscribe(res => {
            if (res['saldo_id']) {
                var id = res['saldo_id'];
                this.id = this.crypto.decrypt(id) as number;
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);
        
        var parent = this.activatedRoute.parent?.snapshot.paramMap.has('pessoa_id');
        var child = this.activatedRoute.snapshot.paramMap.has('pessoa_id');
        var paramsSubscriber  = parent ? this.activatedRoute.parent?.params : child ? this.activatedRoute.params : this.voltar();
        
        if (paramsSubscriber) {
            var paramsSubscription = paramsSubscriber.subscribe(x => {
                if (x['pessoa_id']) {
                    this.pessoa_Id = this.crypto.decrypt(x['pessoa_id']);
                    setTimeout(() => {
                        this.modal = this.modalService.addModal(this.modal, 'moeda');
                    }, 200);
                } else {
                    this.voltar();
                }
            });
            this.subscription.push(paramsSubscription);
        } else {
            this.voltar();
        }
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modalService.removeModal(this.modal);
    }

    send() {
        this.loading = true;
        this.erro = '';
        lastValueFrom(this.pessoaSaldoService.delete(this.id))
            .then(res => {
                this.loading = false;
                if (res.sucesso) {
                    if (res.objeto) {
                        insertOrReplace(this.pessoaService, res.objeto['pessoa']);
                        remove(this.pessoaSaldoService, res.objeto['saldo']);
                    } else {
                        lastValueFrom(this.pessoaSaldoService.getList(this.pessoa_Id));
                        lastValueFrom(this.pessoaService.getList());
                    }

                    lastValueFrom(this.pessoaService.get(this.pessoa_Id));
                    
                    this.voltar();
                } 
                else {
                    this.erro = res.mensagem ?? "Não foi possível excluir saldo.";
                }
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }
}

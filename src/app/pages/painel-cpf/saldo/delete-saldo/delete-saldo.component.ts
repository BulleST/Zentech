import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { Crypto } from 'src/app/utils/crypto';
import { Modal } from 'src/app/utils/modal';
import { Subscription, lastValueFrom } from 'rxjs';
import { getError } from 'src/app/utils/error';
import { ToastrService } from 'ngx-toastr';

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
    routerBack: string[] = ['../../../'];
    routeBackOptions: any;

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: Modal,
        private pessoaSaldoService: PessoaSaldoService,
        private crypto: Crypto,
        private toastr: ToastrService,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(res => {
            if (res['saldo_id']) {
                var id = res['saldo_id'];
                this.id = this.crypto.decrypt(id) as number;
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);
        
        var parent = activatedRoute.parent?.snapshot.paramMap.has('pessoa_id');
        var child = activatedRoute.snapshot.paramMap.has('pessoa_id');
        var paramsSubscriber  = parent ? activatedRoute.parent?.params : child ? activatedRoute.params : this.voltar();
        
        if (paramsSubscriber) {
            var paramsSubscription = paramsSubscriber.subscribe(x => {
                if (x['pessoa_id']) {
                    this.pessoa_Id = this.crypto.decrypt(x['pessoa_id']);
                    setTimeout(() => {
                        this.modal.setOpen(true);
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
    ngAfterViewInit(): void {
        this.modal.title.next('Excluir Saldo')
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
        lastValueFrom(this.pessoaSaldoService.delete(this.id))
            .then(res => {
                lastValueFrom(this.pessoaSaldoService.getList(this.pessoa_Id));
                this.loading = false;
                if (res.successo) {
                    this.voltar();
                } else {
                    this.erro = res.mensagem;
                    this.toastr.error(res.mensagem);
                }
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }
}

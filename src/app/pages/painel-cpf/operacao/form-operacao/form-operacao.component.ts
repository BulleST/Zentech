import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PessoaOperacaoRequest, PessoaOperacaoStatus } from 'src/app/models/pessoa-operacao.model';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { getError } from 'src/app/utils/error';
import { Crypto } from 'src/app/utils/crypto';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { Modal, ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-form-operacao',
  templateUrl: './form-operacao.component.html',
  styleUrls: ['./form-operacao.component.css']
})
export class FormOperacaoComponent implements OnDestroy {
    objeto: PessoaOperacaoRequest = new PessoaOperacaoRequest;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    status: PessoaOperacaoStatus[] = [];
    loadingStatus = true;

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    modal: Modal = new Modal;
    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private pessoaService: PessoaService,
        private pessoaSaldoService: PessoaSaldoService,
        private pessoaOperacaoService: PessoaOperacaoService,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private toastr: ToastrService,
    ) {
        lastValueFrom(this.pessoaOperacaoService.getStatus())
        .then(res => {
            this.loadingStatus = false;
            this.status = res;
        });
    }
    ngAfterViewInit(): void {
        this.modal.id =  0;
        this.modal.template =  this.template;
        this.modal.icon =  this.icon;
        this.modal.style =  { 'max-width': '600px'};
        this.modal.activatedRoute =  this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        this.modal.routerBack = ['../../'];
        
        var parent = this.activatedRoute.parent?.snapshot.paramMap.has('pessoa_id');
        var child = this.activatedRoute.snapshot.paramMap.has('pessoa_id');
        if (parent || child) {
            var paramsSubscriber = parent ? this.activatedRoute.parent?.params : child ? this.activatedRoute.params : undefined;

        } else {
            this.voltar();
            return ;
        }
        
        if (paramsSubscriber) {
            var params = paramsSubscriber.subscribe(x => {
                if (x['pessoa_id']) {
                    this.objeto.pessoa_Id = this.crypto.decrypt(x['pessoa_id']);
             
                } else {
                    this.voltar();
                }
            });
            this.subscription.push(params);
        }
        var params = this.activatedRoute.params.subscribe(res => {
            if (res['operacao_id']) {
                var id = res['operacao_id'];
                this.objeto.id = this.crypto.decrypt(id) as number;
                this.modal.title = 'Editar Operação';
                this.modal.routerBack = ['../../../'];
                lastValueFrom(this.pessoaOperacaoService.get(this.objeto.id))
                .then(res => {
                    this.loading = false;
                    res.data = this.datepipe.transform(res.data, 'yyyy-MM-ddThh:mm') as unknown as Date;
                    res.num_Op = (res.num_Op ? res.num_Op.toString().padStart(4, '0') : '')  as unknown as number;
                    this.objeto = res;
                    
                    setTimeout(() => {
                        this.modal = this.modalService.addModal(this.modal, 'moeda');
                    }, 200);
                }) 
                .catch(res => {
                    this.loading = false;
                    this.voltar()
                }) 
            } else {
                this.modal.title = 'Cadastrar Operação';
                this.modal.routerBack = ['../../'];
                this.objeto.data = this.datepipe.transform(new Date(), 'yyyy-MM-ddThh:mm') as unknown as Date;
                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'moeda');
                }, 200);

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
    
    request() {
        if (this.objeto.id == 0)
            return lastValueFrom(this.pessoaOperacaoService.create(this.objeto));
        
        return lastValueFrom(this.pessoaOperacaoService.edit(this.objeto));
    }

    send() {
        this.loading = true;
        this.erro = '';

            this.request()
            .then(res => {
                if (res.sucesso == true) {
                    lastValueFrom(this.pessoaService.getList());
                    lastValueFrom(this.pessoaService.get(this.objeto.pessoa_Id));
                    lastValueFrom(this.pessoaSaldoService.getList(this.objeto.pessoa_Id));
                    lastValueFrom(this.pessoaOperacaoService.getListById(this.objeto.pessoa_Id));
                    lastValueFrom(this.pessoaOperacaoService.getList());
                    this.voltar();
                } else {
                    this.erro = res.mensagem;
                    this.toastr.error(res.mensagem);
                }
                this.loading = false;
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }
    
}

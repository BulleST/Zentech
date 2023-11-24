import { DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaOperacaoList, PessoaOperacaoRequest } from 'src/app/models/pessoa-operacao.model';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Modal } from 'src/app/utils/modal';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnDestroy {

    faFile = faFile;
    modalOpen = false;
    objeto: PessoaOperacaoRequest = new PessoaOperacaoRequest;
    objetoList: PessoaOperacaoList = new PessoaOperacaoList;
    loading = false;
    subscription: Subscription[] = [];
    routerBack: string[] = ['../../'];
    routeBackOptions: any;

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: Modal,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private pessoaService: PessoaService,
        private pessoaOperacaoService: PessoaOperacaoService

    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };

        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        this.modal.title.next('Detalhes')
        this.modal.style.next({ 'max-width': '600px' })
        this.modal.routerBack.next(this.routerBack);
        this.modal.activatedRoute.next(this.activatedRoute);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }
    
  ngAfterViewInit() {
        var params = this.activatedRoute.params.subscribe(async p => {
            if (p['operacao_id']) {
                this.objeto.id = this.crypto.decrypt(p['operacao_id']);
                var list = this.pessoaOperacaoService.list.value;
                if (list.length == 0) 
                var list =  await lastValueFrom(this.pessoaOperacaoService.getList())
                this.objetoList = list.find(x => x.id == this.objeto.id) as PessoaOperacaoList;
                if (!this.objetoList) {
                    this.voltar();
                    return;
                }
                this.objeto.data = this.datepipe.transform(new Date(this.objeto.data), 'yyyy-MM-ddTHH:mm') as unknown as Date
                lastValueFrom(this.pessoaOperacaoService.get(this.objeto.id))
                    .then(operacao => {
                        this.objeto = operacao;
                    })
                    .catch(res => {
                        this.voltar();
                    })
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);
        this.modal.template.next(this.template)
        this.modal.icon.next(this.icon);

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

    exportarPDF() {
        this.loading = true;
      
        this.loading = false;
    }




}

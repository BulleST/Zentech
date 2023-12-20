import { PessoaService } from 'src/app/services/pessoa.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCircleCheck, faCircleXmark, faTriangleExclamation, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';

import { getError } from 'src/app/utils/error';
import { ModalUtils } from 'src/app/utils/modal';

@Component({
    selector: 'app-importacao-arquivo',
    templateUrl: './importacao-arquivo.component.css',
    styleUrls: ['./importacao-arquivo.component.css']
})
export class ImportacaoArquivoComponent {
    faUpload = faUpload;
    faCircleXmark = faCircleXmark;
    faTriangleExclamation = faTriangleExclamation;
    faCircleCheck = faCircleCheck;

    loading = false;
    modalOpen = false;
    erro = '';
    subscription: Subscription[] = [];
    routerBack: string[] = ['../'];
    routeBackOptions: any;
    fileUpload?: File;

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    @ViewChild('file') file: NgModel;



    constructor(
        private toastr: ToastrService,
        private modal: ModalUtils,
        private activatedRoute: ActivatedRoute,
        private pessoaService: PessoaService,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };
        this.modal.title.next('Importar Arquivo')
        this.modal.style.next({ 'width': 'max-content', 'max-width': '95vw' })
        this.modal.routerBack.next(this.routerBack);
        this.modal.activatedRoute.next(this.activatedRoute);

    }

    ngAfterViewInit(): void {
        this.modal.template.next(this.template)
        this.modal.icon.next(this.icon);

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    ngOnDestroy(): void {
        this.modal.setOpen(false);
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
        this.modal.resetModal();
    }
    send() {
        this.loading = true;
        this.erro = '';
        if (!this.fileUpload) {
            this.toastr.error('Selecione um arquivo para enviar.');
            this.erro = 'Selecione um arquivo para enviar.';
            return
        }
        lastValueFrom(this.pessoaService.importarArquivo(this.fileUpload))
            .then(res => {
                lastValueFrom(this.pessoaService.getList());
                this.loading = false;
                if (res.find(x => x.sucesso == false)) {
                    this.toastr.error('Alguns registros não puderam ser salvos.');
                    this.erro = 'Alguns registros não puderam ser salvos.';

                } else {
                    this.voltar();
                }
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }

}

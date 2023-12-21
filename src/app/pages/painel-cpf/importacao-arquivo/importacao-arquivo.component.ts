import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCircleCheck, faCircleXmark, faTriangleExclamation, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { getError } from 'src/app/utils/error';


@Component({
    selector: 'app-importacao-arquivo',
    templateUrl: './importacao-arquivo.component.html',
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
    fileUpload?: File;

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    @ViewChild('file') file: NgModel;
    modal: Modal = new Modal;

    constructor(
        private toastr: ToastrService,
        private modalService: ModalService,
        private activatedRoute: ActivatedRoute,
        private pessoaService: PessoaService,
    ) {

    }

    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'width': 'max-content', 'max-width': '95vw' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };
        this.modal.routerBack = ['../']
        this.modal.title = 'Importar Arquivo';

        setTimeout(() => {
            this.modal = this.modalService.addModal(this.modal, 'moeda');
        }, 200);
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

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCircleCheck, faCircleXmark, faTriangleExclamation, faUpload } from '@fortawesome/free-solid-svg-icons';
import { event } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { AlertService } from 'src/app/parts/alert/alert.service';
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

    mensagem = '';

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    modal: Modal = new Modal;
    @ViewChild('form') form: NgForm;

    constructor(
        private toastr: ToastrService,
        private modalService: ModalService,
        private activatedRoute: ActivatedRoute,
        private pessoaService: PessoaService,
        private alertService: AlertService
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
        this.modalService.removeModal(this.modal);
    }




    fileChange(event: any) {
        if (event && event.target && event.target.files && event.target.files.length > 0) {
            this.fileUpload = event.target.files[0] as File;
            this.form.control.setErrors(null)
        }
            else {
                this.form.control.setErrors({fileRequired: true})
                this.toastr.error('Selecione um arquivo para importação.')
                delete this.fileUpload
            }
    }


    send() {
        this.loading = true;
        this.mensagem = '';
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
                if (res.sucesso) {
                    this.voltar();
                    if (res.mensagem != 'Importação realizada com sucesso.') {
                        this.alertService.info(res.mensagem, { classList: 'alert-big' });
                    } else {
                        this.alertService.success("Importação realizada com sucesso" );
                    }
                } else {
                    this.toastr.error('Erro ao salvar registros.');
                    this.alertService.error(res.mensagem ?? 'Erro ao salvar registros', { classList: 'alert-big' })
                }
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            })

    }

}

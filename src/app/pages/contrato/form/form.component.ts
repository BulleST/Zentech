import { PaisesService } from './../../../services/paises.service';
import { InstituicaoFinanceiraService } from './../../../services/instituicao-financeira.service';
import { ContratoTipoService } from './../../../services/contrato-tipo.service';
import { ContratoTipo } from './../../../models/contrato-tipo.model';
import { Contrato } from './../../../models/contrato.model';
import { ContratoService } from './../../../services/contrato.service';
import { Contrato_List } from './../../../models/contrato.model';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { ContratoEvento } from 'src/app/models/contrato-evento.model';
import { InstituicaoFinanceiraList } from 'src/app/models/instituicao-financeira.model';
import { ContratoEventoService } from 'src/app/services/contrato-evento.service';
import { Paises } from 'src/app/models/pais.model';
import { Modal } from 'src/app/services/modal.service';
import { NgForm } from '@angular/forms';
import { LoadingService } from 'src/app/parts/loading/loading';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    objeto: Contrato = new Contrato();
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    routeBackOptions: any;
    contratos: Contrato_List[] = [];
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = true;
    id: number = 0;
    item: any = '';
    modal: Modal = new Modal;

    tipos: ContratoTipo[] = []
    loadingTipo = true;

    eventos: ContratoEvento[] = []
    loadingEvento = true;

    instituicoes: InstituicaoFinanceiraList[] = []
    loadingInstituicao = true;

    paises: Paises[] = []
    loadingPais = true;

    loadingContratoFile = false;


    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private contratoService: ContratoService,
        private crypto: Crypto,
        private toastr: ToastrService,
        private paisesService: PaisesService,
        private loadingService: LoadingService,
        private contratoTipoService: ContratoTipoService,
        private contratoEventoService: ContratoEventoService,
        private datepipe: DatePipe,
    ) {
        lastValueFrom(this.paisesService.getList())
            .then(res => {
                this.loadingPais = false;
                this.paises = res;
            });
        lastValueFrom(this.contratoTipoService.getList())
            .then(res => {
                this.tipos = res;
                this.loadingTipo = false;
            });
        lastValueFrom(this.contratoEventoService.getList())
            .then(res => {
                this.eventos = res;
                this.loadingEvento = false;
            });
    }

    encryptId(id: any): string {
        const encryptedId = this.crypto.encrypt(id);
        return encryptedId !== null ? encryptedId : ''; // Se encryptedId for null, retorna uma string vazia ('')
    }

    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '950px', overflow: 'visible' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(x => {

            if (x['contrato_id']) {
                this.objeto.id = this.crypto.decrypt(x['contrato_id']);
                this.modal.title = 'Editar Contrato';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;
                lastValueFrom(this.contratoService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = new Contrato(res);
                        this.objeto.dataLiquidacao = this.datepipe.transform(this.objeto.dataLiquidacao, 'yyyy-MM-dd') as unknown as Date;
                        this.objeto.data = this.datepipe.transform(this.objeto.data, 'yyyy-MM-ddTHH:mm') as unknown as Date;
                        setTimeout(() => {
                            this.modal = this.modalService.addModal(this.modal, 'contrato');
                        }, 200);
                    })
                    .catch(res => {
                        this.voltar();
                    })

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
        this.modalService.removeModal(this.modal);
    }

    async contratoDownload() {
        if (this.objeto.id == 0) {
            this.toastr.error('Você deve primeiro salvar os dados para fazer o download.')
            return
        }
        this.loadingContratoFile = true;
        this.loadingService.message.next('Carregando Contrato.')
        await lastValueFrom(this.contratoService.file(this.objeto.id))
            .then(res => {
                this.loadingContratoFile = false;
            })
            .catch(res => {
                this.loadingContratoFile = false;
            });
        this.loadingService.message.next('');
    }

    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = 'Campos inválidos';
            return;
        }
        this.erro = '';
        this.loading = true;

        return lastValueFrom(this.contratoService.post(this.objeto))
            .then(async res => {
                if (res.sucesso != false) {
                    await lastValueFrom(this.contratoService.getList())
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

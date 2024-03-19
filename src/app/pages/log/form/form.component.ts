import { LogService } from 'src/app/services/log-service';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { LogList, LogRequest } from 'src/app/models/log-model';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ContratoTipoService } from 'src/app/services/contrato-tipo.service';
import { ContratoEventoService } from 'src/app/services/contrato-evento.service';
import { PaisesService } from 'src/app/services/paises.service';
import { MoedaService } from 'src/app/services/moeda.service';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { NgxMaskService } from 'ngx-mask';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
    faClock = faClock;
    obj: LogModelFormated;
    log: LogRequest = new LogRequest;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    isEditPage = false;
    modal: Modal = new Modal;
    values: [string, string][] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private crypto: Crypto,
        private logService: LogService,
    ) {
    }


    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '700px' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(async x => {
            if (x['log_id']) {
                this.log.id = this.crypto.decrypt(x['log_id']);
                this.modal.title = 'Log de Ação';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;

                // Carrega lista
                if (this.logService.list.value.length == 0) {
                    await lastValueFrom(this.logService.getList());
                }

                // Encontra log
                var log = this.logService.list.value.find(x => x.id == this.log.id) as LogList;
                if (!log) {
                    this.voltar();
                    return;
                }

                console.log('log', log)
                if (typeof log.objeto == 'string')
                    log.objeto = JSON.parse(log.objeto)
                else
                    log.objeto = JSON.parse(JSON.stringify(log.objeto))

                this.log = log as LogRequest;

                var entidade = models.find(x => x.entidade == log.entidade) as LogModelFormated;

                if (log.acao == 'Importação') 
                    var entidade = models.find(x => x.entidade == 'Importação') as LogModelFormated;

                entidade?.campos.forEach((campo1: any) => {
                    
                    const nestedProperties: string[] = campo1.field.split('.');
                    var value: any = log.objeto;
                    for (const prop of nestedProperties) {
                        value = value ? value[prop] ?? undefined : undefined;
                    }

                    campo1.value = value;
                    // campo1.value = log.objeto[campo1.field];
                    if (campo1.campos && campo1.campos.length > 0) {
                        campo1.campos.forEach((element: any) => {
                            element.value = campo1.value[element.field];
                        });
                    } else {

                    }
                });

                this.obj = entidade;

                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'log-acoes');
                }, 200);

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

}


interface LogModelFormated {
    entidade: string;
    campos: Campo[];
}

interface Campo {
    field: string;
    label: string;
    value: string;
    type?: 'string' | 'image' | 'date' | 'datetime' | 'percentual' | 'number' | 'money' | 'boolean';
    campos?: Campo[];
}



var camposContrato: Campo[] = [  
    { field: 'Id', label: 'Id', value: '' },
    { field: 'Data', label: 'Data Contrato', value: '', type: 'date' },
    { field: 'NumContrato', label: 'Nº Contrato', value: '' },
    { field: 'Tipo', label: 'Tipo', value: '' },
    { field: 'Evento', label: 'Evento', value: '' },
    { field: 'Taxa', label: 'Taxa (%)', value: '', type: 'percentual' },
    { field: 'ValorNacional', label: 'Valor Nacional (R$)', value: '', type: 'money' },
    { field: 'PercentualAdiantamento', label: 'Percentual de Adiantamento (%)', value: '', type: 'percentual' },
    { field: 'RDE', label: 'RDE', value: '' },
    { field: 'VET', label: 'VET', value: '', type: 'number' },
    { field: 'DataLiquidacao', label: 'Data de Liquidação', value: '', type: 'date' },
    { field: 'PagRecExterior', label: 'Pagador/Recebedor no Exterior', value: '' },
    { field: 'PaisPagRecExterior', label: 'País do Pagador/Recebedor no Exterior', value: '' },
    { field: 'Especificacoes', label: 'Especificações', value: '' },
    { field: 'Clausulas', label: 'Cláusulas', value: '' },
    { field: 'InstrucoesRecebimentoPagamento', label: 'Instruções de Recebimento/Pagamento', value: '' },
    { field: 'NomeRepresentanteLegal', label: 'Nome Representante Legal', value: '' },
    { field: 'CodigoRepresentanteLegal', label: 'Código Representante Legal', value: '' },
    { field: 'AssinaturaRepresentanteLegal', label: 'Assinatura Representante Legal', value: '', type: 'image' },
    { field: 'IpAssinaturaRepresentanteLegal', label: 'Ip Assinatura Representante Legal', value: '' },
    { field: 'DataAssinaturaRepresentanteLegal', label: 'Data Assinatura Representante Legal', value: '', type: 'datetime' },
    { field: 'AssinaturaIntermediadora', label: 'Assinatura Intermediadora', value: '', type: 'image' },
    { field: 'DataAssinaturaIntermediadora', label: 'Data Assinatura Intermediadora', value: '', type: 'datetime' },
    { field: 'DataCertificadoAssinatura', label: 'Data Certificado Assinatura', value: '', type: 'datetime' },
    { field: 'ControleProCambio', label: 'Controle Pró Câmbio', value: '' },
    { field: 'REF', label: 'REF', value: '' },
] ;

var models: LogModelFormated[] = [
    { // Pessoa
        entidade: 'Pessoa',
        campos: [
            { field: 'Id', label: 'Id', value: '' },
            { field: 'Nome', label: 'Nome', value: '' },
            { field: 'CPF', label: 'CPF', value: '' },
            { field: 'SaldoAtual', label: 'Saldo Atual', value: '', type: 'number' },
            { field: 'DataCadastro', label: 'Data de Concessão', value: '', type: 'datetime' },
            { field: 'SituacaoCPF', label: 'SituacaoCPF', value: '' },
            { field: 'StatusSaldo', label: 'StatusSaldo', value: '' },
        ]
    },
    { // Operação
        entidade: 'Operação',
        campos: [
            { field: 'Id', label: 'Id', value: '' },
            { field: 'Nome', label: 'Nome', value: '' },
            { field: 'CPF', label: 'CPF', value: '' },
            { field: 'DataCadastro', label: 'Data Cadastro', value: '', type: 'datetime' },
            { field: 'DataTransacao', label: 'Data Transação', value: '', type: 'date' },
            { field: 'SaldoAnterior', label: 'Saldo Anterior', value: '', type: 'number' },
            { field: 'SaldoAtual', label: 'Saldo Atual', value: '', type: 'number' },
            { field: 'ValorOperação', label: 'Valor Operação', value: '', type: 'number' },
            { field: 'Status', label: 'Status', value: '' },
            { field: 'Num_Op', label: 'Nº Operação', value: '' },
            { field: 'TipoTransacao', label: 'TipoTransacao', value: '' },
            { field: 'FormaPagamento', label: 'FormaPagamento', value: '' },
            { field: 'Moeda', label: 'Moeda', value: '' },
            { field: 'ValorMoedaEstrangeira', label: 'Valor Moeda Estrangeira', value: '', type: 'number' },
            { field: 'NomeCompradorVendedor', label: 'Nome do Comprador', value: '' },
            { field: 'PaisCompradorVendedor', label: 'País do Comprador', value: '' },
        ]
    },
    { // Operação Importacao
        entidade: 'Importação',
        campos: [
            { field: 'Arquivo', label: 'Arquivo', value: '' },
            { field: 'Mensagem', label: 'Mensagem', value: '' },
        ]
    },
    { // Banco
        entidade: 'Banco',
        campos: [
            { field: 'Id', label: 'Id', value: '' },
            { field: 'Nome', label: 'Nome', value: '' },
            { field: 'CodigoSwift', label: 'Código Swift', value: '' },
            { field: 'Logradouro', label: 'Endereço', value: '' },
            { field: 'Cidade', label: 'Cidade', value: '' },
            { field: 'Estado', label: 'Estado', value: '' },
            { field: 'Pais', label: 'País', value: '' },
        ]
    },
    { // Beneficiário
        entidade: 'Beneficiário',
        campos: [
            { field: 'Id', label: 'Id', value: '' },
            { field: 'Nome', label: 'Nome', value: '' },
            { field: 'CodigoRegistro', label: 'Código de Registro', value: '' },
            { field: 'Conta', label: 'Conta', value: '' },
            { field: 'Representante', label: 'Representante', value: '' },
            { field: 'NomeBanco', label: 'Banco', value: '' },
            { field: 'CodigoSwift', label: 'Código Swift', value: '' },
            { field: 'NomeRepresentanteLegal', label: 'Nome - Representante Legal', value: '' },
            { field: 'CodigoRepresentanteLegal', label: 'Código - Representante Legal', value: '' },
            { field: 'AssinaturaRepresentanteLegal', label: 'Assinatura - Representante Legal', value: '', type: 'image' },
            { field: 'Logradouro', label: 'Endereço', value: '' },
            { field: 'Cidade', label: 'Cidade', value: '' },
            { field: 'Estado', label: 'Estado', value: '' },
            { field: 'NomePais', label: 'País', value: '' },
        ]
    },
    { // Instituição Financeira
        entidade: 'Instituição Financeira',
        campos: [
            { field: 'Id', label: 'Id', value: '' },
            { field: 'Nome', label: 'Nome', value: '' },
            { field: 'CodigoRegistro', label: 'Código de Registro', value: '' },
            { field: 'Logradouro', label: 'Endereço', value: '' },
            { field: 'Cidade', label: 'Cidade', value: '' },
            { field: 'Estado', label: 'UF', value: '' },
            { field: 'Pais', label: 'País', value: '' },
        ]
    },
    { // Representante
        entidade: 'Representante',
        campos: [
            { field: 'Id', label: 'Id', value: '' },
            { field: 'Nome', label: 'Nome', value: '' },
            { field: 'Codigo', label: 'Código', value: '' },
        ]
    },
    { // Empresa
        entidade: 'Empresa',
        campos: [
            { field: 'Id', label: 'Id', value: '' },
            { field: 'Nome', label: 'Nome', value: '' },
            { field: 'CodigoRegistro', label: 'Código de Registro', value: '' },
            { field: 'LogoDataUri', label: '', value: '' },
            { field: 'Endereco', label: 'Endereço', value: '' },
            { field: 'Cidade', label: 'Cidade', value: '' },
            { field: 'Uf', label: 'UF', value: '' },
            { field: 'Pais', label: 'País', value: '' },
            { field: 'SocioDiretor', label: 'Sócio Diretor', value: '' },
            { field: 'RGSocioDiretor', label: 'RG', value: '' },
            { field: 'CPFSocioDiretor', label: 'CPF', value: '' },
            { field: 'DataDesativado', label: 'Desativado em', value: '', type: 'datetime' },
            { field: 'PrimaryColor', label: 'Cor primária', value: '' },
            { field: 'SecundaryColor', label: 'Cor Secundária', value: '' },
        ]
    },
    { // Invoice
        entidade: 'Invoice',
        campos: [
            // Invoice
            { field: 'Invoice', label: 'Invoice', value: '', campos: [ 
                { field: 'Id', label: 'Nº Invoice', value: '' },
                { field: 'Data', label: 'Data Invoice', value: '', type: 'datetime' },
                { field: 'Moeda', label: 'Moeda', value: '' },
                { field: 'Valor', label: 'Valor', value: '', type: 'number' },
                { field: 'InstituicaoFinanceira', label: 'Instituição Financeira', value: '' },
                { field: 'Beneficiario', label: 'Beneficiário', value: '' },
                { field: 'Banco', label: 'Banco', value: '' },
                { field: 'Conta', label: 'Conta', value: '' },
            ] },
            // Contrato
            { field: 'Contrato', label: 'Contrato', value: '', campos: camposContrato },
        ],
    },
    { // Contrato
        entidade: 'Contrato',
        campos: camposContrato
    },
    { // Usuário
        entidade: 'Usuário',
        campos: [
            { field: 'Id', label: 'Id', value: '' },
            { field: 'Name', label: 'Nome', value: '' },
            { field: 'Email', label: 'E-mail', value: '' },
            { field: 'TelefoneCelular', label: 'Telefone/Celular', value: '' },
            { field: 'PerfilAcesso.Perfil', label: 'Perfil de Acesso', value: '' },
            { field: 'Empresa.Nome', label: 'Empresa', value: '' },
            { field: 'Created', label: 'Cadastrado em', value: '', type: 'datetime' },
            { field: 'DataDesativado', label: 'Desativado em', value: '', type: 'datetime' },
            { field: 'Updated', label: 'Última Atualização em', value: '', type: 'datetime' },
            { field: 'IsVerified', label: 'Verificado', value: '', type: 'boolean' },
        ]
    },
]

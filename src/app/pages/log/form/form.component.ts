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
import { TypeofPipe } from 'src/app/utils/typeof.pipe';


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
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

                if (typeof log.objeto == 'string')
                    log.objeto = JSON.parse(log.objeto)
                else
                    log.objeto = JSON.parse(JSON.stringify(log.objeto))

                this.log = log as LogRequest;
                console.log('log', log)
                var entidade: LogModelFormated = models.find(x => x.entidade == log.entidade) as LogModelFormated;

                if (log.acao == 'Importação') {
                    entidade = models.find(x => x.entidade == 'Importação') as LogModelFormated;
                }
                else if (log.acao == 'Exclusão' && log.entidade == 'Pessoa') {
                    entidade = pessoaExclusao;
                    if (log.objeto.Pessoa && log.objeto.Saldos && log.objeto.Operacoes) {
                        log.objeto.Pessoa = JSON.parse(log.objeto.Pessoa);
                        log.objeto.Saldos = JSON.parse(log.objeto.Saldos);
                        log.objeto.Operacoes = JSON.parse(log.objeto.Operacoes);
                    }
                }
                else if (log.acao == 'Exclusão' && log.entidade == 'Operação') {
                   entidade = operacaoExclusao;
                   log.objeto = log.objeto[0];
                }

                
                var campos = this.setCampos(entidade, log.objeto);
                entidade.campos = campos;

                this.obj = entidade;
                console.log('campo', campos)
                console.log('entidade', entidade)
                console.log('obj', this.obj)

                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'log-acoes');
                }, 200);

            }
        });
        this.subscription.push(params);
    }

    setCampos(entidade: LogModelFormated, obj: any) {
        // pra cada campo
        entidade.campos.forEach((campo: Campo) => {
            
            // seta o valor
            const nestedProperties: string[] = campo.field.split('.');
            var value: any = obj;
            for (const prop of nestedProperties) {
                value = value ? value[prop] ?? undefined : undefined;
            }
            campo.value = value;

            
            // se o valor for uma lista
            if (typeof campo.value == 'object' ) {
                // acha o novo campo
                var newCampo = entidade.campos.find(x => x.field == campo.field) as Campo;
                
                // seta a entidade do novo campo
                var newEntidade: LogModelFormated = {
                    entidade: newCampo.field,
                    campos: newCampo.campos as Campo[]
                }

                if (campo.type == 'list') {
                    // Pra cada valor da listagem preenche os valores do novo campo
                    // Função recursiva
                    campo.value.forEach((newObj: any) => {
                        this.setCampos(newEntidade, newObj);
                    });
                } else {
                    this.setCampos(newEntidade, campo.value);
                }
            } 
         
        });
        return entidade.campos
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

class Campo {
    field: string;
    label: string;
    value: any;
    type?: 'string' | 'image' | 'date' | 'datetime' | 'percentual' | 'number' | 'money' | 'boolean' | 'list' | 'color' | 'rg' | 'cpf';
    campos?: Campo[];
}



var camposContrato: Campo[] = [  
    { field: 'Id', label: 'Id', value: ''},
    { field: 'Data', label: 'Data Contrato', type: 'date', value: '' },
    { field: 'NumContrato', label: 'Nº Contrato', value: ''},
    { field: 'Tipo', label: 'Tipo', value: ''},
    { field: 'Evento', label: 'Evento', value: ''},
    { field: 'Taxa', label: 'Taxa (%)', type: 'percentual', value: '' },
    { field: 'ValorNacional', label: 'Valor Nacional (R$)', type: 'money', value: '' },
    { field: 'PercentualAdiantamento', label: 'Percentual de Adiantamento (%)', type: 'percentual', value: '' },
    { field: 'RDE', label: 'RDE', value: ''},
    { field: 'VET', label: 'VET', type: 'number', value: '' },
    { field: 'DataLiquidacao', label: 'Data de Liquidação', type: 'date', value: '' },
    { field: 'PagRecExterior', label: 'Pagador/Recebedor no Exterior', value: ''},
    { field: 'PaisPagRecExterior', label: 'País do Pagador/Recebedor no Exterior', value: ''},
    { field: 'Especificacoes', label: 'Especificações', value: ''},
    { field: 'Clausulas', label: 'Cláusulas', value: ''},
    { field: 'InstrucoesRecebimentoPagamento', label: 'Instruções de Recebimento/Pagamento', value: ''},
    { field: 'NomeRepresentanteLegal', label: 'Nome Representante Legal', value: ''},
    { field: 'CodigoRepresentanteLegal', label: 'Código Representante Legal', value: ''},
    { field: 'AssinaturaRepresentanteLegal', label: 'Assinatura Representante Legal', type: 'image', value: '' },
    { field: 'IpAssinaturaRepresentanteLegal', label: 'Ip Assinatura Representante Legal', value: ''},
    { field: 'DataAssinaturaRepresentanteLegal', label: 'Data Assinatura Representante Legal', type: 'datetime', value: '' },
    { field: 'AssinaturaIntermediadora', label: 'Assinatura Intermediadora', type: 'image', value: '' },
    { field: 'DataAssinaturaIntermediadora', label: 'Data Assinatura Intermediadora', type: 'datetime', value: '' },
    { field: 'DataCertificadoAssinatura', label: 'Data Certificado Assinatura', type: 'datetime', value: '' },
    { field: 'ControleProCambio', label: 'Controle Pró Câmbio', value: ''},
    { field: 'REF', label: 'REF', value: ''},
] ;


var pessoaExclusao: LogModelFormated = {
    entidade: 'Pessoa',
    campos: [
        { field: 'Pessoa', label: 'Pessoa',  value: '', campos: [
            { field: 'Id', label: 'Id', value: '' },
            { field: 'Nome', label: 'Nome', value: '' },
            { field: 'SaldoAtual', label: 'Saldo Atual', type: 'number', value: '' },
            { field: 'StatusSaldo', label: 'Status Saldo', value: '' },
            { field: 'DataCadastro', label: 'Data de Cadastro', type: 'datetime', value: '' },
            { field: 'UsuarioCadastroNome', label: 'Cadastrado por (nome)', value: '' },
            { field: 'UsuarioCadastroEmail', label: 'Cadastrado por (e-mail)', value: '' },
        ]},
        { field: 'Operacoes', label: 'Operações', value: '', type: 'list', campos: [
            { field: 'Id', label: 'Id', value: '' },
            { field: 'DataCadastro', label: 'Data de Cadastro', type: 'datetime', value: '' },
            { field: 'DataTransacao', label: 'Data da Transação', type: 'date', value: '' },
            { field: 'ValorOperacao', label: 'Valor Operação', type: 'number', value: '' },
            { field: 'StatusOperacao', label: 'Status', value: '' },
            { field: 'LimiteAtual', label: 'LimiteAtual', type: 'number', value: '' },
            { field: 'LimiteConcedido', label: 'LimiteConcedido', type: 'number', value: '' },
            { field: 'LimiteUtilizado', label: 'LimiteUtilizado', type: 'number', value: '' },
            { field: 'UsuarioCadastroNome', label: 'Cadastrado por (nome)', value: '' },
            { field: 'UsuarioCadastroEmail', label: 'Cadastrado por (e-mail)', value: '' },
        ]},
        { field: 'Saldos', label: 'Saldos', type: 'list', value: '', campos: [
            { field: 'Id', label: 'Id', value: '' },
            { field: 'DataConcessao', label: 'Data de Concessão', type: 'datetime', value: '' },
            { field: 'ValorConcedido', label: 'Valor Concedido', type: 'number', value: '' },
            { field: 'UsuarioCadastroNome', label: 'Cadastrado por (nome)', value: '' },
        ]},
    ]
}

var operacaoExclusao: LogModelFormated = {
    entidade: 'Operação',
    campos: [
        { field: 'Id', label: 'Id', value: '' },
        { field: 'NomeCliente', label: 'Nome Cliente', value: '' },
        { field: 'CPFCliente', label: 'CPF Cliente', value: '' },
        { field: 'DataCadastro', label: 'Data de Cadastro', type: 'datetime', value: '' },
        { field: 'DataTransacao', label: 'Data da Transação', type: 'date', value: '' },
        { field: 'ValorOperacao', label: 'Valor Operação', type: 'number', value: '' },
        { field: 'StatusOperacao', label: 'Status', value: '' },
        { field: 'LimiteAtual', label: 'LimiteAtual', type: 'number', value: '' },
        { field: 'LimiteConcedido', label: 'LimiteConcedido', type: 'number', value: '' },
        { field: 'LimiteUtilizado', label: 'LimiteUtilizado', type: 'number', value: '' },
        { field: 'UsuarioCadastroNome', label: 'Cadastrado por (nome)', value: '' },
        { field: 'UsuarioCadastroEmail', label: 'Cadastrado por (e-mail)', value: '' },
    ]
}

var models: LogModelFormated[] = [
    { // Pessoa
        entidade: 'Pessoa',
        campos: [
            { field: 'Id', label: 'Id', value: ''},
            { field: 'Nome', label: 'Nome', value: ''},
            { field: 'CPF', label: 'CPF', value: ''},
            { field: 'SaldoAtual', label: 'Saldo Atual', type: 'number', value: '' },
            { field: 'DataCadastro', label: 'Data de Concessão', type: 'datetime', value: '' },
            { field: 'SituacaoCPF', label: 'SituacaoCPF', value: ''},
            { field: 'StatusSaldo', label: 'StatusSaldo', value: ''},
        ]
     },
     { // Saldo
         entidade: 'Saldo',
         campos: [
             { field: 'Id', label: 'Id', value: ''},
             { field: 'Nome', label: 'Nome', value: ''},
             { field: 'CPF', label: 'CPF', value: ''},
             { field: 'DataConcessao', label: 'Data de Concessão', type: 'datetime', value: '' },
             { field: 'ValorConcedido', label: 'Valor Concedido', type: 'number', value: '' },
             { field: 'SaldoAnterior', label: 'Saldo Anterior', type: 'number', value: '' },
             { field: 'SaldoAtual', label: 'Saldo Atual', type: 'number', value: '' },
         ]
      },
    { // Operação
        entidade: 'Operação',
        campos: [
            { field: 'Id', label: 'Id', value: ''},
            { field: 'Nome', label: 'Nome', value: ''},
            { field: 'CPF', label: 'CPF', value: ''},
            { field: 'DataCadastro', label: 'Data Cadastro', type: 'datetime', value: '' },
            { field: 'DataTransacao', label: 'Data Transação', type: 'date', value: '' },
            { field: 'SaldoAnterior', label: 'Saldo Anterior', type: 'number', value: '' },
            { field: 'SaldoAtual', label: 'Saldo Atual', type: 'number', value: '' },
            { field: 'ValorOperação', label: 'Valor Operação', type: 'number', value: '' },
            { field: 'Status', label: 'Status', value: ''},
            { field: 'Num_Op', label: 'Nº Operação', value: ''},
            { field: 'TipoTransacao', label: 'Tipo de Transação', value: ''},
            { field: 'FormaPagamento', label: 'Forma de Pagamento', value: ''},
            { field: 'Moeda', label: 'Moeda', value: ''},
            { field: 'ValorMoedaEstrangeira', label: 'Valor Moeda Estrangeira', type: 'number', value: '' },
            { field: 'NomeCompradorVendedor', label: 'Nome do Comprador', value: ''},
            { field: 'PaisCompradorVendedor', label: 'País do Comprador', value: ''},
        ]
     },
    {// Importacao
        entidade: 'Importação',
        campos: [
            { field: 'Arquivo', label: 'Arquivo', value: ''},
            { field: 'Mensagem', label: 'Mensagem', value: ''},
        ]
    },
    { // Banco
        entidade: 'Banco',
        campos: [
            { field: 'Id', label: 'Id', value: ''},
            { field: 'Nome', label: 'Nome', value: ''},
            { field: 'CodigoSwift', label: 'Código Swift', value: ''},
            { field: 'Logradouro', label: 'Endereço', value: ''},
            { field: 'Cidade', label: 'Cidade', value: ''},
            { field: 'Estado', label: 'Estado', value: ''},
            { field: 'Pais', label: 'País', value: ''},
        ]
    },
    { // Beneficiário
        entidade: 'Beneficiário',
        campos: [
            { field: 'Id', label: 'Id', value: ''},
            { field: 'Nome', label: 'Nome', value: ''},
            { field: 'CodigoRegistro', label: 'Código de Registro', value: ''},
            { field: 'Conta', label: 'Conta', value: ''},
            { field: 'Representante', label: 'Representante', value: ''},
            { field: 'NomeBanco', label: 'Banco', value: ''},
            { field: 'CodigoSwift', label: 'Código Swift', value: ''},
            { field: 'NomeRepresentanteLegal', label: 'Nome - Representante Legal', value: ''},
            { field: 'CodigoRepresentanteLegal', label: 'Código - Representante Legal', value: ''},
            { field: 'AssinaturaRepresentanteLegal', label: 'Assinatura - Representante Legal', type: 'image', value: '' },
            { field: 'Logradouro', label: 'Endereço', value: ''},
            { field: 'Cidade', label: 'Cidade', value: ''},
            { field: 'Estado', label: 'Estado', value: ''},
            { field: 'NomePais', label: 'País', value: ''},
        ]
    },
    { // Instituição Financeira
        entidade: 'Instituição Financeira',
        campos: [
            { field: 'Id', label: 'Id', value: ''},
            { field: 'Nome', label: 'Nome', value: ''},
            { field: 'CodigoRegistro', label: 'Código de Registro', value: ''},
            { field: 'Logradouro', label: 'Endereço', value: ''},
            { field: 'Cidade', label: 'Cidade', value: ''},
            { field: 'Estado', label: 'UF', value: ''},
            { field: 'Pais', label: 'País', value: ''},
        ]
    },
    { // Representante
        entidade: 'Representante',
        campos: [
            { field: 'Id', label: 'Id', value: ''},
            { field: 'Nome', label: 'Nome', value: ''},
            { field: 'Codigo', label: 'Código', value: ''},
        ]
    },
    { // Empresa
        entidade: 'Empresa',
        campos: [
            { field: 'Id', label: 'Id', value: ''},
            { field: 'Nome', label: 'Nome', value: ''},
            { field: 'CodigoRegistro', label: 'Código de Registro', value: ''},
            { field: 'LogoDataUri', label: 'Logo', value: '', type: 'image'},
            { field: 'Endereco', label: 'Endereço', value: ''},
            { field: 'Cidade', label: 'Cidade', value: ''},
            { field: 'UF', label: 'UF', value: ''},
            { field: 'Pais', label: 'País', value: ''},
            { field: 'SocioDiretor', label: 'Sócio Diretor', value: ''},
            { field: 'RGSocioDiretor', label: 'RG', value: '', type: 'rg'},
            { field: 'CPFSocioDiretor', label: 'CPF', value: '', type: 'cpf'},
            { field: 'DataDesativado', label: 'Desativado em', type: 'datetime', value: '' },
            { field: 'PrimaryColor', label: 'Cor primária', value: '', type: 'color'},
            { field: 'SecundaryColor', label: 'Cor Secundária', value: '', type: 'color'},
        ]
    },
    { // Invoice
        entidade: 'Invoice',
        campos: [
            // Invoice
            { field: 'Invoice', label: 'Invoice', campos: [ 
                { field: 'Id', label: 'Nº Invoice', value: '' },
                { field: 'Data', label: 'Data Invoice', type: 'datetime', value: '' },
                { field: 'Moeda', label: 'Moeda', value: ''},
                { field: 'Valor', label: 'Valor', type: 'number', value: '' },
                { field: 'InstituicaoFinanceira', label: 'Instituição Financeira', value: ''},
                { field: 'Beneficiario', label: 'Beneficiário', value: ''},
                { field: 'Banco', label: 'Banco', value: ''},
                { field: 'Conta', label: 'Conta', value: ''},
            ], value: '' },
            // Contrato
            { field: 'Contrato', label: 'Contrato', campos: camposContrato, value: '' },
        ],
     },
    { // Contrato
        entidade: 'Contrato',
        campos: camposContrato
    },
    { // Usuário
        entidade: 'Usuário',
        campos: [
            { field: 'Id', label: 'Id', value: ''},
            { field: 'Name', label: 'Nome', value: ''},
            { field: 'Email', label: 'E-mail', value: ''},
            { field: 'TelefoneCelular', label: 'Telefone/Celular', value: ''},
            { field: 'PerfilAcesso.Perfil', label: 'Perfil de Acesso', value: ''},
            { field: 'Empresa.Nome', label: 'Empresa', value: ''},
            { field: 'Created', label: 'Cadastrado em', type: 'datetime', value: '' },
            { field: 'DataDesativado', label: 'Desativado em', type: 'datetime', value: '' },
            { field: 'Updated', label: 'Última Atualização em', type: 'datetime', value: '' },
            { field: 'IsVerified', label: 'Verificado', type: 'boolean', value: '' },
        ]
    },
]

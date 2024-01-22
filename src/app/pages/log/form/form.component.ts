import { LogService } from 'src/app/services/log-service';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { LogRequest } from 'src/app/models/log-model';
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
    obj: LogRequest = new LogRequest;
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
        private currency: CurrencyPipe,
        private date: DatePipe,
        private contratoTipoService: ContratoTipoService,
        private contratoEventoService: ContratoEventoService,
        private paisService: PaisesService,
        private moedaService: MoedaService,
        private mask: NgxMaskService,
    ) {
        lastValueFrom(this.paisService.getList());
        lastValueFrom(this.contratoTipoService.getList());
        lastValueFrom(this.contratoEventoService.getList());
        lastValueFrom(this.moedaService.getList());
    }


    ngAfterViewInit(): void {
        this.modal.id = 0;
        this.modal.template = this.template;
        this.modal.icon = this.icon;
        this.modal.style = { 'max-width': '650px' };
        this.modal.activatedRoute = this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        var params = this.activatedRoute.params.subscribe(async x => {
            if (x['log_id']) {
                this.obj.id = this.crypto.decrypt(x['log_id']);
                this.modal.title = 'Log de Ação';
                this.modal.routerBack = ['../../'];
                this.isEditPage = true;

                if (this.logService.list.value.length == 0) {
                    await lastValueFrom(this.logService.getList());
                }
                var log = this.logService.list.value.find(x => x.id == this.obj.id);
                if (!log) {
                    this.voltar();
                    return;
                }

                if (typeof log.objeto == 'string') {
                    log.objeto = JSON.parse(log.objeto);
                }


                this.obj = log as LogRequest;

                this.insereDados(this.obj.objeto);
                this.ordenaArray();

                setTimeout(() => {
                    this.modal = this.modalService.addModal(this.modal, 'log-acoes');
                }, 200);

            }
        });
        this.subscription.push(params);
    }

    formataCampos(key: string, value: string): [string, string, boolean] {
        var label = key;
        var campo: string = value;
        var insere = true;

        switch (key) {

            case 'Id':
                label = 'Id';
                break;

            case 'CodigoSwift':
                label = 'Código Swift';
                break;

            case 'Pais_Id':
                label = 'País';
                var list: any[] = this.paisService.list.value;
                var pais = list.find(x => x.id == parseInt(campo))
                campo = pais ? pais.nome : 'Id: ' + campo;
                break;

            case 'Invoice_Id':
                label = 'Id do Invoice';
                break;


            case 'Tipo_Id':
                label = 'Tipo do Contrato';
                var list: any[] = this.contratoTipoService.list.value;

                var tipo = list.find(x => x.id == parseInt(campo))
                campo = tipo ? tipo.nome : 'Id: ' + campo;
                break;

            case 'Evento_Id':
                label = 'Evendo do Contrato';
                var list: any[] = this.contratoEventoService.list.value;
                var evento = list.find(x => x.id == parseInt(campo))
                campo = evento ? evento.nome : 'Id: ' + campo;
                break;

            case 'Beneficiario_Id':
                label = 'Id do Beneficiário';
                break;

            case 'InstituicaoFinanceira_Id':
                label = 'Id da Instituição Financeira';
                break;

            case 'Moeda_Id':
                label = 'Moeda';
                var list: any[] = this.moedaService.list.value;

                var moeda = list.find(x => x.id == parseInt(campo))
                campo = moeda ? moeda.nome : 'Id: ' + campo;
                break;

            case 'Usuario_Cadastro_Id':
                label = 'Id do Usuário de Cadastro';
                insere = false;
                break;

            case 'Operacao_Status_Id':
                label = 'Id do Status da Operação';
                break;

            case 'Pessoa_Id':
                label = 'Id da Pessoa';
                break;

            case 'Lote_Id':
                label = 'Excel - Lote Id';
                break;

            case 'Logradouro':
                label = 'Endereço';
                break;

            case 'CodigoRegistro':
                label = 'Código de Registro';
                break;

            case 'DataLiquidacao':
                label = 'Data de Liquidação';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy') ?? 'N/A' : 'N/A';
                break;

            case 'ValorNacional':
                label = 'Valor Nacional';
                campo = value != null ? this.currency.transform(value, 'BRL', 'R$ ', '1.2') ?? 'N/A' : 'N/A';
                break;

            case 'Taxa':
                label = 'Taxa';
                campo = value != null ? this.currency.transform(value, 'BRL', ' ', '1.0-10') ?? 'N/A' : 'N/A';
                break;

            case 'NumContrato':
                label = 'Nº do Contrato';
                break;

            case 'PagRecExterior':
                label = 'Pagador/Recebedor no Exterior';
                break;

            case 'PercentualAdiantamento':
                label = 'Percentual de Adiantamento';
                campo = value != null ? this.currency.transform(value, 'BRL', ' ', '1.0-2') + '%' ?? 'N/A' : 'N/A';
                break;

            case 'Especificacoes':
                label = 'Especificações';
                break;

            case 'Clausulas':
                label = 'Cláusulas';
                break;

            case 'InstrucoesRecebimentoPagamento':
                label = 'Instruções de Recebimento/Pagamento';
                break;

            case 'NumContrato':
                label = 'Nº Contrato';
                break;

            case 'Simbolo':
                label = 'Símbolo';
                break;

            case 'Codigo':
                label = 'Código';
                break;

            case 'DataTransacao':
                label = 'Data de Transação';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy') ?? 'N/A' : 'N/A';
                break;

            case 'Simbolo':
                label = 'Símbolo';
                break;

            case 'Data':
                label = 'Data';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy \'às \' HH:mm') ?? 'N/A' : 'N/A';
                break;


            case 'DataCadastro':
                label = 'Data de Cadastro';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy \'às \' HH:mm') ?? 'N/A' : 'N/A';
                break;

            case 'NomeComprador':
                label = 'Nome do Comprador';
                break;

            case 'PaisComprador':
                label = 'País do Comprador';
                break;

            case 'TipoTransacao':
                label = 'Tipo de Transação';
                break;

            case 'FormaPagamento':
                label = 'Forma de Pagamento';
                break;

            case 'ValorMoedaEstrangeira':
                label = 'Valor em Moeda Estrangeira';
                campo = value != null ? this.currency.transform(value, 'BRL', ' ', '1.2') ?? 'N/A' : 'N/A';
                break;

            case 'Num_Op':
                label = 'Nº Operação';
                break;

            case 'Situacao':
                label = 'Situação';
                break;

            case 'DataInscricao':
                label = 'Excel - Data de Inscrição';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy') ?? 'N/A' : 'N/A';
                break;

            case 'DataNascimento':
                label = 'Data de Nascimento';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy') ?? 'N/A' : 'N/A';
                break;

            case 'NomeMae':
                label = 'Nome da Mãe';
                break;

            case 'Email':
                label = 'E-mail';
                break;

            case 'Obs':
                label = 'Observações';
                break;

            case 'Digito':
                label = 'Excel - Dígito';
                break;

            case 'AnoObito':
                label = 'Excel - Ano Óbito';
                break;

            case 'Excel_Status':
                label = 'Excel - Status';
                break;

            case 'Excel_Data_Cap':
                label = 'Excel - Data de Captação';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy') ?? 'N/A' : 'N/A';
                break;

            case 'Excel_Hora_Cap':
                label = 'Excel - Hora de Captação';
                campo = value != null ? this.date.transform(value, 'HH:mm') ?? 'N/A' : 'N/A';
                break;

            case 'Excel_IdNum':
                label = 'Excel - Id Num';
                break;

            case 'Excel_Controle':
                label = 'Excel - Controle';
                break;

            case 'Excel_Erro':
                label = 'Excel - Tipo Erro';
                break;

            case 'BRConsulta_Status':
                label = 'BR Consulta - Status';
                break;

            case 'BRConsulta_Data_Cap':
                label = 'BR Consulta - Data de Captação';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy') ?? 'N/A' : 'N/A';
                break;

            case 'BRConsulta_Hora_Cap':
                label = 'BR Consulta - Hora de Captação';
                campo = value != null ? this.date.transform(value, 'HH:mm') ?? 'N/A' : 'N/A';
                break;

            case 'BRConsulta_Id_Consulta':
                label = 'BR Consulta - Id Consulta';
                break;

            case 'BRConsulta_Controle':
                label = 'BR Consulta - Controle';
                break;

            case 'BRConsulta_Erro':
                label = 'BR Consulta - Erro';
                break;

            case 'DataAtualizacaoExcel':
                label = 'Data de Atualização pelo Excel';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy \'às\' HH:mm') ?? 'N/A' : 'N/A';
                break;

            case 'DataAtualizacaoBRConsulta':
                label = 'Data de Atualização pelo BR Consulta';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy \'às\' HH:mm') ?? 'N/A' : 'N/A';
                break;

            case 'PEP':
                label = 'Excel - PEP';
                break;

            case 'DataConcessao':
                label = 'Data de Concessão';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy \'às\' HH:mm') ?? 'N/A' : 'N/A';
                break;

            case 'ValorConcedido':
                label = 'Valor Concedido';
                campo = value != null ? this.currency.transform(value, 'BRL', ' ', '1.2') ?? 'N/A' : 'N/A';
                break;

            case 'Valor':
                label = 'Valor';
                campo = value != null ? this.currency.transform(value, 'BRL', ' ', '1.2') ?? 'N/A' : 'N/A';
                break;

            case 'NomeCliente':
                label = 'Nome do Cliente';
                break;

            case 'CPFCliente':
                label = 'CPF do CLiente';
                break;

            case 'StatusOperacao':
                label = 'Status da Operação';
                break;

            case 'LimiteConcedido':
                label = 'Limite Concedido';
                campo = value != null ? this.currency.transform(value, 'BRL', ' ', '1.2') ?? 'N/A' : 'N/A';
                break;

            case 'LimiteUtilizado':
                label = 'Limite Utilizado';
                campo = value != null ? this.currency.transform(value, 'BRL', ' ', '1.2') ?? 'N/A' : 'N/A';
                break;

            case 'LimiteAtual':
                label = 'Limite Atual';
                campo = value != null ? this.currency.transform(value, 'BRL', ' ', '1.2') ?? 'N/A' : 'N/A';
                break;

            case 'SaldoAnterior':
                label = 'Saldo Anterior';
                campo = value != null ? this.currency.transform(value, 'BRL', ' ', '1.2') ?? 'N/A' : 'N/A';
                break;

            case 'ValorOperação' || 'ValorOperacao':
                label = 'Valor Operação';
                campo = value != null ? this.currency.transform(value, 'BRL', ' ', '1.2') ?? 'N/A' : 'N/A';
                break;

            case 'SaldoAtual':
                label = 'Saldo Atual';
                campo = value != null ? this.currency.transform(value, 'BRL', ' ', '1.2') ?? 'N/A' : 'N/A';
                break;

            case 'SaldoAtual':
                label = 'Saldo Atual';
                campo = value != null ? this.currency.transform(value, 'BRL', ' ', '1.2') ?? 'N/A' : 'N/A';
                break;

            case 'UsuarioCadastroNome':
                label = 'Nome do Usuário de Cadastro';
                break;

            case 'UsuarioCadastroEmail':
                label = 'E-mail do Usuário de Cadastro';
                break;

            case 'NomeBanco':
                label = 'Banco';
                break;

            case 'NomePais':
                label = 'País';
                break;

            case 'PerfilAcesso_Id':
                insere = false;
                break;

            case 'usuario_Id':
                insere = false;
                break;

            case 'PerfilAcesso':
                label = 'Perfil';
                var obj = JSON.parse(JSON.stringify(value))
                campo = value && value != '' ? obj['Perfil'] : 'N/A'
                break;

            case 'Name':
                label = 'Nome';
                break;

            case 'TelefoneCelular':
                label = 'Telefone/Celular';
                break;

            case 'StatusSaldo':
                label = 'Status Saldo';
                break;

            case 'IsVerified':
                label = 'Conta Verificada pelo Usuário';
                campo = value ? 'Sim' : 'Não';
                break;

            case 'Created':
                label = 'Data de Cadastro';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy \'às\' HH:mm') ?? 'N/A' : 'N/A';
                break;

            case 'Updated':
                label = 'Data de Última Atualização';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy \'às\' HH:mm') ?? 'N/A' : 'N/A';
                break;

            case 'DataDesativado': {
                label = 'Data Desativado';
                campo = value != null ? this.date.transform(value, 'dd/MM/yyyy \'às\' HH:mm') ?? 'N/A' : 'N/A';
                break;
            }

            case 'dataNasc':
                label = 'Data de Nascimento';
                break;

            case 'cpf':
                label = 'CPF';
                campo = value != null ? this.mask.applyMask(value.toString().padStart(11, '0'), '000.000.000-00') ?? 'N/A' : 'N/A';
                break;

            case 'Pais':
                label = 'País';
                break;

            case 'NomeBeneficiario':
                label = 'Beneficiário';
                break;

            case 'Instituicao':
                label = 'Instituição Financeira';
                break;

            case 'Beneficiario':
                label = 'Beneficiário';
                break;

            case 'SituacaoCPF':
                label = 'Situação CPF';
                break;

            case 'ID_CONSULTA':
                label = 'Id da Consulta';
                break;

            case 'ERRO':
                label = 'Erro';
                break;

            case 'RETORNO':
                label = 'Retorno';
                break;

            case 'NOME':
                label = 'Nome';
                break;

            case 'CPF':
                campo = value != null ? this.mask.applyMask(value.toString().padStart(11, '0'), '000.000.000-00') ?? 'N/A' : 'N/A';
                break;

            case 'DATA_NASC':
                label = 'Data de Nascimento';
                break;

            case 'SITUACAO':
                label = 'Situação';
                break;

            case 'DATA_INSCRICAO':
                label = 'Data de Inscrição';
                break;

            case 'DIGITO':
                label = 'Dígito';
                break;

            case 'CONTROLE':
                label = 'Controle';
                break;

            case 'DATA_CAP':
                label = 'Data de Captação';
                break;

            case 'HORA_CAP':
                label = 'Hora de Captação';
                break;

            case 'STATUS':
                label = 'Status';
                break;

            default:
                label = key;
                campo = (value != null && value != '') ? value : 'N/A'
                break;


        }
        campo = campo != null && campo != '' ? campo : 'N/A';
        return [label, campo, insere];
    }

    insereDados(objeto: any) {
        for (const [key, value] of Object.entries(objeto)) {

            var a: any;
            try {
                a = JSON.parse(JSON.parse(JSON.stringify(objeto[key])));
            } 
            catch(e) {
                a = objeto[key];
            }

            if (a != null && typeof a == 'object' && key != 'PerfilAcesso') {
                this.insereDados(a)
            } else {
                var [label, campo, insere] = this.formataCampos(key, value as string);
                if (insere) {
                    var existe = this.values.find(x => x[0] == label) 
                    if (!existe) {
                        this.values.push([label, campo]);
                    }
                }
            }
        }
    }


    ordenaArray() {
        var order: any = [];
        switch (this.obj.entidade) {
            case 'Pessoa': {
                if (this.obj.acao == 'BR Consulta') {
                    order = ['Id da Consulta', 'Nome', 'CPF', 'Data de Nascimento',  'Situação', 'Data de Inscrição', 'Dígito', 'Controle' , 'Status', 'Data de Captação', 'Hora de Captação', 'Retorno', 'Erro'];                    
                } else {
                    order = ['Id', 'Nome', 'CPF', 'Data de Nascimento', 'Data de Cadastro', 'Situação CPF', 'Saldo Atual', 'Status Saldo', 'Nome da Mãe', 'Situação', 'Telefone', 'E-mail', 'Observações', 'Nome do Usuário de Cadastro', 'E-mail do Usuário de Cadastro', 'Excel - Data de Inscrição', 'Excel - Dígito', 'Excel - Ano Óbito', 'Excel - Status', 'Excel - Data de Captação', 'Excel - Hora de Captação', 'Excel - Id Num', 'Excel - Controle', 'Excel - Tipo Erro', 'Excel - Lote Id', 'Excel - PEP', 'Data de Atualização pelo Excel', 'BR Consulta - Status', 'BR Consulta - Data de Captação', 'BR Consulta - Hora de Captação', 'BR Consulta - Id Consulta', 'BR Consulta - Controle', 'BR Consulta - Erro', 'Data de Atualização pelo BR Consulta']
                }
                break
            };
            case 'Operação': {
                order = ['Id', 'Nome', 'CPF', 'Data de Transação', 'Data de Cadastro', 'Status', 'Valor Operação', 'Saldo Anterior', 'Saldo Atual', 'Nº Operação', 'Nome do Usuário de Cadastro', 'E-mail do Usuário de Cadastro', 'Moeda', 'Valor em Moeda Estrangeira', 'Nome do Comprador', 'País do Comprador', 'Tipo de Transação', 'Forma de Pagamento']
                break;
            };
            case 'Saldo': {
                order = ['Nome', 'CPF', 'Data de Concessão', 'Valor Concedido', 'Saldo Anterior', 'Saldo Atual'];
                break;
            };
            case 'Banco': {
                order = ['Id', 'Nome', 'Código Swift', 'Endereço', 'Cidade', 'Estado', 'País'];
                break;
            };
            case 'Beneficiário': {
                order = ['Id', 'Nome', 'Código de Registro', 'Conta', 'Representante', 'Banco', 'Código Swift', 'Endereço', 'Cidade', 'Estado', 'País'];
                break;
            };
            case 'Representante': {
                order = ['Id', 'Nome', 'Código'];
                break;
            };
            case 'Instituição Financeira': {
                order = ['Id', 'Nome', 'Código de Registro', 'Endereço', 'Cidade', 'Estado', 'País'];
                break;
            };
            case 'Invoice': {
                order = ['Id', 'Data', 'Valor', 'Beneficiário', 'Representante', 'Banco', 'Conta'];
                break;
            };
            case 'Usuário': {
                order = ['Id', 'Nome', 'E-mail', 'Telefone/Celular', 'Perfil', 'Data de Cadastro', 'Data Desativado', 'Data de Última Atualização', 'Conta Verificada pelo Usuário'];
                break;
            };
            case 'Contrato': {
                order = ['Id', 'Tipo', 'Evento','Nº do Contrato', 'Data', 'Valor Nacional', 'Instituição Financeira', 'Beneficiário', 'Banco', 'Percentual de Adiantamento', 'Pagador/Recebedor no Exterior', 'País', 'Taxa', 'Data de Liquidação'];
                break;
            };
        }

        this.values = this.values.sort((a, b) => {
            return order.indexOf(a[0]) - order.indexOf(b[0]);
        });
        return this.values;
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modalService.removeModal(this.modal);
    }
}


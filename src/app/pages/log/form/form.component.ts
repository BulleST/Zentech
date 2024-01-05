import { UsuarioService } from 'src/app/services/user.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { LogService } from 'src/app/services/log-service';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { LogRequest, logColumns } from 'src/app/models/log-model';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Empresa } from 'src/app/models/empresa.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
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
    ) {

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

                log.objeto = JSON.parse(log.objeto);
                this.obj = log as LogRequest;
                for (const [key, value] of Object.entries(log.objeto)) {
                    var label = key;
                    var campo = value;
                    console.log(value)
                    switch (key) {
                        case "CodigoSwift":
                            label = 'Código Swift';
                            break;

                        case "Pais_Id":
                            label = 'Id do País';
                            break;

                        case "Invoice_Id":
                            label = 'Id do Invoice';
                            break;

                        case "Tipo_Id":
                            label = 'Id do tipo';
                            break;

                        case "Evento_Id":
                            label = 'Id do evento';
                            break;

                        case "Beneficiario_Id":
                            label = 'Id do Beneficiário';
                            break;

                        case "InstituicaoFinanceira_Id":
                            label = 'Id da Instituição Financeira';
                            break;

                        case "Moeda_Id":
                            label = 'Id da Moeda';
                            break;

                        case "Usuario_Cadastro_Id":
                            label = 'Id do Usuário de Cadastro';
                            break;

                        case "Operacao_Status_Id":
                            label = 'Id do Status da Operação';
                            break;

                        case "Pessoa_Id":
                            label = 'Id da Pessoa';
                            break;

                        case 'Lote_Id':
                            label = 'Lote Id';
                            break;

                        case "Logradouro":
                            label = 'Endereço';
                            break;

                        case "CodigoRegistro":
                            label = 'Código de Registro';
                            break;

                        case "DataLiquidacao":
                            label = 'Data de Liquidação';
                            break;

                        case "ValorNacional":
                            label = 'Valor Nacional';
                            break;

                        case "NumContrato":
                            label = 'Nº Contrato';
                            break;

                        case "PagRecExterior":
                            label = 'Pagador/Recebedor no Exterior';
                            break;

                        case "PercentualAdiantamento":
                            label = 'Percentual deAdiantamento';
                            break;

                        case "Especificacoes":
                            label = 'Especificações';
                            break;

                        case "InstrucoesRecebimentoPagamento":
                            label = 'Instruções de Recebimento/Pagamento';
                            break;

                        case "NumContrato":
                            label = 'Nº Contrato';
                            break;

                        case "Simbolo":
                            label = 'Símbolo';
                            break;

                        case "Codigo":
                            label = 'Código';
                            break;

                        case "DataTransacao":
                            label = 'Data de Transação';
                            break;

                        case "Simbolo":
                            label = 'Símbolo';
                            break;

                        case 'DataCadastro':
                            label = 'Data de Cadastro';
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
                            break;

                        case 'Num_Op':
                            label = 'Nº Operação';
                            break;

                        case 'Situacao':
                            label = 'Situação';
                            break;

                        case 'DataInscricao':
                            label = 'Data de Inscrição';
                            break;

                        case 'Digito':
                            label = 'Dígito';
                            break;

                        case 'DataNascimento':
                            label = 'Data de Nascimento';
                            break;

                        case 'NomeMae':
                            label = 'Nome da Mãe';
                            break;

                        case 'AnoObito':
                            label = 'Ano Óbito';
                            break;

                        case 'Email':
                            label = 'E-mail';
                            break;

                        case 'Obs':
                            label = 'Observações';
                            break;

                        case 'Excel_Status':
                            label = 'Excel - Status';
                            break;

                        case 'Excel_Data_Cap':
                            label = 'Excel - Data de Captação';
                            break;

                        case 'Excel_Hora_Cap':
                            label = 'Excel - Hora de Captação';
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
                            break;

                        case 'BRConsulta_Hora_Cap':
                            label = 'BR Consulta - Hora de Captação';
                            break;

                        case 'BRConsulta_Id_Consulta':
                            label = 'BR Consulta -  Id Consulta';
                            break;

                        case 'BRConsulta_Controle':
                            label = 'BR Consulta - Controle';
                            break;

                        case 'BRConsulta_Erro':
                            label = 'BR Consulta - Erro';
                            break;

                        case 'DataAtualizacaoExcel':
                            label = 'Data de Atualização pelo Excel';
                            break;

                        case 'DataAtualizacaoBRConsulta':
                            label = 'Data de Atualização pelo BR Consulta';
                            break;

                        case 'Pep':
                            label = 'PEP';
                            break;

                        case 'DataConcessao':
                            label = 'Data de Concessão';
                            break;

                        case 'ValorConcedido':
                            label = 'Valor Concedido';
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
                            break;

                        case 'LimiteUtilizado':
                            label = 'Limite Utilizado';
                            break;

                        case 'LimiteAtual':
                            label = 'Limite Atual';
                            break;

                        case 'UsuarioCadastroNome':
                            label = 'Nome do Usuário que Cadastrou';
                            break;

                        case 'UsuarioCadastroEmail':
                            label = 'E-mail do Usuário que Cadastrou';
                            break;


                        case 'NomeBanco':
                            label = 'Banco';
                            break;

                        case 'NomePais':
                            label = 'País';
                            break;

                        case 'PerfilAcesso':
                            label = 'Perfil de Acesso';
                            // campo = value['nome']
                            break;

                        case 'PerfilAcesso_Id':
                            label = 'Id do Perfil de Acesso';
                            break;

                        case 'Name':
                            label = 'Nome';
                            break;

                        case 'TelefoneCelular':
                            label = 'Telefone/Celular';
                            break;

                        case 'TelefoneCelular':
                            label = 'Telefone/Celular';
                            break;

                        case 'IsVerified':
                            label = 'Verificado';
                            break;

                        case 'Created':
                            label = 'Data de Cadastro';
                            break;

                        case 'Updated':
                            label = 'Data de Última Atualização ';
                            break;

                        case 'DataDesativado':
                            label = 'Data que foi desativado ';
                            break;

                        default:
                            label = key;
                            break;
                    }
                    this.values.push([label, value]);
                }

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


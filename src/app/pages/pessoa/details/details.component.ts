import { DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronCircleLeft, faDollarSign, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaOperacaoList } from 'src/app/models/pessoa-operacao.model';
import { PessoaSaldo } from 'src/app/models/pessoa-saldo.model';
import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { BRConsultaResponse, PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { tabChanged } from 'src/app/utils/tabview';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnDestroy {
    faIdCard = faIdCard;
    faChevronCircleLeft = faChevronCircleLeft;
    faDollarSign = faDollarSign;

    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    activeIndex = 0;

    objeto: Pessoa = new Pessoa;
    loadingPessoa = true;
    erroPessoa = '';

    saldos: PessoaSaldo[] = [];
    loadingSaldo = true;
    erroSaldo = '';

    operacoes: PessoaOperacaoList[] = [];
    loadingOperacoes = true;
    erroOperacoes = '';

    limiteConcedido = 0;
    limiteUtilizado = 0;
    lastIdDeleteSaldo: number = 0;

    loadingConsultaApi = false;
    emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    constructor(
        private activatedRoute: ActivatedRoute,
        private pessoaService: PessoaService,
        private pessoaSaldoService: PessoaSaldoService,
        private pessoaOperacaoService: PessoaOperacaoService,
        private crypto: Crypto,
        private datepipe: DatePipe,
        private toastr: ToastrService,
        private router: Router,
    ) {

        this.activeIndex = parseInt(localStorage.getItem('tabIndex') ?? '0')
        this.tabChanged(this.activeIndex);

        console.log('constructor')
        var params = this.activatedRoute.params.subscribe(p => {
            if (p['pessoa_id']) {
                this.loadingPessoa = true;
                this.loadingSaldo = true;
                this.objeto.id = this.crypto.decrypt(p['pessoa_id']);
                console.log('pessoa id', this.objeto.id)
                /**
                 * Pessoa
                 */
                lastValueFrom(this.pessoaService.get(this.objeto.id))
                    .then(res => {
                        res.cpf = res.cpf.toString().padStart(11, '0') as unknown as number;
                        this.objeto = res;
                        console.log('pessoa', res)

                        var object = this.pessoaService.object.subscribe(res => {
                            this.objeto = res;
                            console.log('pessoa subscribe', res)
                        });
                        this.subscription.push(object);
                        this.loadingPessoa = false;
                    })
                    .catch(res => {
                        console.log('pessoa erro', res)
                        this.erroPessoa = getError(res);
                        this.loadingPessoa = false;
                    })

                /**
                 * Saldos
                 */
                lastValueFrom(this.pessoaSaldoService.getList(this.objeto.id))
                    .then(res => {
                        this.saldos = res;
                        console.log('saldos', res)
                        var listSaldos = this.pessoaSaldoService.list.subscribe(res => {
                            this.saldos = res.map(x => {
                                x.dataConcessao = this.datepipe.transform(x.dataConcessao, 'dd/MM/yyyy HH:mm', 'pt-BR') as unknown as Date;
                                x.idEncrypted = this.crypto.encrypt(x.id) ?? '';
                                return x
                            }).sort((x, y) => x.id - y.id);
                            this.lastIdDeleteSaldo = res.length > 0 ? res[res.length - 1].id : 0;
                            
                            console.log('saldos subscribe', res)
                            this.calculaLimiteConcedido();
                        });
                        this.subscription.push(listSaldos);
                        this.loadingSaldo = false;

                    })
                    .catch(res => {
                        console.log('saldo erro', res)
                        this.erroSaldo = getError(res);
                        this.loadingSaldo = false;
                    });

                /**
                 * Operação
                 */
                lastValueFrom(this.pessoaOperacaoService.getListById(this.objeto.id))
                    .then(res => {
                        this.operacoes = res;
                        console.log('operacoes', res)
                        var listOperacoes = this.pessoaOperacaoService.listOperacaoPorPessoa.subscribe(res => {
                            this.operacoes = Object.assign([], res);
                            this.calculaLimiteUtilizado();
                            console.log('operacoes subscribe', res)
                        });
                        this.subscription.push(listOperacoes);
                        this.loadingOperacoes = false
                    })
                    .catch(res => {
                        console.log('operacao erro', res)
                        this.erroOperacoes = getError(res);
                        this.loadingOperacoes = false
                    });
            } else {
                this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
            }
        });
        this.subscription.push(params);
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    tabChanged(index: number) {
        tabChanged(index)
    }

    calculaLimiteConcedido() {
        this.limiteConcedido = this.saldos.length > 0 ? this.saldos.map(x => x.valorConcedido).reduce((x, y) => x + y) : 0;
    }

    calculaLimiteUtilizado() {
        var liberados = this.operacoes.filter(x => x.statusOperacao == 'Liberado');
        this.limiteUtilizado = liberados.length > 0 ? liberados.map(x => x.valorOperacao).reduce((x, y) => x + y) : 0;
    }

    consultaPessoa() {
        if (!this.objeto.cpf || !this.objeto.dataNascimento) {
            return;
        }

        this.loadingConsultaApi = true;
        this.erro = '';

        lastValueFrom(this.pessoaService.getPessoa(this.objeto.cpf, this.objeto.dataNascimento))
            .then(res => {
                this.loadingConsultaApi = false;
                if (typeof (res) == 'object') {
                    var obj = JSON.parse(JSON.stringify(res)) as BRConsultaResponse;
                    this.objeto.dataAtualizacaoBRConsulta = new Date().toISOString() as unknown as Date;
                    if (obj.ERRO && obj.ERRO != '') {
                        this.objeto.brConsulta_Id_Consulta = obj.ID_CONSULTA;
                        this.objeto.brConsulta_Erro = obj.ERRO as unknown as string;
                        this.erro = obj.ERRO;
                        this.toastr.error(obj.ERRO)
                    } else if (!obj.ERRO) {
                        try {
                            this.objeto.dataNascimento = this.formataData(obj.DATA_NASC).substring(0, 10) as unknown as Date;
                        } catch (e) {
                            this.erro += `Não foi possível ler Data de Nascimento. (${obj.DATA_NASC}) \n`;
                            this.toastr.error('Não foi possível ler Data de Nascimento.')
                        }
                        try {
                            this.objeto.brConsulta_Data_Cap = this.formataData(obj.DATA_CAP) as unknown as Date;
                        } catch (e) {
                            this.erro += `Não foi possível ler Data de Captação. (${obj.DATA_CAP}) \n`;
                            this.toastr.error('Não foi possível ler Data de Captação.')
                        }
                        try {
                            this.objeto.brConsulta_Hora_Cap = this.formataData(obj.DATA_CAP, obj.HORA_CAP) as unknown as Date;
                        } catch (e) {
                            this.erro += `Não foi possível ler Hora de Captação. (${obj.HORA_CAP}) \n`;
                            this.toastr.error('Não foi possível ler Hora de Captação.')
                        }
                        try {
                            this.objeto.dataInscricao = this.formataData(obj.DATA_INSCRICAO) as unknown as Date;
                        } catch (e) {
                            this.erro += `Não foi possível ler Data de Inscrição. (${obj.DATA_INSCRICAO}) \n`;
                            this.toastr.error('Não foi possível ler Data de Inscrição.')
                        }
                        this.objeto.nome = obj.NOME;
                        this.objeto.digito = obj.DIGITO;
                        this.objeto.brConsulta_Controle = obj.CONTROLE;
                        this.objeto.brConsulta_Id_Consulta = obj.ID_CONSULTA;
                        this.objeto.situacao = obj.SITUACAO;
                        this.objeto.brConsulta_Status = obj.STATUS;
                    }
                } else {

                    this.objeto.brConsulta_Erro = res as string;
                    this.erro = res as string;
                    this.toastr.error(res as string)
                }
            })
            .catch(res => {
                this.loadingConsultaApi = false;
                this.erro = getError(res);
            })

    }

    formataData(dataString: string, horaString?: string, where?: string) {
        var hour = 0;
        var min = 0;
        var seg = 0;
        var date = dataString.split('/')

        var year = parseInt(date[2]);
        var month = parseInt(date[1]) - 1;
        var day = parseInt(date[0]);

        if (horaString) {
            var time = horaString.split(':');
            hour = parseInt(time[0]);
            min = parseInt(time[1]);
            seg = parseInt(time[2]);
        }
        var fullDate = new Date(year, month, day, hour, min, seg).toISOString();
        return fullDate;
    }

    send() {
        this.loading = true;
        this.erro = '';

        lastValueFrom(this.pessoaService.create(this.objeto))
            .then(res => {
                this.loading = false;
                if (res.sucesso) {
                    // this.router.navigate(['./../../'], { relativeTo: this.activatedRoute })
                    lastValueFrom(this.pessoaService.getList());
                } else {
                    this.erro = res.detalhes;
                }
            })
            .catch(res => {
                this.loading = false;
                this.erro = getError(res);
            });
    }

}

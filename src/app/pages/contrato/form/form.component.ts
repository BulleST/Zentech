import { PaisesService } from './../../../services/paises.service';
import { InstituicaoFinanceiraService } from './../../../services/instituicao-financeira.service';
import { ContratoTipoService } from './../../../services/contrato-tipo.service';
import { ContratoTipo } from './../../../models/contrato-tipo.model';
import { Contrato, ContratoRequest } from './../../../models/contrato.model';
import { ContratoService } from './../../../services/contrato.service';
import { ContratoList } from './../../../models/contrato.model';
import { ContratoStatus } from './../../../models/contrato.model';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaList } from 'src/app/models/pessoa.model';
import { PessoaOperacaoService } from 'src/app/services/pessoa-operacao.service';
import { PessoaSaldoService } from 'src/app/services/pessoa-saldo.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal';
import { Response } from 'src/app/helpers/request-response.interface';
import { CepService } from 'src/app/services/cep-service.service';
import { data } from 'jquery';
import { Cidades } from 'src/app/models/banco.model';
import { CidadesService } from 'src/app/services/cidades.service';
import { SelectItem } from 'primeng/api';
import { ContratoEvento } from 'src/app/models/contrato-evento.model';
import { InstituicaoFinanceiraList } from 'src/app/models/instituicao-financeira.model';
import { ContratoEventoService } from 'src/app/services/contrato-evento.service';
import { Paises } from 'src/app/models/pais.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
  objeto: ContratoRequest = new ContratoRequest;
 teste: Contrato_List []
  erro: string = '';
  loading = false;
  subscription: Subscription[] = [];
  routeBackOptions: any;
  cidade_id: number = 0
  status: ContratoStatus[] = [];
  loadingStatus = true;
  contratos: Contrato_List[] = [];
  loadingPessoa = true;
  @ViewChild('template') template: TemplateRef<any>
  @ViewChild('icon') icon: TemplateRef<any>
  isEditPage = true;
  id: number = 0;
  numEndereco: any;
  localidade: any;
  bairro: any;
  uf: any;
  ddd: any;
  item: any = '';


  selectedCity: any;
  cidadesDropdown: SelectItem[] = [];

  cepPreenchido: boolean = false;
  larguraResponsiva: number = 50;

  tipos: ContratoTipo[] = []
  loadingTipo = true;


  eventos: ContratoEvento[] = []
  loadingEvento = true;

  instituicoes: InstituicaoFinanceiraList[] = []
  loadingInstituicao = true;

  paises: Paises[] = []
  loadingPais = true;




  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: Modal,
    private pessoaSaldoService: PessoaSaldoService,
    private contratoService: ContratoService,
    private contratoTipoService:ContratoTipoService,
    private crypto: Crypto,
    private datepipe: DatePipe,
    private toastr: ToastrService,
    private cepService: CepService,
    private cidadesService: CidadesService,
    private instituicaoFinanceiraService: InstituicaoFinanceiraService,
    private contratoEventoService: ContratoEventoService,
    private paisesService: PaisesService
  ) {




    this.routeBackOptions = { relativeTo: this.activatedRoute };

    lastValueFrom(this.contratoTipoService.getList())
    .then(res => {
        this.loadingTipo = false;
        this.tipos = res;
    });

    lastValueFrom(this.contratoEventoService.getList())
    .then(res => {
        this.loadingEvento = false;
        this.eventos = res;
    });

    lastValueFrom(this.instituicaoFinanceiraService.getList())
    .then(res => {
        this.loadingInstituicao = false;
        this.instituicoes = res;
        console.log(this.instituicoes)
    });

    lastValueFrom(this.paisesService.getPais())
    .then(res => {
        this.loadingPais = false;
        this.paises = res;

    });

    console.log("linha63", this.contratoService.getList())
    lastValueFrom(this.contratoService.getList()) //n
      .then(res => {
        this.loadingPessoa = false;
        this.contratos = res;
      });


  }





  ngAfterViewInit(): void {
    this.modal.template.next(this.template)
    this.modal.style.next({ 'max-width': '600px', overflow: 'visible' })
    this.modal.activatedRoute.next(this.activatedRoute);
    this.modal.icon.next(this.icon);
    var params = this.activatedRoute.params.subscribe(x => {
      if (x['id']) {
        this.objeto.id = this.crypto.decrypt(x['id']);
        var teste = lastValueFrom(this.contratoService.get(this.id))
        this.modal.title.next('Editar Contrato')
        this.modal.routerBack.next(['../../']);
        this.isEditPage = true;
        // this.objeto = this.paraedit
        console.log('olaa', this.objeto, this.objeto.id)
        lastValueFrom(this.contratoService.get(this.objeto.id))
          .then(res => {

            console.log('certo')

            this.objeto = res;
            // this.cidade_id = this.objeto.cidade_Id;
            setTimeout(() => {
              this.modal.setOpen(true);
            }, 200);
          })
          .catch(res => {
            console.log('errado')
            this.voltar();
          })

      } else {
        this.modal.title.next('Cadastrar Contrato');
        this.modal.routerBack.next(['../']);
        this.isEditPage = false;
        setTimeout(() => {
          this.modal.setOpen(true);
        }, 200);
      }
    });
    this.subscription.push(params);
  }





  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  voltar() {
    this.modal.voltar(this.modal.routerBack.value, this.routeBackOptions);
  }

  // send() {
  //   this.loading = true;
  //   this.erro = '';
  //   lastValueFrom(this.contratoService.post(this.objeto))
  //     .then(res => {
  //       if (res.successo != false) {
  //         lastValueFrom(this.contratoService.getList());
  //         this.voltar();
  //       } else {
  //         this.erro = res.mensagem;
  //         this.toastr.error(res.mensagem);
  //         console.log('erro1')
  //       }
  //       this.loading = false;
  //     })
  //     .catch(res => {
  //       this.loading = false;
  //       this.erro = getError(res);
  //       console.log('erro2')
  //     })

  // }

  send() {
    console.log('teste', this.objeto)
    this.request()
      .then(res => {
        if (res.successo != false) {
          lastValueFrom(this.contratoService.getList());
          // lastValueFrom(this.pessoaSaldoService.getList(this.objeto.pessoa_Id));
          // lastValueFrom(this.pessoaOperacaoService.getListById(this.objeto.pessoa_Id));
          // lastValueFrom(this.pessoaOperacaoService.getList());
          this.voltar();
          console.log('certo')
          // console.log('rese', this.objeto.cidade_Id)
        } else {
          this.erro = res.mensagem;
          this.toastr.error(res.mensagem);
          console.log('certo n')
        }
        this.loading = false;
      })
      .catch(res => {
        this.loading = false;
        this.erro = getError(res);
        console.log('erro')
      })

  }

  request() {
    if (this.objeto.id == 0)
      return lastValueFrom(this.contratoService.create(this.objeto));
      console.log('teste1', this.objeto)
    if (this.isEditPage)
      // this.cidade_id = this.objeto.cidade_Id


    console.log('teste',this.objeto)

    return lastValueFrom(this.contratoService.edit(this.objeto));
  }

}

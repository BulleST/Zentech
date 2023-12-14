import { BancoService } from './../../../services/banco.service';
import { InstituicaoFinanceiraService } from 'src/app/services/instituicao-financeira.service';
import { InstituicaoFinanceiraRequest, InstituicaoFinanceiraStatus } from '../../../models/instituicao-financeira.model';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal';
import { Response } from 'src/app/helpers/request-response.interface';
import { CepService } from 'src/app/services/cep-service.service';
import { BancoList, Cidades } from 'src/app/models/banco.model';
import { data } from 'jquery';
import { BancoRequest } from 'src/app/models/banco.model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
  objeto: BancoRequest = new BancoRequest;
  //  teste: InstituicaoFinanceiraList []
  erro: string = '';
  loading = false;
  subscription: Subscription[] = [];
  routeBackOptions: any;
  status: InstituicaoFinanceiraStatus[] = [];
  loadingStatus = true;
  bancos: BancoList[] = [];
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
  cidades: Cidades[]
  cidade_id: number = 0;
  teste: number = 0
  logradouro: any;
  cepPreenchido: boolean = false;
  cep: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: Modal,
    private crypto: Crypto,
    private datepipe: DatePipe,
    private toastr: ToastrService,
    private cepService: CepService,
    private bancoService: BancoService
  ) {
    this.routeBackOptions = { relativeTo: this.activatedRoute };

    lastValueFrom(this.bancoService.getCidade())
      .then(res => {
        this.loadingStatus = false;
        this.cidades = res;
      });


    console.log(this.bancoService.getList())
    lastValueFrom(this.bancoService.getList())
      .then(res => {
        this.loadingPessoa = false;
        this.bancos = res;
      });

  }

  mostra() {
    this.cidade_id = this.objeto.cidade_Id
    console.log(this.cidade_id, this.objeto.cidade_Id)
  }
  buscaCEP() {
    this.cepService.buscar(this.objeto.cep).subscribe((data) => {
      if (this.objeto.cep.length == 9) {
        this.logradouro = data.logradouro + ", " + data.localidade + " - " + data.uf
        this.objeto.logradouro = this.logradouro
        this.cepPreenchido = true
      }
      else{
        this.objeto.cep = data.cep;

        // this.objeto.bairro = data.bairro
        this.logradouro = data.logradouro + ", " + data.localidade + " - " + data.uf
        this.objeto.logradouro = this.logradouro

      }

      // Verifica se o CEP possui 8 dígitos
      // console.log(this.objeto.logradouro);
    });

    if (this.objeto.cep.length === 8) { // Verifica se o CEP possui 8 dígitos
      this.cepService.buscar(this.objeto.cep).subscribe((data: any) => {


        // Define cepPreenchido como true para desabilitar os outros campos
        this.cepPreenchido = true;
      });
    }



  }

  blur(event: any) {
    if (this.isEditPage == false) {
      this.buscaCEP();
      if (this.objeto.cep.length === 9) { }
      console.log(this.buscaCEP);
      console.log('res', this.isEditPage)
    }
    else {
      console.log('test')
      console.log('res', this.isEditPage)
    }
  }

  ngAfterViewInit(): void {

    this.modal.template.next(this.template)
    this.modal.style.next({ 'max-width': '600px', overflow: 'visible' })
    this.modal.activatedRoute.next(this.activatedRoute);
    this.modal.icon.next(this.icon);

    var params = this.activatedRoute.params.subscribe(x => {
      if (x['id']) {
        this.objeto.id = this.crypto.decrypt(x['id']);
        this.modal.title.next('Editar Banco')
        this.modal.routerBack.next(['../../']);
        this.isEditPage = true;
        console.log('oq', this.logradouro)
        console.log('olaa', this.objeto, this.objeto.id)
        this.objeto.logradouro = this.logradouro
        console.log('olaola', this.logradouro)
        lastValueFrom(this.bancoService.get(this.objeto.id))
          .then(res => {

            console.log('certo')

            this.objeto = res;
            this.cidade_id = this.objeto.cidade_Id;
            this.cep = this.objeto.cep
            setTimeout(() => {
              this.buscaCEP()
              this.modal.setOpen(true);
            }, 200);
          })
          .catch(res => {
            console.log('errado')
            this.voltar();
          })

      } else {
        this.modal.title.next('Cadastrar Banco');
        this.modal.routerBack.next(['../']);
        this.isEditPage = false;
        setTimeout(() => {
          this.modal.setOpen(true);
        }, 200);
      }
    });
    this.subscription.push(params);
  }

  ngOnInit(): void {
    this.loadingStatus = true;
    this.bancoService.getCidade().subscribe((cidades: any[]) => {
      this.cidades = cidades;

    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  voltar() {
    this.modal.voltar(this.modal.routerBack.value, this.routeBackOptions);
  }

  send() {
    const cepSemHifen = this.objeto.cep.replace('-', '');
    this.objeto.cep = cepSemHifen
    console.log('teste', this.objeto)
    this.request()
      .then(res => {
        if (res.successo == true) {
          lastValueFrom(this.bancoService.getList());
          // lastValueFrom(this.pessoaSaldoService.getList(this.objeto.pessoa_Id));
          // lastValueFrom(this.pessoaOperacaoService.getListById(this.objeto.pessoa_Id));
          // lastValueFrom(this.pessoaOperacaoService.getList());
          this.voltar();
          console.log('certo')
          console.log('rese', this.objeto.cidade_Id)
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
      return lastValueFrom(this.bancoService.create(this.objeto));

    if (this.isEditPage)
      this.cidade_id = this.objeto.cidade_Id


    console.log('teste',this.objeto)

    return lastValueFrom(this.bancoService.edit(this.objeto));
  }
}

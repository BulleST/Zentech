import { PaisesService } from './../../../services/paises.service';
import { BeneficiarioService } from './../../../services/beneficiario.service';
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
import { BancoList } from 'src/app/models/banco.model';
import { data } from 'jquery';
import { BeneficiarioRequest, BeneficiarioList } from 'src/app/models/beneficiario.model';
import { CidadesService } from 'src/app/services/cidades.service';
import { Cidades } from 'src/app/models/banco.model';
import { BancoService } from 'src/app/services/banco.service';
import { Paises } from 'src/app/models/pais.model';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
  objeto: BeneficiarioRequest = new BeneficiarioRequest;
  erro: string = '';
  loading = false;
  subscription: Subscription[] = [];
  routeBackOptions: any;
  loadingStatus = true;
  beneficiarios: BeneficiarioList[] = [];
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
  cidade_id: number = 0;
  cidades: Cidades[]
  paises: Paises[]
  bancos: BancoList[]
  selectedCity: any;
  cidadesDropdown: SelectItem[] = [];
  cepPreenchido: boolean = false;
  cep: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: Modal,
    private crypto: Crypto,
    private datepipe: DatePipe,
    private toastr: ToastrService,
    private cepService: CepService,
    private beneficiarioService: BeneficiarioService,
    private cidadesService: CidadesService,
    private bancoService: BancoService,
    private paisesService: PaisesService
  ) {
console.log(this.objeto.cidade_Id)
    this.routeBackOptions = { relativeTo: this.activatedRoute };
    lastValueFrom(this.bancoService.getList())
    .then(res => {
        this.loadingStatus = false;
        this.bancos = res;
    });
    lastValueFrom(this.cidadesService.getCidade())
    .then(res => {
        this.loadingStatus = false;
        this.cidades = res;
    });
    lastValueFrom(this.paisesService.getPais())
    .then(res => {
        this.loadingStatus = false;
        this.paises = res;
    });
    console.log("linha63", this.beneficiarioService.getList())
    lastValueFrom(this.beneficiarioService.getList()) //n
      .then(res => {
        this.loadingPessoa = false;
        this.beneficiarios = res;
      });

  }
  removerTraco(): void {
   console.log('foi')
    this.objeto.cep = this.objeto.cep.replace('-', ''); // Remove todos os traços '-' do CEP
  }

  buscaCEP() {
    this.cepService.buscar(this.objeto.cep).subscribe((data) => {
      this.objeto.cep = data.cep;

      // var logradouro = logradouro
      this.objeto.logradouro = data.logradouro + " , "  + data.bairro + " - "+ data.uf;
      // this.objeto.cidade = data.localidade;
      // this.objeto.uf = data.uf;
      if (this.objeto.cep.length == 9) {

        this.cepPreenchido = true
      } // Verifica se o CEP possui 8 dígitos
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
    if(this.isEditPage==false){
      this.buscaCEP();
      if (this.objeto.cep.length === 9) { }
      console.log(this.buscaCEP);
      console.log('res',this.isEditPage)
    }
    else {
      console.log('test')
      console.log('res',this.isEditPage)
    }
  }



  ngAfterViewInit(): void {

    this.modal.template.next(this.template)
    this.modal.style.next({ 'max-width': '600px', overflow: 'visible' })
    this.modal.activatedRoute.next(this.activatedRoute);
    this.modal.icon.next(this.icon);
    if (this.isEditPage)
    this.cidade_id = this.objeto.cidade_Id
    var params = this.activatedRoute.params.subscribe(x => {
      if (x['id']) {
        this.objeto.id = this.crypto.decrypt(x['id']);
        var teste =  lastValueFrom(this.beneficiarioService.get(this.id))
        this.modal.title.next('Editar Beneficiário')
        this.modal.routerBack.next(['../../']);
        this.isEditPage = true;

        console.log('olaa', this.objeto, this.objeto.id)
        lastValueFrom(this.beneficiarioService.get(this.objeto.id))
        .then(res => {

          console.log('certo')
          console.log(this.objeto)
          this.objeto = res;
          this.cidade_id = this.objeto.cidade_Id;
          setTimeout(() => {
            this.modal.setOpen(true);
          }, 200);
        })
        .catch(res => {
          console.log('errado')
          this.voltar();
        })


      } else {
        this.modal.title.next('Cadastrar Beneficiário');

        this.modal.routerBack.next(['../']);
        this.isEditPage = false;
        // this.objeto.data = this.datepipe.transform(this.objeto.data, 'yyyy-MM-ddThh:mm') as unknown as Date;
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

  send() {
    const cepSemHifen = this.objeto.cep.replace('-', '');
    this.objeto.cep = cepSemHifen
    console.log( this.objeto)
    this.loading = true;
    this.erro = '';

    return lastValueFrom(this.beneficiarioService.post(this.objeto))
      .then(res => {
        if (res.successo != false) {
          lastValueFrom(this.beneficiarioService.getList());
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

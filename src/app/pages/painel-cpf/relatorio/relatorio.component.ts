import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faChevronLeft, faFile, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaRelatorio } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Modal } from 'src/app/utils/modal';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnDestroy, AfterViewInit {

  faTimes = faTimes;
  faChevronLeft = faChevronLeft;
  faFile = faFile;
  modalOpen = false;
  objeto: PessoaRelatorio = new PessoaRelatorio;
  loading = false;
  subscription: Subscription[] = [];
  routerBack: string[] = ['../../'];
  routeBackOptions: any;

  @ViewChild('template') template: TemplateRef<any>
  @ViewChild('icon') icon: TemplateRef<any>

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private modal: Modal,
    private crypto: Crypto,
    private datepipe: DatePipe,
    private pessoaService: PessoaService

  ) {
    this.routeBackOptions = { relativeTo: this.activatedRoute };

    var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
    this.subscription.push(getOpen);

    var params = activatedRoute.params.subscribe(p => {
      if (p['id']) {
          this.objeto.id = this.crypto.decrypt(p['id']);
        lastValueFrom(this.pessoaService.get(this.objeto.id))
        .then(res => {
        })
        .catch(res => {

        })
        this.objeto.nome = 'Maria Eduarda da Silva Correia';
        this.objeto.cpf = (5418503006).toString().padStart(11, '0') as unknown as number;
        this.objeto.dataOperacao = this.datepipe.transform(new Date, 'yyyy-MM-dd') as unknown as Date;
        this.objeto.valorOperacao = parseFloat(parseFloat((Math.random() * (80 - 0) + 0).toString()).toFixed(2));
        this.objeto.valorOperacaoMoeda = '$'
        this.objeto.limiteAtribuido = parseFloat(parseFloat((Math.random() * (80 - 0) + 0).toString()).toFixed(2));
        this.objeto.limiteAtribuidoMoeda = '$'
        this.objeto.limiteConsumido = parseFloat(parseFloat((Math.random() * (80 - 0) + 0).toString()).toFixed(2));
        this.objeto.limiteConsumidoMoeda = '$'
        this.objeto.saldoLimite = parseFloat(parseFloat((Math.random() * (80 - 0) + 0).toString()).toFixed(2));
        this.objeto.saldoLimiteMoeda = '$';
        this.objeto.chargeBack = 'Sim' as unknown as boolean;
        this.objeto.status = 'Blocked - não pode ser enviado';
      } else {
        this.voltar();
      }
    });
    this.subscription.push(params);

  }

  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.modal.title.next('Detalhes')
    this.modal.template.next(this.template)
    this.modal.style.next({ 'max-width': '600px' })
    this.modal.routerBack.next(this.routerBack);
    this.modal.activatedRoute.next(this.activatedRoute);
    this.modal.icon.next(this.icon);

    setTimeout(() => {
      this.modal.setOpen(true);
    }, 200);
  }

  voltar() {
    this.modal.voltar(this.routerBack, this.routeBackOptions);
  }




}

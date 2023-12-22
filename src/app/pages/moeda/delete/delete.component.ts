import { MoedaService } from 'src/app/services/moeda.service';
import { Moeda } from 'src/app/models/moeda.model';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { Modal, ModalService } from 'src/app/services/modal.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';


@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
    faTrash = faTrash;
    id: number = 0;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>
    modal: Modal = new Modal;
    eventoId: number = 0
    objeto: Moeda[]
    nome: string = ''

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private crypto: Crypto,
        private moedaService: MoedaService,
    ) { }



    ngAfterViewInit(): void {
        this.modal.id =  0;
        this.modal.template =  this.template;
        this.modal.icon =  this.icon;
        this.modal.style =  { 'max-width': '400px', overflow: 'visible' };
        this.modal.activatedRoute =  this.activatedRoute;
        this.modal.routerBackOptions = { relativeTo: this.activatedRoute };

        this.modal.title = 'Excluir registro';

        this.activatedRoute.params.subscribe(params => {
          const encryptedId = params['moeda_id'];
          if (encryptedId) {
            const decryptedId = this.crypto.decrypt(encryptedId);
            this.id = decryptedId
            console.log('ID do tipo Descriptografado:', decryptedId);}
            this.modal.routerBack = ['../../..'];
          var obj = this.activatedRoute.params.subscribe(p => {
            if (p['moeda_id']) {
                try {
                    setTimeout(() => {
                        this.modal = this.modalService.addModal(this.modal, 'tipo');
                        this.moedaService.get(this.id).subscribe((moeda: Moeda) => {
                          if (moeda.id == this.eventoId) {
                              this.nome = moeda.nome;
                              console.log('tste',this.nome)
                              this.modal.title = `Excluir registro: ${this.nome}` , this.eventoId;
                          }
                          else {
                            this.nome = moeda.nome;
                            console.log('tste', this.eventoId, moeda.id)
                            this.modal.title = `Excluir registro - ${this.nome}`

                        }
                        });
                    }, 200);
                } catch(e) {
                    this.voltar();

                }
            } else {
                this.voltar();
                this.modal.routerBack = ['../../..'];
            }
        });
        this.subscription.push(obj);
          // Faça o que precisar com o eventoId recuperado aqui
          console.log('ID do Evento:', this.eventoId);
        });
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modalService.removeModal(this.modal.id);
    }


    send() {
      this.loading = true;
      this.erro = '';

      lastValueFrom(this.moedaService.delete(this.id))
          .then(res => {
              this.loading = false;
              if (res.sucesso) {
                  lastValueFrom(this.moedaService.getList());
                  this.voltar();
              } else {
                  this.erro = res.mensagem;
              }
          })
          .catch(res => {
              this.loading = false;
              this.erro = getError(res);
          })
  }
}

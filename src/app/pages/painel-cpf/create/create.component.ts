import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PessoaFormulario } from 'src/app/models/pessoa-crud.model';
import { PessoaService } from 'src/app/services/pessoa.service';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal';
import { validaCPF } from 'src/app/utils/validate-cpf';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnDestroy {
    faTimes = faTimes;
    faChevronLeft = faChevronLeft;
    faUser = faUser;
    modalOpen = false;
    objeto: PessoaFormulario = new PessoaFormulario;
    erro: string = '';
    loading = false;
    subscription: Subscription[] = [];
    routerBack: string[] = ['../'];
    routeBackOptions: any;
    emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    @ViewChild('dataNascimento') dataNascimento?: NgModel;
    dataNascimentoMin = '';
    dataNascimentoMax = '';

    @ViewChild('template') template: TemplateRef<any>
    @ViewChild('icon') icon: TemplateRef<any>

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: Modal,
        private pessoaService: PessoaService
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };
        
        var data = new Date();
        this.dataNascimentoMax = data.toJSON().substring(0, 10);

        var dataNascimentoMin = data;
        dataNascimentoMin.setFullYear(dataNascimentoMin.getFullYear() - 100);
        this.dataNascimentoMin = dataNascimentoMin.toJSON().substring(0, 10);


        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);


    }
    ngAfterViewInit(): void {
        this.modal.title.next('Cadastrar Pessoa')
        this.modal.template.next(this.template)
        this.modal.style.next({ 'max-width': '600px' })
        this.modal.routerBack.next(this.routerBack);
        this.modal.activatedRoute.next(this.activatedRoute);
        this.modal.icon.next(this.icon);

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    resetForm() {
        this.objeto = new PessoaFormulario;
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

    validateDataNascimento() {
        var data = new Date(this.objeto.dataNascimento);
        var dataNascimentoMin = new Date(this.dataNascimentoMin);
        var dataNascimentoMax = new Date(this.dataNascimentoMax);
        if (this.dataNascimento) {
            if (data > dataNascimentoMax) {
                this.dataNascimento.control.setErrors({
                    max: true
                })
            }
            else if (data < dataNascimentoMin) {
                this.dataNascimento.control.setErrors({
                    min: true
                })
            }
        }
    }
    validaCPF(input: NgModel, doc: number) {
        if (!input) {
            return;
        }
        if (!doc || doc == 0) {
            input.control.setErrors({ required: true });
            return;
        }

        if (input.name == 'cpf') {
            var valid = validaCPF(doc)
            if (!valid) {
                input.control.setErrors({ invalid: true });
                return;
            }
        }

        var lista: any[] = []
        var existe = lista.filter(x => x.cpf == doc);
        if (existe.length > 0) {
            input.control.setErrors({ jaCadastrado: true });
            return;
        }

        input.control.setErrors(null);
    }

    send(model: NgForm) {
        this.loading = true;
        this.erro = '';

        lastValueFrom(this.pessoaService.create([this.objeto]))
        .then(res => {
            lastValueFrom(this.pessoaService.getList());
            this.voltar();
            this.loading = false;
        })
        .catch(res => {
            this.loading = false;
            this.erro = getError(res);
        })

    }
}

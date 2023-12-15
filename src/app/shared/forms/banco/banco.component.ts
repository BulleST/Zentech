import { AfterViewInit, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {  lastValueFrom } from 'rxjs';
import { BancoRequest, Cidades } from 'src/app/models/banco.model';
import { CepService } from 'src/app/services/cep-service.service';
import { CidadesService } from 'src/app/services/cidades.service';
import { validateCEP } from 'src/app/utils/validate-cep';

@Component({
  selector: 'app-form-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }] // Permite validação de form pai em input de componente filho
})
export class BancoFormComponent  implements AfterViewInit {
    loadingCep = false;
    isEditPage = true;
    cepCarregado = false;
    cepPreenchido = false;
    
    cidades: Cidades[] = [];
    loadingCidades = false;
    init = false;
    
    @ViewChild('cep') cep: NgModel;

    @Input() objeto: BancoRequest = new BancoRequest;
    @Input() loading = false;
    @Input() erro: string = '';
    @Output() sendData: EventEmitter<BancoRequest> = new EventEmitter<BancoRequest>();

    constructor(
        private toastr: ToastrService,
        private cepService: CepService,
        private cidadeService: CidadesService
    ) {
        
        lastValueFrom(this.cidadeService.getCidade())
        .then(res => {
            this.cidades = res;
            this.loadingCidades = false;
        })
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['objeto']) this.objeto = changes['objeto'].currentValue;       
        if (changes['loading']) this.loading = changes['loading'].currentValue;
        if (changes['erro']) this.erro = changes['erro'].currentValue;
    }

    ngAfterViewInit(): void {
        this.init = true;
        this.buscaCEP(this.cep)
    }

    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = 'Campos inválidos';
            return;
        }
        this.erro = '';
        this.sendData.emit(this.objeto);
    }


    buscaCEP(input: NgModel) {
        this.loadingCep = true;
        input.control.setErrors(null);

        if (!this.validaCep(input)) {
            this.toastr.error('CEP inválido.');
            input.control.setErrors({invalid: true})
            this.cepCarregado = false;
            return;
        }
        this.cepCarregado = false;
        this.cepPreenchido = false

        lastValueFrom( this.cepService.buscar(this.objeto.cep))
        .then(data => {
            if (data.erro == true) {
                this.toastr.error('CEP inválido.');
                input.control.setErrors({invalid: true})
                this.cepCarregado = false;
                this.cepPreenchido = false
                return;

            } else {
                this.objeto.logradouro = data.logradouro + " , " + data.bairro + " - " + data.uf;

                var localidade = data.localidade.toLowerCase();

                var cidade = this.cidades.find(x => {
                    var cid = x.nomeCidade.toLowerCase()
                    var uf = x.sigla.toLowerCase();
                    return (cid == localidade || localidade.includes(cid) || cid.includes(localidade)) && data.uf.toLowerCase() == uf;
                })
                if (cidade) {
                    this.objeto.cidade_Id = cidade.id;
                }
                this.cepCarregado = false;
                this.cepPreenchido = false

                this.cepCarregado = true
            }
        })
        .catch(res => {
            this.toastr.error('Não foi possível carregar CEP')
            this.cepCarregado = false;
        })
        .finally(() => this.loadingCep = false)

    }

    validaCep(input: NgModel) {
		this.loadingCep = true;

        if (!this.objeto.cep.trim()) {
            setTimeout(() => {
                input.control.setErrors({ required: true });
            }, 300);
			this.loadingCep = false;
            return false
        }
        else if (this.objeto.cep.trim().length != 8) {
            setTimeout(() => {
                input.control.setErrors({ invalid: true });
            }, 300);
			this.loadingCep = false;
            return false
        } else if (!validateCEP(this.objeto.cep)) {
            setTimeout(() => {
                input.control.setErrors({ invalid: true });
            }, 300);
			this.loadingCep = false;
            return false;
        } else {
            this.loadingCep = false;
            setTimeout(() => {
                input.control.setErrors(null);
            }, 300);
            return true;
        }
    }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/user.service';
import { Crypto } from 'src/app/utils/crypto';
import { getError } from 'src/app/utils/error';
import { Modal } from 'src/app/utils/modal';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnDestroy {

    faTimes = faTimes;
    modalOpen = false;
    erro: string = '';
    loading = false;
    objeto: Usuario = new Usuario;
    subscription: Subscription[] = [];
    routerBack: string[] = ['../../'];
    routeBackOptions: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: Modal,
        private userService: UsuarioService,
        private crypto: Crypto,
    ) {

        this.routeBackOptions = { relativeTo: this.activatedRoute };
        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        var params = this.activatedRoute.params.subscribe(res => {
            if (res['usuario_id']) {
                this.objeto.id = this.crypto.decrypt(res['usuario_id']);
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

    send() {
        this.loading = true;
            lastValueFrom(this.userService.delete(this.objeto.id))
                .then(async res => {
                    var users = await lastValueFrom(this.userService.getList());
                    this.voltar();
                    this.userService.setObject(new Usuario);
                })
                .catch(res => this.erro = getError(res))
                .finally(() => this.loading = false);
    }

}

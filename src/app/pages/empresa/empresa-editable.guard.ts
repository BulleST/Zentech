import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { AccountService } from 'src/app/services/account.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Injectable({
    providedIn: 'root'
})
export class EmpresaEditableAuth implements CanActivate {
    constructor(
        private accountService: AccountService,
        private empresaService: EmpresaService,
        private router: Router,
        private toastr: ToastrService,
    ) {

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Observable<boolean>(obs => {
            this.empresaService.objeto.subscribe(res => {
                var account = this.accountService.accountValue;
                /**
                 * O usuario master pode alterar
                 * qualquer outro usuário exceto o admin
                 * O usuário backoffice não tem acesso a essa sessão
                 */
                if (account?.perfilAcesso_Id == Role.Master && res?.perfilAcesso_Id == Role.Admin) {
                    obs.next(false);
                } else {
                    obs.next(true);
                }
            });
        });

    }
}

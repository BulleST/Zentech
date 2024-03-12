import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, lastValueFrom } from 'rxjs';
import { AccountService } from '../services/account.service';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private accountService: AccountService,
        private router: Router,
        private toastr: ToastrService,
    ) {

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
        return new Promise((resolve, reject) => {
            // Do some asynchronous stuff
            lastValueFrom(this.accountService.refreshToken())
            .then(async promise => {
             var account =  await promise
                if (!account) {
                    this.voltar(state);
                    resolve(false)
                    return false;
                } else {
                    const jwtToken = JSON.parse(atob(account?.jwtToken.split('.')[1]));
                    const expires = new Date(jwtToken.exp * 1000);
                    // const timeout = expires.getTime() - Date.now() - (60 * 1000);
                    if (new Date() > expires) {
                        this.voltar(state);
                        resolve(false)
                        return false;
                    }
                    resolve(true)
                    return true;
                }
            })
            .catch(res => {
                resolve(false)
                return false;
            })
          });

        
        // try {
        //     var account = await lastValueFrom(this.accountService.refreshToken())
        //     console.log('account', account)

        //     if (!account)
        //         return this.voltar(state);

        //     else {
        //         const jwtToken = JSON.parse(atob(account?.jwtToken.split('.')[1]));
        //         const expires = new Date(jwtToken.exp * 1000);
        //         // const timeout = expires.getTime() - Date.now() - (60 * 1000);
        //         if (new Date() > expires) {
        //             return this.voltar(state);
        //         }
        //         return true;

        //     }
        // } catch (e) {
        //     return this.voltar(state);
        // }

    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    voltar(state: RouterStateSnapshot) {
        this.toastr.error(`Acesso não autorizado. <br> Faça login.`, '');
        this.router.navigate(['account', 'login'], { queryParams: { returnUrl: state.url } })
        this.accountService.setAccount(undefined)
        return false;
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, lastValueFrom, of, throwError } from 'rxjs';
import { Account, ChangePassword, Login, Register, ResetPassword, UpdateAccount } from '../models/account.model';
import { Crypto } from '../utils/crypto';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EmpresaService } from './empresa.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    url = environment.url;

    accountSubject: BehaviorSubject<Account | undefined> = new BehaviorSubject<Account | undefined>(undefined);
    public account: Observable<Account | undefined> = new Observable<Account | undefined>(undefined);

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private crypto: Crypto,
        private empresaService: EmpresaService,
    ) {
        this.account = this.accountSubject.asObservable();
    }

    setAccount(value?: Account) {
        if (value) {
            value.role = value.perfilAcesso_Id;
        }
        this.accountSubject.next(value)
        let encrypted = this.crypto.encrypt(value);
        localStorage.setItem('account', encrypted ?? '');
    }

    public get accountValue() {
        var account = localStorage.getItem('account') as string;
        if (!this.accountSubject.value) {
            var accountObj = this.crypto.decrypt(account) as Account;
            this.accountSubject.next(accountObj);
        }
        return this.accountSubject.value;
    }

    login(model: Login) {

        return this.http.post<Account>(`${this.url}/accounts/authenticate`, model, { withCredentials: true } /* */).pipe(
            tap(async (account) => {
                this.setAccount(account);
                const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
                this.startRefreshTokenTimer();

                this.empresaService.empresaSelected.next({
                    id: account.empresa_Id,
                    empresa: account.empresa
                })
                if (account.perfilAcesso_Id == 1) {
                    await lastValueFrom(this.empresaService.getList());
                }


                return of(account);
            }),
            catchError((err => {
                this.setAccount(undefined);
                // return throwError(() => new Error(err));
                return throwError(err);
            }))
        );
    }

    async logout() {
        await lastValueFrom(this.http.post<any>(`${this.url}/accounts/revoke-token`, {token: this.accountValue?.refreshToken}, { withCredentials: true } /**/))
            .catch(error => {
                console.log(error)
            })
            this.stopRefreshTokenTimer();
            this.setAccount(undefined);
            this.router.navigate(['account', 'login']);
            localStorage.clear();
    } 

    refreshToken() {
       return this.http.post<Account>(`${this.url}/accounts/refresh-token`, {}, { withCredentials: true })
           .pipe(tap({
            next: async account => {
                console.log('oi', account)
                this.setAccount(account);
                this.startRefreshTokenTimer();
                this.empresaService.empresaSelected.next({
                    id: account.empresa_Id,
                    empresa: account.empresa
                })
                if (account.perfilAcesso_Id == 1) {
                    await lastValueFrom(this.empresaService.getList());
                }
            },
            error: (err) => {
                this.setAccount(undefined);
                this.startRefreshTokenTimer();
            },
           }));

    }

    register(model: Register) {
        return this.http.post<any>(`${this.url}/accounts/register`, model);
    }

    resetPassword(object: ResetPassword) {
        return this.http.post<any>(`${this.url}/accounts/reset-password`, object);
    }

    forgotPassword(email: string) {
        return this.http.post<any>(`${this.url}/accounts/forgot-password`, { email: email });
    }

    verifyEmail(token: string) {
        return this.http.post<any>(`${this.url}/accounts/verify-email`, { token: token });
    }

    changePassword(object: ChangePassword) {
        return this.http.post<any>(`${this.url}/accounts/change-password`, object);
    }

    updateAccount(object: UpdateAccount) {
        return this.http.post<any>(`${this.url}/accounts/update-account`, object);
    }

    private refreshTokenTimeout: any;

    private startRefreshTokenTimer() {
        if (this.accountValue) {
            /** atop is not depreciated
             * ignore de typescrypt warning
             */
            const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));
    
            // set a timeout to refresh the token a minute before it expires
            const expires = new Date(jwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
        }
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

}

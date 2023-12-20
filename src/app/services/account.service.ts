import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Account, ChangePassword, Login, Register, ResetPassword, UpdateAccount } from '../models/account.model';
import { Crypto } from '../utils/crypto';
import { map, catchError, tap } from 'rxjs/operators';
import { Role } from '../models/account-perfil.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    url = environment.url;

    accountSubject: BehaviorSubject<Account | undefined>;
    public account: Observable<Account | undefined>;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private crypto: Crypto,
    ) {
        this.accountSubject = new BehaviorSubject<Account | undefined>(undefined);
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
        if (this.accountSubject.value == undefined && account != undefined && account.trim() != '') {
            var accountObj = this.crypto.decrypt(account) as Account;
            this.accountSubject.next(accountObj);
        }
        return this.accountSubject.value;
    }

    login(model: Login) {
        return this.http.post<Account>(`${this.url}/accounts/authenticate`, model, { withCredentials: true } /* */).pipe(
            tap((account) => {
                this.setAccount(account);
                const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
                this.startRefreshTokenTimer();
                return of(account);
            }),
            catchError((err => {
                this.setAccount(undefined);
                // return throwError(() => new Error(err));
                return throwError(err);
            }))
        );
    }

    logout() {
        this.http.post<any>(`${this.url}/accounts/revoke-token`, {token: this.accountValue?.refreshToken}, { withCredentials: true } /**/)
            .subscribe({
                next: res => {
                },
                error: error => {
                    return throwError(() => new Error(error));
                },
                complete: () => {
                    this.stopRefreshTokenTimer();
                    this.setAccount(undefined);
                    this.router.navigate(['account', 'login']);
                    localStorage.clear();
                },
            });
    } 
    refreshToken() {
        return this.http.post<Account>(`${this.url}/accounts/refresh-token`, {}, { withCredentials: true })
            .pipe(map((account) => {
                this.setAccount(account);
                this.startRefreshTokenTimer();
                if (account.perfilAcesso_Id != Role.Admin) {
                }
                return account;
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
            this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
        }
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getItem, removeItem, setItem, StorageItem } from '@app/@core/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  signIn(): void {
    const token = Array(4)
      .fill(0)
      .map(() => Math.random() * 99)
      .join('-');

    setItem(StorageItem.Auth, token);
    this.isLoggedIn$.next(true);
  }

  signOut(): void {
    removeItem(StorageItem.Auth);
    this.isLoggedIn$.next(false);
  }

  AUTH_URL = 'backend/authentication/';

  constructor(private _http: HttpClient) {}

  Register(userData: IUser): Observable<IToken> {
    return this._http
      .post<IToken>(this.AUTH_URL + 'register/', userData)
      .pipe(share());
  }

  EditUserDetails(userData: IUser): Observable<IToken> {
    return this._http
      .patch<IToken>(this.AUTH_URL + 'register/', userData)
      .pipe(share());
  }

  LogIn(loginData: IUser): Observable<IToken> {
    return this._http
      .post<IToken>(this.AUTH_URL + 'login/', loginData)
      .pipe(share());
  }

  ValidateUserInDomain(): Observable<IToken> {
    return this._http
      .post<IToken>(this.AUTH_URL + 'validate/', {})
      .pipe(share(), retry(2));
  }

  LogOut(): Observable<boolean> {
    return this._http
      .post<boolean>(this.AUTH_URL + 'logout/', '')
      .pipe(share());
  }
}

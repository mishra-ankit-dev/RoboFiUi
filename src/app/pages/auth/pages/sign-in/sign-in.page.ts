import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { Subscription } from 'rxjs';
import { AuthenticationForms } from '../../forms/auth.form';
import { AuthService } from '../../services/auth.service';
import { isInValid, isValid } from '../../validators/custom.validator';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  isValid = isValid;
  isInValid = isInValid;
  subscriptions = Subscription;

  returnUrl!: string;
  signInForm!: FormGroup;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.signInForm = AuthenticationForms.LoginForm();
    this.returnUrl =
      this._activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
      `/${ROUTER_UTILS.config.base.home}`;
  }

  onClickSignIn(): void {
    this._authService.signIn(this.signInForm.value).subscribe();
    this._router.navigate([this.returnUrl]);
  }

  value(controlName: string): AbstractControl {
    return this.signInForm.controls[controlName];
  }
}

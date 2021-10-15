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
  returnUrl!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,

    private _router: Router,
  ) {}

  ngOnInit() {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
      `/${ROUTER_UTILS.config.base.home}`;
  }

  onClickSignIn(): void {
    this.authService.signIn();
    this.authService.LogIn(this.signInForm.value);
    this.router.navigate([this.returnUrl]);
  }

  isValid = isValid;
  isInValid = isInValid;
  subscriptions = Subscription;

  userValidationCompleted = false;

  signInForm: FormGroup = AuthenticationForms.LoginForm();

  value(controlName: string): AbstractControl {
    return this.signInForm.controls[controlName];
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as uiActions from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLoading: boolean;
  private _subscriptions: Subscription[];

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _store: Store<AppState>,
    private _router: Router
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.isLoading = false;
    this._subscriptions = [];
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this._store
        .select('ui')
        .subscribe((ui) => (this.isLoading = ui.isLoading))
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  async login(): Promise<void> {
    if (this.loginForm.valid) {
      this._store.dispatch(uiActions.isLoading());
      const { email, password } = this.loginForm.value;
      try {
        await this._authService.login(email, password);
        this._router.navigateByUrl('dashboard');
      } catch (error: any) {
        console.error('Error login ', { error });

        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
        });
      } finally {
        this._store.dispatch(uiActions.stopLoading());
      }
    }
  }
}

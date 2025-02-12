import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as uiActions from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public isLoading: boolean;
  private _subscriptions: Subscription[];
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _store: Store<AppState>,
    private _authService: AuthService
  ) {
    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
    this._subscriptions = [];
    this.isLoading = false;
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this._store.select('ui').subscribe((ui) => {
        this.isLoading = ui.isLoading;
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public async createUser() {
    if (this.registerForm.valid) {
      this._store.dispatch(uiActions.isLoading());

      const { name, email, password } = this.registerForm.value;
      try {
        const { user } = await this._authService.createUser(email, password);
        await this._authService.createDoc({ email, name, uid: user.uid });

        this._router.navigate(['/']);
      } catch (error: any) {
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

  // convenience getters for easy access to form fields
  public get controls() {
    return this.registerForm.controls;
  }
}

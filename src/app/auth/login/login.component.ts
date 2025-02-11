import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  public loginForm: FormGroup;
  public isLoading: boolean;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.isLoading = false;
  }

  async login(): Promise<void> {
    if (this.loginForm.valid) {
      Swal.fire({
        title: 'Login...',

        didOpen: () => {
          Swal.showLoading();
        },
      });
      const { email, password } = this.loginForm.value;
      try {
        await this._authService.login(email, password);
        Swal.close();
        this._router.navigateByUrl('dashboard');
      } catch (error: any) {
        console.error('Error login ', { error });

        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
        });
      }
    }
  }
}

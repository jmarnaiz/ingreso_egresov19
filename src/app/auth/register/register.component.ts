import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public isLoading: boolean;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
    this.isLoading = false;
  }

  ngOnInit(): void {}

  public async createUser() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      try {
        Swal.fire({
          title: 'Registering...',

          didOpen: () => {
            Swal.showLoading();
          },
        });
        const { user } = await this._authService.createUser(email, password);
        await this._authService.createDoc({ email, name, uid: user.uid });
        Swal.close();

        this._router.navigate(['/']);
      } catch (error: any) {
        // console.error('Error message: ', error);
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
        });
      }
    }
  }

  // convenience getters for easy access to form fields
  public get controls() {
    return this.registerForm.controls;
  }
}

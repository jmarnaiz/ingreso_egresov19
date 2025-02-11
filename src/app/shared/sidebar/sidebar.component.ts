import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  async logout(): Promise<void> {
    try {
      await this._authService.logout();
      this._router.navigateByUrl('login');
    } catch (error) {
      console.error('Error while logout');
    }
  }
}

import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent implements OnDestroy {
  public name: string;
  private _userSubscription!: Subscription;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppState>
  ) {
    this.name = '';
  }

  ngOnInit(): void {
    this._userSubscription = this._store
      .select('user')
      .subscribe(({ user }) => {
        this.name = user.name;
      });
  }

  ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }

  async logout(): Promise<void> {
    try {
      await this._authService.logout();
      this._router.navigateByUrl('login');
    } catch (error) {
      console.error('Error while logout');
    }
  }
}

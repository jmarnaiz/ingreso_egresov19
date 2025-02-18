// Modules
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { StatisticsComponent } from './ingreso-egreso/statistics/statistics.component';
import { DetailsComponent } from './ingreso-egreso/details/details.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// NgRx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Pipes
import { OrderIngresosEgresosPipe } from './pipes/order-ingresos-egresos.pipe';

// Graphics
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { GraphicComponent } from './ingreso-egreso/statistics/graphic/graphic.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    StatisticsComponent,
    DetailsComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    OrderIngresosEgresosPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    GraphicComponent,
  ],
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ingreso-egreso-app-f8541',
        appId: '1:9059381937:web:95f8ccfcb55f4fe94f2890',
        storageBucket: 'ingreso-egreso-app-f8541.firebasestorage.app',
        apiKey: 'AIzaSyAgIFLsAfWU3I9d9H54iyi-CJy6uxaqIA0',
        authDomain: 'ingreso-egreso-app-f8541.firebaseapp.com',
        messagingSenderId: '9059381937',
        measurementId: 'G-VTD8TQ38VX',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Angular Modules
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// App Modules
import { AuthModule } from './auth/auth.module';

// Components
import { AppComponent } from './app.component';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// NgRx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    FontAwesomeModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

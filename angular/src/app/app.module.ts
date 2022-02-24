import { initializeApp } from 'firebase/app';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { RegisterModule } from './features/register/register.module';
import { LoginModule } from './features/login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonSharedModule } from './shared/common-shared.module';
import { AuthService } from './core/services/auth.service';
import { NonAuthGuard } from './core/guards/non-auth.guard';

/** Root module. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    CommonSharedModule,
    LoginModule,
    RegisterModule,
  ],
  providers: [
    AuthService,
    NonAuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { Component } from '@angular/core';

// import { LoginComponentReactive } from './auth/login-reactive/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddressesComponent } from './auth/addresses/addresses.components';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  // imports: [LoginComponentReactive, SignupComponent],
  imports: [SignupComponent, AddressesComponent],
})
export class AppComponent {}

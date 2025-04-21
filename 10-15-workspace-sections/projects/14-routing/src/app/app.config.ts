import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import { routs } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routs,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
  ],
};

// input binding doesn't work by default for child routs
// So by default, a component can only get the path parameters
// that belong directly to its route through input binding.
// If as a child route you want to get the path parameters, of a parent route, you explicitly have to tell Angular about your intentions
//And with router config function

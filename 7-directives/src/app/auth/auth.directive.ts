import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({
    alias: 'appAuth',
  });
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  // template ref gives you access to content of the template
  private viewContainerRef = inject(ViewContainerRef);
  //view container red in the end is a reference to the place in the DOM where this (templateRef) template is being used
  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}

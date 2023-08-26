import { Directive, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Directive({
  selector: '[Auth]'
})
export class AuthDirective {

  constructor(public authService: AuthService, private elementRef: ElementRef) { }

  ngOnInit() {
    const isAuthenticated = this.authService.isAuthenticated();

    if(isAuthenticated) {
        const allow = true;
        this.isAllow(allow);
    } else {
      this.isAllow(false);
    }
  }

  isAllow(allow: boolean) {
    const el: HTMLElement = this.elementRef.nativeElement;

    if (!allow) {
      el.remove();
    }
  }
}

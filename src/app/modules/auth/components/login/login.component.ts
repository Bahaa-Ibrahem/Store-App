import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  returnUrl: string;

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    isAdmin: [false]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    route.queryParams.subscribe((params: Params) => {
      this.returnUrl = params['returnUrl'];
    })
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      .then(res=>res.json())
      .then(json=> {
        localStorage.setItem("token", json.token);
        if(this.loginForm.get('isAdmin')?.value == true) localStorage.setItem("isAdmin", '1');
        this.router.navigate([this.returnUrl || '/catogries']);
      })
    }
  }
}

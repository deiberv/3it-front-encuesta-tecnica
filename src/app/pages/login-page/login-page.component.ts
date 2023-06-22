import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login, LoginService } from './login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {

    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['']);
    }

  }

  login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.loginService.login({
        email: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: false
      }).subscribe({
        next: () => {
          if (!this.router.getCurrentNavigation()) {
            // There were no routing during login (eg from navigationToStoredUrl)
            this.router.navigate(['']);
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            text: `Error realizando login`,
            toast: true,
            position: 'top-right',
            timer: 2000
          });
        },
      });
    }
  }
}

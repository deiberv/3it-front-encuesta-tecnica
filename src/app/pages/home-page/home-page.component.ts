import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-page/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}

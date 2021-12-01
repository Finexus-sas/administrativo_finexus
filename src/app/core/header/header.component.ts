import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()
  heading: string;
  @Input()
  titleSearch: string;
  @Output()
  toggleSidenav = new EventEmitter<void>();



  constructor(public auth: AuthService, private router: Router) { }

  closeSession() {
    localStorage.clear();
    this.router.navigate(['/account/signin'])
  }

  get getNameShort() {
    return this.auth.user ? this.buildShortName() : ""
  }

  buildShortName() {
    let names = this.auth.user.nombre.split(' ');
    return names[0][0] + names[1][0]
  }
}

import { Component } from '@angular/core';
import { MenuService } from './menu.service';

import { TranslateService } from '@ngx-translate/core';
/* tslint:disable:max-line-length */
@Component({
  selector: 'app-menu',
  templateUrl: "menu.component.html" ,
  providers: [MenuService]
})
export class MenuComponent {
  currentLang = 'en';

  constructor(
    public menuService: MenuService,
    public translate: TranslateService
  ) {}
}

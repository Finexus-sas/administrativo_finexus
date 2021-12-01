import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BreakpointObserver } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

const SMALL_WIDTH_BREAKPOINT = 991;

export interface Options {
  heading?: string;
  removeFooter?: boolean;
  titleSearch?: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  private _router: Subscription;

  routeOptions: Options;
  isScreenSmall: Observable<boolean>;

  options = {
    lang: 'en',
    theme: 'winter',
    settings: false,
    docked: false,
    boxed: false,
    opened: false
  };

  currentLang = 'en';

  @ViewChild('sidebar', { static: false })
  sidebar;
  @ViewChild('sidemenu', { static: false })
  sidemenu;

  constructor(
    private _element: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private titleService: Title,
    breakpoints: BreakpointObserver
  ) {
    this.isScreenSmall = breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
  }

  ngOnInit(): void {
    this._router = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(async (event: NavigationEnd) => {
        // Scroll to top on view load
        document.querySelector('.main-content').scrollTop = 0;
        if (await this.isScreenSmall.toPromise()) {
          this.sidemenu.close();
        }
        this.runOnRouteChange();
      });

    this.runOnRouteChange();
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    this.route.children.forEach((route: ActivatedRoute) => {
      let activeRoute: ActivatedRoute = route;
      while (activeRoute.firstChild) {
        activeRoute = activeRoute.firstChild;
      }
      this.routeOptions = activeRoute.snapshot.data;
    });

    // if (this.routeOptions.hasOwnProperty('heading')) {
    //   this.setTitle(this.routeOptions.heading);
    // }
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(
      'Stacked - Bootstrap 4 Angular Admin Template | ' + newTitle
    );
  }

  receiveMessage($event) {
    this.options = $event;
  }

  toggleFullscreen(): void {
    const elem = this._element.nativeElement.querySelector('.main-content');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }
}

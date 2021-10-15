import { Component, OnInit } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { RouteService } from '@app/@core/services/route';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  configPath = ROUTER_UTILS.config;
  currentRouteURL$!: Observable<NavigationStart>;

  constructor(private _routeService: RouteService) {}

  ngOnInit(): void {
    this.currentRouteURL$ = this._routeService.currentRouteURL$;
  }

  routeIsHomeURL(currentRouteURL: string): boolean {
    if (currentRouteURL.startsWith('/') && currentRouteURL.endsWith('/')) {
      // this._navbarService.placeholder = 'home';
      return true;
    }
    return false;
  }

  routeIsSettingsURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes(`/${this.configPath.settings.root}`)) {
      // this._navbarService.placeholder = 'Schedule';
      return true;
    }
    return false;
  }

  routeIsTriggerURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes('/trigger')) {
      // this._navbarService.placeholder = 'Trigger';
      return true;
    }
    return false;
  }

  routeIsServerURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes('/server')) {
      // this._navbarService.placeholder = 'Server';
      return true;
    }
    return false;
  }

  routeIsHealthURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes('/health')) {
      // this._navbarService.placeholder = 'Health';
      return true;
    }
    return false;
  }

  routeIsAuthURL(currentRouteURL: string): boolean {
    if (currentRouteURL.startsWith(`/${this.configPath.auth.root}`)) {
      return true;
    }
    return false;
  }

  routeIsUserURL(currentRouteURL: string): boolean {
    if (currentRouteURL.startsWith('/user')) {
      return true;
    }
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

interface BreadcrumbItem {
  label: string;
  routerLink: string;
}

@Component({
  selector: 'perun-web-apps-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = { label: 'Home', routerLink: 'profile' };
  menuItems: BreadcrumbItem[] = [];
  loading: boolean;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.menuItems = [];
      this.createBreadcrumbs(this.activatedRoute.root);
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, routerLink = ''): void {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0 || children[0].snapshot.routeConfig.path === 'service-access') {
      return;
    }

    children.forEach((child) => {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        routerLink += `/${routeURL}`;
      }

      const label = this.translate.instant(
        child.snapshot.data[BreadcrumbsComponent.ROUTE_DATA_BREADCRUMB] as string,
      ) as string;
      if (
        label &&
        (!this.menuItems[this.menuItems.length - 1] ||
          label !== this.menuItems[this.menuItems.length - 1].label)
      ) {
        this.menuItems.push({ label, routerLink });
      }

      return this.createBreadcrumbs(child, routerLink);
    });
  }
}

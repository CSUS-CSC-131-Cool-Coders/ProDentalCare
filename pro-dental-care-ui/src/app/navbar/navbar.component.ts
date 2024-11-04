import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input()
  public isLogin: boolean = false;

  private readonly loginPaths: string[] = ["login", "signup", "forgot-password"];

  private routerSubscription!: Subscription;

  public constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          console.log('Route changed to:', event.urlAfterRedirects);
          for (let i = 0; i < this.loginPaths.length; i++) {
            if (event.urlAfterRedirects.includes(this.loginPaths[i])) {
              this.isLogin = true;
              return;
            }

            this.isLogin = false;
          }
        });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}

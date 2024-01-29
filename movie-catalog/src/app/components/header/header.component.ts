import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public leftSidebar: boolean = false;
  navItems = [
    { label: 'Home', link: '/', icon: 'pi pi-home' },
    { label: 'Movies', link: '/movies', icon: 'pi pi-video' },
    { label: 'TV Shows', link: '/tv', icon: 'pi pi-desktop' },
    { label: 'Genres', link: '/genres', icon: 'pi pi-list' }
  ];
}

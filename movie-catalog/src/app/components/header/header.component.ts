import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public leftSidebar: boolean = false;
  public navItems = [
    { label: 'Home', link: '/', icon: 'pi pi-home' },
    { label: 'Movies', link: '/movie', icon: 'pi pi-video' },
    { label: 'TV Shows', link: '/tv', icon: 'pi pi-desktop' },
    { label: 'Genres', link: '/genre', icon: 'pi pi-list' },
  ];
}

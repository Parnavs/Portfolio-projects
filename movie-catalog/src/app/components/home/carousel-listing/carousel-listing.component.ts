import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-listing',
  templateUrl: './carousel-listing.component.html',
  styleUrls: ['./carousel-listing.component.scss']
})
export class CarouselListingComponent {
  @Input() title!: string;
  @Input() link!: string;
  @Input() items!: any[];
  @Input() isLoading!: boolean;
  @Input() responsiveOptions: any;
}

import { Component } from '@angular/core';

@Component({
    selector: 'ng2cli-price-display',
    templateUrl: './price-display.component.html',
    inputs: ['price']
})
export class PriceDisplayComponent {
    price: Number;
}

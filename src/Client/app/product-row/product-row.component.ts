import { Component } from '@angular/core';
import { Product } from './product.model';

@Component({
    selector: 'ng2cli-product-row',
    templateUrl: './product-row.component.html',
    inputs: ['product'],
    host: {'class': 'item'}
})
export class ProductRowComponent {
    product: Product;
}

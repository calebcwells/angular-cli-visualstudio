import { Component } from '@angular/core';
import { Product } from '../product-row/product.model';

@Component({
    selector: 'ng2cli-product-image',
    templateUrl: './product-image.component.html',
    inputs: ['product'],
    host: { class: 'ui small image' }
})
export class ProductImageComponent {
    product: Product;
}

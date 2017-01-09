import '../assets/images/products/black-shoes.jpg';
import '../assets/images/products/blue-jacket.jpg';
import '../assets/images/products/black-hat.jpg';
import { Component } from '@angular/core';
import { Product } from './product-row/product.model';

@Component({
    selector: 'ng2cli-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    products: Product[];

    constructor() {
        this.products = [
            new Product(
                'MYSHOES',
                'Black Running Shoes',
                './dist/black-shoes.jpg',
                ['Men', 'Shoes', 'Running Shoes'],
                109.99),
            new Product(
                'NEATOJACKET',
                'Blue Jacket',
                './dist/blue-jacket.jpg',
                ['Women', 'Apparel', 'Jackets & Vests'],
                238.99),
            new Product(
                'NICEHAT',
                'A Nice Red Hat',
                './dist/black-hat.jpg',
                ['Men', 'Accessories', 'Hats'],
                29.99)
        ]
    }

    productWasSelected(product: Product): void {
        console.log('Product clicked:', product);
    }
}

import { Component, EventEmitter } from '@angular/core';
import { Product } from '../product-row/product.model';

@Component({
    selector: 'ng2cli-products-list',
    templateUrl: './products-list.component.html',
    inputs: ['productList'],
    outputs: ['onProductSelected']
})
export class ProductsListComponent {
    productList: Product[];
    private currentProduct: Product;

    onProductSelected: EventEmitter<Product>;

    constructor() {
        this.onProductSelected = new EventEmitter();
    }

    clicked(product: Product): void {
        this.currentProduct = product;
        this.onProductSelected.emit(product);
    }

    isSelected(product: Product): boolean {
        if (!product || !this.currentProduct) {
            return false;
        }
        return product.sku === this.currentProduct.sku;
    }
}

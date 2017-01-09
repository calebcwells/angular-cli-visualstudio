import { Component } from '@angular/core';
import { Product } from '../product-row/product.model';

@Component({
    selector: 'ng2cli-product-department',
    templateUrl: './product-department.component.html',
    inputs: ['product']
})
export class ProductDepartmentComponent {
    product: Product;
}

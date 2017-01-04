import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ng2cli-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    names: string[];

    constructor() {
        this.names = ['Caleb', 'Kevin', 'Nathan', 'Joseph'];
    }

    ngOnInit() {
    }

}

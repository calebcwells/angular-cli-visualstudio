import { Component, OnInit, Input } from '@angular/core';
import { Article } from './article.model';

@Component({
    selector: 'ng2cli-article',
    templateUrl: './article.component.html'
    host: {
        class: 'row'
    }
})
export class ArticleComponent implements OnInit {
    @Input() article: Article;

    voteUp() {
        this.article.voteUp();
        return false;
    }

    voteDown() {
        this.article.voteDown();
        return false;
    }

    ngOnInit() {
    }

}

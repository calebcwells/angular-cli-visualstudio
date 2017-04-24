import { browser, element, by } from 'protractor';

export class Ng2CliPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ng2cli-root h1')).getText();
  }
}

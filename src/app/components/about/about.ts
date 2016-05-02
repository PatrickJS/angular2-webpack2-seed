import {Component} from '@angular/core';
import {Http} from '@angular/http';


@Component({
  selector: 'about',
  template: require('./about.html'),
  styles: [
    require('./about.css')
  ],
  providers: [],
  directives: [],
  pipes: []
})
export class About {

  constructor(public http: Http) {

  }

  ngOnInit() {

  }
}

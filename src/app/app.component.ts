import {Component} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Home} from './components/home/home';
import {About} from './components/about/about';
import {RepoBrowser} from './components/repo-browser/repo-browser';

@Component({
  selector: 'app',
  providers: [],
  pipes: [],
  directives: [ ROUTER_DIRECTIVES ],
  styles: [
    require('./app.css')
  ],
  template: require('./app.html'),
})
@RouteConfig([
  {
    path: '/home',
    component: Home,
    name: 'Home',
    useAsDefault: true
  },
  {
    path: '/about',
    name: 'About',
    loader: () => System.import('./components/about/about').then(cmp => cmp.About)
  },
  {
    path: '/github/...',
    component: RepoBrowser,
    name: 'RepoBrowser'
  },
])
export class App {

  constructor() {}

}

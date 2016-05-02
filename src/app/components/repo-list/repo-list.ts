import {Component} from '@angular/core';
import {Github} from '../../services/github';
import {Observable} from 'rxjs/Observable';
import {RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
  selector: 'repo-list',
  template: require('./repo-list.html'),
  styles: [
    require('./repo-list.css')
  ],
  providers: [],
  directives: [ ROUTER_DIRECTIVES ],
  pipes: []
})
export class RepoList {
  repos: Observable<any>;
  constructor(public github: Github, public params: RouteParams) {}

  ngOnInit() {
    this.repos = this.github.getReposForOrg(this.params.get('org'));
  }
}

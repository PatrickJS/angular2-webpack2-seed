import {Component} from '@igorminar/core';
import {RouteParams, ROUTER_DIRECTIVES} from '@igorminar/router';
import {Http} from '@igorminar/http';
import {Github} from '../../services/github';

@Component({
  selector: 'repo-detail',
  template: require('./repo-detail.html'),
  styles: [
    require('./repo-detail.css')
  ],
  providers: [],
  directives: [ ROUTER_DIRECTIVES ],
  pipes: []
})
export class RepoDetail {
  repoDetails = {};
  constructor(public routeParams: RouteParams, public github: Github) {}

  ngOnInit() {
    this.github.getRepoForOrg(this.routeParams.get('org'), this.routeParams.get('name'))
      .subscribe(repoDetails => {
        this.repoDetails = repoDetails;
      });

  }

}

import {bootstrap, Component, Directive, Attribute, ElementRef, View, NgIf, Inject, Observable, ON_PUSH} from 'angular2/angular2';
import {Stats, Profile} from '../../model/core';
import {Actions} from '../../model/actions';

@Component({
  selector: 'main',
  properties: ['stats', 'profile'],
  changeDetection: ON_PUSH
})
@View({
  templateUrl: './components/main/tmp.html?v=<%= VERSION %>',
})
export class Main {
  stats: Stats;
  profile: Profile;

  constructor(public actions: Actions) {}
}
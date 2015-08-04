import {bootstrap, Component, Directive, Attribute, ElementRef, View, NgIf, Inject, Observable, ON_PUSH} from 'angular2/angular2';
import {AppState} from '../../model/core';
import {Actions} from '../../model/actions';
import {Main} from '../main/cmp';
import {Tasks} from '../tasks/cmp';
import {Habit} from '../habit/cmp';

@Component({
  selector: 'router',
  properties: ['m'],
  changeDetection: ON_PUSH
})
@View({
  templateUrl: './components/router/tmp.html?v=<%= VERSION %>',
  directives: [Main, Tasks, Habit, NgIf]
})
export class Router {
  m: AppState;
}
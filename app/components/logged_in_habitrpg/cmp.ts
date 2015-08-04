import {bootstrap, Component, View, NgIf, bind, Inject, Observable, FormBuilder, ON_PUSH} from 'angular2/angular2';

import {Api} from '../../services/api';
import {Actions} from '../../model/actions';
import {AppState} from '../../model/core';
import {appStateProvider} from '../../model/state_transition';
import {KeyRepo} from '../../services/key_repo';
import {Router} from '../router/cmp';
import {Upgrade} from '../shared/upgrade';
import {Menu} from '../menu/cmp';

@Component({
  selector: 'logged-in-habitrpg',
  viewInjector: [
    bind(Api).toFactory(Api.create, [KeyRepo]),
    Actions,
    FormBuilder,
    bind("AppState").toFactory(appStateProvider, [Actions, Api])
  ]
})
@View({
  templateUrl: './components/logged_in_habitrpg/tmp.html?v=<%= VERSION %>',
  directives: [NgIf, Menu, Router]
})
export class LoggedInHabitRPG {
  state: AppState;

  constructor(@Inject("AppState") stateObs: Observable) {
    stateObs.observer({
      next: val => this.state = val
    });
  }
}
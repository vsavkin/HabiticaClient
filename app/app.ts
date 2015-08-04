import {bootstrap, Component, View, NgIf, bind, Inject, Observable, FormBuilder} from 'angular2/angular2';

import {KeyRepo} from './services/key_repo';
import {Login} from './components/login/cmp';
import {LoggedInHabitRPG} from './components/logged_in_habitrpg/cmp';

@Component({
  selector: 'habitrpg',
  viewInjector: [KeyRepo]
})
@View({
  templateUrl: 'app.html?v=<%= VERSION %>',
  directives: [NgIf, Login, LoggedInHabitRPG]
})
class HabitRPG {
  constructor(private key: KeyRepo) {}
}


bootstrap(HabitRPG);
import {bootstrap, Component, View, NgIf, bind, Inject, Observable, FormBuilder, ON_PUSH} from 'angular2/angular2';

import {Actions} from '../../model/actions';
import {KeyRepo} from '../../services/key_repo';
import {Upgrade} from '../shared/upgrade';

@Component({
  selector: 'menu',
  properties: ['title'],
  changeDetection: ON_PUSH
})
@View({
  templateUrl: './components/menu/tmp.html?v=<%= VERSION %>',
  directives: [Upgrade]
})
export class Menu {
  title: string;
  constructor(private actions: Actions, private key: KeyRepo) { }

  logOut() {
    this.key.clearKey();
  }
}
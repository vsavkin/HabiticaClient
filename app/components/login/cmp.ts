import {Component, View, NgFor, formDirectives, ControlGroup, Control, FormBuilder, ON_PUSH} from 'angular2/angular2';
import {Actions} from '../../model/actions';
import {Key, KeyRepo} from '../../services/key_repo';
import {Upgrade} from '../shared/upgrade';

@Component({
  selector: 'login',
  changeDetection: ON_PUSH
})
@View({
  templateUrl: './components/login/tmp.html?v=<%= VERSION %>',
  directives: [formDirectives, Upgrade]
})
export class Login {
  constructor(private apiKey: KeyRepo) {}

  saveKey(key: Key) {
    this.apiKey.setKey(key);
  }
}

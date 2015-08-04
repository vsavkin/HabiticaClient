import {Component, View, NgFor, formDirectives, ControlGroup, Control, FormBuilder, ON_PUSH} from 'angular2/angular2';
import {Task} from '../../model/core';
import {Actions} from '../../model/actions';
import {Upgrade} from '../shared/upgrade';

@Component({
  selector: 'habit',
  properties: ['m'],
  changeDetection: ON_PUSH
})
@View({
  templateUrl: './components/habit/tmp.html?v=<%= VERSION %>',
  directives: [formDirectives, Upgrade]
})
export class Habit {
  task: Task;
  form: ControlGroup;
  constructor(private actions: Actions, private fb: FormBuilder) {}

  set m(t: Task) {
    this.task = t;
    this.form = this.fb.group({
      text: [t.text],
      up: [t.up],
      down: [t.down]
    });
  }

  swapUp() {
    const up:any = this.form.find("up");
    up.updateValue(!up.value);
  }

  swapDown() {
    const down:any = this.form.find("down");
    down.updateValue(!down.value);
  }

  saveHabit() {
    this.actions.saveHabit(this.task.id, this.form.value);
  }
}

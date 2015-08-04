import {bootstrap, Component, Directive, Attribute, ElementRef, View, NgFor, NgIf, Inject, Observable, ON_PUSH} from 'angular2/angular2';
import {Task, shouldRepeatToday} from '../../model/core';
import {Actions} from '../../model/actions';

@Component({
  selector: 'tasks',
  properties: ['m', 'mode'],
  changeDetection: ON_PUSH
})
@View({
  templateUrl: './components/tasks/tmp.html?v=<%= VERSION %>',
  directives: [NgFor, NgIf]
})
export class Tasks {
  m: List<Task>;
  mode: string;

  constructor(public actions: Actions) {}

  selectTask(task: Task) {
    if (this.mode === "habit") this.actions.selectHabit(task);
    if (this.mode === "daily") this.actions.selectDaily(task);
    if (this.mode === "todo") this.actions.selectTodo(task);
  }

  shouldRepeatToday(task: Task): boolean {
    return shouldRepeatToday(task);
  }

  taskUp(task: Task) {
    this.actions.taskUp(task);
  }

  taskDown(task: Task) {
    this.actions.taskDown(task);
  }

  isOptional(task: Task) {
    return task.type === 'daily' && (!shouldRepeatToday(task) || task.completed);
  }
}
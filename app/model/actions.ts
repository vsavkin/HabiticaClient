import {EventEmitter} from 'angular2/angular2';
import {Task} from './core';

export enum ActionType { GotoMain, GotoHabits, SelectHabit, SaveHabit, GotoDailys, SelectDaily, GotoTodos, SelectTodo, TaskUp, TaskDown, ResetState, Refresh }

export class Actions {
	emitter = new EventEmitter();

	// navigation

	gotoMain() {
		this._emit({ type: ActionType.GotoMain });
	}

	gotoHabits() {
		this._emit({ type: ActionType.GotoHabits });
	}

	selectHabit(task: Task) {
		this._emit({ type: ActionType.SelectHabit, taskId: task.id });
	}

	gotoDailys() {
		this._emit({ type: ActionType.GotoDailys });
	}

	selectDaily(task: Task) {
		this._emit({ type: ActionType.SelectDaily, taskId: task.id });
	}

	gotoTodos() {
		this._emit({ type: ActionType.GotoTodos });
	}

	selectTodo(task: Task) {
		this._emit({ type: ActionType.SelectTodo, taskId: task.id });
	}


	// updates

	saveHabit(taskId: string, newValue: any) {
		this._emit({ type: ActionType.SaveHabit, taskId: taskId, data: newValue });
	}

	taskUp(task: Task) {
		this._emit({ type: ActionType.TaskUp, taskId: task.id });
	}

	taskDown(task: Task) {
		this._emit({ type: ActionType.TaskDown, taskId: task.id });
	}

	resetState(data) {
		this._emit({ type: ActionType.ResetState, data: data });
	}

	refresh() {
		this._emit({ type: ActionType.Refresh });
	}

	// TODO use a notification instead
	reportError(error, state) {
		console.log("error", error, state);
	}

	_emit(action) { this.emitter.next(action); }
}
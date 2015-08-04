import {EventEmitter} from 'angular2/angular2';
import {Record, List, Map, fromJS} from 'immutable';
import {Actions, ActionType} from './actions';
import {Api, TaskData, StatsData, ProfileData, Data} from '../services/api';
import {appState, profile, stats, task, AppState, goto, findHabit, Task, findDaily, findTodo} from './core';

export function appStateProvider(actions: Actions, api: Api): EventEmitter {
  const res = new EventEmitter();

	api.data().then(data => {
		var state = goto(createStateFromData(data), "main");

		// set initial state
		setTimeout(() => res.next(state));

		// log state changes
		res.observer({ next: s => console.log("state transition:", s.toJS()) });

		// reduce emitter events
		actions.emitter.observer({
			next: action => {
				state = stateTransition(state, api, actions, action);
				res.next(state);
			}
		});
	});

	return res;
}

function createStateFromData(data: Data): AppState {
	const habits = fromJS(data.habits.map(task));
	const dailys = fromJS(data.dailys.map(task));
	const todos = fromJS(data.todos.filter(t => t.completed === false).map(task));
	return appState(profile(data.profile), stats(data.stats), habits, todos, dailys);
}

/**
 * The whole applicaiton is modeled using one reduce function.
 */
function stateTransition(state: AppState, api: Api, actions: Actions, action: any): any {
	const stateMap: Map<any, any> = <any> state;

	switch (action.type) {
		// navigation

		case ActionType.GotoMain:
			return goto(stateMap.set("selectedTask", null), "main");

		case ActionType.GotoHabits:
			return goto(stateMap.set("selectedTask", null), "habits");

		case ActionType.SelectHabit:
			const habitId = action.taskId;
			return goto(stateMap.set("selectedTask", findHabit(state, habitId)), "showHabit");

		case ActionType.GotoDailys:
			return goto(stateMap.set("selectedTask", null), "dailys");

		case ActionType.SelectDaily:
			const dailyId = action.taskId;
			return goto(stateMap.set("selectedTask", findDaily(state, dailyId)), "showDaily");

		case ActionType.GotoTodos:
			return goto(stateMap.set("selectedTask", null), "todos");

		case ActionType.SelectTodo:
			const todoId = action.taskId;
			return goto(stateMap.set("selectedTask", findTodo(state, todoId)), "showTodo");


		// updates

		case ActionType.SaveHabit:
			const saveHabitId = action.taskId;
			const saveHabitData = action.data;

			const oldHabit = findHabit(state, saveHabitId);
			const index = state.habits.indexOf(oldHabit);
			const updatedHabit = asMap(oldHabit).merge(saveHabitData);

			api.saveHabit(saveHabitId, updatedHabit.toJS()).then(error => {
				actions.reportError(error, state);
			});

			return goto(stateMap.setIn(["habits", index], updatedHabit).set("selectedTask", null), "habits");

		case ActionType.TaskUp:
			const taskUpId = action.taskId;
			api.taskUp(taskUpId).then(_ => actions.refresh());
			return state;

		case ActionType.TaskDown:
			const taskDownId = action.taskId;
			api.taskDown(taskUpId).then(_ => actions.refresh());
			return state;

		case ActionType.ResetState:
			const data = action.data;
			const newState = createStateFromData(data);
			return stateMap.merge({
				profile: newState.profile,
				stats: newState.stats,
				habits: newState.habits,
				todos: newState.todos,
				dailys: newState.dailys
			});

		case ActionType.Refresh:
			api.fetchData().then(data => actions.resetState(data));
			return state;

		default:
			throw `Unknown acton ${action}`;
	}
}

function asMap(t: Task): Map<any, any> {
	return <any>t;
}
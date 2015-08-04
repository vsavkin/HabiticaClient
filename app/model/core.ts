/// <reference path="../../node_modules/immutable/dist/immutable.d.ts" />

import {EventEmitter} from 'angular2/angular2';
import {Actions, ActionType} from './actions';
import {Api, TaskData, StatsData, ProfileData, Data} from '../services/api';
import {Record, List, Map, fromJS} from 'immutable';

// Model Schema

export interface Repeat {
	s: boolean;
	su: boolean;
	m: boolean;
	t: boolean;
	w: boolean;
	th: boolean;
	f: boolean;
}

export interface Task {
	id: string;
	dateCreated: string;
	text: string;
	notes: string;
	value: number;
	priority: number;
	attributes: string;
	type: string;
	completed: boolean;
	up: boolean;
	down: boolean;
	repeat: Repeat;
}

export interface Stats {
	class: string;
	con: number;
	exp: number;
	gp: number;
	hp: number;
	maxHealth: number;
	mp:number;
	maxMP: number;
	toNextLevel: number;
}

export interface Profile {
	name: string;
}

export interface AppState {
	profile: Profile,
	stats: Stats,
	habits: List<Task>;
	dailys: List<Task>;
	todos: List<Task>;
	selectedTask: Task;
	newTask: Task;
	screen: string;
	title: string;
}


// Model Records

const TaskRec = Record({
	id: null,
	dateCreated: null,
	text: null,
	notes: null,
	value: null,
	priority: null,
	attributes: null,
	type: null,
	up: null,
	down: null,
	completed: null,
	repeat: null
});

const StatsRec = Record({
	class: null,
	con: null,
	exp: null,
	gp: null,
	hp: null,
	maxHealth: null,
	mp: null,
	maxMP: null,
	toNextLevel: null
});

const ProfileRec = Record({
	name: null
});

const AppStateRec = Record({
	profile: null,
	stats: null,
	habits: null,
	todos: null,
	dailys: null,
	selectedTask: null,
	newTask: null,
	screen: null,
	title: null
});


// Model Factories

export function task(task: TaskData): Task { return <any>new TaskRec(<any>task); }
export function stats(stats: StatsData): Stats { return <any>new StatsRec(<any>stats); }
export function profile(profile: ProfileData): Profile { return <any>new ProfileRec(<any>profile); }
export function appState(profile: Profile, stats: Stats, habits: List<Task>, todos: List<Task>, dailys: List<Task>): AppState {
	return <any>new AppStateRec({ profile, stats, habits, todos, dailys });
}


// Helpers

const titles = {
	main: "Main",
	habits: "Habits",
	dailys: "Dailys",
	todos: "Todos",
	showHabit: 'Habit',
	showDaily: 'Daily',
	showTodo: 'Todo'
};

export function goto(stateMap: Map<any, any>|AppState, screen: string) {
	const m = <any> stateMap;
	return m.set("screen", screen).set("title", titles[screen]);
}

export function findHabit(state: AppState, id: string): Task {
	return state.habits.filter(h => h.id === id).first();
}

export function findDaily(state: AppState, id: string): Task {
	return state.dailys.filter(h => h.id === id).first();
}

export function findTodo(state: AppState, id: string): Task {
	return state.todos.filter(h => h.id === id).first();
}

export function shouldRepeatToday(task: Task): boolean {
	var d = new Date().getDay();

	switch(d) {
		case 0: return task.repeat.su;
		case 1: return task.repeat.m;
		case 2: return task.repeat.t;
		case 3: return task.repeat.w;
		case 4: return task.repeat.th;
		case 5: return task.repeat.f;
		case 6: return task.repeat.s;
		default: throw new Error("Unsupported day!");
	}
}
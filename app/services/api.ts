import {Injectable} from 'angular2/angular2';
import {KeyRepo, Key} from './key_repo';

declare var fetch: any; // make TS happy

// API Schema

export interface TaskData {
	id: string;
	dateCreated: string;
	text: string;
	notes: string;
	value: number;
	priority: number;
	attributes: string;
	type: string;
	completed: boolean;
	repeat: any;
}

export interface StatsData {
	class: string;
	con: number;
	exp: number;
	gp: number;
	hp: number;
	maxHealth: number;
	mp: number;
	maxMP: number;
	toNextLevel: number;
}

export interface ProfileData {
	name: string;
}

export interface Data {
	profile: ProfileData;
	stats: StatsData;
	habits: TaskData[];
	dailys: TaskData[];
	todos: TaskData[];
}

@Injectable()
export class Api {
	constructor(private key: Key) { }

	static create(habiRpgKey: KeyRepo) { return new Api(habiRpgKey.getKey()); }

	data(): Promise<Data> {
		return this.readDataFromLocalStorage().catch(_ => this.fetchData());
	}

	fetchData(): Promise<Data> {
		return this.request("user").then(d => {
			this.saveData(d);
			return d;
		});
	}

	saveHabit(taskId: string, payload): Promise<any> {
		return this.request(`user/tasks/${taskId}`, 'PUT', JSON.stringify(payload));
	}

	taskUp(taskId: string): Promise<any> {
		return this.request(`user/tasks/${taskId}/up`, 'POST');
	}

	taskDown(taskId: string): Promise<any> {
		return this.request(`user/tasks/${taskId}/down`, 'POST');
	}

	private readDataFromLocalStorage(): Promise<Data> {
		var data = JSON.parse(localStorage.getItem("habitRPG_Data"));
		if (data) {
			return Promise.resolve(data);
		} else {
			return Promise.reject(null);
		}
	}

	private saveData(data: Data) {
		localStorage.setItem("habitRPG_Data", JSON.stringify(data));
	}

	private request(uri: string, method: string = "GET", body: string = null): Promise<any> {
		const url = `https://habitrpg.com/api/v2/${uri}`;
		return fetch(url, {
			method,
			body,
			headers: { 'x-api-user': this.key.userId, 'x-api-key': this.key.apiToken }
		}).then(r => r.json());
	}
}
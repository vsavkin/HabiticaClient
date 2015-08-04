export interface Key {
  userId: string;
  apiToken: string;
}

export class KeyRepo {
  hasKey():boolean {
    return this.getKey() !== null;
  }

  setKey(key: Key) {
    localStorage.setItem("habitRPG_Key", JSON.stringify(key));
  }

  getKey(): Key {
    return JSON.parse(localStorage.getItem("habitRPG_Key"));
  }

  clearKey() {
    localStorage.clear();
  }
}
// src/db/SettingsDB.js
import Dexie from 'dexie';

class SettingsDB extends Dexie {
    constructor() {
        super("SettingsDB");
        this.version(1).stores({
            settings: 'key, value'
        });
    }

    async saveSetting(key: any, value: any) {
        return this.table("settings").put({ key, value });
    }

    async getSetting(key : any) {
        return (await this.table("settings").get(key))?.value;
    }
}

export const db = new SettingsDB();

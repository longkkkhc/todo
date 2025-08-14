declare class Database {
    static instance: Database;
    constructor();
    connect(type?: string): void;
    static getIntance(): Database;
}
declare const intanceMongo: Database;
export default intanceMongo;

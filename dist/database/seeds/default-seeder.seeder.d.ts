import { Connection } from 'typeorm';
export default class Seeder {
    static run(connection: Connection): Promise<void>;
}

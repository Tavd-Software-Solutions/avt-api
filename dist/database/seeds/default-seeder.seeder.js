"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source_entity_1 = require("../../sources/entities/source.entity");
const tag_entity_1 = require("../../tags/entities/tag.entity");
const user_entity_1 = require("../../users/entities/user.entity");
class Seeder {
    static async run(connection) {
        const userRepository = connection.getRepository(user_entity_1.User);
        const tagRepository = connection.getRepository(tag_entity_1.Tag);
        const sourceRepository = connection.getRepository(source_entity_1.Source);
        const default_user = {
            email: 'default_user@gmail.com',
            name: 'admin',
            password: 'admin',
            login: 'admin',
            coin: 'BRL',
        };
        if ((await userRepository.find()).length === 0) {
            await userRepository.insert(default_user);
        }
        const default_tag = {
            name: 'Tag Deafult',
            userId: null,
        };
        if ((await tagRepository.find()).length === 0) {
            await tagRepository.insert(default_tag);
        }
        const default_source = {
            name: 'Source Default',
            userId: null,
        };
        if ((await sourceRepository.find()).length === 0) {
            await sourceRepository.insert(default_source);
        }
    }
}
exports.default = Seeder;
//# sourceMappingURL=default-seeder.seeder.js.map
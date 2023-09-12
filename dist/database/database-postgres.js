"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabasePostgres = void 0;
const crypto_1 = require("crypto");
const db_1 = require("./db");
class DatabasePostgres {
    list(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let videos;
            if (search) {
                const queryResult = yield (0, db_1.sql) `select * from videos where title ilike ${'%' + search + '%'}`;
                videos = queryResult.map((row) => ({
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    duration: Number(row.duration)
                }));
            }
            else {
                const queryResult = yield (0, db_1.sql) `select * from videos`;
                videos = queryResult.map((row) => ({
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    duration: Number(row.duration)
                }));
            }
            return videos;
        });
    }
    create(video) {
        return __awaiter(this, void 0, void 0, function* () {
            const videoId = (0, crypto_1.randomUUID)();
            const { title, description, duration } = video;
            yield (0, db_1.sql) `insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`;
        });
    }
    update(id, video) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, duration } = video;
            yield (0, db_1.sql) `update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.sql) `delete from videos WHERE id = ${id}`;
        });
    }
}
exports.DatabasePostgres = DatabasePostgres;

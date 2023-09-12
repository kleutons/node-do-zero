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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
// import { DatabaseMemory } from "../database/database-memory";
const database_postgres_1 = require("../database/database-postgres");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = (0, fastify_1.fastify)();
const portServer = process.env.PORT ? Number(process.env.PORT) : 3001; // Escolha a porta que desejar
//const database = new DatabaseMemory();
const database = new database_postgres_1.DatabasePostgres();
server.get('/', () => {
    return 'Hello World';
});
// GET 
server.get('/videos', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    const videos = yield database.list(search);
    return videos;
}));
// POST http://localhost:3001/videos
server.post('/videos', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    yield database.create(body);
    return reply.status(201).send();
}));
// Router Parameter http://localhost:3001/videos/id
server.put('/videos/:id', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const videoId = req.params.id;
    const body = req.body;
    yield database.update(videoId, body);
    return reply.status(204).send();
}));
// DELETE 
server.delete('/videos/:id', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const videoId = req.params.id;
    yield database.delete(videoId);
    return reply.status(204).send();
}));
server.listen({
    port: portServer
}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor iniciado na porta ${portServer} Acesse: http://localhost:${portServer}`);
});

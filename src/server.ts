import { FastifyRequest, fastify } from "fastify";
// import { DatabaseMemory } from "../database/database-memory";
import { DatabasePostgres } from "../database/database-postgres";
import { TypeVideo, idRouteParams, searchQueryParams } from "../types/video";
import dotenv from 'dotenv';

dotenv.config();

const server = fastify();
const portServer = process.env.PORT ? Number(process.env.PORT) : 3001; // Escolha a porta que desejar


//const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.get('/', () => {
    return 'Hello World'
})

// GET 
server.get('/videos', async (req: FastifyRequest<{ Querystring: searchQueryParams }>, reply) => {
    
    const search: string | undefined = req.query.search;

    const videos = await database.list(search);
    return videos;
});

// POST http://localhost:3001/videos
server.post('/videos', async (req, reply) => {

    const body = req.body as TypeVideo;

    await database.create(body)

    return reply.status(201).send();
});


// Router Parameter http://localhost:3001/videos/id
server.put('/videos/:id', async (req: FastifyRequest<{ Params: idRouteParams }>, reply) => {
    const videoId: string = req.params.id;
    const body = req.body as TypeVideo;

    await database.update(videoId, body);

    return reply.status(204).send();
});


// DELETE 
server.delete('/videos/:id', async (req: FastifyRequest<{ Params: idRouteParams }>, reply) => {
    const videoId: string = req.params.id;

    await database.delete(videoId);

    return reply.status(204).send();
});

server.listen({
    port: portServer
}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Servidor iniciado na porta ${portServer} Acesse: http://localhost:${portServer}`);
})
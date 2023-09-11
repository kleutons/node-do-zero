import { FastifyRequest, fastify } from "fastify";
import { DatabaseMemory } from "../database/database-memory";
import { TypeVideo, idRouteParams, searchQueryParams } from "../types/video";

const server = fastify();
const port = 3001; // Escolha a porta que desejar


const database = new DatabaseMemory();

server.get('/', () => {
    return 'Hello World'
})

// GET 
server.get('/videos', (req: FastifyRequest<{ Querystring: searchQueryParams }>, reply) => {
    
    const search: string | undefined = req.query.search;

    const videos = database.list(search);
    return videos;
});

// POST http://localhost:3001/videos
server.post('/videos', (req, reply) => {

    const body = req.body as TypeVideo;

    database.create(body)

    return reply.status(201).send();
});


// Router Parameter http://localhost:3001/videos/id
server.put('/videos/:id', (req: FastifyRequest<{ Params: idRouteParams }>, reply) => {
    const videoId: string = req.params.id;
    const body = req.body as TypeVideo;

    database.update(videoId, body);

    return reply.status(204).send();
});


// DELETE 
server.delete('/videos/:id', (req: FastifyRequest<{ Params: idRouteParams }>, reply) => {
    const videoId: string = req.params.id;
    database.delete(videoId);

    return reply.status(204).send();
});

server.listen({
    port: port
}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Servidor iniciado na porta ${port} Acesse: http://localhost:${port}`);
})
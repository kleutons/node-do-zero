import { fastify } from "fastify";

const server = fastify();
const port = 3001; // Escolha a porta que desejar

server.get('/', () => {
    return 'Hello World'
})

server.listen({
    port: port
}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Servidor iniciado na porta ${port} Acesse: http://localhost:${port}`);
})
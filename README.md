# Projeto Node do Zero Versão 18 
1. Primeiro crie uma pasta para o seu projeto e acesse-a pelo terminal, exemplo:
```dos
mkdir node-do-zero
```

2. Inicialize um projeto Node.js executando:
Isso criará um arquivo package.json com as informações do seu projeto.
```npm
npm init -y
```

3. Crie uma pasta chamada ‘src’ e dentro  um arquivo JavaScript  (por exemplo, server.js) para iniciar seu servidor e importe o Express:

```
import { createServer } from 'node:http'
const port = 3001; // Escolha a porta que desejar

const server = createServer((req, res) => {
    console.log(`Servidor iniciado na porta ${port} http://localhost:${port}`);
    res.write('Servidor iniciado');
    return res.end();   
})

server.listen(port);
```

4. Para iniciar o servidor, altere o package.json:
```
"scripts": {
  ...
  "dev": "node --watch --no-warnings src/server.js"
  },
```
- Após isso Iniciar como desenvolvimento:

```npm
npm run dev
```

## Instalando o fastify - Micro Framework
```npm
npm i fastify
```

- Altere toda a configuração do arqivo server.js:
```
import { fastify } from "fastify";

const server = fastify();
const port = 3001; // Escolha a porta que desejar

server.get('/', () => {
    return 'Hello World'
})

server.listen({
    port: port
}, () => {
    console.log(`Servidor iniciado na porta ${port} Acesse: http://localhost:${port}`);
})
```

## Usando Fastify com TypeScript:
1. Crie um novo projeto npm, instale o Fastify e instale os tipos typescript e node.js como dependências de pares:
```
npm init -y
npm i fastify
npm i -D typescript @types/node
```

2. Adicione as seguintes linhas à "scripts"seção do package.json:
```
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "start": "node index.js"
  }
}
```

3. Inicialize um arquivo de configuração TypeScript:
```
npx tsc --init
```

4. Altere toda a configuração do arqivo server.ts:
```
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
```

5. Remover do package.json os type module, e mudar o run dev
```
  "type": "module", // remover
   "dev": "ts-node-dev src/server.ts", // alterar
```
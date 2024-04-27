# Encurtador de Links

Este projeto é um encurtador de links desenvolvido em TypeScript, permitindo aos usuários encurtar URLs para facilitar o compartilhamento e gerenciamento. Ele utiliza TypeScript para maior segurança e clareza no código, e oferece duas formas principais de execução: diretamente via `ts-node-dev` para desenvolvimento e através de arquivos JavaScript transpilados para produção.

## Pré-Requisitos

Antes de começar, você precisará ter instalado em sua máquina as seguintes ferramentas:
- [Node.js](https://nodejs.org/en/) (`npm`) v18.18.2
- [Docker](https://www.docker.com/) (opcional, para rodar o banco de dados)

## Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/rogergbrito/link_shortener.git
   cd link_shortener

   ou via SSH:

   git clone git@github.com:rogergbrito/link_shortener.git
   cd link_shortener

2. Instale as dependências e execute o seguinte comando no diretório do projeto para instalar as dependências necessárias:

    ```bash
    npm install

3. Transpilação do TypeScript (opcional para produção)Antes de rodar o projeto em produção, é necessário transpilar o código TypeScript para JavaScript. Isso pode ser feito através do seguinte comando:

      ```bash
      npx tsc

Esse comando irá gerar os arquivos JavaScript transpilados no diretório dist/.

## Configuração das variáveis de ambiente

Antes de executar o projeto, você precisará configurar as seguintes variáveis de ambiente no seu .env: (existe um .env.example no projeto)

- DATABASE_URL=example_database_url

- TOKEN_SECRET=example_token_secret

- DOMAIN_URL=example_domain_url


Execute o seguinte comando para aplicar as migrações do banco de dados:

```
npx prisma migrate dev
```

## Executando o Banco de Dados com Docker Compose

Se você preferir utilizar o Docker para rodar o banco de dados, pode utilizar o arquivo docker-compose.yml fornecido no projeto. Execute o seguinte comando para subir o banco de dados:

```
docker-compose up -d
```

Este comando iniciará o banco de dados em um container Docker, tornando-o acessível na URL especificada no seu arquivo .env.


## Executando o Projeto para Desenvolvimento

Para rodar o projeto em modo de desenvolvimento, utilize:

  ```
  npm run dev
  ```


Esse comando irá iniciar o servidor usando ts-node-dev, que compila seu TypeScript em tempo real e reinicia automaticamente o servidor quando arquivos são modificados.


## Para produção

Após a transpilação, você pode executar o projeto em produção através do comando:

  ```
  npm start
  ```

Esse comando irá executar a versão JavaScript do seu projeto que está no diretório dist/.


## Funcionalidades

- Encurtamento de URLs: Os usuários podem encurtar URLs para uma versão mais curta e gerenciável.

- Gerenciamento de URLs: Os usuários podem visualizar e gerenciar URLs que foram encurtadas.

- Contador de Acessos: Cada URL encurtada pode registrar quantas vezes foi acessada.

- Documentação (Swagger) da aplicação na rota "/api/docs"
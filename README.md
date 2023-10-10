# Setup - Avt Wallet API

## Descrição

Avt Wallet API with [Nest](https://github.com/nestjs/nest) framework repository.

## Pré requisitos

```bash
* docker
* node versão 18.16.1 ou superior
```

## Primeiros passos

Instalar o yarn

```bash
$ npm install -g yarn
```

Instalar as dependências do projeto

```bash
$ yarn
```

Criar o arquivo .env do projeto

```bash
$ cp .env.example .env
```

Rodar o banco de dados localmente com o docker compose

```bash
$ docker compose up db -d
```

Atualizar o banco de dados de acordo com o prisma

```bash
$ npx prisma db push
```

## Rodando a API

```bash
$ yarn start:dev
```

## Database

Criar os tipos do prisma para o app

```bash
$ npx prisma generate --schema ./prisma/schema.prisma
```

Acessar o banco via navegador

```bash
$ npx prisma studio
```

Criar migration

```bash
$ npx prisma migrate dev
```

Atualizar o schema do Prisma com base no banco de dados

```bash
$ prisma db pull
```

Enviar o schema do Prisma para o banco de dados

```bash
$ prisma db push
```

## Docker

Para buildar o projeto

Abra um terminal na pasta do projeto e digite o comando:

```bash
* docker build --tag "api_avtwallet" .
```

## License

Nest is [MIT licensed](LICENSE).

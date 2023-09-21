# Setup - Avt Wallet API

## Descrição

Avt Wallet API with [Nest](https://github.com/nestjs/nest) framework repository.

## Pré requisitos

```bash
* docker
* node versão 18.16.1 ou superior
```

## Comandos iniciais

```bash
$ npm install -g yarn
$ yarn
$ docker-compose up -d
```

## Rodando a API

```bash
$ yarn start:dev
```

## Database

Acessar o banco via navegador

```bash
$ prisma studio
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

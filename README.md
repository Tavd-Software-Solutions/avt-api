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
# normal
$ npm install -g yarn
$ yarn
$ docker volume create --name=api_avtwallet
$ docker-compose up -d
```

## Rodando a API

```bash
$ yarn start:dev
```

## PgAdmin4

Para se conectar ao banco via PgAdmin4

```bash
* Acessar o pg admin na porta -> http://localhost:5050
* Botão direito em "Servers" -> "Register" -> "Server..."
```

No pop-up que abrir:

```bash
* Aba General:
 - "Name" -> não importa
* Aba Connection:
 - "Host name/addres" -> 172.17.0.1 (É o ip do gateway entre o container do docker e o pc host)
 - Username -> "admin"
 - Password -> "postgres"
```

## Docker

Para buildar o projeto

Abra um terminal na pasta "api" e digite o comando:

```bash
* docker build --tag "api_avtwallet" .
```

Obs: importante validar se no arquivo docker-compose.yaml, no volume da api e do app, os atributos "image:"</br>
estão com os valores corretos. Os valores corretos serão iguais os valores digitados de "--tag" nos comandos de </br>
builds alteriores. Segundo o exemplo: "api_avtWallet:latest". Passar a versão como "lastest" é necessário, poís como não foi</br>
especificado uma versão na hora do build o default é pegar a versão "latest"

Depois de ter buildado a imagem o que resta é rodar o projeto. Para isso navegue para a pasta raiz do projeto </br>
e digite:

```bash
* docker-compose up -d
```

## License

Nest is [MIT licensed](LICENSE).

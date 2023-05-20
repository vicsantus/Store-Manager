# Boas-vindas ao repositório do Projeto Store Manager!

## Contextualizando

É um sistema de gerenciamento de vendas no formato dropshipping em que é possível criar, visualizar, deletar e atualizar produtos e vendas. É utilizado o banco de dados MySQL para a gestão de dados. Além disso, a API é RESTful.

## Link da aplicação funcionando no Railway

Ao clicar no link você pode adicionar as rotas expecificas seguindo o padrão de rotas que você encontra ao final desse README.

https://store-manager-backend-production.up.railway.app

## Instalação

Instalação do projeto

```bash
  git clone git@github.com:vicsantus/Store-Manager.git
  cd Store-Manager
  docker compose up -d
  npm run i && npm start
```

Após a instalação você pode entrar no seu navegador em **`localhost:3000`**, e dali usar as rotas do backend.
Para eliminar os containers após o uso, rode `docker compose down` na raiz do projeto.

## Funcionalidades e stacks

- Feito em Javascript
- RESTful
- Extensível
- CRUD completo
- MySQL (não foi utilizado ORM. Feito direto em SQL)
- NodeJS
- Express
- Docker
- Mocha / Chai / Sinon
- TDD e DDD no testes

## Rotas

Você pode encontrar nomes, ids (ids são números) e querys validas dentro do arquivo seed.sql na raiz do projeto.

- get '/products'
- get '/products/search?q=Martelo' (Em "Martelo" você pode trocar para um produto valido que deseja encontrar)
- get '/products/:id'
- post '/products' (corpo da requisição {"name": "Um nome valido"})
- put '/products/:id' (corpo da requisição {"name": "Um nome valido"})
- delete '/products/:id'

---

- get '/sales'
- get '/sales/:id'
- post '/sales' (corpo da requisição [{"productId": 1, "quantity": 1}, {"productId": 2, "quantity": 5}])
- put '/sales/:id' (corpo da requisição [{"productId": 1, "quantity": 1}, {"productId": 2, "quantity": 5}])
- delete '/sales/:id'

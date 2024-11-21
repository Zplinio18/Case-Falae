# Come Aê - Programe sua refeição

Este site foi criado a fins de avaliação para o processo seletivo de estágio da empresa falaê.

Nesta documentação está o passo a passo de como configurar o projeto para uma boa usabilidade, aproveitando todas as funcionalidades do mesmo.


## Configurando o servidor back-end e banco de dados

O projeto foi programado utilizando PrismaORM e MySQL. Depois de instalar e configurar um banco de dados para o projeto no MySQL em sua maquina, siga os seguintes passos:

- Crie um arquivo .env na pasta "backend" e coloque sua URL de conexao ao banco de dados: 

```bash
  DATABASE_URL="mysql://root:senha@host:porta/bancoDeDados"
```

- Na pasta backend instale as dependências necessarias com:

```bash
#backend
  npm install
```

- Agora é hora de migrar o schema do Prisma para seu banco de dados

```bash
#backend
  npx prisma generate dev
  npx prisma db push
```
- Por fim use o comando para ligar o servidor backend: 
```bash
#backend
  npm run dev
```


<p><strong>O QUE FAZER ANTES DE SEGUIR ADIANTE :</strong></p>

No arquivo `requiredRequests.http` existe uma requisição para a criação do admin que você pode fazer através do próprio arquivo com a extensão RESTCLIENT, com Postman ou outra plataforma de envio de requisições.

Estas requisições são usadas para criar um usuário admin e adicionar produtos ao banco de dados.

A primeira requisição é obrigatória pois nao é possivel criar um admin pelo frontend por questoes de segurança.



## Configurando o front-end

Para o front-end, foi utilizado  Vite, React, Typescript, Tailwind e bibliotecas. Entre na pasta "frontend" e siga os seguintes passos:

- Instale as dependencias:

```bash
#frontend
  npm install
```

- Com o servidor backend rodando ligue o servidor frontend:
```bash
#frontend
  npm run dev
```

E pronto! Se você seguiu os passos corretamente o projeto estará rodando no endereço http://localhost:5173.

## O que você pode fazer nessa aplicação?

Nesta aplicação você é capaz de simular como é o fluxo de funcionamento de um restaurante virtual, nele você tem duas entidades principais: 

### Usuário comum:

Ao registrar-se no restaurante você é capaz de montar um carrinho de compras com os produtos de seu interesse e acompanhar o pedido até a chegada do mesmo. Resumidamente os endpoints são:

- Acesso à produtos -    `GET/api/products/`
- Registro de usuario -   `POST/api/auth/register`
- Login de usuario -   `POST/api/auth/login`
- Realização de pedidos  -  `POST/api/auth/login`
- Acompanhamento de pedidos -   `GET/api/orders/:id`

### Administrador do restaurante:

Possui todas as funcionalidades do usuario comum porém ele tem algo a mais. Acesso a tela de administrador na rota /admin, e alem disso ele possui um Id que passa pelo midleware de autorização de rotas, elas são:

- Criação de produtos - `POST/api/products/`
- Atualização de produtos - `PUT/api/products/:id`
- Exclusão de produtos - `DELETE/api/products/:id`
- Acesso a todos os pedidos - `POST/api/orders/allOrders`
- Mudança de status do pedido - `PUT/api/orders/:id`

## Diferenciais do Projeto

Neste projeto priorizei:
- Segurança em rotas com middlewares e hashing de senhas.
- Tratamento rigoroso em tipagem de variaveis, tanto no back-end quanto no front-end
- Organização de arquivos e componentes
- Otimização de fluxo com uso do AppProvider e LocalStorage
- Interface responsiva para mobile
- Interface amigável e intuitiva

## Ideias a serem implementadas futuramente 

- Aumento de segurança com tokentização de usuário (JWT)
- Tela de atualização de informações do usuário
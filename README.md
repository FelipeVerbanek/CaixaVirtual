# API Caixa virtual
Essa api tem como objetivo, realizar o gerenciamento das movimentações de entrada e saida de caixa de uma empresa.

# Primeiros passos
Collection postman da api: https://www.getpostman.com/collections/54253bdd542bd1c1ba35

Documentação da api: https://docs.google.com/document/d/1RpqAfaTIBrbxHQ_nvNphdYlk5ENUKHHL0ziw3EpsZdQ/edit?usp=sharing

  
## Instalação
Instalar dependencias na maquina
#### Utilizando yarn:
```
yarn
```
#### Utilizando npm:
npm install

## Inicializando o projeto no ambiente de desenvolvimento

#### Utilizando yarn:
```
yarn dev 
```
#### Utilizando npm:
```
npm run dev
```
### Migrations
Após a configuração do seu arquivo .env com o banco de dados postgres, é necessário rodar as migrations.

#### Exemplo yarn:
```
yarn sequelize db:migrate
```
#### Exemplo npm
```
npm sequelize db:migrate
```
## Executar testes

#### Utilizando yarn:
```
yarn test
```
#### Utilizando npm:
```
npm run test
```
## Rodando projeto com docker
Para rodar o projeto com o docker compose execute:
```
docker-compose up
```

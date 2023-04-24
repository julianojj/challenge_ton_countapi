# challenge_ton_countapi

Counter API é um desafio proposto pela Stone, onde devemos criar uma api para atender requisitos de visitas em uma determinada url e incremetar as visitas e também cadastrar usuário e consutar informações do usuário cadastrado.

No cenário proposto, optei por utilizar a clean architecture, um assunto que tenho domínio e que é interessante para o projeto por conta de que, conseguimos abstrair implementações e também escalar o software mantendo qualidade e robustes.

## Backlog
Counter SBI:

Deve-se consumir uma API e retornar o total de visitas após o incremento

User SBI:

Deve-se cadastrar um usuário, logo após, deve-se ser possível buscar informações do usuário cadastrado

## Tecnologias utilizadas
```
TypeScript v5.0.4
Jest v29.5.0
Docker v18.16.0
Terraform v1.4.5
AWS Lightsail
```

## Como rodar o projeto?
Deve-se utilizar o comando docker-compose up, que será responsável por subir a instância dos containers da api e banco de dados.

## Comandos:

Testes: `docker container exec -it ton_countapi exec yarn test`

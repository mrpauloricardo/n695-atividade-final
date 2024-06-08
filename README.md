# Desenvolvimento para Plataformas Web - Front-End

Este projeto faz parte da Atividade Final da disciplina de Desenvolvimento para Plataformas Web. Ele consiste em uma aplicação front-end desenvolvida com React.

## Funcionalidades

- **Interface de Cadastro de Usuários**: Permite o cadastro de novos usuários com nome e email.
- **Interface de Listagem de Usuários**: Exibe uma lista de todos os usuários cadastrados (somente admin).
- **Interface de Edição de Usuários**: Permite editar os dados de um usuário existente.
- **Interface de Exclusão de Usuários**: Permite excluir um usuário (somente admin).
- **Login do usuário com permissão de admin**: Nome de usuário: admin e senha: admin123.

## Requisitos

- Node.js LTS
- npm (gerenciador de pacotes do Node.js)
- React

## Instalação

### 1. Clonar o Repositório

Primeiro, clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/mrpauloricardo/n695-atividade-final-front.git
cd n695-atividade-final-front
```

### 2. Instalar Node.js e npm

Certifique-se de que o Node.js e o npm estão instalados. Você pode baixá-los [aqui](https://nodejs.org/).

Para verificar se o Node.js e o npm estão instalados corretamente, execute:

```bash
node --version
npm --version
```

A saída deve ser algo como:

```
v20.13.1
10.8.0
```

### 3. Instalar Dependências

No diretório `n695-atividade-final-front`, instale as dependências do projeto:

```bash
npm install
```

### 4. Executar o Projeto

Para iniciar o front-end, execute:

```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

## Nota

O back-end desta aplicação pode ser encontrado [aqui](https://github.com/mrpauloricardo/n695-atividade-final-back).
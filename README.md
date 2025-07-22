# 📁 Employee Docs API

API RESTful para gerenciamento de colaboradores e seus documentos obrigatórios.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🛠️ Requisitos

- Docker e Docker Compose instalados
- Node.js (apenas para desenvolvimento local)

---

## 🧪 Como rodar com Docker

### 1. Clone o projeto

```bash
git clone <url-do-repositório>
cd employee-docs-api
```
### 2. Configure o arquivo .env
Crie um arquivo .env com o seguinte conteúdo:

```bash
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=employee_docs
POSTGRES_PORT=5432
```

### 3. Suba os containers

```bash
docker compose up --build -d
Esse comando irá:
```

Subir o banco PostgreSQL

Buildar e iniciar a API em modo produção

### 4. Execute as migrations
Dentro do container da API, rode o seguinte comando para aplicar as migrations:

```bash
docker exec -it employee-docs-api npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/database/data-source.ts
```
Esse comando cria as tabelas no banco de dados conforme definidas no projeto.

## ✅ Endpoints principais
| Método | Rota         | Descrição            |
| ------ | ------------ | -------------------- |
| GET    | `/employees` | Listar colaboradores |
| POST   | `/employees` | Criar colaborador    |
| GET    | `/documents` | Listar documentos    |
| POST   | `/documents` | Criar documento      |

A API pode conter filtros e validações específicas. Consulte a documentação ou o Swagger (se configurado em /api).

🧑‍💻 Rodando localmente sem Docker (modo dev)
```bash
npm install
npm run start:dev
```
🗂 Estrutura resumida

.
├── src
│   ├── employee
│   ├── document
│   ├── database
│   │   └── data-source.ts
│   └── main.ts
├── docker-compose.yml
├── Dockerfile
└── .env


📃 Licença
Este projeto está sob a licença MIT.

Feito com ❤️ por sua Júnior Dering!

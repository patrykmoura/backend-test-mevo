# Mevo Backend

API para processamento de arquivos CSV com validações, persistência e identificação de transações suspeitas.

---

## Requisitos
- Node.js (v18+)
- Docker + Docker Swarm
- SQLite (já incluso via Prisma)

---

## Rodando localmente

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar a aplicação
```bash
npm run start:dev
```

A aplicação sobe em: [http://localhost:3000](http://localhost:3000)

---

## Docker Swarm

### 1. Iniciar o Swarm (se ainda não iniciou)
```bash
docker swarm init
```

### 2. Build da imagem local
```bash
docker compose build
```

### 3. Deploy com Swarm
```bash
docker stack deploy -c docker-compose.yml mevo
```

### 4.  Verificar o IP
```bash
ip addr show eth0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1
172.28.246.243
```

---

## Prisma

### Banco
- **Tipo:** SQLite
- **Arquivo:** `prisma/dev.db`
- **Configuração:** No arquivo `prisma/schema.prisma`

### Models atuais
- `Operation`
- `InvalidOperation`
- `File`

### Criar o banco e aplicar os modelos
```bash
npx prisma migrate dev --name init
```

### Atualizar/editar models
1. Editar o arquivo `prisma/schema.prisma`
2. Rodar:
```bash
npx prisma migrate dev --name nome-da-migracao
```

### Gerar os modelos TypeScript no `node_modules/@prisma/client`
```bash
npx prisma generate
```

---

## Endpoints

### POST `/auth`


### POST `/transaction/upload`
Faz o upload do CSV. Espera um campo `file` como `multipart/form-data`.

#### Exemplo `curl`:
```bash
curl --location 'http://localhost:3000/transaction/upload' \
--form 'file=@"./teste.csv"'
```

### GET `/transaction/summary`
Retornao summary
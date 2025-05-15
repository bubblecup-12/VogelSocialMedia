Hier ist deine überarbeitete Dokumentation mit **korrigierten Rechtschreibfehlern, konsistenter Formatierung** und kleineren stilistischen Verbesserungen:

---

## 📦 Verwendete Software

- **Backend:** Node.js
- **Datenbank:** PostgreSQL
- **ORM:** Prisma

---

## ▶️ Backend starten

Dieser Befehl startet das Backend, nachdem es korrekt installiert wurde:
DB in Docker

```bash
yarn start
```

DB nicht in Docker

```bash
yarn start-no-docker
```

Die Swagger-Dokumentation findest du unter:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🛠️ Installation

### 🚀 Installation mit Docker

1. [Docker installieren](https://www.docker.com/)
2. Installations-Skript ausführen:

```bash
yarn install-script
```

---

### 🧱 Manuelle Installation

#### 1. PostgreSQL installieren

##### 🔹 Windows

PostgreSQL kannst du hier herunterladen:
[https://www.enterprisedb.com/downloads/postgres-postgresql-downloads](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

##### 🔹 Linux

PostgreSQL über deinen Paketmanager installieren. Danach den Dienst aktivieren:

```bash
sudo systemctl enable postgresql --now
```

---

#### 2. In eine SQL-Shell wechseln

##### 🔹 Windows

```bash
psql
```

##### 🔹 Linux

```bash
sudo -iu postgres psql
```

---

#### 3. Benutzer und Datenbank anlegen

In der geöffneten psql-Shell:

```sql
CREATE DATABASE prisma;
```

---

#### 4. .env-Datei vorbereiten

- Die Datei `.env.example` in `.env` umbenennen
- Passwort und Token-Secret anpassen

---

#### 5. Prisma vorbereiten

Im Projektordner folgenden Befehl ausführen, um den Prisma-Client zu generieren:

```bash
yarn prisma generate
```

---

#### 6. Datenbank initialisieren

Dies erstellt die Datenbank anhand der `schema.prisma`:

```bash
yarn prisma migrate dev --name init
```

---

Wenn du möchtest, kann ich die Doku auch automatisch auf Englisch übersetzen oder als `README.md` formatieren. Sag einfach Bescheid!

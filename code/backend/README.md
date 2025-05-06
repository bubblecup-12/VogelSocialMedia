## 📦 Verwendete Software

- **Backend:** Node.js  
- **Datenbank:** PostgreSQL  
- **ORM:** Prisma

---

## 🛠️ Installation

### 1. PostgreSQL installieren

#### 🔹 Windows

PostgreSQL kannst du [hier herunterladen](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).

#### 🔹 Linux

Einfach über den Paketmanager deiner Wahl installieren. Danach den PostgreSQL-Dienst aktivieren (logischischerweise nur wenn du `systemd` verwendest):

```bash
sudo systemctl enable postgresql --now
```


### 2. In eine SQL-Shell wechseln
🔹 Windows

Folgenden Befehl ausführen, um als PostgreSQL-Benutzer in die psql-Shell zu gelangen:
 ```bash
psql 
```
 

🔹 Linux

Folgenden Befehl ausführen, um als PostgreSQL-Benutzer in die psql-Shell zu gelangen:
```bash
sudo -iu postgres psql
```

### 3. Benutzer und Datenbank in PostgreSQL anlegen

In der geöffneten psql-Shell folgendene Befehle ausführen. Ersetze username und password durch deine eigenen Werte (und merken! 😉):

```bash
CREATE DATABASE prisma;

CREATE USER username WITH ENCRYPTED PASSWORD 'password'; 
```

### 4. .env-Datei vorbereiten

Die Datei env.txt in .env umbenennen und deine eben gewählten Zugangsdaten (username, password) dort eintragen.
### 5. Prisma vorbereiten

Im Projektordner folgenden Befehl ausführen, um Prisma-Client zu generieren:

yarn prisma generate

### 6. Datenbank initialisieren
Dieser Command erstellt die DB nach der Datei `schema.prisma` 
``` bash
yarn prisma migrate dev --name init
```

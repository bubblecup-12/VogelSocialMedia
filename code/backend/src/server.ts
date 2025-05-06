import express, { Request, Response } from 'express';
import { PrismaClient } from '../src/generated/prisma'
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const app = express();
const port = 3000;
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}
app.get('/', async (req: Request, res: Response) => {
  try {
    // Benutzer erstellen (nur einmal)
    /*const createdUser = await prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@prisma.com',
        password: '123456',
      },
    });*/

    
    // Alle Benutzer abrufen
    const users = await prisma.user.findMany();

    // Namen extrahieren
    const names = users.map((user:User) => user.name);

    // Antwort zurück an den Client
    res.send(`There are ${users.length} users: ${names.join(', ')}`);
  } catch (error) {
    console.error('Fehler bei der Datenbankoperation:', error);
    res.status(500).send('Datenbankfehler');
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

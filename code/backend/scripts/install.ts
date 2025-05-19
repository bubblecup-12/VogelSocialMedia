// this script is used to install the project
import { exec } from "child_process";
import util from "util";
const execPromise = util.promisify(exec);
import fs, { read } from "fs";
import readlineSync from "readline-sync";
import crypto from "crypto";
import dotenv from "dotenv";
import { boolean } from "zod";

const json_path: string = "scripts/install.json"; // Path to the JSON file
const raw = fs.readFileSync(json_path, "utf8");
const config = JSON.parse(raw); // Parse the JSON file

//check if there is a .env and if it has the correct settings
let allSet: boolean = true;
if (fs.existsSync(".env")) {
  dotenv.config();
  for (const key of config.requiredKeys) {
    if (!process.env[key]) {
      allSet = false;
      break;
    }
  }
} else {
  allSet = false;
}

if (allSet) {
  // if it`s all set abort the installation
  process.exit(0);
}
// getting user input for the PostgreSQL username and password
console.log("generrating .env file");
const postgresUser: string = readlineSync.question(
  "Enter the PostgreSQL username (default: postgres): ",
  { defaultInput: "postgres" }
);
let postgresPassword: string = "";
while (!postgresPassword) {
  postgresPassword = readlineSync.question("Enter the PostgreSQL password: ", {
    hideEchoBack: true, // Hides the characters
  });
  !postgresPassword && console.log("Password cannot be empty");
}
// generating a random JWT secret
const jwtSecret: string = crypto.randomBytes(32).toString("hex"); // 64 Zeichen
const env: string = `DATABASE_URL="postgresql://${postgresUser}:${postgresPassword}@localhost:5432/prisma"
TOKEN_SECRET="${jwtSecret}"
DB_USER="${postgresUser}"
DB_PASSWORD="${postgresPassword}"`;
try {
  fs.writeFileSync(".env", env);
  console.log("File has been written successfully.");
} catch (err) {
  console.error("Error writing to file:", err);
}
// running the commands from the JSON file
// The commands are executed in the order they are defined in the JSON file
(async () => {
  for (const command of config.commands) {
    try {
      const { stdout, stderr } = await execPromise(command); // Wait for the command to finish
      if (stderr) {
        console.log(stderr);
      }
      console.log(stdout); // Print the output of the command`);
    } catch (error: any) {
      console.log(`error: ${error.message}`);
      break; // Stop execution if an error occurs
    }
  }

  console.log("Installation complete");
})();

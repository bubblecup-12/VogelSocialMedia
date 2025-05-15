import { exec } from "child_process";
import util from "util";
const execPromise = util.promisify(exec);
import fs, { read } from "fs";
import readlineSync from "readline-sync";
import crypto from "crypto";

const json_path: string = "scripts/install.json"; // Path to the JSON file
const raw = fs.readFileSync(json_path, "utf8");
const config = JSON.parse(raw); // Parse the JSON file

if (config.installed) {
  // Check if the script has already been run
  console.log("Already installed");
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
const jwtSecret: string = crypto.randomBytes(32).toString("hex"); // 64 Zeichen
const env: string = `DATABASE_URL="postgresql://${postgresUser}:${postgresPassword}@localhost:5432/prisma"
TOKEN_SECRET="${jwtSecret}"
DB_USER="${postgresUser}"
DB_PASSWORD="${postgresPassword}"`;
try {
  fs.writeFileSync("./scripts/.env", env);
  console.log("File has been written successfully.");
} catch (err) {
  console.error("Error writing to file:", err);
}

(async () => {
  for (const command of config.commands) {
    try {
      const { stdout, stderr } = await execPromise(command); // Wait for the command to finish
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      console.log(stdout); // Print the output of the command`);
    } catch (error: any) {
      console.log(`error: ${error.message}`);
      break; // Stop execution if an error occurs
    }
  }
  config.installed = true; // Set the installed flag to true
  fs.writeFile(json_path, JSON.stringify(config), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("File has been updated successfully.");
    }
  });
  console.log("Installation complete");
})();

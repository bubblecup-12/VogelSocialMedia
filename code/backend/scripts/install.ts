// this script is used to install the project
import { exec } from "child_process";
import util from "util";
const execPromise = util.promisify(exec);
import fs, { read } from "fs";
import readlineSync from "readline-sync";
import crypto from "crypto";
import dotenv from "dotenv";
import { minioClient } from "../src/server";

type env_config = {
  name: string;
  generated: boolean;
  input?: string;
  default?: string;
  hide?: boolean;
};
type json_config = {
  commands: string[];
  requiredKeys: env_config[];
};

const json_path: string = "scripts/install.json"; // Path to the JSON file
const raw = fs.readFileSync(json_path, "utf8");
const config: json_config = JSON.parse(raw); // Parse the JSON file

//check if there is a .env and if it has the correct settings
let missingConfigs: env_config[] = [];
if (fs.existsSync(".env")) {
  dotenv.config();
  for (const setting of config.requiredKeys) {
    if (!process.env[setting.name]) {
      missingConfigs.push(setting);
    }
  }
} else {
  missingConfigs = config.requiredKeys;
}
  
  if (missingConfigs.length < 1 ) {
    // if it`s all set abort the installation
    console.log("All required settings are already set in .env.");
} else {
  // getting user input for the PostgreSQL username and password
  console.log("generrating .env file");
  for (const setting of missingConfigs) {
    if (!setting.generated) {
      let input: string = "";
      do {
        input = readlineSync.question(
          `Enter the ${setting.name} ${setting.default ? `(${setting.default})` : ""}: `,
          { defaultInput: setting.default, hideEchoBack: setting.hide }
        );
      } while (!input);
      process.env[setting.name] = input;
    } else if (setting.name === "TOKEN_SECRET") {
      // generating a random JWT secret
      const jwtSecret: string = crypto.randomBytes(32).toString("hex"); // 64 Zeichen
      process.env[setting.name] = jwtSecret;
    }
  }
  let env: string = `DATABASE_URL="postgresql://${process.env["DB_USER"]}:${process.env["DB_PASSWORD"]}@localhost:5432/prisma"\n`;
  for (const setting of config.requiredKeys) {
    if (setting.name != "DATABASE_URL") {
      env += `${setting.name}="${process.env[setting.name]}"\n`;
    }
  }

  // writing the .env file
  try {
    fs.writeFileSync(".env", env);
    console.log("File has been written successfully.");
  } catch (err) {
    console.error("Error writing to file:", err);
  }
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

  // check if the images bucket exists in minIO
  const exists = await new Promise<boolean>((resolve, reject) => {
    minioClient
      .bucketExists("images")
      .then((exists: boolean) => resolve(exists))
      .catch((err: Error) => reject(err));
  });
  if (!exists) {
    // if the bucket does not exist, create it
    await minioClient.makeBucket("images", "eu-west-1"); // region is required, but can be any valid region and doesn't mattter for minIO
    console.log("Bucket 'images' created successfully.");
  }

  console.log("Installation complete");
  process.exit(0); // Exit the process after all commands are executed
})();

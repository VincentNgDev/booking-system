/**
 * This script generates import statement of all table's zmodel schemas into the 
 * index zmodel file for the schema directory.
 * 
 * run `pnpm run schema:generate` to run this script
 * run `pnpm run db:generate` will includes this script
 */

import fs from "fs";
import path from "path";

const SCHEMA_DIR = "./src/schema";
const INDEX_FILE_PATH = "./src/schema/index.zmodel";
const EXCLUDED_FILES = ["base.zmodel", "index.zmodel", "base.workflow.zmodel"];

function processZModelFiles(
  dirPath: string,
  excludedFiles: string[] = [],
  outputStream: fs.WriteStream
) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processZModelFiles(fullPath, excludedFiles, outputStream);
    } else if (
      path.extname(file) === ".zmodel" &&
      !excludedFiles.includes(file)
    ) {
      // Found a ".zmodel" file, read its content
      //   const content = fs.readFileSync(fullPath, "utf-8");
      const relativePath = path
        .relative(SCHEMA_DIR, fullPath)
        .replace(/\\/g, "/");

      // Write the import statement to the index file
      const importSchema = 'import "./' + relativePath + '"';
      console.log(`Found .zmodel file: ${fullPath} and import statement: ${importSchema}`);
      writeFilePath(importSchema, outputStream);
    }
  }
}

function writeFilePath(line: string, outputStream: fs.WriteStream) {
  outputStream.write(line + "\n");
}

function main() {
  const outputStream = fs.createWriteStream(INDEX_FILE_PATH, { flags: "w" });
  processZModelFiles(SCHEMA_DIR, EXCLUDED_FILES, outputStream);
}

main();

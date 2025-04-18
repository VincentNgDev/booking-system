import fs from "fs";
import path from "path";

/**
 * This script is used to ensure that the components.json files in the app and UI components directories are consistent.
 * https://ui.shadcn.com/docs/monorepo : Ensure you have the same style, iconLibrary and baseColor in all components.json files
 */

const UI_COMPONENTS_DIR: string = "./packages/ui";
const COMPONENTS_JSON_FILE: string = "components.json";
const APPS_DIR: string = "./apps";
const EXCLUDED_FOLDERS_FILES: string[] = ["node_modules", "dist"];

// Get components.json content from the specified path
function getComponentsJson(filePath: string): any {
  try {
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return jsonData;
  } catch (error) {
    console.log(error);
  }
}

function compareComponentsJsonFiles(
  componentsJsonPath: string,
  uiComponentsJson: any
) {
  const appComponentsJson = getComponentsJson(componentsJsonPath);

  const appStyle = appComponentsJson.style;
  const uiStyle = uiComponentsJson.style;

  let errorMessage: string = "";

  if (appStyle !== uiStyle)
    errorMessage += `The style of the app (${appStyle}) and UI components (${uiStyle}) are different.`;

  const appIconLibrary = appComponentsJson.iconLibrary;
  const uiIconLibrary = uiComponentsJson.iconLibrary;

  if (appIconLibrary !== uiIconLibrary) {
    if (errorMessage.length > 0) errorMessage += "\n";

    errorMessage += `The icon library of the app (${appIconLibrary}) and UI components (${uiIconLibrary}) are different.`;
  }

  const appBaseColor = appComponentsJson.tailwind.baseColor;
  const uiBaseColor = uiComponentsJson.tailwind.baseColor;

  if (appBaseColor !== uiBaseColor) {
    if (errorMessage.length > 0) errorMessage += "\n";

    errorMessage += `The base color of the app (${appBaseColor}) and UI components (${uiBaseColor}) are different.`;
  }

  if (errorMessage.length > 0) throw new Error(errorMessage);
  else console.log(`The components.json file in ${componentsJsonPath} is consistent with the UI components.`);
}

function processComponentsJsonFiles(
  dirPath: string,
  uiComponentsJsonContent: any
) {
  // Read the directory or files in the specified path
  const files = fs.readdirSync(dirPath);
  // Iterate through each file or folder in the directory
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !EXCLUDED_FOLDERS_FILES.includes(file)) {
      // If it's a directory, call the function recursively
      processComponentsJsonFiles(fullPath, uiComponentsJsonContent);
    } else if (file === "components.json") {
      compareComponentsJsonFiles(fullPath, uiComponentsJsonContent);
    }
  }
}

function main() {
  const fullPath = path.join(UI_COMPONENTS_DIR, COMPONENTS_JSON_FILE);
  const uiComponentsJson = getComponentsJson(fullPath);
  processComponentsJsonFiles(APPS_DIR, uiComponentsJson);
}

main();

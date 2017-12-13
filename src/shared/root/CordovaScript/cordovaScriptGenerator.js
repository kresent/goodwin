import fs from 'fs';
import path from 'path';

const cordovaScriptPath = path.resolve(
  __dirname,
  '../../../../src/shared/root/CordovaScript/cordovaScript.js'
);

export const cordovaScript = String(fs.readFileSync(cordovaScriptPath));

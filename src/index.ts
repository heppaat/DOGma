//import * as fs from 'node:fs';
import filesystem from "fs/promises";
import { z } from "zod";

// DON'T MODIFY THE CODE BELOW THIS LINE

let toExport;

try {
  toExport = [
    { name: "dataRead", content: dataRead, type: "function" },
    { name: "convertBreeds", content: convertBreeds, type: "function" },
  ];
} catch (error) {
  toExport = { error: error.message };
}

export { toExport };

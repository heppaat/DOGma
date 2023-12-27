//import * as fs from 'node:fs';
import filesystem from "fs/promises";
import { z } from "zod";

//data type ts

/* type Data = { breeds: { [property: string]: string[] } }; */

/* type Data = { breeds: Record<string, string[]> }; */

//validation with zod:
const dataSchema = z.object({ breeds: z.record(z.string().array()) });

type Data = z.infer<typeof dataSchema>;

const convertBreeds = (data: Data) => {
  let breeds = data.breeds;
  for (const breed in breeds) {
    console.log(breeds[breed]);
  }
};

const dataRead = async () => {
  try {
    const input = await filesystem.readFile(
      `${__dirname}/../data.json`,
      "utf-8"
    );
    const jsonData = JSON.parse(input);

    const zData = dataSchema.safeParse(jsonData);

    if (!zData.success) {
      console.log(zData.error);
    }
    const validatedData = zData.success;
    convertBreeds(zData);
  } catch (error) {
    console.log(error);
  }
};

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

//import * as fs from 'node:fs';
//import filesystem from "fs/promises";
import { readFile } from "fs/promises";
import { z } from "zod";

// data type ts
/* type Data = { breeds: { [property: string]: string[] } }; */

// data type version 2
/* type Data = { breeds: Record<string, string[]> }; */

// validation with zod:
const dataSchema = z.object({ breeds: z.record(z.string().array()) });

// validation version 2

/* const dataSchema = z.object({
  breeds: z.record(z.array(z.string())),
}); */

type Data = z.infer<typeof dataSchema>;

const convertBreeds = (data: Data) => {
  let breeds = data.breeds;
  let result: string[] = [];
  for (const breed in breeds) {
    if (breeds[breed].length > 0) {
      for (let i = 0; i < breeds[breed].length; i++) {
        const subBreedName = breeds[breed][i];
        result = [...result, `${subBreedName} ${breed}`];
      }
    } else {
      result = [...result, breed];
    }
  }
  console.log(result);
};

const capitalize = (str: string) => {
  const swap = (char: string) => {
    let abc = "abcdefghijklmnopqrstuvwxyz";
    let ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < abc.length; i++) {
      if (char === abc[i]) {
        return ABC[i];
      }
    }
    return char;
  };

  let part: string = "";
  let array: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char !== " ") {
      part += char;
    } else {
      array = [...array, part];
      part = "";
    }
  }
  array = [...array, part];

  let result: string = "";
  for (let i = 0; i < array.length; i++) {
    let capitalizedPart: string = "";

    if (array[i][0] >= "a" && array[i][0] <= "z") {
      capitalizedPart += swap(array[i][0]);
    } else {
      capitalizedPart += array[i][0];
    }

    for (let j = 1; j < array[i].length; j++) {
      capitalizedPart += array[i][j];
    }

    if (i !== array.length - 1) {
      result += capitalizedPart + " ";
    } else {
      result += capitalizedPart;
    }
  }
  return result;
};

type Result = { id: number; name: string; sub: boolean | string };
const extendedConvertBreeds = (data: Data) => {
  let breeds = data.breeds;
  let counter = 1;
  let result: Result[] = [];
  for (const breed in breeds) {
    if (breeds[breed].length > 0) {
      for (let i = 0; i < breeds[breed].length; i++) {
        const subBreedName = breeds[breed][i];
        result = [
          ...result,
          {
            id: counter++,
            name: capitalize(`${subBreedName} ${breed}`),
            sub: capitalize(breed),
          },
        ];
      }
    } else {
      result = [
        ...result,
        { id: counter++, name: `${capitalize(breed)}`, sub: false },
      ];
    }
  }
  console.log(result);
};

// | vagy-vagy
type SafeParseReturnType =
  | {
      success: true;
      data: number;
    }
  | {
      success: false;
      errors: string[];
    };

const dataRead = async () => {
  try {
    const input = await readFile(`${__dirname}/../data.json`, "utf-8");
    const jsonData = JSON.parse(input);

    const result = dataSchema.safeParse(jsonData);

    if (!result.success) return console.log(result.error.issues);

    const validatedData = result.data;
    //convertBreeds(validatedData);
    extendedConvertBreeds(validatedData);
  } catch (error) {
    console.log(error);
  }
};

dataRead();

/* const demo = async () => {
  await dataRead();
  console.log("VERY IMPORTANT");
};
demo(); */

// DON'T MODIFY THE CODE BELOW THIS LINE

/* let toExport;

try {
  toExport = [
    { name: "dataRead", content: dataRead, type: "function" },
    { name: "convertBreeds", content: convertBreeds, type: "function" },
  ];
} catch (error) {
  toExport = { error: error.message };
}

export { toExport };
 */

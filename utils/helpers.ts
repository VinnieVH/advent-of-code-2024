import fs from "fs";

export const getInputValues = (url: string): string[] => {
  return fs.readFileSync(url, "utf-8")
  .split("\n");
};
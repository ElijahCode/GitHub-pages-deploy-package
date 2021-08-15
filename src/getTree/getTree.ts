/* eslint-disable no-await-in-loop */
import fs from "fs";
import util from "util";

export async function getTree(dir: string): Promise<ITreeItem[]> {
  const dirReader = util.promisify(fs.readdir);
  const files = await dirReader(dir);
  const tree: ITreeItem[] = [];

  for (let i = 0; i < files.length; i += 1) {
    const fileReader = util.promisify(fs.readFile);
    const fileContent = await fileReader(`${dir}/${files[i]}`, "utf8");
    const treeItem: ITreeItem = {
      path: files[i],
      mode: "100644",
      type: "blob",
      content: fileContent,
    };
    tree.push(treeItem);
  }
  return tree;
}

import fs from "fs";
import util from "util";

export async function getRepositoryData(): Promise<[string, string] | null> {
  const fileReader = util.promisify(fs.readFile);
  const fileContent = await fileReader(`./package.json`, "utf8");
  const fileJson = JSON.parse(fileContent);
  if (!fileJson.repository.url) {
    return null;
  }
  const regExp =
    /git\+https:\/\/github\.com\/([a-z,A-Z,0-9]{1,})\/([a-z,A-Z,0-9,-]{1,})\.git/;
  const [url, userName, repoName] = fileJson.repository.url.match(regExp);
  return [userName, repoName];
}

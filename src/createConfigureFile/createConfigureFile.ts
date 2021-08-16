import fs from "fs";
import * as inquirer from "inquirer";

export async function createConfigFile(
  userName?: string,
  repoName?: string
): Promise<void> {
  const questions = [
    {
      type: "input",
      name: "userName",
      message: "Input your github userName",
      default() {
        if (userName) {
          return userName;
        }
        return null;
      },
    },
    {
      type: "input",
      name: "repoName",
      message: "Input your repoName",
      default() {
        if (repoName) {
          return repoName;
        }
        return null;
      },
    },
    {
      type: "password",
      name: "token",
      message:
        "Input your github token. It's will safe because config file automatically will be written in .gitignore",
      mask: "*",
    },
    {
      type: "input",
      name: "dir",
      message: "Input directory. from that files will pushed",
      default() {
        return "./dist";
      },
    },
    {
      type: "input",
      name: "branchName",
      message: "Input branch, in that will push files",
      default() {
        return "gh-pages";
      },
    },
  ];

  await inquirer.prompt(questions).then((answers) => {
    fs.writeFileSync("ghPagesDeployer.config.json", JSON.stringify(answers));
    try {
      const gitignoreContent = fs.readFileSync(".gitignore", "utf8");
      if (!gitignoreContent.match("ghPagesDeployer.config.json")) {
        fs.appendFileSync(".gitignore", "\nghPagesDeployer.config.json");
      }
    } catch {
      fs.writeFileSync(".gitignore", "ghPagesDeployer.config.json");
    }
  });
}

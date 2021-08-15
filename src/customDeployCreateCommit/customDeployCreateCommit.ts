import fs from "fs";
import * as inquirer from "inquirer";
import { createCommit } from '../createCommit/createCommit'

export async function createCommitFromCustomDeploy(userName?: string, repoName?: string): Promise<void> {
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
      message: "Input your github token",
      mask: "*",
    },
    {
      type: "input",
      name: "dir",
      message: "Input directory. from that files will pushed",
      default() {
        return "/dist";
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

  inquirer.prompt(questions).then((answers) => {
    createCommit(answers)
  });
}
#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";
import { createConfigFile } from "./createConfigureFile/createConfigureFile";
import { getRepositoryData } from "./getRepositoryData/getRepositoryData";
import { createCommitFromCustomDeploy } from "./customDeployCreateCommit/customDeployCreateCommit";
import { createCommit } from "./createCommit/createCommit";
import { runBuild } from "./runBuild/runBuild";

(async function app(): Promise<void> {
  const programm = new Command();

  const repositoryData = await getRepositoryData();

  programm
    .option("-i, --init", "create configuration file")
    .option(
      "-c, --custom-deploy",
      "deploy on github pages with selfinput parameters"
    )
    .option("-b, --build", "build project")
    .option("-d, --deploy", "deploy page");

  programm.parse(process.argv);

  const options = programm.opts();

  if (options.init) {
    if (repositoryData) {
      const [userName, repoName] = repositoryData;
      await createConfigFile(userName, repoName);
    } else {
      await createConfigFile();
    }
  }
  if (options.build) {
    try {
      const result = await runBuild();
      if (!result) {
        console.log("Build failed. Deploy terminated");
        process.exit(1);
      }
    } catch {
      console.log(
        'Build error. Probably you do not have script "npm run build" or on building error ocurred.'
      );
    }
  }
  if (options.customDeploy) {
    if (repositoryData) {
      const [userName, repoName] = repositoryData;
      await createCommitFromCustomDeploy(userName, repoName);
    } else {
      await createCommitFromCustomDeploy();
    }
  }

  let config;
  try {
    config = JSON.parse(fs.readFileSync("ghPagesDeployer.config.json", "utf8"));
  } catch (err) {
    config = null;
  }

  if (options.deploy) {
    if (config) {
      try {
        console.log("Start deploying...");
        await createCommit(config);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Cannot find config file\n");
      console.log("Run ghdeploy -i for create it or\n");
      console.log(
        "Run ghdeploy -c for deploy with data transfer via terminal\n"
      );
    }
  }
})();

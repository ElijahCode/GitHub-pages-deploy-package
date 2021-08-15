import { Command } from "commander";
import fs from "fs";
import execa from "execa";
import { createConfigFile } from "./createConfigureFile/createConfigureFile";
import { getRepositoryData } from "./getRepositoryData/getRepositoryData";
import { createCommitFromCustomDeploy } from './customDeployCreateCommit/customDeployCreateCommit'
import { createCommit } from "./createCommit/createCommit";

(async function app(): Promise<void> {
  const programm = new Command();

  const repositoryData = await getRepositoryData();

  programm
    .option("-i, --init", "create configuration file")
    .option(
      "-c, --custom-deploy",
      "deploy on github pages with selfinput parameters"
    )
    .option("-b, --build", "build project");

  programm.parse(process.argv);

  const options = programm.opts();

  if (options.init) {
    if (repositoryData) {
      const [userName, repoName] = repositoryData;
      createConfigFile(userName, repoName);
    } else {
      createConfigFile();
    }
  }
  if (options.customDeploy) {
    console.log("Start custom deploy...");
    await createCommitFromCustomDeploy();
  }
  if (options.build) {
    console.log("Start build...");
    try {
        await execa('npm', ['run', 'build'])
    } catch {
        console.log('Build error. Probably you do not have scripts "npm run build" or on building error ocurred.')
    }
  }

  let config;
  try {
    config = JSON.parse(fs.readFileSync("ghPagesDeployer.config.json", "utf8"));
  } catch (err) {
    config = null;
  }

  if(!options.customDeploy) {
      if(config) {
          try {
            console.log('Start deploying...')
            await createCommit(config);
          } catch(err) {
              console.log(err)
          }
        
      } else {
        console.log('Cannot find config file\n')
        console.log('Run ghPagesDeployer -i for create it or\n')
        console.log('Run ghPagesDeployer -c for deploy with data transfer via terminal\n')
      }
  }
})()

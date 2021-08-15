import { Command } from "commander";

const programm = new Command();

programm
  .option("-i, --init", "create configuration file")
  .option("-d, --deploy", "deploy on github pages")
  .option(
    "-c, --custom-deploy",
    "deploy on github pages with selfinput parameters"
  )
  .option("-b, --build", "build project");

programm.parse(process.argv);

const options = programm.opts();

if (options.init) {
  console.log("Get command init");
}
if (options.deploy) {
  console.log("Get command deploy");
}
if (options.customDeploy) {
  console.log("Get command custom deploy");
}
if (options.build) {
  console.log("Get command build");
}

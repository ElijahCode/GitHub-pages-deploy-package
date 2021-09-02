import execa from "execa";

export async function runBuild(): Promise<boolean> {
  console.log("Start build...");
  const data = await execa("npm", ["run", "build"]);
  const buildSuccess = data.exitCode === 0 && data.failed === false;
  if (!buildSuccess) {
    console.error(data.stderr);
  }
  return buildSuccess;
}

import execa from "execa";

export async function runBuild(): Promise<void> {
  console.log("Start build...");
  await execa("npm", ["run", "build"]);
}

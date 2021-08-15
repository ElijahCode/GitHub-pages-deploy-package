import { Octokit } from "@octokit/rest";
import { getTree } from "../getTree/getTree";

export async function createCommit(gitData: IGitData): Promise<void> {
  try {
    const octokit = new Octokit({ auth: gitData.token });

    const branchesData = await octokit.request(
      `GET /repos/${gitData.userName}/${gitData.repoName}/branches`
    );

    if (
      !branchesData.data.find(
        (branch: any) => branch.name === gitData.branchName
      )
    ) {
      const commitsData = await octokit.request(
        `GET /repos/${gitData.userName}/${gitData.repoName}/commits`
      );
      await octokit.request(
        `POST /repos/${gitData.userName}/${gitData.repoName}/git/refs`,
        {
          ref: `refs/heads/${gitData.branchName}`,
          sha: commitsData.data[commitsData.data.length - 1].sha,
        }
      );
    }

    const branch = await octokit.request(
      `GET /repos/${gitData.userName}/${gitData.repoName}/git/refs/heads/${gitData.branchName}`
    );
    const shaLatestCommit = branch.data.object.sha;

    const commit = await octokit.request(
      `GET /repos/${gitData.userName}/${gitData.repoName}/git/commits/${shaLatestCommit}`
    );
    const shaBaseTree = commit.data.tree.sha;

    const tree = await getTree(gitData.dir);

    const data3 = await octokit.request(
      `POST /repos/${gitData.userName}/${gitData.repoName}/git/trees`,
      {
        base_tree: shaBaseTree,
        tree,
      }
    );
    const shaNewTree = data3.data.sha;

    const data4 = await octokit.request(
      `POST /repos/${gitData.userName}/${gitData.repoName}/git/commits`,
      {
        parents: [shaLatestCommit],
        tree: shaNewTree,
        message: "",
      }
    );
    const shaNewCommit = data4.data.sha;

    await octokit.request(
      `POST /repos/${gitData.userName}/${gitData.repoName}/git/refs/heads/${gitData.branchName}`,
      {
        sha: shaNewCommit,
      }
    );
  } catch (err) {
    console.log(err);
  }
}
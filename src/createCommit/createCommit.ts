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

    const sendTree = await octokit.request(
      `POST /repos/${gitData.userName}/${gitData.repoName}/git/trees`,
      {
        base_tree: shaBaseTree,
        tree,
      }
    );
    const shaNewTree = sendTree.data.sha;

    const sendCommits = await octokit.request(
      `POST /repos/${gitData.userName}/${gitData.repoName}/git/commits`,
      {
        parents: [shaLatestCommit],
        tree: shaNewTree,
        message: "",
      }
    );
    const shaNewCommit = sendCommits.data.sha;

    await octokit.request(
      `POST /repos/${gitData.userName}/${gitData.repoName}/git/refs/heads/${gitData.branchName}`,
      {
        sha: shaNewCommit,
      }
    );
  } catch (err) {
    const errMessage = err.response.data.message;
    const errCode = err.status;
    switch(errMessage) {
      case 'Bad credentials':
        console.error("Can't authorizating. Check you user name, token and repository name. Error code:", errCode)
        break;
      default: 
      console.error(`${errMessage}. Error code:`, errCode)
    } 
  }
}

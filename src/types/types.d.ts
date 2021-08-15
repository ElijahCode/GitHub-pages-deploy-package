interface IGitData {
  token: string;
  userName: string;
  repoName: string;
  branchName: string;
  dir: string;
}

interface ITreeItem {
  path: string;
  mode: "100644";
  type: "blob";
  content: string;
}

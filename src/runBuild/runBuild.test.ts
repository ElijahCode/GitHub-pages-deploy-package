import * as execa from "execa";
import { runBuild } from "./runBuild";

jest.mock("execa");
const execaMock = execa as unknown as jest.Mock;

const returnErr: execa.ExecaReturnValue<string> = {
  command: "foobar",
  exitCode: 1,
  stderr: "error",
  stdout: "not ok",
  isCanceled: false,
  failed: true,
  timedOut: false,
  killed: false,
  escapedCommand: "",
};

const returnOk: execa.ExecaReturnValue<string> = {
  command: "foobar",
  exitCode: 0,
  stderr: "",
  stdout: "all ok",
  isCanceled: false,
  failed: false,
  timedOut: false,
  killed: false,
  escapedCommand: "",
};

describe("test run build", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("expect run without err", async () => {
    execaMock.mockResolvedValue(returnOk);
    const buildResult = await runBuild();
    expect(buildResult).toBeTruthy();
    expect(execaMock.mock.calls.length).toBe(1);
  });

  test("expect run with err", async () => {
    execaMock.mockResolvedValue(returnErr);
    const buildResult = await runBuild();
    expect(buildResult).toBeFalsy();
    expect(execaMock.mock.calls.length).toBe(1);
  });

  test("expect run with error om fail run command ", async () => {
    returnErr.failed = true;
    returnErr.exitCode = 0;
    execaMock.mockResolvedValue(returnErr);
    const buildResult = await runBuild();
    expect(buildResult).toBeFalsy();
    expect(execaMock.mock.calls.length).toBe(1);
  });
});

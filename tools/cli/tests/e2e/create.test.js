const { rmdirSync, mkdirSync, existsSync } = require("fs");
const { execSync } = require("child_process");

describe("Create command", () => {
  beforeEach(() => {
    try {
      rmdirSync("tmp", { recursive: true });
    } catch {
      //
    }
    try {
      mkdirSync("tmp");
    } catch {
      //
    }
    execSync("npm link");
  });

  afterAll(() => {
    rmdirSync("tmp", { recursive: true });
  });

  it("should create an app", () => {
    execSync("greenpress create my-app", { cwd: "./tmp" });
    expect(existsSync("tmp/my-app")).toBeTruthy();
  });

  it("should install app dependencies", () => {
    execSync("greenpress create my-app", { cwd: "./tmp" });
    expect(
      existsSync("tmp/my-app/node_modules", { cwd: "./tmp" })
    ).toBeTruthy();
  });
  
});

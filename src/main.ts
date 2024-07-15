import gitlog from "gitlog";

async function main() {
  const fullFp = "README.md";

  const commits = await gitlog({
    repo: ".",
    file: fullFp,
    number: 100000000, // get all commits
    fields: ["authorDate", "authorEmail"],
  });

  if (commits.length === 0) {
    commits.push({
      authorDate: new Date().toISOString(),
      authorEmail: "unknown",
      files: ["README.md"],
      // @ts-ignore
      status: ["A"],
    });
  }

  const temp = commits.map((c) => c.authorEmail);
  const authors = temp.filter((x, i) => i === temp.indexOf(x));

  const created = commits[commits.length - 1].authorDate;
  const modified = commits[0].authorDate;

  console.log("[Commits]", commits);
  console.log("[Authors]", authors);
  console.log("[Created]", created);
  console.log("[Modified]", modified);
}

main();

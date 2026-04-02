const axios = require("axios");

const token = process.env.GITHUB_TOKEN;

const repo = process.env.GITHUB_REPOSITORY; // owner/repo
const prNumber = process.env.GITHUB_REF.split("/")[2];

async function getPRFiles() {
  const res = await axios.get(
    `https://api.github.com/repos/${repo}/pulls/${prNumber}/files`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.data;
}

async function postComment(message) {
  await axios.post(
    `https://api.github.com/repos/${repo}/issues/${prNumber}/comments`,
    { body: message },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

(async () => {
  const files = await getPRFiles();

  let comments = [];

  files.forEach(file => {
    if (file.patch && file.patch.includes("Thread.sleep")) {
      comments.push(`❌ Avoid using Thread.sleep in ${file.filename}`);
    }
  });

  if (comments.length > 0) {
    await postComment(comments.join("\n"));
  } else {
    await postComment("✅ Code looks good!");
  }
})();
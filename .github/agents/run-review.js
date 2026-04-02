const fs = require("fs");
const axios = require("axios");
const { Octokit } = require("@octokit/rest");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const prNumber = process.env.GITHUB_REF.match(/\/(\d+)\/merge$/)?.[1];

async function run() {
  try {
    // 1. Read agent prompt
    const agentPrompt = fs.readFileSync(
      ".github/agents/code-review.agent.md",
      "utf-8"
    );

    // 2. Get PR diff
    const { data: diff } = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}",
      {
        owner,
        repo,
        pull_number: prNumber,
        headers: {
          accept: "application/vnd.github.v3.diff",
        },
      }
    );

    // 3. Call OpenAI
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: agentPrompt },
          {
            role: "user",
            content: `Review this PR diff:\n\n${diff}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const review = response.data.choices[0].message.content;

    // 4. Post comment to PR
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: `## 🤖 AI Code Review\n\n${review}`,
    });

    console.log("✅ Review posted!");
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

run();
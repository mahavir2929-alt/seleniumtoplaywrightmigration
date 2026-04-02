const fs = require("fs");

const filePath = ".github/agents/code-review.agent.md";
const content = fs.readFileSync(filePath, "utf-8");

console.log(content);
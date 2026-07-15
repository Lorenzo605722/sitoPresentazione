const { execSync } = require("child_process");
const fs = require("fs");

function killPort3000() {
  try {
    if (process.platform === "win32") {
      const result = execSync('netstat -ano | findstr ":3000"', {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "ignore"],
      });

      const pids = new Set();
      for (const line of result.split("\n")) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && /^\d+$/.test(pid) && pid !== "0") pids.add(pid);
      }

      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        } catch {
          /* already stopped */
        }
      }
    } else {
      execSync("lsof -ti:3000 | xargs kill -9 2>/dev/null || true", {
        shell: true,
        stdio: "ignore",
      });
    }
  } catch {
    /* nothing listening */
  }
}

killPort3000();
fs.rmSync(".next", { recursive: true, force: true });
console.log("Cache .next eliminata. Avvio dev server...");

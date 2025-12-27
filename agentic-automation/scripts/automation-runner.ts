#!/usr/bin/env tsx
import "dotenv/config";
import { runAutomation } from "../src/lib/pipeline";

interface CliOptions {
  upload: boolean;
  long: boolean;
  short: boolean;
}

function parseArgs(): CliOptions {
  const args = process.argv.slice(2);
  const options: CliOptions = {
    upload: args.includes("--upload"),
    long: !args.includes("--no-long"),
    short: !args.includes("--no-short"),
  };
  return options;
}

async function main() {
  const { upload, long, short } = parseArgs();
  console.log("🚀  Kicking off automation pipeline");
  console.log(`    short=${short} long=${long} upload=${upload}`);

  const result = await runAutomation({
    generateLong: long,
    generateShort: short,
    upload,
  });

  console.log("✅  Pipeline complete");
  console.log(JSON.stringify(result.report, null, 2));
}

main().catch((error) => {
  console.error("❌ Automation failed", error);
  process.exitCode = 1;
});

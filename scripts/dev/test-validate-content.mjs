import { execSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { strict as assert } from "node:assert";

const testDir = join(process.cwd(), "content", "__test__");
const validatorScript = join(process.cwd(), "scripts", "validate-content.mjs");

let passed = 0;
let failed = 0;

function runValidator(expectedFail) {
  try {
    const output = execSync(`node "${validatorScript}"`, {
      encoding: "utf8",
      stdio: "pipe",
      cwd: process.cwd(),
    });
    if (expectedFail) {
      console.error(`  FAIL: expected validation errors but got success`);
      console.error(`  Output: ${output.trim()}`);
      failed++;
    } else {
      console.log(`  PASS: validation succeeded as expected`);
      passed++;
    }
  } catch (err) {
    if (!expectedFail) {
      console.error(`  FAIL: unexpected validation error`);
      console.error(`  ${err.stderr || err.message}`);
      failed++;
    } else {
      console.log(`  PASS: validation failed as expected`);
      passed++;
    }
  }
}

function writeTestFile(filename, content) {
  writeFileSync(join(testDir, filename), content, "utf8");
}

function cleanup() {
  try { rmSync(testDir, { recursive: true }); } catch {}
}

function setup() {
  cleanup();
  mkdirSync(testDir, { recursive: true });
}

console.log("=== Content Validation Tests ===\n");

// Test 1: Valid article should pass
console.log("Test 1: Valid article passes validation");
setup();
writeTestFile("valid-article.md", `---
title: "Test Article"
description: "A valid test article"
slug: "test-article"
date: "2026-05-07"
author: "Test Author"
category: "Testing"
tags:
  - test
  - validation
schema_type: "Article"
layout: "article"
---
## Introduction

This is a valid article body.
`);
runValidator(false);
cleanup();

// Test 2: Missing required field
console.log("\nTest 2: Missing title field fails");
setup();
writeTestFile("no-title.md", `---
description: "No title here"
slug: "no-title"
date: "2026-05-07"
author: "Test"
category: "Testing"
schema_type: "Article"
layout: "article"
---
Body without title.
`);
runValidator(true);
cleanup();

// Test 3: Bad slug format
console.log("\nTest 3: Bad slug format fails");
setup();
writeTestFile("bad-slug.md", `---
title: "Bad Slug"
description: "Invalid slug"
slug: "Bad Slug With Spaces"
date: "2026-05-07"
author: "Test"
category: "Testing"
tags: []
schema_type: "Article"
layout: "article"
---
Body.
`);
runValidator(true);
cleanup();

// Test 4: Invalid date format
console.log("\nTest 4: Invalid date format fails");
setup();
writeTestFile("bad-date.md", `---
title: "Bad Date"
description: "Invalid date"
slug: "bad-date"
date: "not-a-date"
author: "Test"
category: "Testing"
tags: []
schema_type: "Article"
layout: "article"
---
Body.
`);
runValidator(true);
cleanup();

// Test 5: Secret key in content
console.log("\nTest 5: Secret key in content fails");
setup();
writeTestFile("secret-in-body.md", `---
title: "Leaked Secret"
description: "Oops"
slug: "leaked-secret"
date: "2026-05-07"
author: "Test"
category: "Testing"
tags: []
schema_type: "Article"
layout: "article"
---
This article has PIXINLINK_API_KEY=abc123 in the body.
`);
runValidator(true);
cleanup();

// Test 6: Secret in frontmatter
console.log("\nTest 6: VITE_PIXINLINK_API_KEY in frontmatter fails");
setup();
writeTestFile("secret-frontmatter.md", `---
title: "Secret Frontmatter"
description: "VITE_PIXINLINK_API_KEY leaked"
slug: "secret-frontmatter"
date: "2026-05-07"
author: "Test"
category: "Testing"
tags: []
schema_type: "Article"
layout: "article"
---
Body with VITE_PIXINLINK_API_KEY value.
`);
runValidator(true);
cleanup();

// Test 7: Invalid schema_type
console.log("\nTest 7: Unknown schema_type fails");
setup();
writeTestFile("bad-schema.md", `---
title: "Bad Schema"
description: "Unknown schema type"
slug: "bad-schema"
date: "2026-05-07"
author: "Test"
category: "Testing"
tags: []
schema_type: "UnknownType"
layout: "article"
---
Body.
`);
runValidator(true);
cleanup();

// Test 8: Tags not an array
console.log("\nTest 8: Tags as string (not array) fails");
setup();
writeTestFile("tags-string.md", `---
title: "Tags as String"
description: "Tags should be array"
slug: "tags-string"
date: "2026-05-07"
author: "Test"
category: "Testing"
tags: "not-an-array"
schema_type: "Article"
layout: "article"
---
Body.
`);
runValidator(true);
cleanup();

// Test 9: Duplicate block markers
console.log("\nTest 9: Duplicate block markers fail");
setup();
writeTestFile("dup-blocks.md", `---
title: "Duplicate Blocks"
description: "Two answer-first blocks"
slug: "dup-blocks"
date: "2026-05-07"
author: "Test"
category: "Testing"
tags: []
schema_type: "Article"
layout: "article"
---
<!-- @block: answer-first -->
First answer.
<!-- @block: answer-first -->
Second answer - duplicate!
`);
runValidator(true);
cleanup();

// Test 10: Title too long (>70 chars)
console.log("\nTest 10: Title exceeding 70 characters fails");
setup();
writeTestFile("long-title.md", `---
title: "This title is way too long and exceeds the maximum allowed length of seventy characters for SEO titles"
description: "Title too long"
slug: "long-title"
date: "2026-05-07"
author: "Test"
category: "Testing"
tags: []
schema_type: "Article"
layout: "article"
---
Body.
`);
runValidator(true);
cleanup();

// Summary
console.log(`\n=== Results ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
}

console.log("All content validation tests passed.");

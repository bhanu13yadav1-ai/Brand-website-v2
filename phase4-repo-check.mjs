import fs from 'node:fs';
import assert from 'node:assert/strict';
const read = name => fs.readFileSync(name, 'utf8');
const index = read('index.html');
const sw = read('sw.js');
const partC = read('part-c-enhancements.js');
assert.ok(index.includes('./phase4-story-universe.css'), 'index.html missing Phase 4 CSS link');
assert.ok(index.includes('./phase4-story-universe.js'), 'index.html missing Phase 4 script link');
assert.ok(sw.includes('blacked-v2-phase4-story-universe-1'), 'sw.js needs the new cache name');
for (const f of ['./phase4-story-universe.css','./phase4-story-universe.js','./phase4-story-universe.json','./phase4-diagnostics.html','./phase2-photo-collections.css','./phase2-photo-collections.js']) {
  assert.ok(sw.includes(f), `sw.js precache missing ${f}`);
}
for (const kind of ['boy','dildo','plug','wild']) {
  assert.ok(index.includes(`data-wheel-disc="${kind}"`), `Missing ${kind} wheel in index`);
  assert.ok(partC.includes(`'${kind}'`), `Current wheel integration lacks ${kind}`);
}
assert.ok(partC.includes('expected 8 labels'), 'Wheel alignment code should guard for eight sectors');
assert.ok(partC.includes('alignmentErrorDegrees'), 'Wheel diagnostics should expose alignment error');
console.log('PASS: index/script/cache integration and four existing wheel anchors found in repository.');
console.log('Note: run only after copying the new root files and applying both patches on the review branch.');

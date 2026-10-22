import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = (name) => fs.readFileSync(path.join(ROOT, name), 'utf8');
const data = JSON.parse(read('phase4-story-universe.json'));
const js = read('phase4-story-universe.js');
const css = read('phase4-story-universe.css');
const indexPatch = read('patches/INDEX_PHASE4_INSERT.patch');
const swPatch = read('patches/SW_CACHE_PHASE4.patch');

const toneIds = (data.tones || []).map(t => t.id);
assert.deepEqual(toneIds, ['clean', 'desi', 'bold'], 'Three ordered tone settings are expected');
assert.equal(new Set(data.stories.map(s => s.id)).size, data.stories.length, 'Story IDs must be unique');
assert.equal(data.stories.length, 4, 'Expected four new story cards');

const storyIds = new Set(data.stories.map(s => s.id));
let sceneCount = 0;
let choiceCount = 0;
for (const story of data.stories) {
  assert.ok(story.title && story.characters && story.readingTime, `${story.id}: required card metadata missing`);
  for (const tone of toneIds) assert.ok(story.teaser?.[tone], `${story.id}: teaser missing for ${tone}`);
  assert.ok(story.scenes?.[story.openingScene], `${story.id}: opening scene missing`);
  const sceneIds = new Set(Object.keys(story.scenes));
  for (const [sceneId, scene] of Object.entries(story.scenes)) {
    sceneCount++;
    for (const tone of toneIds) {
      assert.ok(typeof scene.heading === 'string' && scene.heading.length, `${story.id}/${sceneId}: missing heading`);
      assert.ok(Array.isArray(scene.prose?.[tone]) && scene.prose[tone].length, `${story.id}/${sceneId}: prose missing for ${tone}`);
      assert.ok(scene.prose[tone].every(p => typeof p === 'string' && p.trim()), `${story.id}/${sceneId}: blank paragraph in ${tone}`);
    }
    for (const choice of scene.choices || []) {
      choiceCount++;
      assert.ok(choice.id && choice.label, `${story.id}/${sceneId}: choice id/label missing`);
      for (const tone of toneIds) assert.ok(choice.label[tone], `${story.id}/${sceneId}/${choice.id}: label missing for ${tone}`);
      if (choice.nextScene) assert.ok(sceneIds.has(choice.nextScene), `${story.id}/${sceneId}: bad nextScene ${choice.nextScene}`);
      if (choice.nextStory) assert.ok(storyIds.has(choice.nextStory), `${story.id}/${sceneId}: bad nextStory ${choice.nextStory}`);
      assert.ok(choice.nextScene || choice.nextStory, `${story.id}/${sceneId}/${choice.id}: no destination`);
    }
  }
}
assert.ok(sceneCount >= 12, 'Expected branching scenes across story universe');
assert.ok(choiceCount >= 16, 'Expected choices and cross-story links');
assert.ok(js.includes('data-p4-tone') && js.includes('Bold Hinglish + Gaali'), 'Tone UI should be wired');
assert.ok(js.includes('data-p4-pref-group') && js.includes('data-p4-create-vibe'), 'Boyfriend preference cards should be wired');
assert.ok(js.includes('MutationObserver') && js.includes('data-p4-wheel-story'), 'Wheel result story links should observe result updates');
assert.ok(!/\b(?:localStorage|sessionStorage)\.(?:setItem|getItem|removeItem)\s*\(/.test(js), 'New tone/preferences must not persist to web storage');
assert.ok(css.includes('@media(max-width:680px)') && css.includes(':focus-visible'), 'Mobile layout and visible focus styles are required');
assert.ok(indexPatch.includes('phase4-story-universe.css') && indexPatch.includes('phase4-story-universe.js'), 'Index integration patch incomplete');
assert.ok(swPatch.includes('blacked-v2-phase4-story-universe-1') && swPatch.includes('phase4-story-universe.json'), 'Service worker cache patch incomplete');

// Exercise the exact sector-centre/correction formula used by the existing wheel integration.
// This validates the rotation math, not a browser-rendered wheel; runtime validation lives in phase4-diagnostics.html.
let checkedAlignments = 0;
for (const startingRotation of [0, 13.5, 179.9, 359.9, 1440.0, 3217.25]) {
  for (let index = 0; index < 8; index++) {
    const sectorCenter = index * 45 + 22.5;
    const currentAngle = ((startingRotation % 360) + 360) % 360;
    const correction = (360 - ((sectorCenter + currentAngle) % 360)) % 360;
    const finalRotation = startingRotation + 1440 + correction;
    const angle = ((sectorCenter + (finalRotation % 360)) % 360 + 360) % 360;
    const error = Math.min(angle, 360 - angle);
    assert.ok(error < 1e-7, `Wheel index ${index} misaligned at start angle ${startingRotation}: ${error}°`);
    checkedAlignments++;
  }
}

console.log(`PASS: ${data.stories.length} stories, ${sceneCount} scenes, ${choiceCount} choice edges, ${toneIds.length} tone modes.`);
console.log(`PASS: ${checkedAlignments} sector-centre wheel-alignment math cases.`);
console.log('PASS: preference/story UI hooks, ephemeral-storage rule, mobile/focus CSS, and index/service-worker patch anchors.');
console.log('BOUNDARY: browser rendering, deployed paths, service-worker takeover, and physical Android are not tested by this static script.');

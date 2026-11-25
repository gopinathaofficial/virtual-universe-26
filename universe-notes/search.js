import { readFile } from 'node:fs/promises';

const word = process.argv.slice(2).join(' ').trim();
if (!word) {
  console.error('Usage: npm run search -- <word>');
  process.exit(1);
}

const file = new URL('./notes/keynote-highlights.json', import.meta.url);
const { highlights } = JSON.parse(await readFile(file, { encoding: 'utf8' }));

const needle = word.toLowerCase();
const matches = highlights.filter(
  (h) =>
    h.title.toLowerCase().includes(needle) ||
    h.summary.toLowerCase().includes(needle),
);

if (matches.length === 0) {
  console.log(`No highlights match "${word}".`);
} else {
  for (const h of matches) {
    console.log(`${h.title} (${h.topic})`);
    console.log(`  ${h.summary}`);
  }
}

#!/usr/bin/env node
// Extract the minimal subset of a (minified) Webflow shared.css needed to render
// one page, given that page's HTML. Keeps any rule whose selector references a
// class/id present in the page, plus @font-face, plus @keyframes referenced by
// kept rules. @media blocks are filtered recursively.
//
// Usage: node extract-css.cjs <page.html> <shared.css> <out.css>

const fs = require('fs');
const [, , pagePath, cssPath, outPath] = process.argv;
const html = fs.readFileSync(pagePath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

// 1. tokens (class + id names) present in the page
const tokens = new Set();
for (const m of html.matchAll(/\sclass="([^"]*)"/g)) {
  m[1].split(/\s+/).forEach(c => c && tokens.add(c));
}
for (const m of html.matchAll(/\sid="([^"]*)"/g)) {
  m[1].split(/\s+/).forEach(c => c && tokens.add(c));
}
// also data-* driven? skip. Always-keep base/utility selectors used by embeds.
const ALWAYS = ['w-embed', 'w-richtext', 'w-script', 'w-nav', 'reveal', 'visible',
  'band', 'chart-wrap', 'anim-section', 'outcomes-band', 'outcomes-grid', 'outcome-num'];
ALWAYS.forEach(t => tokens.add(t));

function selectorMatches(sel) {
  for (const t of tokens) {
    // escape regex specials in token
    const esc = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp('[.#]' + esc + '(?![\\w-])').test(sel)) return true;
  }
  return false;
}

// 2. tokenize CSS into top-level segments via brace counting
function splitTopLevel(str) {
  const segs = [];
  let depth = 0, start = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { segs.push(str.slice(start, i + 1)); start = i + 1; }
    }
  }
  // trailing (e.g. @import ...;) handled below
  const tail = str.slice(start).trim();
  if (tail) segs.push(tail);
  return segs;
}

const segs = splitTopLevel(css);
const kept = [];
const keptBodies = [];

for (const seg of segs) {
  const s = seg.trim();
  if (!s) continue;
  if (s.startsWith('@font-face') || s.startsWith('@import') || s.startsWith(':root') || s.startsWith('@charset')) {
    kept.push(s); continue;
  }
  if (s.startsWith('@keyframes') || s.startsWith('@-webkit-keyframes')) {
    // defer: decide after we know kept bodies
    continue;
  }
  if (s.startsWith('@media') || s.startsWith('@supports')) {
    const open = s.indexOf('{');
    const prelude = s.slice(0, open);
    const inner = s.slice(open + 1, s.lastIndexOf('}'));
    const innerSegs = splitTopLevel(inner);
    const keepInner = innerSegs.filter(r => {
      const rs = r.trim();
      if (!rs) return false;
      if (rs.startsWith('@keyframes') || rs.startsWith('@-webkit-keyframes')) return false;
      const o = rs.indexOf('{');
      if (o === -1) return false;
      const sel = rs.slice(0, o);
      const keep = selectorMatches(sel);
      if (keep) keptBodies.push(rs.slice(o + 1, rs.lastIndexOf('}')));
      return keep;
    });
    if (keepInner.length) kept.push(prelude + '{' + keepInner.join('') + '}');
    continue;
  }
  // normal rule
  const o = s.indexOf('{');
  if (o === -1) continue;
  const sel = s.slice(0, o);
  if (selectorMatches(sel)) {
    kept.push(s);
    keptBodies.push(s.slice(o + 1, s.lastIndexOf('}')));
  }
}

// 3. keep @keyframes referenced by kept bodies
const animNames = new Set();
for (const body of keptBodies) {
  for (const m of body.matchAll(/animation(?:-name)?\s*:\s*([^;]+)/g)) {
    m[1].split(/[\s,]+/).forEach(tok => { if (/^[a-zA-Z][\w-]*$/.test(tok)) animNames.add(tok); });
  }
}
for (const seg of segs) {
  const s = seg.trim();
  if (s.startsWith('@keyframes') || s.startsWith('@-webkit-keyframes')) {
    const name = s.replace(/^@(-webkit-)?keyframes\s+/, '').split('{')[0].trim();
    if (animNames.has(name)) kept.push(s);
  }
}

fs.writeFileSync(outPath, kept.join('\n'));
console.error(`tokens=${tokens.size} kept_segments=${kept.length} out_bytes=${fs.statSync(outPath).size}`);

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve('dist');
const read = (name) => readFileSync(resolve(dist, name), 'utf8');
const menuIds = [
  '1hQtGVg2_PObyspC257jJXZEzRhlsPvPB',
  '1LzRrm82oe7Vpv4HYkn-FJ4haHvLDzsjA',
  '1qCiwczPa95gq5gEGBsM1IMCdO4KlREXV',
  '1u6ZBHdsba8s25tFmrd4q3hnHbIrCjOqE',
];

for (const route of ['index.html', 'menu/index.html', 'listini/index.html']) {
  test(`${route} keeps the four direct menu links usable without JavaScript or an iframe`, () => {
    const html = read(route);
    assert.equal((html.match(/class="menu-button"/g) || []).length, 4);
    for (const id of menuIds) assert.ok(html.includes(id));
    assert.doesNotMatch(html, /<iframe|http-equiv="refresh"/i);
    assert.match(html, /<h1\b/);
    assert.match(html, /name="robots" content="noindex, follow"/);
  });
}

for (const route of ['home', 'en']) {
  test(`${route} has consistent bilingual metadata and valid business data`, () => {
    const html = read(`${route}/index.html`);
    assert.match(html, new RegExp(`<html lang="${route === 'en' ? 'en' : 'it'}"`));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="https://thourazpub.it/${route}/"`));
    assert.ok(html.includes(`property="og:url" content="https://thourazpub.it/${route}/"`));
    for (const [lang, path] of [['it','home'],['en','en'],['x-default','home']]) {
      assert.ok(html.includes(`hreflang="${lang}" href="https://thourazpub.it/${path}/"`));
    }
    assert.doesNotMatch(html, /name="robots" content="noindex/);
    assert.ok(html.includes('/fonts/montserrat-latin-variable.woff2'));
    assert.doesNotMatch(html, /fonts\.googleapis\.com/);
    assert.ok(existsSync(resolve(dist, 'fonts/montserrat-latin-variable.woff2')));
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1]);
    assert.equal(schema['@type'], 'BarOrPub');
    assert.equal(schema.url, 'https://thourazpub.it/home/');
    assert.equal(schema.hasMenu, 'https://thourazpub.it/menu/');
    assert.equal(schema.openingHoursSpecification[0].closes, '04:00');
    assert.equal(schema.openingHoursSpecification[0].dayOfWeek.length, 7);
    const whatsapp = new URL(html.match(/href="(https:\/\/wa.me\/[^\"]+)"/)[1].replaceAll('&amp;', '&'));
    assert.equal(whatsapp.pathname, '/393488889533');
    assert.equal(whatsapp.searchParams.get('text'), 'Ciao, vorrei prenotare un tavolo al Thouraz Pub.');
    for (const image of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(image[0], /\balt="[^"]+"/);
      assert.match(image[0], /\bwidth="\d+"/);
      assert.match(image[0], /\bheight="\d+"/);
      const src = image[0].match(/\bsrc="([^"]+)"/)[1];
      assert.ok(existsSync(resolve(dist, `.${src}`)), `Missing built image: ${src}`);
    }
  });
}

test('legacy public URLs and custom domain survive the Astro build', () => {
  assert.equal(read('CNAME').trim(), 'thourazpub.it');
  for (const filename of ['come-funziona.html','TESTOrario1.pdf','TESTOrario2.pdf','TESTOrario3.pdf']) {
    assert.ok(existsSync(resolve(dist, filename)), `Missing live legacy URL: /${filename}`);
  }
});

test('sitemap and robots support indexing the homepages and reading menu noindex', () => {
  const sitemap = read('sitemap.xml');
  assert.match(sitemap, /<loc>https:\/\/thourazpub.it\/home\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/thourazpub.it\/en\/<\/loc>/);
  assert.doesNotMatch(sitemap, /<loc>[^<]*\/(menu|listini)/);
  const robots = read('robots.txt');
  assert.doesNotMatch(robots, /^Disallow:\s*\/(menu|listini)/m);
  assert.match(robots, /Sitemap: https:\/\/thourazpub.it\/sitemap.xml/);
});

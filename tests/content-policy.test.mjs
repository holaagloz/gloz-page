import test from 'node:test';
import assert from 'node:assert/strict';
import { contactChannels, galleryProjects, publishableClients, safeWebsite } from '../src/app/data/content-policy.ts';
test('No contact data produces no fabricated channels', () => {
  assert.deepEqual(contactChannels({}), []);
  assert.deepEqual(contactChannels({ email: 'invalid', whatsapp: '123', instagram: 'https://other.invalid/name', linkedin: 'javascript:alert(1)' }), []);
});
test('Verified channel formats yield safe functional URLs', () => {
  // Reserved domains and test values are confined to tests, never production data.
  const channels = contactChannels({ email: 'qa@example.test', whatsapp: '+50688880000', instagram: 'https://www.instagram.com/qa-fixture/' });
  assert.equal(channels.length, 3);
  assert.match(channels[0].href, /^mailto:qa@example.test\?subject=/);
  assert.equal(channels[1].href, 'https://wa.me/50688880000');
  assert.equal(safeWebsite('javascript:alert(1)'), undefined);
  assert.equal(safeWebsite('https://user:password@example.test'), undefined);
});
test('Only authorized clients with assets and alt text; no duplication', () => {
  const client = { id: 'qa', name: 'QA fixture', alt: 'Test-only logo', logo: '/qa.svg', authorized: true };
  assert.equal(publishableClients([client, client]).length, 1);
  assert.equal(publishableClients([{ ...client, authorized: false }, { ...client, id: 'b', logo: '' }, { ...client, id: 'c', alt: '' }]).length, 0);
});
test('Gallery omits unverified work, missing images and missing alt text', () => {
  const project = { id: 'qa', title: 'QA fixture', summary: 'Test only', categories: ['Software'], coverImage: '/qa.svg', coverAlt: 'QA artwork', verifiedRole: 'Software', featured: false, approvedForPublication: true };
  assert.equal(galleryProjects([project]).length, 1);
  for (const change of [{ approvedForPublication: false }, { verifiedRole: '' }, { coverImage: null }, { coverAlt: '' }]) assert.equal(galleryProjects([{ ...project, ...change }]).length, 0);
});

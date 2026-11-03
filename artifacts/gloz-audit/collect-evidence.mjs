import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const root=process.cwd(), out=path.join(root,'artifacts/gloz-audit');
const json=async(name,value)=>writeFile(path.join(out,name),JSON.stringify(value,null,2),'utf8');
const parse=async p=>JSON.parse((await readFile(p,'utf8')).replace(/^\uFEFF/,''));
const workspace=(await readFile('tmp/audit-workspace-path.txt','utf8')).trim();
const before=await parse(path.join(out,'evidence/source-hashes-before.json'));
const after=[]; const differences=[];
for(const item of before){
  const sha256=createHash('sha256').update(await readFile(path.join(root,item.path))).digest('hex').toUpperCase();
  after.push({...item,sha256}); if(sha256!==item.sha256)differences.push(item.path);
}
await json('evidence/source-hashes-after.json',after);
await json('evidence/source-integrity.json',{checkedFiles:before.length,changedFiles:differences,implementationUnchanged:differences.length===0});
const images=[];
for(const name of (await readdir(path.join(out,'screenshots'))).sort()){
  const data=await readFile(path.join(out,'screenshots',name));
  images.push({name,width:data.readUInt32BE(16),height:data.readUInt32BE(20),bytes:data.length,sha256:createHash('sha256').update(data).digest('hex')});
}
await json('evidence/screenshot-manifest.json',images);
const packageJson=await parse(path.join(root,'package.json'));
const installed={};
for(const name of Object.keys({...packageJson.dependencies,...packageJson.devDependencies})){
  const pkg=await parse(path.join(root,'node_modules',name,'package.json'));
  installed[name]={version:pkg.version,dev:name in packageJson.devDependencies};
}
await json('evidence/project-inventory.json',{node:process.version,scripts:packageJson.scripts,installed,linterConfigured:!!packageJson.scripts.lint,components:['Header','Hero','CapabilitiesStrip','Services','Portfolio','ClientLogoCarousel','WorkGallery','Process','About','Contact','SiteFooter'],availableReferences:['docs/gloz/reference/brand-manual.pdf','docs/gloz/reference/approved-hero-services.png'],missingReferences:['docs/gloz/GLOZ_MASTER_SPEC.md','docs/gloz/reference/portfolio-direction-concept-only.png','docs/gloz/reference/full-page-direction-concept-only.png']});
const sourceFiles=['src/app/header/header.scss','src/app/header/header.ts','src/app/services/services.scss','src/app/hero/hero.scss','src/app/data/site.config.ts','src/app/data/clients.data.ts','src/app/data/projects.data.ts','src/app/shared/brand-placeholder.ts','src/index.html'];
let excerpts='# Fragmentos de código inspeccionados (sin cambios)\n\n';
for(const file of sourceFiles){const content=await readFile(file,'utf8');excerpts+=`## ${file}\n\n\`\`\`text\n`+content.split(/\r?\n/).map((line,i)=>`${i+1}: ${line}`).join('\n')+'\n```\n\n';}
await writeFile(path.join(out,'evidence/source-excerpts.md'),excerpts,'utf8');
const results=await parse(path.join(out,'results/browser-audit.json'));
const summary=results.viewports.map(v=>({label:v.label,viewport:v.dimensions.viewport,document:v.dimensions.document,h1:v.typography.h1,headerCta:v.headerCta,sticky:v.sticky,fonts:v.dimensions.fonts,sectionHeights:v.dimensions.sections,axeViolations:v.violations.length,contactLinks:v.contact.links}));
await json('results/summary.json',summary);
// Include the existing runner's report and exact statuses, without dependencies.
try { await writeFile(path.join(out,'results/existing-playwright-last-run.json'),await readFile(path.join(workspace,'test-results/.last-run.json'))); }catch{}
// Remove machine-local user paths from shipped human-readable logs.
for(const filename of await readdir(path.join(out,'results'))){
  if(!filename.endsWith('.txt'))continue;
  const file=path.join(out,'results',filename);
  let content=await readFile(file,'utf8');
  content=content.replaceAll(workspace,'<audit-workspace>').replaceAll(root,'<workspace>').replace(/C:\\Users\\[^\\\r\n]+/g,'<user-home>');
  await writeFile(file,content,'utf8');
}
const luminance=hex=>{const v=hex.match(/../g).map(x=>parseInt(x,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722;};
await json('evidence/contrast-calculation.json',{normal:{foreground:'#ffffff',background:'#024aa9',ratio:(luminance('ffffff')+.05)/(luminance('024aa9')+.05)},hover:{foreground:'#024aa9',background:'#024aa9',ratio:1}});
console.log(JSON.stringify({checkedFiles:before.length,changedFiles:differences,screenshots:images.length,versions:installed['@angular/core'],normalContrast:(luminance('ffffff')+.05)/(luminance('024aa9')+.05)}));

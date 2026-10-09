#!/usr/bin/env node
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const expected={development:{items:1017,groups:166},test:{items:984,groups:166}};
const rows=[];
for (const split of ['development','test']) {
 const parsed=fs.readFileSync(path.join(root,'data',split+'.jsonl'),'utf8').trim().split(/\n/).map(JSON.parse);
 if(parsed.length!==expected[split].items) throw new Error(split+': item count');
 if(new Set(parsed.map(r=>r.group_id)).size!==expected[split].groups) throw new Error(split+': group count');
 if(parsed.some(r=>r.split!==split)) throw new Error(split+': row split mismatch'); rows.push(...parsed);
}
if(new Set(rows.map(r=>r.item_id)).size!==2001) throw new Error('item IDs are not unique');
if(new Set(rows.map(r=>r.group_id)).size!==332) throw new Error('group count');
const dev=new Set(rows.filter(r=>r.split==='development').map(r=>r.group_id));
if(rows.some(r=>r.split==='test'&&dev.has(r.group_id))) throw new Error('group leakage');
const corpus=JSON.stringify(rows); const banned=[/risk_scores?/i,/\"judge_id\"\s*:/i,/\"judgment\"\s*:/i,/rubric_ref/i,/model_id/i,/run_id/i,/\bc_[0-9a-f]{16,}\b/i,/\bp_[0-9a-f]{16,}\b/i,/\bcl_[0-9a-f]{16,}\b/i,/SYN-[0-9a-f]{8,}/i,/SRC-[0-9a-f]{8,}/i,/\b[0-9a-f]{64}\b/i];
for(const pattern of banned) if(pattern.test(corpus)) throw new Error('banned internal token: '+pattern);
for(const row of rows) { const ids=row.task.evidence.map(e=>e.evidence_id); if(new Set(ids).size!==ids.length) throw new Error('duplicate evidence ID'); for(const id of row.reference.citation_evidence_ids) if(!ids.includes(id)) throw new Error('dangling citation'); }
console.log(JSON.stringify({status:'PASS',items:rows.length,groups:new Set(rows.map(r=>r.group_id)).size},null,2));

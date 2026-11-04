import {test} from 'node:test';
import assert from 'node:assert/strict';
import {wrapIndex,relativeSlot,physicalCount} from '../src/app/coverflow/coverflow.model.ts';
test('cyclic navigation stays valid through both ends and repeated actions',()=>{
  for(const count of [1,2,3,4,5,8]) for(let i=-100;i<100;i++){
    const actual=wrapIndex(i,count);assert.ok(actual>=0&&actual<count);
    assert.equal(wrapIndex(actual+count,count),actual);
    assert.equal(wrapIndex(actual-1+1,count),actual);
  }
  assert.equal(wrapIndex(-1,4),3);assert.equal(wrapIndex(4,4),0);
});
test('every real piece gets one unique slot; selection always remains central',()=>{
  for(const count of [1,2,3,4,5,8]) for(let active=0;active<count;active++){
    const slots=Array.from({length:count},(_,index)=>relativeSlot(index,active,count));
    assert.equal(new Set(slots).size,count);assert.equal(slots[active],0);
  }
  assert.deepEqual([0,1,2,3].map(i=>relativeSlot(i,0,4)),[0,1,-2,-1]);
});
test('empty data and invalid external index have safe defaults',()=>{
  assert.equal(wrapIndex(20,0),0);assert.equal(wrapIndex(NaN,4),0);assert.equal(wrapIndex(Infinity,4),0);
});
test('a continuous seven-card window has one centre, three copies each side, and stable content through every wrap',()=>{
  for(const count of [2,3,4,5,7,10]){
    const pool=physicalCount(count);assert.equal(pool%count,0);assert.ok(pool>=12);
    for(let cursor=-80;cursor<=80;cursor++){
      const slots=Array.from({length:pool},(_,i)=>({slot:relativeSlot(i,wrapIndex(cursor,pool),pool),piece:i%count}));
      assert.deepEqual(slots.filter(s=>Math.abs(s.slot)<=3).map(s=>s.slot).sort((a,b)=>a-b),[-3,-2,-1,0,1,2,3]);
      assert.equal(slots.find(s=>s.slot===0).piece,wrapIndex(cursor,count));
    }
  }
  assert.equal(physicalCount(0),0);assert.equal(physicalCount(1),1);
});

'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('16-invalid-command',()=>{const r=new Rover(1,1,'N',{width:8,height:5});assert.throws(()=>r.execute('fx'),TypeError);assert.deepEqual(r.state(),{x:1,y:1,direction:'N'});});

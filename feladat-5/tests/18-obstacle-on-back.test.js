'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('18-obstacle-on-back',()=>{const r=new Rover(1,1,'E',{width:8,height:5,obstacles:[[0,1]]});r.execute('b');assert.equal(r.state().x,1);assert.deepEqual(r.obstacle,{x:0,y:1});});

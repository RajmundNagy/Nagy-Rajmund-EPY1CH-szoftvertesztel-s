'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {Rover}=require('../rover');
test('08-longitude-wrap-west',()=>{const r=new Rover(0,2,'W',{width:8,height:5}); assert.deepEqual(r.execute('f').state(),{x:7,y:2,direction:'W'});});

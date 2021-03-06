var insert = require('./insert');
var concat = require('concat-stream');

insert('drop indexes', [{
  name:'Squirtle', type:'water'
}, {
  name:'Starmie' , type:'water'
}, {
  name:'Charmander' , type:'fire'
}, {
  name:'Lapras'  , type:'water'
}], function(db, t, done) {
  db.a.ensureIndex({type: 1}, function(err) {
    if (err && err.message === 'no such cmd: createIndexes') {
      // Index creation and deletion not supported for mongodb 2.4 and lower.
      t.ok(true);
      t.end();
      return;
    }
    t.ok(!err);
    db.a.getIndexes(function(err, indexes) {
      t.ok(!err);
      t.equal(indexes.length, 2);
      db.a.dropIndexes(function(err) {
        t.ok(!err);

        db.a.getIndexes(function(err, indexes) {
          t.equal(indexes.length, 1);
          t.end();
        });
      });
    });
  });
});

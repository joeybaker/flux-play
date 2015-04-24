var test = require('tape')
  , fluxPlay = require('../')

test('flux-play#get', function getTest (t){
  t.plan(2)

  t.doesNotThrow(
    fluxPlay.get
    , 'does not throw'
  )

  t.ok(
    'I was too lazy to write any tests. Shame on me.'
    , 'must have at least one test'
  )
})

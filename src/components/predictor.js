// import _ from 'lodash'

const calculateCompatibility = (app, team) => {
  const keys = Object.keys(app.attr)
  const p = {
    euclidian: 2,
    manhattan: 1
  }
  let bench = {
    max: {},
    min: {}
  }

  // set the bench score
  for (let i = 0; i < keys.length; i++) {
    bench.max[keys[i]] = 10
    bench.min[keys[i]] = 0
  }

  // initialize scores object
  let scores = {
    team: getTeamAvg(team, keys),
    app: app.attr,
    maxVector: {},
    queryVector: {},
    compatibility: {}
  }

  // compute each p-norm vector and compatibility scores
  Object.keys(p).forEach(dist => {
    scores.maxVector[dist] = pNorm(bench.min, bench.max, keys, p[dist])
    scores.queryVector[dist] = pNorm(scores.app, scores.team, keys, p[dist])
    scores.compatibility[dist] = (1 - scores.queryVector[dist] / scores.maxVector[dist]) * 100
  })

  console.log(scores)
  return scores
}

const getTeamAvg = (arr, keys) => {
  let scores = {}
  let size = 0

  // get mean of each attribute across team
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (!scores[keys[j]]) scores[keys[j]] = 0
      scores[keys[j]] += arr[i].attr[keys[j]]
    }
    size++
  }

  for (let i = 0; i < keys.length; i++) {
    scores[keys[i]] = scores[keys[i]] / size
  }

  return scores
}

const pNorm = (test, train, keys, p) => {
  let xPowN = 0
  const n = keys.length // n-dimension

  for (let i = 0; i < n; i++) {
    xPowN += Math.pow(train[keys[i]] - test[keys[i]], p)
  }
  return Math.pow(xPowN, 1 / p)
}

export {
  calculateCompatibility
}

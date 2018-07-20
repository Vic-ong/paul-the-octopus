import _ from 'lodash'

const calculateCompatibility = (app, team) => {
  const keys = Object.keys(app.attr)
  const threshold = 80
  const decimalRound = 2
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
    team: _.isArray(team) ? getTeamAvg(team, keys) : team,
    app: app.attr,
    maxVector: {},
    queryVector: {},
    compatibility: {},
    qualified: {}
  }

  // compute each p-norm vector and compatibility scores
  Object.keys(p).forEach(dist => {
    scores.maxVector[dist] = pNorm(bench.min, bench.max, keys, p[dist])
    scores.queryVector[dist] = pNorm(scores.app, scores.team, keys, p[dist])
    scores.compatibility[dist] = roundTo((1 - Math.abs(scores.queryVector[dist]) / scores.maxVector[dist]) * 100, decimalRound)
    scores.qualified[dist] = (scores.compatibility[dist] > threshold)
  })

  scores.compatibility.deltaMean = roundTo(deltaMean(scores.app, scores.team, keys), decimalRound)
  scores.qualified.deltaMean = (scores.compatibility.deltaMean > threshold)

  for (let i = 0; i < keys.length; i++) {
    scores.team[keys[i]] = Math.round(scores.team[keys[i]])
  }

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

const deltaMean = (test, train, keys) => {
  let score = 0
  const n = keys.length // n-dimension

  for (let i = 0; i < n; i++) {
    score += Math.abs(train[keys[i]] - test[keys[i]])
  }
  return (1 - score / (n * 10)) * 100
}

const roundTo = (x, n) => {
  const factor = Math.pow(10, n)
  return Math.round(x * factor) / factor
}

export {
  calculateCompatibility
}

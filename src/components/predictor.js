import _ from 'lodash'

const calculateCompatibility = (app, team) => {
  const keys = Object.keys(app.attr)
  const threshold = 80
  const decimalRound = 2
  const p = [ 0.5, 0.78, 1, 2 ]
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
    maxVector: [],
    queryVector: [],
    compatibility: [],
    qualified: []
  }

  // compute each p-norm vector and compatibility scores
  for (let i = 0; i < p.length; i++) {
    scores.maxVector.push({
      v: pNorm(bench.min, bench.max, p[i], keys),
      p: p[i]
    })
    scores.queryVector.push({
      v: pNorm(scores.app, scores.team, p[i], keys),
      p: p[i]
    })
    scores.compatibility.push({
      v: roundTo((1 - scores.queryVector[i].v / scores.maxVector[i].v) * 100, decimalRound),
      p: p[i]
    })
    scores.qualified.push({
      v: scores.compatibility[i].v > threshold,
      p: p[i]
    })
  }

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

const pNorm = (a, b, p, keys) => {
  let xPowN = 0
  const n = keys.length // n-dimension

  for (let i = 0; i < n; i++) {
    xPowN += Math.pow(Math.abs(b[keys[i]] - a[keys[i]]), p)
  }
  return Math.pow(xPowN, 1 / p)
}

const roundTo = (x, n) => {
  const factor = Math.pow(10, n)
  return Math.round(x * factor) / factor
}

export {
  calculateCompatibility
}

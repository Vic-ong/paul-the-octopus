/* eslint-disable */
import _ from 'lodash'
import { kdTree } from 'kd-tree-javascript'

const threshold = 80 // capture +/- 20% margin
const decimalRound = 2
const p = [ 0.5, 0.78, 1, 2 ]

const calculateCompatibility = (app, team) => {
  const keys = Object.keys(app.attr)
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

const getNearest = () => {
  let train = [
    {
      teamwork: 7,
      strength: 8,
      endurance: 6,
      intelligence: 9,
      management: 10,
      leadership: 9,
      programming: 2,
      outgoing: 6
    },
    {
      teamwork: 9,
      strength: 7,
      endurance: 3,
      intelligence: 8,
      management: 4,
      leadership: 6,
      programming: 6,
      outgoing: 7
    },
    {
      teamwork: 8,
      strength: 9,
      endurance: 5,
      intelligence: 10,
      management: 7,
      leadership: 8,
      programming: 9,
      outgoing: 10
    },
    {
      teamwork: 10,
      strength: 8,
      endurance: 7,
      intelligence: 8,
      management: 4,
      leadership: 7,
      programming: 9,
      outgoing: 9
    },
    {
      teamwork: 7,
      strength: 6,
      endurance: 10,
      intelligence: 7,
      management: 7,
      leadership: 8,
      programming: 9,
      outgoing: 3
    },
    {
      teamwork: 5,
      strength: 8,
      endurance: 7,
      intelligence: 3,
      management: 10,
      leadership: 9,
      programming: 2,
      outgoing: 6
    },
    {
      teamwork: 7,
      strength: 8,
      endurance: 3,
      intelligence: 9,
      management: 1,
      leadership: 9,
      programming: 2,
      outgoing: 7
    },
    {
      teamwork: 6,
      strength: 6,
      endurance: 6,
      intelligence: 9,
      management: 8,
      leadership: 9,
      programming: 2,
      outgoing: 2
    },
    {
      teamwork: 9,
      strength: 8,
      endurance: 6,
      intelligence: 10,
      management: 3,
      leadership: 9,
      programming: 10,
      outgoing: 7
    },
    {
      teamwork: 3,
      strength: 8,
      endurance: 6,
      intelligence: 6,
      management: 6,
      leadership: 9,
      programming: 8,
      outgoing: 3
    }
  ]

  let test = {
    teamwork: 8,
    strength: 8,
    endurance: 10,
    intelligence: 6,
    management: 3,
    leadership: 9,
    programming: 7,
    outgoing: 3
  }
  const keys = Object.keys(test)

  let distance = function (a, b) {
    const p = 0.78
    let distPowP = 0

    Object.keys(a).forEach(key => {
      distPowP += Math.pow(Math.abs(a[key] - b[key]), p)
    })
    return Math.pow(distPowP, 1 / p)
  }
  // simulate a new tree
  let tree = new kdTree(train, distance, keys)

  let nearest = tree.nearest(test, 3)

  console.log(nearest)
}

export {
  calculateCompatibility,
  getNearest
}

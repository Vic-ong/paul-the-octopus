import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teams: [
      {
        name: 'Daniel Carlson',
        attr: {
          teamwork: 9,
          strength: 8,
          endurance: 7,
          intelligence: 6
        }
      },
      {
        name: 'Briana Chavez',
        attr: {
          teamwork: 8,
          strength: 9,
          endurance: 5,
          intelligence: 10
        }
      },
      {
        name: 'Megan Perry',
        attr: {
          teamwork: 7,
          strength: 7,
          endurance: 3,
          intelligence: 8
        }
      },
      {
        name: 'Jenny Vanaselja',
        attr: {
          teamwork: 8,
          strength: 8,
          endurance: 6,
          intelligence: 9
        }
      },
      {
        name: 'Bryce Korte',
        attr: {
          teamwork: 6,
          strength: 7,
          endurance: 10,
          intelligence: 10
        }
      },
      {
        name: 'Alyssa Monroe',
        attr: {
          teamwork: 10,
          strength: 6,
          endurance: 6,
          intelligence: 10
        }
      }
    ]
  },
  actions,
  mutations,
  getters
})

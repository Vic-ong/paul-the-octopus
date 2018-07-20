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
          teamwork: 10,
          strength: 8,
          endurance: 7,
          intelligence: 8,
          management: 4,
          leadership: 7,
          programming: 9,
          outgoing: 9
        }
      },
      {
        name: 'Briana Chavez',
        attr: {
          teamwork: 8,
          strength: 9,
          endurance: 5,
          intelligence: 10,
          management: 7,
          leadership: 8,
          programming: 9,
          outgoing: 10
        }
      },
      {
        name: 'Megan Perry',
        attr: {
          teamwork: 9,
          strength: 7,
          endurance: 3,
          intelligence: 8,
          management: 4,
          leadership: 6,
          programming: 6,
          outgoing: 7
        }
      },
      {
        name: 'Jenny Vanaselja',
        attr: {
          teamwork: 8,
          strength: 8,
          endurance: 6,
          intelligence: 9,
          management: 10,
          leadership: 9,
          programming: 2,
          outgoing: 6
        }
      },
      {
        name: 'Bryce Korte',
        attr: {
          teamwork: 6,
          strength: 7,
          endurance: 10,
          intelligence: 10,
          management: 4,
          leadership: 6,
          programming: 10,
          outgoing: 7
        }
      },
      {
        name: 'Alyssa Monroe',
        attr: {
          teamwork: 10,
          strength: 6,
          endurance: 6,
          intelligence: 10,
          management: 3,
          leadership: 7,
          programming: 3,
          outgoing: 10
        }
      }
    ]
  },
  actions,
  mutations,
  getters
})

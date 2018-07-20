<template id="">
  <v-container fluid grid-list-md>
    <!--applicants-->
    <p class="display-2 mt-3">Applicants</p>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm5 md3>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-text-field box
              label="Applicant Name"
              v-model="applicant.name"
            ></v-text-field>
          </v-flex>
          <v-flex v-for="(value, key) in applicant.attr" :key="key" d-flex>
            <v-slider thumb-label="always" color="indigo"
              v-model="applicant.attr[key]"
              :label="key"
              :max="attrRange.max"
              :min="attrRange.min"
              @input="updateCalc"
            ></v-slider>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm7 md9>
        <v-card class="ml-5">
          <v-layout row wrap class="ma-5">
            <v-flex d-flex xs12 sm5>
              <v-layout row wrap>
                <v-flex d-flex xs12>
                  <p class="headline">Compatibility Score</p>
                </v-flex>
                <v-flex d-flex xs12>
                  <p class="title font-weight-bold blue--text">{{ scores.compatibility }} %</p>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex d-flex sm2>
              <v-divider
                class="mx-3"
                inset
                vertical
              ></v-divider>
            </v-flex>
            <v-flex d-flex xs12 sm5>
              <v-layout row wrap>
                <v-flex d-flex xs12>
                  <p class="headline">Classification</p>
                </v-flex>
                <v-flex d-flex xs12>
                  <p class="title font-weight-bold green--text">Qualified!</p>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>

    <!--teams-->
    <p class="display-2 mt-5">Teams</p>
    <v-data-iterator row wrap hide-actions
      class="mt-3"
      content-tag="v-layout"
      :items="teams"
    >
      <v-flex xs12 sm4
        slot="item"
        slot-scope="props"
      >
        <v-card class="mr-3 mb-3">
          <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile v-for="(attr, key) in props.item.attr" :key="key">
              <v-list-tile-content>{{ key }}</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ attr }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script type="text/javascript">
  import { calculateCompatibility } from './predictor'

  export default {
    data () {
      return {
        applicant: {},
        attrRange: {},
        score: 0,
        scores: {
          compatibility: 0,
          qualified: false
        }
      }
    },
    created () {
      this.initParams()
      this.updateCalc()
    },
    computed: {
      teams () {
        return this.$store.getters.teamList
      }
    },
    methods: {
      initParams () {
        this.applicant = {
          name: 'Vic Ong',
          attr: {
            teamwork: 3,
            strength: 6,
            endurance: 3,
            intelligence: 5
          }
        }
        this.attrRange = {
          max: 10,
          min: 0
        }
      },

      updateCalc () {
        this.scores = calculateCompatibility(this.applicant, this.teams)
      }
    }
  }
</script>

<style media="screen">

</style>

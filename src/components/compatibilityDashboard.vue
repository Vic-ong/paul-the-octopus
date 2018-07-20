<template id="">
  <v-container fluid grid-list-md>
    <!--applicants-->
    <p class="display-2 mt-3">Applicant</p>
    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md3>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-text-field box
              label="Applicant Name"
              v-model="applicant.name"
            ></v-text-field>
          </v-flex>
          <div v-if="!overwrite">
            <v-flex v-for="(value, key) in applicant.attr" :key="key" d-flex>
              <v-slider thumb-label="always" color="teal"
                v-model="applicant.attr[key]"
                :label="key"
                :max="attrRange.max"
                :min="attrRange.min"
                @input="updateCalc"
              ></v-slider>
            </v-flex>
          </div>
          <div v-else>
            <v-flex v-for="(value, key) in applicant.attr" :key="key" d-flex>
              <v-slider thumb-label="always" color="teal"
                v-model="applicant.attr[key]"
                :label="key"
                :max="attrRange.max"
                :min="attrRange.min"
                @input="updateCalcOverwrite"
              ></v-slider>
            </v-flex>
          </div>
        </v-layout>
      </v-flex>

      <v-flex d-flex xs12 sm6 md3 class="ml-5">
        <v-layout row wrap>
          <v-flex d-flex>
            <v-text-field box
              label="Team Average"
            ></v-text-field>
          </v-flex>
          <div v-if="!overwrite">
            <v-flex v-for="(value, key) in scores.team" :key="key" d-flex>
              <v-slider thumb-label="always" color="indigo" readonly
                v-model="scores.team[key]"
                :label="key"
                :max="attrRange.max"
                :min="attrRange.min"
              ></v-slider>
            </v-flex>
          </div>
          <div v-else>
            <v-flex v-for="(value, key) in teamsOverwrite" :key="key" d-flex>
              <v-slider thumb-label="always" color="indigo"
                v-model="teamsOverwrite[key]"
                :label="key"
                :max="attrRange.max"
                :min="attrRange.min"
                @input="updateCalcOverwrite"
              ></v-slider>
            </v-flex>
          </div>
        </v-layout>
      </v-flex>

      <v-flex d-flex xs12 md5 class="ml-4">
        <v-card class="ml-5">
          <v-layout row wrap class="ma-5">
            <v-flex d-flex xs12>
              <p class="headline">Compatibility Score</p>
            </v-flex>
            <v-flex d-flex xs12 v-for="(value, key) in scores.compatibility" :key="key">
              <v-layout row>
                <v-flex xs5 style="margin: auto;">
                  <p class="subheading grey--text">{{ key }}</p>
                </v-flex>
                <v-flex xs5 style="margin: auto;">
                  <p class="title font-weight-bold blue--text">
                    {{ scores.compatibility[key] }} %
                  </p>
                </v-flex>
                <v-flex xs2>
                  <v-icon small color="green" v-show="scores.qualified[key]">fa-check-circle</v-icon>
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
    props: {
      overwrite: Boolean
    },
    data () {
      return {
        applicant: {},
        attrRange: {},
        teamsOverwrite: {},
        dec: 2,
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
    watch: {
      overwrite (val) {
        if (val) {
          this.teamsOverwrite = Object.assign(this.scores.team)
        } else {
          this.updateCalc()
        }
      }
    },
    computed: {
      teams () {
        return this.$store.getters.teamList
      }
    },
    methods: {
      initParams () {
        this.applicant = {
          name: 'Alex Becker',
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
      },

      updateCalcOverwrite () {
        this.scores = calculateCompatibility(this.applicant, this.teamsOverwrite)
      }

    }
  }
</script>

<style media="screen">
  div {
    text-transform: capitalize;
  }
</style>

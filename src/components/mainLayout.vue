<template id="home">
 <v-layout row wrap>
   <v-flex xs12>
     <v-btn fab large
       style="position: absolute;"
       class="mt-4 ml-4"
       slot="activator"
       v-model="overwrite"
       @click="overwrite = !overwrite"
     >
       <v-icon color="blue-grey">fingerprint</v-icon>
       <v-icon color="grey">close</v-icon>
     </v-btn>

     <header-title/>

     <v-container>
       <compatibility-dashboard :overwrite="overwrite">
       </compatibility-dashboard>
     </v-container>

     <v-footer app fixed>
       <v-spacer/>
       <span class="mr-4 caption grey--text text--darken-2">Author: Vic &copy; 2018</span>
     </v-footer>
   </v-flex>
 </v-layout>
</template>

<script type="text/javascript">
  import HeaderTitle from './headerTitle.vue'
  import CompatibilityDashboard from './compatibilityDashboard.vue'

  export default {
    components: {
      HeaderTitle,
      CompatibilityDashboard
    },
    data () {
      return {
        overwrite: false,
        menu: {
          show: false,
          flowDir: 'bottom',
          transition: 'slide-y-transition'
        }
      }
    }
  }
</script>

<style media="screen">
</style>

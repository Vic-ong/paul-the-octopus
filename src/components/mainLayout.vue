<template id="home">
 <v-layout row wrap>
   <v-flex xs12>
     <v-speed-dial open-on-hover absolute fixed
       class="ml-4 mt-4"
       v-model="menu.show"
       :direction="menu.flowDir"
       :transition="menu.transition"
     >
       <v-btn fab large
         slot="activator"
         v-model="menu.show"
       >
         <v-icon color="blue-grey">fingerprint</v-icon>
         <v-icon color="grey">close</v-icon>
       </v-btn>
       <v-btn fab color="green">
         <v-icon>edit</v-icon>
       </v-btn>
       <v-btn fab color="indigo">
         <v-icon>add</v-icon>
       </v-btn>
       <v-btn fab color="red">
         <v-icon>delete</v-icon>
       </v-btn>
     </v-speed-dial>

     <header-title/>

     <v-container>
       <compatibility-dashboard/>
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

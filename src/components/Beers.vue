<template>
  <div class="beers">
    123
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Beers',
  data() {
    return {
      currentPage : 1,
    }
  },
  methods: {
    ...mapActions([
            'GET_BEERS_FROM_API'
    ])
  },
  computed: {
    ...mapGetters([
            'BEERS'
    ]),
  },
  mounted() {
    this.GET_BEERS_FROM_API(this.currentPage);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

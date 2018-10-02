<template>
  <q-page>
    План-график исследований
    <q-list>
      <q-collapsible v-for="item in dsYears" :key="item" :label="item" icon="event" :opened="item == (new Date()).getFullYear()" separator>
      </q-collapsible>
    </q-list>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      dsYears: state => state.ds.dsYears
    })
  }
};
</script>

<style>

</style>

<template>
  <q-layout view="hHh Lpr fFf">
    <q-layout-header>
      <q-toolbar
        color="secondary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          My App
        </q-toolbar-title>

        <q-btn-group>
          <q-btn @click="onChangeMode({id: 'Directory', name: 'Системные справочники'})" label="Справочники" :class="{checked: currentMode.id === 'Directory'}"></q-btn>
          <q-btn @click="onChangeMode({id: 'Two', name: 'Заглушка 2'})" label="Two" :class="{checked: currentMode.id == 'Two'}"></q-btn>
          <!-- <q-btn @click="onChangeMode({id: 'Three', name: 'Заглушка 3'})" label="Three" :class="{checked: currentMode.id == 'Three'}"></q-btn> -->
        </q-btn-group>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-4' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header inset>{{currentMode.name}}</q-list-header>
        <q-item @click.native="onChangeAction(item.id)" v-for="item in currentActionsList" :key="item.id" :class="{checked: item.id === currentAction}" :to="{name: item.id}">
          <q-item-main :label="item.name" />
        </q-item>

        <!-- <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">
          <q-item-side icon="code" />
          <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
          <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item> -->

      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-layout-footer>
      <div>Running on Quasar v {{ $q.version }}</div>
    </q-layout-footer>

  </q-layout>
</template>

<script>
// import { openURL } from 'quasar';
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'LayoutDefault',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  computed: {
    ...mapState({
      currentMode: state => state.appMode.currentMode
    }),
    ...mapGetters({
      currentActionsList: 'appMode/currentActionsList',
      currentAction: 'appMode/currentAction'
    })
  },
  methods: {
    ...mapMutations({
      changeMode: 'appMode/changeMode',
      changeAction: 'appMode/changeAction'
    }),
    // openURL,
    // по нажатию на кнопку в тулбаре
    onChangeMode(newMode) {
      console.log(newMode);
      // debugger;
      this.changeMode(newMode);
    },
    // по нажатию на пункт акции в drawer
    onChangeAction(newAction) {
      console.log(newAction);
      // debugger;
      this.changeAction(newAction);
    }
  }
};
</script>

<style>
.q-layout-footer {
  background-color: rgb(128, 128, 128);
}

.q-toolbar>.q-btn-group>button {
  opacity: 0.6;
  font-weight: bold;
}

.q-toolbar>.q-btn-group>button.checked {
  opacity: 1;
}

.q-item {
  opacity: 0.6;
  font-weight: bold;
}

.q-item.checked {
  opacity: 1;
}

/* .q-layout-page {
  background-color: rgb(105, 105, 105);
} */

</style>

<template>
  <v-app id="inspire">
    <!-- Menu -->
    <v-navigation-drawer
      dark
      class="blue accent-4"
      width="210px" 
      v-model="drawer"
      v-if="$route.meta.public"
      expand-on-hover app
      :right="$i18n.locale=='en'? false:true"
    >
    <v-list-item class="px-2 my-n1">
      <v-list-item-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            BPI
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <template v-for="item in menu">
          <template v-if="item.user_id.includes(role)">
          <v-list-group
            v-if="item.sub_menu_status"
            :key="item.name"
            :v-model ="item.model"
            :prepend-icon="item.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </template>
            <v-list-item v-for="(child, i) in item.sub_menus" :key="i" link :to="'/' + child.link">
              <v-list-item-icon>
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
            <v-list-item :key="item.text" link :to="'/' + item.link" v-else>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- Top Bar -->
    <v-app-bar v-if="$route.meta.public" app height="50px" class="white" elevation="1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-menu rounded open-on-hover offset-y transition="slide-x-transition" bottom right v-if="Notifications.length>0">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item v-for="(item, index) in Notifications" :key="index" router :to="item.link">
              <v-list-item-action>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-tooltip bottom v-else>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template><span>No Notifications</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="logout()">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template><span>Logout</span>
      </v-tooltip>
    </v-app-bar>
    <!-- Main -->
    <v-main>
      <v-container fluid>
        <router-view :commonManage="commonManage"></router-view>
      </v-container>
    </v-main>
    <!-- Footer -->
    <!-- <v-footer app>
    </v-footer> -->
  </v-app>
</template>

<script>
import Menus from './sidemenu.js'
export default {
  data: () => ({
    menu: [],
    role:localStorage.getItem('role'),
    Notifications: [],
    drawer: null,
    langs: ['en', 'ar']
  }),
  props: {
    source: String,
    Menus: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    if(localStorage.getItem('loggedIn') == 'true'){
      this.getUser() 
    } else
      this.$router.push('/')
  },
  methods : {
    getUser() {
      this.role = 1
      localStorage.setItem('role', 1)
      localStorage.setItem('user_id', 1)
      // localStorage.setItem('user_id', response.data.id)
      this.menu = Menus
    },
    commonManage (type) {
      switch (type) {
        case 1:
          // 
          break
        case 2:
          this.getUser()
          break
      }
    },
    logout () {
      this.commonManage(1,true)
      localStorage.setItem('loggedIn', false)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('role')
      this.commonManage(1,false)
      this.$router.push({ name: 'Login' })
    },
    setLANG (params) {
      if(params == "en" || params == 'en')
        this.$vuetify.rtl = false
      else
        this.$vuetify.rtl = true
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('loggedIn') === 'true') {
      next()
    } else {
      next('/')
    }
  }
};
</script>
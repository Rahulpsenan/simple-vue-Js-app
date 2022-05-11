<template>
  <v-container fluid fill-height>
    <v-layout flex align-center justify-center wrap style="padding-top: 160px;">
      <v-flex xs12 sm8 md6 lg5>
        <v-card class="elevation-10">
          <v-card-text>
            <div class="layout column align-center">
              <div class="mr-3 hidden-sm-and-down">
              </div>
            </div>
            <v-form ref="login" lazy-validation>
              <v-text-field
                prepend-icon="mdi-account"
                label="Email"
                @input="clearMsg"
                @keyup.enter="login()"
                :rules="emailRules"
                v-model="form.email"
                :error-messages="errorMsg"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                :prepend-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="requiedRules"
                :type="show1 ? 'text' : 'password'"
                name="password"
                label="Password"
                :error-messages= "errorMsg"
                @keyup="clearMsg"
                @keyup.enter="login()"
                @click:prepend="show1 = !show1"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" @click.prevent="login">Login </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      show1: false,
      form: {},
      errorMsg: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
      ],
      requiedRules: [
        v => !!v || 'Field is required'
      ]
    }
  },
  props: {
    commonManage: Function
  },
  mounted () {
    localStorage.setItem('loggedIn', false)
    localStorage.removeItem('accessToken')
  },
  methods: {
    login () {
      if (this.$refs.login.validate()) {
        localStorage.setItem('loggedIn', true)
        localStorage.setItem('role', 1)
        localStorage.setItem('accessToken', '123')
        this.commonManage(2)
        this.$router.push('/dashboard')
      }
    },
    clearMsg () {
      this.errorMsg = ''
    }
  }
}
</script>

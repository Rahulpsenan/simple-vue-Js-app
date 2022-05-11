<template>
  <div>
    <!-- Alert -->
    <v-dialog v-model="dialog" :max-width="options.width" :persistent="true" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel">
      <v-card>
        <v-toolbar dark color="error" dense flat>
          <v-toolbar-title class="white--text">Alert</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-4">
          <v-icon color="error">mdi-delete</v-icon> <span>Are you sure you want to delete?</span></v-card-text>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click.native="agree">Yes</v-btn>
          <v-btn color="primary darken-1" text @click.native="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Loading GIF -->
    <v-dialog v-model="loading" :persistent="true">
      <v-overlay v-model="loading">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular><br>
          Loading...
        </div>
      </v-overlay>
    </v-dialog>
    <!-- Flash Message -->
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="messageType" top right>
      <v-row no-gutters>
        <v-col cols="11" style="color:white">{{ textMessage }}</v-col>
        <v-col cols="1" class="float-right"><v-icon @click="snackbar = false"> mdi-minus </v-icon></v-col>
      </v-row>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    timeout: 3000,
    snackbar: false,
    messageType: '',
    textMessage: '',
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    loading: false,
    options: {
      color: 'primary',
      width: 400,
      zIndex: 200,
      noconfirm: false,
    }
  }),
  methods: {
    confirm(options) {
      this.dialog = true;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
    open (type, data="") {
      switch (type) {
        case 1:
          this.loading = data
          break
        case 3:
          this.snackbar = true
          this.textMessage = data.message
          this.messageType = data.colour
          break
      }
    },
  }
}
</script>

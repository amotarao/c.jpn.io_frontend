const Vue = require('vue');
const VueRouter = require('vue-router');
const VueResource = require('vue-resource');

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;

const router = new VueRouter({
  history: true,
  saveScrollPosition: true
});

var LoginForm = new Vue({
  el: '#login_form',
  data: {
    input: {
      email: '',
      password: '',
      token: ''
    },
    emailStatus: '',
    passwordStatus: '',
    submitting: false, // falseでボタン有効、trueでボタン無効
  },
  created: function () {
    this.$http.get('/api/publishToken.php').then((response) => {
      this.input.token = response.body.token;
    }, (response) => {
      // error callback
    });
  },
  methods: {
    formCheck: function () {
      if ('' == this.email && '' == this.password) {
        Alert.addAlert('warning', '空欄があります');
        this.emailStatus = 'has-error';
        this.passwordStatus = 'has-error';
        return;
      } else if ('' == this.email) {
        Alert.addAlert('warning', '空欄があります');
        this.emailStatus = 'has-error';
        this.passwordStatus = '';
        return;
      } else if ('' == this.password) {
        Alert.addAlert('warning', '空欄があります');
        this.emailStatus = '';
        this.passwordStatus = 'has-error';
        return;
      } else {
        this.emailStatus = '';
        this.passwordStatus = '';
      }

      this.submit();
    },
    submit: function () {
      this.submitting = true;

      this.$http.post('/api/login.php', this.input).then((response) => {
        // success callback
      }, (response) => {
        // error callback
      });
    }
  }
})

var Alert = new Vue({
  el: '#alert',
  data: {
    alerts: []
  },
  methods: {
    addAlert: function(status, message) {
      this.alerts.push({
        status: status,
        message: message
      })
    }
  }
})

const templateLoginForm = {
  template: `<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
      <form method="POST" id="login_form" class="form-horizontal" onsubmit="return false">
        <div class="form-group" :class="emailStatus">
          <label for="input_email" class="col-sm-3 control-label">メールアドレス</label>
          <div class="col-xs-12 col-sm-9">
            <input id="input_email" type="email" name="mail" placeholder="メールアドレス" class="form-control" v-model="input.email">
          </div>
        </div>
        <div class="form-group" :class="passwordStatus">
          <label for="input_password" class="col-sm-3 control-label">パスワード</label>
          <div class="col-xs-12 col-sm-9">
            <input id="input_password" type="password" name="password" placeholder="パスワード" class="form-control" v-model="input.password">
          </div>
        </div>
        <div class="form-group">
          <div class="col-xs-12 col-sm-offset-3 col-sm-9">
            <button type="submit" class="btn btn-primary" @click="formCheck" :disabled="submitting">ログイン</button>
            <p class="help-block">パスワードの再発行は<a href="/system/forget_pass.php">こちら</a></p>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>`
}

router.map({
  '/': {
    component: templateLoginForm
  },
  '/login': {
    component: templateLoginForm
  }
})

const App = {}
router.start(App, '#app');

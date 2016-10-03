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

var Foo = {
  template: '<p>This is foo!</p>'
};

var Bar = {
  template: '<p>This is bar!</p>'
};

router.map({
  '/foo': {
    component: Foo
  },
  '/bar': {
    component: Bar
  }
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
/*
router.map({
  '/': {
    component: require('./pages/home.vue')
  },
  '/home': {
    component: require('./pages/home.vue')
  },
  '/foo': {
    component: require('./pages/foo.vue')
  },
  '/bar/:id': {
    component: require('./pages/bar.vue')
  }
})
*/
//const App = Vue.extend(require('./app.vue'))
var App = Vue.extend({});
router.start(App, '#app');

/*
var test = new Vue({
  el : '#test',
  data: {
    test: ''
  },
  ready: function() {
    this.$http({url: 'http://ip.jsontest.com/', method: 'GET'}).then(function (response) {
//      console.log(response);
      this.test = response.body.ip;
    }, function (response) {
      console.log(response);
    });
  }
});
*/

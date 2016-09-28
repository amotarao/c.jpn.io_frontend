const Vue = require('vue');
const VueRouter = require('vue-router');
const VueResource = require('vue-resource');

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  history: true,
  saveScrollPosition: true
})

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

const App = Vue.extend(require('./app.vue'))
router.start(App, '#app')

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

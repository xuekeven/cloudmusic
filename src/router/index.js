import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import( '../views/home/Home.vue');
const MyMusic = () => import( '../views/myMusic/MyMusic.vue');
const Singer = () => import( '../views/singer/Singer.vue');
const SingList = () => import( '../views/singList/SingList.vue');
const Rank = () => import( '../views/rank/Rank.vue');
const SearchResult = () => import( '../components/headers/serach/SearchResult.vue');
const ToLogin = () => import( '../views/toLogin/ToLogin.vue');

const MvDet = () => import( '../components/mv/MvDet.vue');
const SongDet = () => import( '../components/song/songDet/SongDet.vue');
const SingerDet = () => import( '../components/singer/SingerDet.vue')
const SingListDet = () => import( '../views/singListChildren/SingListDet.vue');
const newSongInfo = () => import( '../views/homeChildren/newSongInfo.vue');

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/mymusic', component: MyMusic },
  { path: '/singer', component: Singer },
  { path: '/singlist', component: SingList },
  { path: '/rank', component: Rank },
  { path: '/search/result', component: SearchResult },
  { path: '/login', component: ToLogin },
  { path: '/mvdet', component: MvDet },
  { path: '/songs/detail', component: SongDet },
  { path: '/singer/detail', component: SingerDet },
  { path: '/singlist/detail', component: SingListDet },
  { path: '/newSongInfo', component: newSongInfo }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 未登陆验证 阻止跳转到我的音乐
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path === '/mymusic' && window.sessionStorage.getItem('profile') === null) {
    next('/login')
  }
  next()
})

export default router
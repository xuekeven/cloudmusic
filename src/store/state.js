export default {
  // 主页菜单导航的 index
  activeIndex: '',
  // cookie
  cookie: false,
  // 用户信息
  profile: {
    nickName: '',
    avatarUrl: '',
    userId: ''
  },
  // 新碟数据 数组
  resSongs: [],
  // 专辑 id
  albumId: '',
  // 歌手 id
  singerId: '',
  // 歌单 id
  playListId: '',
  // 歌曲 id
  songId: '',
  // 音乐播放地址
  musicUrl: { 
    url: '',
    id: '' },
  // 当前播放音乐信息
  currentMusicInfo: {
    al: {},
    name: '',
    picUrl: '',
    ar: []
  },
  // 音乐播放列表音乐 id
  musicPlayListId: [],
  // mv id
  mvId: '',
  // 用户搜索信息
  searchValue: ''
}
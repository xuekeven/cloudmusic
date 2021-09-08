<template>
  <div>
    <!-- 控制布局 -->
    <div class="container">
      <el-row>
        <!-- logo -->
        <el-col :span="3" :offset="3" class="col-left">
          <h1 class="logo" @click="setActiveIndex('/home')">
            <a href="/home"><img src="../../assets/logo.png"><span>云音乐</span></a>
          </h1>
        </el-col>
        <!-- 菜单栏 -->
        <el-col :span="8" class="col-main">
          <el-menu
            mode="horizontal"
            background-color="#545c64"
            text-color="#DFDFDF"
            active-text-color="#fff"
            :default-active="this.$store.state.activeIndex"
            router="true"
            @select="setActiveIndex"
          >
            <el-menu-item index="/home" class="link-div">发现音乐</el-menu-item>
            <el-menu-item index="/mymusic" class="link-div">我的音乐</el-menu-item>
            <el-menu-item index="/singer" class="link-div">歌手</el-menu-item>
            <el-menu-item index="/singlist" class="link-div">歌单</el-menu-item>
            <el-menu-item index="/rank" class="link-div">排行</el-menu-item>
          </el-menu>
        </el-col>
        <!-- 搜索与登录 -->
        <el-col :span="8" class="col-right">
          <Search />
          <div class="login" @click="login" v-if="isAvatar">登录</div>
          <div class="avatar" v-else @mouseover="showUserInfo">
            <img :src="avatarUrl" alt="" />
            <span>{{ nickName }}</span>
            <!-- 用户信息 -->
            <keep-alive>
              <UserInfo>
                <template #level>
                  我的等级是：<span class="infoFont">{{ userInfoObj.level }}级</span>
                </template>
                <template #listenSongs>
                  已听歌曲数量：<span class="infoFont">{{ userInfoObj.listenSongs }}首</span>
                </template>
                <template #createDays>
                  使用天数：<span class="infoFont">{{ userInfoObj.createDays }}天</span>
                </template>
              </UserInfo>
            </keep-alive>
          </div>
          <el-button type="primary" size="mini" @click="quit" v-show="isButton">退出</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 登录对话框 -->
    <LoginDialog
      v-show="isShow"
      ref="loginRef"
      :ctrIsShow="isShow"
      @ctrClose="ctrClosed"
      @ctrLoginBtn="ctrLogin" 
    />
    <!-- 播放控件 -->
    <PlayBar v-show="PlayBarIsShow" class="play-bar" />
    <!-- 回到顶部 -->
    <el-backtop target=".contain-top" :bottom='80'>
      <div><i class="iconfont icon-huidaodingbu"></i></div>
    </el-backtop>
  </div>
</template>

<script>
import LoginDialog from "./login/Login.vue"; // 导入登录框组件
import Search from "./serach/Search.vue"; // 导入搜索框组件
import UserInfo from "./userInfo/userInfo.vue"; // 导入用户详情信息组件
import NewSongInfo from "../../views/homeChildren/newSongInfo.vue"; // 新碟详情组件
import PlayBar from "../play/PlayBar.vue"; // 引入播放控件

import { removeCookie } from "../../utils/cookie";
import { getUserInfo, getQuit } from "../../network/login";

export default {
  name: "headerMenu",
  components: {
    LoginDialog,
    Search,
    UserInfo,
    NewSongInfo,
    PlayBar,
  },
  data() {
    return {
      // 登录弹框显示与隐藏
      isShow: false, 
      // 是否显示登录后头像
      isAvatar: true,
      // 头像地址
      avatarUrl: "",
      // 用户昵称
      nickName: "",
      // 用户详情
      userInfoObj: {
        level: 0,
        listenSongs: null,
        createDays: null,
      },
      // 退出按钮隐藏与显示
      isButton: false,
      // 播放控件 显示与隐藏
      PlayBarIsShow: true,
    };
  },
  created() {
    this.isLogin();
  },
  methods: {
    // 刷新页面判断用户是否登录
    isLogin() {
      // console.log(this.$store.state.profile == null);
      if (this.$store.state.profile === null) {
        return;
      } else {
        this.isAvatar = false;
        this.isButton = true;
        this.avatarUrl = this.$store.state.profile.avatarUrl;
        this.nickName = this.$store.state.profile.nickName;
        // console.log(this.$store.state.profile.nickName);
      }
    },
    // 点击登录显示登录框
    login() {
      this.isShow = true;
      // console.log(this.isShow)
    },
    // 登录框 叉号事件
    ctrClosed() {
      this.isShow = false;
      this.isAvatar = true;
      this.isButton = false;
    },
    // 登录框 登陆事件
    ctrLogin() {
      this.isShow = false;
      this.isAvatar = false;
      this.isButton = true;
      this.avatarUrl = this.$store.state.profile.avatarUrl;
      this.nickName = this.$store.state.profile.nickName;
    },
    // 鼠标经过展示用户信息下拉框
    async showUserInfo() {
      if (this.userInfoObj.level === 0) {
        const { data: res } = await getUserInfo(
          this.$store.state.profile.userId
        );
        // console.log(res)
        this.userInfoObj.level = res.level;
        this.userInfoObj.listenSongs = res.listenSongs;
        this.userInfoObj.createDays = res.createDays;
      }
    },
    // 点击按钮退出登录
    async quit() {
      const { data: res } = await getQuit();
      // console.log(res)
      if (res.code === 200) {
        this.$message.info("已退出登录");
        // 退出登录 清空状态及本地数据
        this.isAvatar = true;
        this.isButton = false;
        window.sessionStorage.removeItem("profile");
        // console.log(window.sessionStorage.getItem("profile"));
        removeCookie("__remember_me");
        if (this.$route.path === "/mymusic") {
          // 退出登录跳转至 home
          this.$router.push("/home");
          window.sessionStorage.setItem("activeIndex", "/home");
          this.$store.state.activeIndex = "/home";
        }
      }
    }, 
    // 改变 activeIndex
    setActiveIndex(index) {
      this.$store.state.activeIndex = index;
      // 将 activeIndex 保存至本地
      window.sessionStorage.setItem("activeIndex", index);
    },
  }
};
</script>
    
<style lang='less' scoped>
.container {
  height: 69px;
  background-color: #545c64;
  width: 100%;
}

.logo {
  // width: 176px;
  height: 69px;
  text-align: center;
  a {
    text-decoration: none;
    img {
      height: 69px;
      width:  69px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      font-size: 1.2rem;
    }
  }
}

.el-menu {
  border-bottom: none;
}

.el-menu-item {
  padding: 0 30px;
  height: 69px;
  line-height: 69px;
}

.el-input {
  width: 300px;
}

.col-right {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 69px;
  .login {
    margin: 0 30px;
    &:hover {
      color: #fff;
      cursor: pointer;
    }
  }
}

.avatar img {
  margin-left: 20px;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;
  // vertical-align: middle;
}
.avatar span {
  float: right;
  margin-left: 5px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #d6dfd7;

  &:hover {
    color: #fff;
    text-decoration-line: underline;
  }
}

.infoFont {
  font-size: 20px;
}
.el-menu-item {
  padding: 0;
  
}

.link-div {
    padding: 0 30px;
    user-select: none;
}

.userInfoBox {
  display: none;
}

.avatar:hover .userInfoBox {
  display: block;
}

.el-button {
  margin-left: 20px;
}

.play-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99999;
}
.mylink {
  width: 100%;
  height: 40px;
  margin-top: 60px;
  padding-bottom: 30px;
  border-top: 1px solid #666;
  background-color: #545C64;
  display: flex;
  flex-direction: column;
  a {
    display: flex;
    align-items: center;
    margin: 10px 0 0 120px;
    text-decoration: none;
    color: #333;
    font-size: 16px;
    i:first-child {
      font-size: 20px;
      margin-right: 10px;
    }
    i:last-child {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
import { getSongsDet } from "../network/Sing"; // 歌曲详情 网络请求

export default {
  async getSongsDetActions({ commit }, id) {
    const { data: res } = await getSongsDet(id)
    commit('songDetMutations', res.songs[0])
  }
}
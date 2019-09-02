/* eslint-disable prettier/prettier */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
const path = require('path')

Vue.use(Vuex)
/**
 *  require.context函数遍历modules文件夹的所有文件一次性导入到index.js中
require.context函数接受三个参数
directory {
  String
}
useSubdirectories {
  Boolean
} - 是否遍历文件的子目录

regExp {
  RegExp
} - 匹配文件的正则 */
const files = require.context('./modules', false, /\.js$/)

let modules = {}

files.keys().forEach(key => {
  //获取名字，比如permission
  let name = path.basename(key, '.js')
  /* 同时files作为一个函数, 也接受一个req参数, 这个和resolve方法的req参数是一样的, 即匹配的文件名的相对路径, 而files函数返回的是一个模块*/
  modules[name] = files(key).default || files(key)
})
const store = new Vuex.Store({
  modules,
  getters
})
export default store
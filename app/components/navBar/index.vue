<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-05-14 15:55:12
 * @LastEditTime: 2019-11-15 19:09:13
 * @LastEditors: jiannan.lv
 -->
<template>
  <ul class="nav-wrap">
    <li v-for="item in navConfig"
        :key="item.path"
        active-class='aaa'>
      <router-link v-if="item.path"
                   :to="item.path">
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
      </router-link>
      <div v-else
           @click="() => handleTonggleClick(item)">
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
        <ul v-if="item.children && item.extend"
            @click="e => handleStop(e)">
          <li v-for="childItem in item.children"
              :key="childItem.path"
              active-class='aaa'>
            <router-link v-if="childItem.path"
                         :to="childItem.path">
              <i :class="childItem.icon"></i>
              <span>{{childItem.name}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
  import navConfig from "./navConfig";
  // css
  import "./style.scss";
  export default {
    data () {
      return {
        navConfig
      };
    },
    created () {
      const { path } = this.$route;
      this.initNavData({}, this.navConfig, path);
    },
    methods: {
      /**
       * @description: 导航栏的展开与收起
       * @param : 
       * @return: 
       */
      handleTonggleClick (data) {
        const extendBol = !data.extend;
        this.$set(data, 'extend', extendBol);
      },
      /**
       * @description: 初始渲染时，如果是下拉框的，展开下拉框
       * @param : 
       * @return: 
       */
      initNavData (parentNav, data, path) {
        data.forEach(nav => {
          if (nav.children) {
            this.initNavData(nav, nav.children, path);
          } else {
            if (parentNav.hasOwnProperty('extend') && nav.path === path) {
              parentNav.extend = true;
              return false;
            }
          }
        });
      },
      /**
       * @description: 组织冒泡
       * @param : 
       * @return: 
       */
      handleStop (e) {
        const event = e || window.event;
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };
</script>
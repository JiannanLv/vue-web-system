<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-11-15 17:04:03
 * @LastEditTime: 2019-11-27 11:48:39
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="canvas2">
    <canvas class="rain-canvas"
            ref="rainCanvas" />
  </div>
</template>

<script>
  // css
  import './style.scss';
  export default {
    name: 'RainCanvas',
    data () {
      return {
        ctx: '',
        w: 0,
        h: 0,
        clearColor: 'rgba(0, 0, 0, .1)', //画板背景,注意最后的透明度0.1 这是产生叠加效果的基础
        rainPoints: [],
        ripplings: []
      };
    },
    mounted () {
      this.init();
      this.makeRainPoints();
      this.rainAnimate();
    },
    methods: {
      /**
       * @description: 产生随机数
       * @param : 
       * @return: 
       */
      makeRandom (min, max) {
        return Math.random() * (max - min) + min;
      },
      // **********************************************************画雨滴***********************************************************
      /**
       * @description: 初始化水滴
       * @param : 
       * @return: 
       */
      init () {
        const canvas = this.$refs.rainCanvas;
        this.ctx = canvas.getContext("2d");
        this.w = canvas.offsetWidth;
        this.h = canvas.offsetHeight;//设置canvas宽、高
        canvas.width = this.w;
        canvas.height = this.h;
      },
      /**
       * @description: 批量生成雨滴
       * @param : 
       * @return: 
       */
      makeRainPoints () {
        this.rainPoints = [];
        for (let i = 0; i < 50; i++) {
          const pointItem = {
            x: this.makeRandom(0, this.w), //雨滴的位置x
            y: 0, //雨滴的位置y
            color: 'hsl(180, 100%, 50%)', //雨滴颜色 长方形的填充色
            vy: this.makeRandom(4, 5), //雨滴下落速度
            hit: this.makeRandom(this.h * .8, this.h * .9), //下落的最大值
            size: 2 //长方形宽度
          };
          const ripplingItem = {
            x: pointItem.x,//涟漪x坐标
            y: this.makeRandom(this.h * .8, this.h * .9),//涟漪y坐标
            w: 2, //椭圆形涟漪宽
            h: 1, //椭圆涟漪高
            vw: 3, //宽度增长速度
            vh: 1, //高度增长速度
            a: 1, //透明度
            va: 0.96//涟漪消失的渐变速度
          };
          this.drawRain(pointItem, i);
          this.rainPoints.push(pointItem);
          this.ripplings.push(ripplingItem);
        }

        // this.rainPoints.push(pointItem);
        // this.rainPoint = { ...pointItem };
      },
      /**
       * @description: 渲染雨滴
       * @param : 
       * @return: 
       */
      drawRain (point, index) {
        if (point.y < point.hit) {
          this.ctx.fillStyle = point.color;
          this.ctx.fillRect(point.x, point.y, point.size, point.size * 5);//绘制长方形，通过多次叠加长方形，形成雨滴下落效果
        }
        this.rainUpdate(point, index);//更新位置
      },
      /**
       * @description: 更新雨滴位置
       * @param : 
       * @return: 
       */
      rainUpdate (point, index) {
        if (point.y < point.hit) {
          point.y += point.vy;//未达到底部，增加雨滴y坐标
        } else {
          // this.drawRippling(this.ripplings[index], index);
          this.rainPoints[index] = {
            x: this.makeRandom(0, this.w), //雨滴的位置x
            y: 0, //雨滴的位置y
            color: 'hsl(180, 100%, 50%)', //雨滴颜色 长方形的填充色
            vy: this.makeRandom(4, 5), //雨滴下落速度
            hit: this.makeRandom(this.h * .8, this.h * .9), //下落的最大值
            size: 2 //长方形宽度
          }
        }
      },
      // *******************************************************画涟漪*****************************************************
      /**
       * @description: 画涟漪
       * @param : 
       * @return: 
       */
      drawRippling (point, i) {
        this.ctx.beginPath();
        this.ctx.moveTo(point.x, point.y - point.h / 2);
        //绘制右弧线
        this.ctx.bezierCurveTo(
          point.x + point.w / 2, point.y - point.h / 2,
          point.x + point.w / 2, point.y + point.h / 2,
          point.x, point.y + point.h / 2);
        //绘制左弧线
        this.ctx.bezierCurveTo(
          point.x - point.w / 2, point.y + point.h / 2,
          point.x - point.w / 2, point.y - point.h / 2,
          point.x, point.y - point.h / 2);

        this.ctx.strokeStyle = 'hsla(180, 100%, 50%, ' + point.a + ')';
        this.ctx.stroke();
        this.ctx.closePath();
        this.updateRippling(point, i);//更新坐标
      },
      /**
       * @description: 更新涟漪
       * @param : 
       * @return: 
       */
      updateRippling (point, i) {
        if (point.a > .03) {
          point.w += point.vw;//宽度增长
          point.h += point.vh;//高度增长
          if (point.w > 100) {
            point.a *= point.va;//当宽度超过100，涟漪逐渐变淡消失
            point.vw *= .98;//宽度增长变缓慢
            point.vh *= .98;//高度增长变缓慢
          } else {
            // this.updateRippling(point, i)
          }

        } else {
          this.ripplings[i] = {
            x: this.rainPoints[i].x,//涟漪x坐标
            y: this.makeRandom(this.h * .8, this.h * .9),//涟漪y坐标
            w: 2, //椭圆形涟漪宽
            h: 1, //椭圆涟漪高
            vw: 3, //宽度增长速度
            vh: 1, //高度增长速度
            a: 1, //透明度
            va: 0.96//涟漪消失的渐变速度
          }
        }
      },
      /**
       * @description: 动画
       * @param : 
       * @return: 
       */
      rainAnimate () {
        this.ctx.fillStyle = this.clearColor;//每一帧都填充背景色
        this.ctx.fillRect(0, 0, this.w, this.h);//填充背景色，注意不要用clearRect，否则会清空前面的雨滴，导致不能产生叠加的效果
        for (let i = 0; i < this.rainPoints.length; i++) {
          this.drawRain(this.rainPoints[i], i);//绘制雨滴
          // this.drawRippling(this.ripplings[i], i);//绘制雨滴
        }
        requestAnimationFrame(this.rainAnimate);//控制动画帧
      }
    }
  }
</script>

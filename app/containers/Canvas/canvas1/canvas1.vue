<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-11-15 17:04:03
 * @LastEditTime: 2019-12-02 18:13:34
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="canvas1">
    <canvas class="canvas"
            ref="canvas"
            @mousemove="mouseMove($event)" />
  </div>
</template>

<script>
  // css
  import './style.scss';
  export default {
    name: 'Canvas1',
    data () {
      return {
        ctx: '',
        w: 0,
        h: 0,
        points: [],
        timer: '',
        mPoint: {
          isStart: false,
          x: 0,
          y: 0,
          xa: 2 * Math.random() - 1,
          ya: 2 * Math.random() - 1,
          max: 100,
          color: '#ffffff',
        }
      };
    },
    mounted () {
      window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
      })()
      this.init();
    },
    methods: {
      /**
       * @description: canvas初始化
       * @param : 
       * @return: 
       */
      init () {
        const canvas = this.$refs['canvas'];
        this.ctx = canvas.getContext("2d");
        this.w = canvas.offsetWidth;
        this.h = canvas.offsetHeight;
        canvas.width = this.w
        canvas.height = this.h
        this.makePoints();
        this.loop();
      },
      /**
       * @description: 实例化点
       * @param : 
       * @return: 
       */
      makePoints () {
        for (let i = 0; i < 40; i++) {
          const pointItem = {
            x: Math.random() * this.w,
            y: Math.random() * this.h,
            r: 1 + Math.random() * 2,
            sx: Math.random() * 2 - 1,
            sy: Math.random() * 2 - 1
          };
          this.points.push(pointItem);
        }
        this.drawPoints();
      },
      /**
       * @description: 点移动
       * @param : 
       * @return: 
       */
      pointMove (point) {
        point.x += point.sx
        point.y += point.sy
        if (point.x > this.w) point.sx = -Math.abs(point.sx)
        else if (point.x < 0) point.sx = Math.abs(point.sx)
        if (point.y > this.h) point.sy = -Math.abs(point.sy)
        else if (point.y < 0) point.sy = Math.abs(point.sy)
      },
      /**
       * @description: 单独画点
       * @param : 
       * @return: 
       */
      drawSinglePoint (point) {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, point.r, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fillStyle = '#aaa';
        this.ctx.fill();
      },
      /**
       * @description: 画线
       * @param : 
       * @return: 
       */
      drawLine (point1, point2) {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          const alpha = (100 - d) / 100 * 1;
          this.ctx.beginPath();
          this.ctx.moveTo(point1.x, point1.y);
          this.ctx.lineTo(point2.x, point2.y);
          this.ctx.closePath();
          this.ctx.strokeStyle = 'rgba(170, 170, 170, ' + alpha + ')';
          this.ctx.strokeWidth = 0.5;
          this.ctx.stroke();
        }
      },
      /**
       * @description: 批量画点
       * @param : 
       * @return: 
       */
      drawPoints () {
        // mPoint.isStart ? [mPoint] : []
        const points = [...this.points.concat(this.mPoint.isStart ? [this.mPoint] : [])];
        this.ctx.clearRect(0, 0, this.w, this.h) //清空画布
        for (let i = 0; i < points.length; i++) {
          this.pointMove(points[i]);
          this.drawSinglePoint(points[i]);
          for (let j = i + 1; j < points.length; j++) {
            this.drawLine(points[i], points[j])
          }
        }
      },
      /**
       * @description: 循环画点
       * @param : 
       * @return: 
       */
      loop () {
        requestAnimationFrame(this.loop)
        this.drawPoints()
      },
      /**
       * @description: 鼠标拖拽画点
       * @param : 
       * @return: 
       */
      mouseMove (e) {
        const event = e || window.event;
        const ox = e.offsetX;
        const oy = e.offsetY;
        this.mPoint = Object.assign({}, { ...this.mPoint }, {
          isStart: true,
          x: ox,
          y: oy,
        });
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.mPoint.isStart = false;
        }, 10000);
      }
    }
  }
</script>

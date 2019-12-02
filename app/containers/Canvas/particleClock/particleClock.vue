<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-11-29 14:20:27
 * @LastEditTime: 2019-12-02 17:06:28
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="particle-clock">
    <canvas class="clock-canvas"
            id="clockCanvas"
            ref="clockCanvas" />
  </div>
</template>

<script>
  // css
  import './style.scss';
  export default {
    name: 'ParticleClock',
    data () {
      return {
        canvas: '',
        ctx: '',
        bgGrad: true,
        valentine: false,
        gradient: '',
        text: '',
        height: 400,
        textSize: 140,
        particles: [],
        particleColor: 'hsla(0, 0%, 100%, 0.3)',
        width: 800,
        msgTime: 100, // time to show a message before returning to clock
        updateColor: true, // update color of gradient / particles with time?
        MIN_HEIGHT: 400,
        MIN_WIDTH: 800,
        PARTICLE_NUM: 600,
        FRAME_RATE: 100,
        RADIUS: Math.PI * 2
      };
    },
    mounted () {
      this.init();
    },
    methods: {
      /**
       * @description: 初始化画布
       * @param : 
       * @return: 
       */
      init () {
        // this.canvas = this.$refs.clockCanvas;
        this.canvas = document.getElementById('clockCanvas');
        if (this.canvas === null || !this.canvas.getContext) {
          return;
        }
        this.setDimensions();
        this.ctx = this.canvas.getContext("2d");
        for (let i = 0; i < this.PARTICLE_NUM; i++) {
          this.particles[i] = this.makeParticle();
        }
        this.setDefaultStyles();
        // let's do this
        setInterval(this.loop, this.FRAME_RATE);
      },
      /**
       * @description: 设置画布尺寸
       * @param : 
       * @return: 
       */
      setDimensions () {
        this.width = Math.max(window.innerWidth - 250, this.MIN_WIDTH);
        this.height = Math.max(window.innerHeight, this.MIN_HEIGHT);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
      },
      /**
       * @description: Create new particles
       * @param : 
       * @return: 
       */
      makeParticle () {
        // random starting point
        const range = Math.random() * 180 / Math.PI;
        // how far away from text should the particles begin?
        const spread = this.canvas.height;
        // random size of particle
        const size = Math.random() * 7;
        const singleParticle = {
          delta: 0.25,
          x: 0,
          y: 0,
          // starting positions
          px: (this.canvas.width / 2) + (Math.cos(range) * spread),
          py: (this.canvas.height / 2) + (Math.sin(range) * spread),

          velocityX: Math.floor(Math.random() * 10) - 5,
          velocityY: Math.floor(Math.random() * 10) - 5,

          size: size,
          origSize: size,

          inText: false
        };
        return singleParticle;
      },
      /**
       * @description: 
       * @param : 
       * @return: 
       */
      setDefaultStyles () {
        this.textSize = 140;
        // particle color
        this.particleColor = 'hsla(0, 0%, 100%, 0.3)';
        // color stops
        const gradientStops = {
          0: '#333333',
          0.5: '#222222'
        };
        // create gradient
        this.setGradient(gradientStops);
      },
      /**
       * @description: 
       * @param : 
       * @return: 
       */
      setGradient (gradientStops) {
        // create gradient
        this.gradient = this.ctx.createRadialGradient(this.width / 2, this.height / 2, 0, this.width / 2, this.height / 2, this.width);

        // iterate through colorstops
        for (const position in gradientStops) {
          const color = gradientStops[position];
          this.gradient.addColorStop(position, color);
        }
      },
      /**
       * @description: 循环
       * @param : 
       * @return: 
       */
      loop () {
        // clear out text
        this.ctx.clearRect(0, 0, this.width, this.height);

        const time = this.getTime(true);

        // draw text on canvas
        const color = time.hours + time.minutes + time.seconds;
        this.setStyles(color);
        const text = `${time.timeString}00000`;

        this.ctx.fillStyle = "rgb(255, 255, 255)";
        this.ctx.textBaseline = "middle";
        this.ctx.font = `${this.textSize}px Avenir`;
        this.ctx.fillText(text, (this.width - this.ctx.measureText(text).width) * 0.65, this.height * 0.5);

        // copy pixels
        const imgData = this.ctx.getImageData(0, 0, this.width, this.height);

        // clear canvas, again
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (this.bgGrad === true) {
          // draw gradient
          this.ctx.fillStyle = this.gradient;
          this.ctx.fillRect(0, 0, this.width, this.height);
        }
        for (let i = 0; i < this.particles.length; i++) {
          let p = this.particles[i];
          p.inText = false;
        }
        this.particleText(imgData);
      },
      /**
       * @description: 获取时间
       * @param : 
       * @return: 
       */
      getTime (amPM) {
        const date = new Date();
        let hours = date.getHours();
        const timeOfDay = '';

        if (amPM) {
          // hours = (hours > 12) ? hours -= 12 : hours;
          hours = (hours == 0) ? 12 : hours;
        } else {
          hours = this.pad(hours);
        }

        const minutes = date.getMinutes() < 10 ? this.pad(date.getMinutes()) : date.getMinutes();
        const seconds = date.getSeconds() < 10 ? this.pad(date.getSeconds()) : date.getSeconds();
        return {
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          timeString: `${hours} : ${minutes} : ${seconds}`
        };
      },
      /**
       * @description: 
       * @param : 
       * @return: 
       */
      pad (number) {
        return `0${number}`.substr(0);
      },
      /**
       * @description: 
       * @param : 
       * @return: 
       */
      setStyles (hue) {
        // color stops
        const gradientStops = {
          0: 'hsl(' + hue + ', 100%, 100%)',
          0.5: 'hsl(' + hue + ', 10%, 50%)'
        };

        // change particle color
        this.particleColor = 'hsla(' + hue + ', 10%, 50%, 0.3)';

        // create gradient
        this.setGradient(gradientStops);
      },
      /**
       * @description: 
       * @param : 
       * @return: 
       */
      particleText (imgData) {
        const pxls = [];
        for (let w = this.width; w > 0; w -= 6) {
          for (let h = 0; h < this.width; h += 6) {
            const index = (w + h * (this.width)) * 4;
            if (imgData.data[index] > 10) {
              pxls.push([w, h]);
            }
          }
        }

        let count = pxls.length;
        for (let i = 0; i < count && i < this.particles.length; i++) {
          try {
            const p = this.particles[i];
            let X = (pxls[count - 1][0]) - p.px;
            let Y = (pxls[count - 1][1]) - p.py;
            // tangent
            const T = Math.sqrt(X * X + Y * Y);

            // arctangent
            const A = Math.atan2(Y, X);

            // cosine
            const C = Math.cos(A);

            // sine
            const S = Math.sin(A);

            // set new postition
            p.x = p.px + C * T * p.delta;
            p.y = p.py + S * T * p.delta;

            // set previous positions
            p.px = p.x;
            p.py = p.y;

            p.inText = true;

            // draw the particle
            this.draw(p);

            const newSize = p.size - 0.5;
            if (newSize > p.origSize && newSize > 0) {
              p.size = newSize;
            }
          } catch (e) {
            // console.log(e);
          }
          count--;
        }
      },
      /**
       * @description: 
       * @param : 
       * @return: 
       */
      draw (p) {
        this.ctx.fillStyle = this.particleColor;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, this.RADIUS, true);
        this.ctx.closePath();
        this.ctx.fill();
      }
    }
  }
</script>

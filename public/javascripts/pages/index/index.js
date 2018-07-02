const _ = require('lodash');
const Vue = require('vue/dist/vue');

require('./index.sass');
let template = require('./index.html');

let app = new Vue({
    el: '#app',
    template,
    data: {
        particles: [],
    },

    mounted() {
        //this.initCanvas();
        //this.wavy();
    },

    methods: {
        initCanvas() {
            let c = document.getElementById('wave');

            let width = 800;
            let height = 600;

            c.width = width*2
            c.height = height*2;

            c.style.width = `${width}px`;
            c.style.height = `${height}px`;

            let ctx = c.getContext('2d');
            ctx.scale(2, 2);
            this.ctx = ctx;
        },

        wavy() {
            let particles = this.particles = [];
            for (let i = 0; i < 100; ++i) {
                particles.push([]);
                for (let j = 0; j < 100; ++j) {
                    let x = i;
                    let y = j;
                    let z = (Math.sin(Math.PI*2/30*i) + Math.sin(Math.PI*2/30*j))/2;
                    particles[i].push({x, y, z});

                }
            }

            _.each(particles, (line) => {
                _.each(line, (d) => {
                    console.log(d.x, d.y, d.z);
                });
            });
        }
    }
});

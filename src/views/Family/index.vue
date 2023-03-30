<template>
    <div id="app">
      <label>
        <input type="checkbox" v-model="landscape" value="0">
      </label>
      <TreeChart :json="data" :class="{landscape: landscape.length}" @click-node="clickNode" />
      <div class="gl_prs_ctn" :style='[contextstyle]'>
          <ul class='gl_prs_li'>
              <li >add</li>
              <li >detail</li>
              <li >edit</li>
              <li >delete</li>
          </ul>
    </div>  
    </div>
  </template>
  
  <script>
  import TreeChart from '@/components/TreeChart.vue';
  
  export default {
    name: 'app',
    components: {
      TreeChart
    },
    data() {
      return {
        landscape: [],
        data: {
          name: 'root',
          image_url: "https://static.refined-x.com/static/avatar.jpg",
          class: ["rootNode"],
          children: [
            {
              name: 'children1',
              image_url: "https://static.refined-x.com/static/avatar.jpg"
            },
            {
              name: 'children2',
              image_url: "https://static.refined-x.com/static/avatar.jpg",
              // mate: [
              //   {
              //     name: 'mate',
              //     image_url: "https://static.refined-x.com/static/avatar.jpg"
              //   }
              // ],
              children: [
                {
                  name: 'grandchild',
                  image_url: "https://static.refined-x.com/static/avatar.jpg"
                },
                {
                  name: 'grandchild2',
                  image_url: "https://static.refined-x.com/static/avatar.jpg"
                },
                {
                  name: 'grandchild3',
                  image_url: "https://static.refined-x.com/static/avatar.jpg"
                }
              ]
            }
          ]
        },
        contextstyle: {
          display: 'none',
          right: '0px',
          top: '0px',
          left: '0px',
          bottom: '0px',
        }, 
      }
    },
    created(){
      console.log("created")
      document.oncontextmenu = ()=>{return false}
      document.addEventListener("click", (event) => {
            if(this.contextstyle.display == 'block'){
                this.contextstyle.display = 'none'
            }
      })
    },
    // methods: {
    //   clickNode: function(node){
    //     // eslint-disable-next-line
    //     console.log("yes,node")
    //   }
    // }
    methods: {
      clickNode(node){
        if(window.event.x + 188 > document.documentElement.clientWidth){
            this.contextstyle.left = 'unset';
            this.contextstyle.right = document.documentElement.clientWidth - window.event.x + 'px';
        }else{
            this.contextstyle.left = window.event.x + 'px';
        }
        if(window.event.y + 166 > document.documentElement.clientHeight){
            this.contextstyle.top = 'unset';
            this.contextstyle.bottom = document.documentElement.clientHeight - window.event.y + 'px';
        }else{
            this.contextstyle.top = window.event.y + 'px';
        }                       
        this.contextstyle.display = 'block';
      },
    }
  }
  </script>
  
  <style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  #app .avat{border-radius: 2em;border-width:2px;}
  #app .name{font-weight:700;}
  #app .rootNode .name{
    color: red;
  }
  
  .foot {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #333;
      padding: 24px;
      overflow: hidden;
      color: #999;
      font-size: 14px;
      text-align: center;
  }
  .foot a{color:#fff;margin:0 .5em}
  .gl_prs_ctn{
      width: 188px;
      background: rgb(255, 255, 255);
      box-shadow: rgba(0, 0, 0, 0.075) 0px 1px 1px inset, rgba(102, 175, 233, 0.6) 0px 0px 8px;
      z-index: 99999;
      position: fixed;
      padding: 10px;
      box-sizing: content-box;
      height: 142px;
}
  .gl_prs_li{padding: unset;margin: unset;}
  .gl_prs_li>li{
    cursor: pointer;   
    list-style: none;
    border-bottom: 1px solid #efefef;
    padding: 7px 10px;
  }
  li:last-child { border: unset }
  li:hover{
      background: #ccc;
      color: #fff;
  }
  </style>
  
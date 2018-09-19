<template>
  <div id="app">
    <h2>Welcome to Fx`s clock.</h2>
    <button v-on:click="set">setting</button>
    <button v-on:click="start">start</button>
  <!--   <button v-on:click="pause">pause</button> -->
    <button v-on:click="stop">stop</button>
    <div id="set" v-show="showsetpan">
        <p>please set your clock mode</p>
        <span>working time</span>
        <select v-model="worktime">
            <option v-for="item in worktlist" v-bind:value="item">{{item}}</option>
        </select>
         <select v-model="worktimeMode">
            <option v-for="item in worktmlist" v-bind:value="item">{{item}}</option>
        </select>
        <br>
        <span>pause time</span>
        <select v-model="pausetime">
            <option v-for="item in pausetlist" v-bind:value="item">{{item}}</option>
        </select>
         <select v-model="pausetimeMode">
            <option v-for="item in pausetmlist" v-bind:value="item">{{item}}</option>
        </select>
        <br>
        <span>repeats</span> 
        <select v-model="repeats">
            <option v-for="item in repeatlist" v-bind:value="item">{{item}}</option>
        </select>
        <button v-on:click="setok">ok</button>
    </div>
    <p v-show="ok">{{curname}}:工作{{worktime+worktimeMode}} 休息{{pausetime+pausetimeMode}} 重复{{repeats}}轮</p>
    <div id="cur" v-show="stat">
      <p>共：<span class="alert-red">{{repeats}}</span>轮  已执行<span class="alert-green">{{repeated}}</span>轮</p>
      <p>{{h}}时{{m}}分<span :class="beat">{{s}}</span>秒</p>
      <p style="font-size: 1rem;color: red;" v-show="totaltime==0">Time out</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      beat:'',
      stat:false,ok:false,
      showsetpan:false,
      curname:'now',
      worktime:0,
      worktlist:Array.apply(null,Array(31)).map((_,h)=>h),
      worktimeMode:'m',
      worktmlist:['m','s'],
      msg: 'Welcome to Your Vue.js App',
      pausetime:0,
      pausetlist:Array.apply(null,Array(60)).map((_,h)=>h),
      pausetimeMode:'m',
      pausetmlist:['m','s'],
      repeats:0,
      repeatlist:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      repeated:0,
      totaltime:-1,
      h:0,m:0,s:0,ms:0,
      intmer:null,
      workt:0,breakt:0,
      st:0,
    }
  },
  methods:{
    start: function() {
      if(this.repeats < 1 ){return;}
      if(this.worktime == 0 && this.pausetime == 0) {return;}
      this.curname='working';
      this.stat = true;
      this.h=0;this.m=0;this.s=0;this.ms=0;
      this.totaltime = (this.worktime * this.repeats) * (this.worktimeMode == 'm' ? 60 : 1) + (this.pausetime * (this.repeats > 1?this.repeats-1:0) * (this.pausetimeMode=='m'?60:1));
      this.intmer=setInterval(this.timer,50);
    },
    pause: function() {
      if(this.intmer) {
        window.clearInterval(this.intmer);
      } 
    },
    stop: function(){
      if(this.intmer){
        window.clearInterval(this.intmer);
      }
      this.h=0;this.m=0;this.s=0;this.ms=0;
      this.showsetpan = false;
      this.stat = false;
      this.ok = false;
      this.repeats = 0;
      this.totaltime = -1;
      this.workt = 0;
      this.breakt = 0;
      this.repeated=0;
    },
    set: function(){
       this.showsetpan = true; 
    },
    setok : function() {
      this.ok = true;
      this.showsetpan = false;
      this.curname = 'plan';
    },
    timer:function(){
      this.ms=this.ms+50;
      if(this.ms>=1000)
      {
        this.ms=0;
        if(--this.totaltime == 0){
            if(this.intmer){
                this.repeated++;
                this.beat = '';
                window.clearInterval(this.intmer);
            }
        }
       if(this.st==0) {
          this.workt++;
          this.beat='';
          if(this.workt == this.worktime){
            this.workt = 0;
            this.st = 1;
            this.curname="break";
          }
        } else {
          if(this.st==1){
            this.breakt++;
            if (this.breakt == this.pausetime){
              this.repeated++;
              this.breakt = 0;
              this.st = 0;
              this.curname = "working";
            } else if(this.breakt == this.pausetime-2){
                this.beat = 'beat';
            }
          }
        }
        
        
        this.s++;
      }
      if(this.s>=60)
      {
        this.s=0;
        this.m=this.m+1;
      }

      if(this.m>=60)
      {
        this.m=0;
        this.h=this.h+1;
      }
   }

  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3rem;
}

h1, h2 {
  font-weight: normal;
  font-size:1rem;
}
#set{
    text-align:center;
    margin:0.5rem auto;
}

#app button{
  font-size:0.8rem;
  border:1px solid rgba(0,0,0,0.2);
  border-radius:0.2rem;
  padding:0.2rem 0.5rem;
}
#set select{
    font-size:0.8rem;
    border:1px solid rgba(0,0,0,0.2);
    border-radius:0.2rem;
    padding:0.2rem 0.5rem;
}
p{
  font-size:0.8rem;
}



a {
  color: #42b983;
}
 @keyframes scaleDraw {
    0%{
        font-size:0.8rem;
    }
    50%{
        font-size:1.2rem;
    }
}
@-webkit-keyframes scaleDraw {
    0%{
        font-size:0.8rem;
    }
    50%{
        font-size:1.2rem;
    }
}
.beat {
  color:red;
  animation:scaleDraw 1s 3;
  -webkit-animation:scaleDraw 1s 3; 
}

</style>

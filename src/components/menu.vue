<template>
  <div id="MenuComponent">
  
  
    <div class="hamburger-holder">
      <img v-on:click="buttonClick" class="hamburger" src="../assets/Hamburger.svg">
    </div>
    <div id="Menu" v-bind:class="activeCheck">
      <h2>Davis Scholar Search</h2>
      <div class="navcontainer">
        <ul>
            <li><router-link to="/" ><span v-on:click="exitClick" >Explorer</span></router-link></li>
            <ul>
              <li><router-link to="/" ><span v-on:click="exitClick" >Admissions Data</span></router-link></li>
              <li><router-link to="/" ><span v-on:click="exitClick" >Student Demographics</span></router-link></li>
              <li><router-link to="/" ><span v-on:click="exitClick" >Cost and Aid</span></router-link></li>
            </ul>
          <li><router-link to="/" ><span v-on:click="exitClick" >About</span></router-link></li>
        </ul>
      </div>
    </div>
    <div v-if="isActive" id="exitContainer" v-on:click="exitClick">
    </div>
  </div>
</template>
<script>
export default {
  name: "Menu",
  data: function() {
    return {
      isActive: false
    };
  },
  computed: {
    activeCheck: function() {
      return {
        active: this.isActive
      };
    },
    exitContainerActiveCheck: function() {
      return {
        active: this.isActive
      };
    }
  },
  methods: {
    buttonClick: function() {
      this.isActive = true;
    },
    exitClick: function() {
      this.isActive = false;
    }
  }
};
</script>


<style>
#MenuComponent,
#Menu {
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -ms-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

#MenuComponent {
  height: 100%;
  float: left;
  display: block;
}
#Menu {
  position: fixed;
  width: 230px;
  height: 100%;
  float: left;
  top: 0;
  left: -230px;
  background-color: #111d33;
  opacity: 0;

  -webkit-box-shadow: 10px 0px 60px -5px rgba(105, 105, 105, 0.67);
  -moz-box-shadow: 10px 0px 60px -5px rgba(105, 105, 105, 0.67);
  box-shadow: 10px 0px 60px -5px rgba(105, 105, 105, 0.67);
}
#Menu h2 {
  color: white;
  padding: 10%;
}
#Menu.active {
  left: 0;
  opacity: 1;
  display: block;
}
#Menu span {
  color: #cadedf;
}
#exitContainer {
  position: fixed;
  left: 20%;
  top: 0;
  width: 80%;
  height: 100%;
}
.hamburger:hover {
  border-radius: 5%;
  background-color: #cadedf;
}
.hamburger-holder {
  width: 60px;
  height: 60px;
  position: fixed;
  left: 1em;
  top: 1em;
  padding: 0.5em 0.5em;
}
.navcontainer {
  text-align: right;
}
.navcontainer li {
  padding-right: 10%;
  padding-top: 0.4em;
  padding-bottom: 0.25em;
}
.navcontainer li:hover {
  background-color: #446ab4;
}
</style>

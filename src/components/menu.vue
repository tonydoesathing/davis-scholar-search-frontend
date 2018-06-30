<template>
  <div id="MenuComponent">
  
  
    <div>
      <img v-on:click="buttonClick" class="pure-button hamburger" src="../assets/Hamburger.svg">
    </div>
    <div id="Menu" v-bind:class="activeCheck">
        <div class="pure-menu">
            <a class="pure-menu-heading" href="#">Davis Scholar Search</a>

            <ul class="pure-menu-list">
              <li class="pure-menu-item">
                <a href="#" class="pure-menu-link">Explorer</a>
                <ul>
                  <li class="pure-menu-item"><a href="/">Home</a></li>
                  <li class="pure-menu-item"><a href="/">Testing Data</a></li>
                  <li class="pure-menu-item"><a href="/">Student Demographics</a></li>
                  <li class="pure-menu-item"><a href="/">Tuition and Aid</a></li>
                </ul>
                
              </li>
              
                <li class="pure-menu-item"><a href="#" class="pure-menu-link">Home</a></li>
                <li class="pure-menu-item"><a href="#" class="pure-menu-link">About</a></li>

                <li class="pure-menu-item">
                    <a href="#" class="pure-menu-link">Services</a>
                </li>

                <li class="pure-menu-item"><a href="#" class="pure-menu-link">Contact</a></li>
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
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
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
}
#Menu {
  position: absolute;
  max-width: 20%;
  min-width: 10%;
  height: 100%;
  top: 0;
  left: -20%;
  background-color: #191818;
  display: block;
}
#Menu .pure-menu-heading {
  background: #1f8dd6;
  font-size: 120%;
}
#Menu.active {
  left: 0;
}
#exitContainer {
  position: absolute;
  left: 20%;
  top: 0;
  width: 80%;
  height: 100%;
}
.hamburger {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 1em;
  top: 1em;
  padding: 0.5em 0.5em;
}
</style>

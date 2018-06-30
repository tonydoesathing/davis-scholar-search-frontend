<template>
  <div id="layout" v-bind:class="{ active: menuIsActive }">
    <!-- Menu toggle -->
    <a href="#Menu" id="menuLink" class="menu-link" v-bind:class="{ active: menuIsActive }">
        <!-- Hamburger icon -->
        <span></span>
    </a>

    <Menu v-bind:class="{ active: menuIsActive }"/>

    <div id="main">
        <div class="header">
            <h1>Page Title</h1>
            <h2>A subtitle for your page goes here</h2>
        </div>

        <div class="content">
            <h2 class="content-subhead">How to use this layout</h2>
            <p>
                To use this layout, you can just copy paste the HTML, along with the CSS in <a href="/css/layouts/side-menu.css" alt="Side Menu CSS">side-menu.css</a>, and the JavaScript in <a href="/js/ui.js">ui.js</a>. The JS file uses vanilla JavaScript to simply toggle an <code>active</code> class that makes the menu responsive.
            </p>

            <h2 class="content-subhead">Now Let's Speak Some Latin</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <div class="pure-g">
                <div class="pure-u-1-4">
                    <img class="pure-img-responsive" src="http://farm3.staticflickr.com/2875/9069037713_1752f5daeb.jpg" alt="Peyto Lake">
                </div>
                <div class="pure-u-1-4">
                    <img class="pure-img-responsive" src="http://farm3.staticflickr.com/2813/9069585985_80da8db54f.jpg" alt="Train">
                </div>
                <div class="pure-u-1-4">
                    <img class="pure-img-responsive" src="http://farm6.staticflickr.com/5456/9121446012_c1640e42d0.jpg" alt="T-Shirt Store">
                </div>
                <div class="pure-u-1-4">
                    <img class="pure-img-responsive" src="http://farm8.staticflickr.com/7357/9086701425_fda3024927.jpg" alt="Mountain">
                </div>
            </div>

            <h2 class="content-subhead">Try Resizing your Browser</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
    </div>
</div>
</template>

<script>
import Menu from "./components/menu";

export default {
  name: "App",
  data: function() {
    return {
      menuIsActive: false
    };
  },
  components: {
    Menu
  },
  methods: {
    hamburgerClick: function() {}
  }
};
</script>

<style>
body {
  color: #777;
}

.pure-img-responsive {
  max-width: 100%;
  height: auto;
}

#layout,
#Menu,
.menu-link {
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -ms-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

#layout {
  position: relative;
  left: 0;
  padding-left: 0;
}
#layout.active #Menu {
  left: 150px;
  width: 150px;
}

#layout.active .menu-link {
  left: 150px;
}
.content {
  margin: 0 auto;
  padding: 0 2em;
  max-width: 800px;
  margin-bottom: 50px;
  line-height: 1.6em;
}

.header {
  margin: 0;
  color: #333;
  text-align: center;
  padding: 2.5em 2em 0;
  border-bottom: 1px solid #eee;
}
.header h1 {
  margin: 0.2em 0;
  font-size: 3em;
  font-weight: 300;
}
.header h2 {
  font-weight: 300;
  color: #ccc;
  padding: 0;
  margin-top: 0;
}

.content-subhead {
  margin: 50px 0 20px 0;
  font-weight: 300;
  color: #888;
}

#Menu {
  margin-left: -150px; /* "#menu" width */
  width: 150px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000; /* so the menu or its navicon stays above all content */
  background: #191818;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
#Menu a {
  color: #999;
  border: none;
  padding: 0.6em 0 0.6em 0.6em;
}

#Menu .pure-menu,
#Menu .pure-menu ul {
  border: none;
  background: transparent;
}

#Menu .pure-menu ul,
#Menu .pure-menu .menu-item-divided {
  border-top: 1px solid #333;
}
#Menu .pure-menu li a:hover,
#Menu .pure-menu li a:focus {
  background: #333;
}

#Menu .pure-menu-selected,
#Menu .pure-menu-heading {
  background: #1f8dd6;
}
#Menu .pure-menu-selected a {
  color: #fff;
}

#Menu .pure-menu-heading {
  font-size: 110%;
  color: #fff;
  margin: 0;
}

.menu-link {
  position: fixed;
  display: block; /* show this only on small screens */
  top: 0;
  left: 0; /* "#menu width" */
  background: #000;
  background: rgba(0, 0, 0, 0.7);
  font-size: 10px; /* change this value to increase/decrease button size */
  z-index: 10;
  width: 2em;
  height: auto;
  padding: 2.1em 1.6em;
}

.menu-link:hover,
.menu-link:focus {
  background: #000;
}

.menu-link span {
  position: relative;
  display: block;
}

.menu-link span,
.menu-link span:before,
.menu-link span:after {
  background-color: #fff;
  width: 100%;
  height: 0.2em;
}

.menu-link span:before,
.menu-link span:after {
  position: absolute;
  margin-top: -0.6em;
  content: " ";
}

.menu-link span:after {
  margin-top: 0.6em;
}

@media (min-width: 48em) {
  .header,
  .content {
    padding-left: 2em;
    padding-right: 2em;
  }

  #layout {
    padding-left: 150px; /* left col width "#menu" */
    left: 0;
  }
  #Menu {
    left: 150px;
  }

  .menu-link {
    position: fixed;
    left: 150px;
    display: none;
  }

  #layout.active .menu-link {
    left: 150px;
  }
}

@media (max-width: 48em) {
  #layout.active {
    position: relative;
    left: 150px;
  }
}
</style>

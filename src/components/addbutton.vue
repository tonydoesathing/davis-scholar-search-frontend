<template>
  <div class="addButtonHolder">
    <div class="bubble" :class="{active:isActive}">
      <div class="bubbleContentHolder">
      
      </div>
    </div>
    <div class="addbutton" @click="toggleActive">
      <span>{{buttonIcon}}</span>
    </div>  
  </div>
  
</template>
<script>
export default {
  data: function() {
    return {
      isActive: false,
      buttonIcon: "+"
    };
  },
  methods: {
    toggleActive: function() {
      if (this.isActive) {
        this.isActive = false;
        this.buttonIcon = "+";
      } else {
        this.isActive = true;
        this.buttonIcon = "-";
      }
    }
  }
};
</script>
<style scoped>
.addbutton {
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffc600;
  border-radius: 50%;
  -webkit-box-shadow: 0px 2px 9px -2px rgba(0, 0, 0, 0.83);
  -moz-box-shadow: 0px 2px 9px -2px rgba(0, 0, 0, 0.83);
  box-shadow: 0px 2px 9px -2px rgba(0, 0, 0, 0.83);
  cursor: pointer;
  float: right;
  position: relative;
}
.addbutton:hover {
  background-color: #8b6d00;
  color: white;
}
.addbutton:hover span {
  color: white;
}
.addbutton span {
  text-align: center;
  font-size: 2em;
  color: black;
  text-decoration: none;
  position: absolute;

  font-family: "Open Sans", sans-serif;
  font-weight: 300;
}
.addButtonHolder {
  position: fixed;
  bottom: 3em;
  right: 3em;
}

.bubble {
  position: relative;
  width: 300px;
  height: 0px;
  padding-bottom: 17px;
  opacity: 0;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -ms-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}
.bubbleContentHolder {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  border-radius: 0.4em;
  -webkit-box-shadow: 0px 2px 34px -5px rgba(0, 0, 0, 0.83);
  -moz-box-shadow: 0px 2px 34px -5px rgba(0, 0, 0, 0.83);
  box-shadow: 0px 2px 34px -5px rgba(0, 0, 0, 0.83);
}
.bubbleContentHolder:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: 13px solid transparent;
  border-top-color: #f9f9f9;
  border-bottom: 0;
  margin-left: 35%;
  margin-bottom: 4px;
}
.active {
  height: 400px;
  opacity: 1;
}
</style>

<template>
  <div id="modalComponent" :class="{inActive:!isActive}">
    <div class="modal-background" @click="toggleActive"></div>
    <div class="modal">
      <div class="modal-header">
        <h2>College University</h2>
        <div class="exit-button"><span>X</span></div>
      </div>
      <div class="modal-content">
        <div class="modal-content-left">
        </div>
        <div class="modal-content-center">
          <div class="modal-content-center-header">
            <div class="modal-content-center-header-left"><span><</span></div>
            <div class="modal-content-center-header-center">
              <div>Category 1</div><div>Category 2</div><div>Category 3</div><div>Category 4</div><div>Category 5</div><div>Category 6</div>
            </div>
            <div class="modal-content-center-header-right"><span>></span></div>
          </div>
          <div class="modal-content-center-content">
            <table>
              <tr>
                <td class="shrink">Meow</td>
                <td>meow</td>
              </tr>
              <tr>
                <td class="shrink">Meow</td>
                <td>meow</td>
              </tr>
              <tr>
                <td class="shrink">Meow</td>
                <td>meow</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="modal-content-right">
        </div>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  data: function() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleActive: function() {
      if (this.isActive) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    }
  }
};
</script>
<style scoped>
.inActive {
  opacity: 0;
  z-index: -500 !important;
}
#modalComponent {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 500;

  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -ms-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}
.modal-background {
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.3;
}
.modal {
  position: fixed;
  width: 82%;
  height: 82%;
  background-color: white;
  top: 9%;
  left: 9%;
  display: flex;
  flex-direction: column;
}
.modal-header {
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2%;
}
.exit-button {
  position: absolute;
  width: 3em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 2%;
  cursor: pointer;
}
.exit-button span {
  font-weight: bold;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.exit-button:hover {
  background-color: purple;
}
.modal-content {
  flex: 1;
  background-color: green;
  display: flex;
  flex-direction: row;
}
.modal-footer {
  height: 10%;
  background-color: blue;
}
.modal-content-left {
  width: 10%;
  background-color: purple;
}
.modal-content-center {
  flex: 1;
  background-color: yellow;
  display: flex;
  flex-direction: column;
}
.modal-content-center-header {
  background-color: magenta;
  display: flex;
  flex-direction: row;
}
.modal-content-center-header-left {
  width: 5%;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content-center-header-left span {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.modal-content-center-header-center {
  flex: 1;
  background-color: white;
  display: flex;
  align-items: center;
  overflow-x: auto;
}
.modal-content-center-header-center div {
  padding: 1.5%;
  display: inline-block;
  white-space: nowrap;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  cursor: pointer;
}
.modal-content-center-header-center div:hover {
  background-color: purple;
  text-decoration: underline;
}
.modal-content-center-header-right {
  width: 5%;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content-center-header-right span {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.modal-content-center-content {
  flex: 1;
  background-color: green;
  overflow-y: auto;
  display: flex;
  padding: 5%;
}
.modal-content-center-content table {
  flex: 1;
}
.modal-content-center-content td {
  padding: 2%;
}
.modal-content-center-content td.shrink {
  white-space: nowrap;
}
.modal-content-right {
  width: 10%;
  background-color: purple;
}
</style>

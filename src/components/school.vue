<template>
  <div id="modalComponent" :class="{inActive:!isActive}">
    <div class="modal-background" @click="toggleActive"></div>
    <div class="modal">
      <div class="modal-header">
        <h2>{{schoolData["school.name"]}}</h2>
        <div class="exit-button" @click="toggleActive"><span>X</span></div>
      </div>
      <div class="modal-content">
        <div class="modal-content-left">
        </div>
        <div class="modal-content-center">
          <div class="modal-content-center-header">
            <div class="modal-content-center-header-left"><span><</span></div>
            <div class="modal-content-center-header-center">
              <div v-for="(value,key) in navcategories" @click="activeHeadings=value"><h3>{{key}}</h3></div>
            </div>
            <div class="modal-content-center-header-right"><span>></span></div>
          </div>
          <div class="modal-content-center-content">
            <div class="modal-content-center-content-divholder" v-for="entry in dataValues">
              <div>{{entry.heading}}:</div>
              <div class="modal-content-center-content-flexdiv">{{entry.value}}</div>
            </div>
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
import navcategories from "../assets/navcategories.json";
export default {
  data: function() {
    return {
      isActive: false,
      navcategories: navcategories,
      activeHeadings: navcategories["Student Info"]
    };
  },
  computed: {
    dataValues: function() {
      var headings = this.activeHeadings.split(",");
      var dataValues = [];
      for (var heading in headings) {
        dataValues.push({
          heading: this.headingCollection[headings[heading]],
          value: this.schoolData[headings[heading]]
        });
      }
      return dataValues;
    }
  },
  props: {
    schoolData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    headingCollection: {
      default: function() {
        return {
          heading: "niceHeading",
          heading2: "niceheading2"
        };
      }
    }
  },
  methods: {
    toggleActive: function() {
      if (this.isActive) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
    setDataValues: function(headings) {
      this.dataValues = [];
      headings = headings.split(",");
      for (var heading in headings) {
        console.log(this.schoolData);
        this.dataValues.push({
          heading: this.headingCollection[headings[heading]],
          value: this.schoolData[headings[heading]]
        });
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
  background-color: grey;
}
.modal-content {
  flex: 1;
  display: flex;
  flex-direction: row;
}
.modal-footer {
  height: 10%;
}
.modal-content-left {
  width: 10%;
}
.modal-content-center {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.modal-content-center-header {
  display: flex;
  flex-direction: row;
}
.modal-content-center-header-left {
  width: 5%;
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
  text-decoration: underline;
}
.modal-content-center-header-right {
  width: 5%;
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
  overflow-y: auto;
  display: block;
  padding: 5%;
}
.modal-content-center-content-divholder {
  display: flex;
  padding: 2%;
}
.modal-content-center-content-flexdiv {
  flex: 1;
  padding-left: 4%;
}

.modal-content-right {
  width: 10%;
}
</style>

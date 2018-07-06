<template>
  <div id="modalComponent" :class="{inActive:!isActive}">
    <div class="modal-background" @click="toggleActive"></div>
    <div class="modal">
      <div class="modal-header">
        <h2 @click="windowOpen()">{{schoolData["school.name"]}}</h2>
        <div class="exit-button" @click="toggleActive"><span>X</span></div>
      </div>
      <div class="modal-content">
        <div class="modal-content-left">
        </div>
        <div class="modal-content-center">
          <div class="modal-content-center-header">
            <div class="modal-content-center-header-center">
              <div v-for="(value,key) in navcategories" @click="setActiveHeadings(key,value)" :class="{active:key===activeHeading}"><h3>{{key}}</h3></div>
            </div>
          </div>
          <div class="modal-content-center-content">
            <table class="maxWidth">
              <tbody>
                <tr v-for="entry in dataValues">
                  <td class="tdMinWidth">
                    {{entry.heading}}
                  </td>
                  <td class="maxWidth">
                    <span v-html="entryFilter(entry.value)"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          <!--
            <div class="modal-content-center-content-divholder" v-for="entry in dataValues">
              <div>{{entry.heading}}:</div>
              <div class="modal-content-center-content-flexdiv" v-html="entryFilter(entry.value)"></div>
            </div>
            -->
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
import linkifyHtml from "linkifyjs/html";

function isFloat(n) {
  var num = parseFloat(n);
  return num === num && num % 1 !== 0;
}

export default {
  data: function() {
    return {
      isActive: false,
      navcategories: navcategories,
      activeHeadings: navcategories["Student Info"],
      activeHeading: "Student Info"
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
      return dataValues.sort();
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
    setActiveHeadings: function(key, value) {
      this.activeHeadings = value;
      this.activeHeading = key;
    },
    entryFilter: function(str) {
      /*if (!str) return " ";
     */
      if (!str) {
        return "";
      } else if (isFloat(str)) {
        var num = Number.parseFloat(str);
        num *= 100;
        return num.toString() + "%";
      } else {
        return linkifyHtml(str, {
          defaultProtocol: "https"
        });
      }
    },
    windowOpen: function() {
      var url = this.schoolData["school.school_url"];
      if (!url.match(/^https?:\/\//i)) {
        url = "http://" + url;
      }
      return window.open(url);
    }
  }
};
</script>
<style scoped>
h2 {
  cursor: pointer;
}
h2:hover {
  text-decoration: underline;
}
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
  padding-top: 5%;
  padding-bottom: 2%;
}
.exit-button {
  position: absolute;
  width: 3em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 2em;
  top: 2em;
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
  justify-content: center;
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
.modal-content-center-header-center div.active {
  text-decoration: underline;
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
  padding-left: 5%;
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

td {
  background-color: #f9f9f9;
}
tr:nth-child(odd) td {
  background-color: #cadedf;
}
td {
  font-size: 1em;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  padding: 0.25em;
  border: 5px solid white;
}
.maxWidth {
  width: 100%;
}
.tdMinWidth {
  white-space: nowrap;
}
</style>

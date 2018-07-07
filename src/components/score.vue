<template>
  <div id="modalComponent" :class="{inActive:!isActive}">
    <div class="modal-background" @click="toggleActive"></div>
    <div class="modal">
      <div class="modal-header">
        <h2 >Score</h2>
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
                <tr v-for="entry in visibleData">
                  <td class="tdMinWidth">
                    {{entry.heading}}
                  </td>
                  <td class="maxWidth" >
                    <span @click="addValue(entry,true)"><GraphIcon :ascending="true" :value="entry.value"/></span>
                    <span @click="addValue(entry,false)"><GraphIcon :ascending="false" :value="entry.value" @click="addValue(entry,false)"/></span>
                    <span @click="resetValue(entry)"><IconBase icon-name="Reset" width="2.5em" height="2.5em"><ResetIcon /></IconBase></span>
                  </td>
                </tr>
              </tbody>
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
import navcategories from "../assets/navcategories.json";
import linkifyHtml from "linkifyjs/html";
import IconBase from "../icons/IconBase";
import GraphIcon from "../icons/GraphIcon";
import ResetIcon from "../icons/ResetIcon";
import keytypes from "../assets/keytypes.json";

export default {
  data: function() {
    var dataValues = {};
    var navcats = navcategories;
    for (var category in navcats) {
      dataValues[category] = {};
      var k = navcats[category].split(",");
      for (var heading in k) {
        dataValues[category][k[heading]] = {
          heading: this.headingCollection[k[heading]],
          value: 0
        };
      }
    }
    return {
      isActive: false,
      navcategories: navcats,
      activeHeadings: navcats["Student Info"],
      activeHeading: "Student Info",
      dataValues: dataValues
    };
  },
  computed: {
    visibleData: function() {
      var visibleDatas = [];
      var category = this.dataValues[this.activeHeading];
      for (var key in category) {
        visibleDatas.push({
          heading: category[key].heading,
          value: category[key].value,
          key: key
        });
      }

      visibleDatas = visibleDatas.filter(function(a) {
        return keytypes[a.key] === "int";
      });
      visibleDatas.sort();
      return visibleDatas;
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
        //find keys with value!=0;
        var dataValues = [];
        for (var category in this.navcategories) {
          for (var key in this.dataValues[category]) {
            var value = this.dataValues[category][key].value;
            if (value !== 0) {
              dataValues.push({
                key: key,
                value: value
              });
            }
          }
        }
        this.$emit("update:values", dataValues);
      } else {
        this.isActive = true;
      }
    },
    setActiveHeadings: function(key, value) {
      this.activeHeadings = value;
      this.activeHeading = key;
    },
    addValue: function(entry, asc) {
      var e = this.dataValues[this.activeHeading][entry.key];
      if (asc) {
        if (e.value < 5) {
          e.value += 1;
        }
      } else {
        if (e.value > -5) {
          e.value -= 1;
        }
      }
    },
    resetValue: function(entry) {
      this.dataValues[this.activeHeading][entry.key].value = 0;
    }
  },
  components: {
    IconBase,
    GraphIcon,
    ResetIcon
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
  font-size: 1em;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  padding: 0.25em;
  border: 5px solid white;
  background-color: #f9f9f9;
  vertical-align: middle;
  padding-left: 1em;
}
td svg {
  padding: 0.5em;
  cursor: pointer;
}
td span {
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}
td img:hover {
  filter: brightness(2);
}
tr:nth-child(odd) td {
  background-color: #cadedf;
}

.maxWidth {
  width: 100%;
}
.tdMinWidth {
  white-space: nowrap;
}
</style>

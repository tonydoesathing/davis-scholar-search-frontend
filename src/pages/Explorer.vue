<template>
    <div>
      <div id="Heading" >
      
        <div class="center-container">
          <h1>Explorer</h1>
          
        </div>
        <div class="center-container button-holder">
          <button @click="toggleScoreModal">Custom Score (alpha)</button>
        </div>
        
        <div class="spacer"></div>

        <div class="center-container">
          <input type="text" placeholder="Search..." class="searchbox" name="query" v-model="searchQuery" autocomplete="off">
        </div>
        
      </div>
      <div class="tableholder">
        <Table :data="gridData" :columns="gridColumns" :filter-key="searchQuery" :keyHeadings="gridHeadings" v-on:update:activeSchool="updateSchoolSelection($event)"/>
      </div>
      <AddButton :headingCollection="gridHeadings" :activeHeadings="gridColumns" v-bind:headings.sync="gridColumns"/>
      <Menu/>
      <SchoolComponent ref="schoolModal" :schoolData="currentSchool" :headingCollection="gridHeadings" />
      <Score ref="scoreModal" :headingCollection="gridHeadings" v-on:update:values="updateScoreValues($event)"/>
    </div>
   
</template>

<script>
import Table from "../components/table";
import json from "../assets/davisinfo.json";
import headerinfo from "../assets/friendlyHeadingsFull.json";
import AddButton from "../components/addbutton";
import SchoolComponent from "../components/school.vue";
import Menu from "../components/menu";
import Score from "../components/score";
import numericalData from "../assets/davisNumericalData.json";
import keyTypes from "../assets/keytypes.json";

function Median(data) {
  return Quartile_50(data);
}

function Quartile_25(data) {
  return Quartile(data, 0.25);
}

function Quartile_50(data) {
  return Quartile(data, 0.5);
}

function Quartile_75(data) {
  return Quartile(data, 0.75);
}

function Quartile(data, q) {
  data = Array_Sort_Numbers(data);
  var pos = (data.length - 1) * q;
  var base = Math.floor(pos);
  var rest = pos - base;
  if (data[base + 1] !== undefined) {
    return data[base] + rest * (data[base + 1] - data[base]);
  } else {
    return data[base];
  }
}

function Array_Sort_Numbers(inputarray) {
  return inputarray.sort(function(a, b) {
    return a - b;
  });
}

function Array_Sum(t) {
  return t.reduce(function(a, b) {
    return a + b;
  }, 0);
}

function Array_Average(data) {
  return Array_Sum(data) / data.length;
}

function Array_Stdev(tab) {
  var i,
    j,
    total = 0,
    mean = 0,
    diffSqredArr = [];
  for (i = 0; i < tab.length; i += 1) {
    total += tab[i];
  }
  mean = total / tab.length;
  for (j = 0; j < tab.length; j += 1) {
    diffSqredArr.push(Math.pow(tab[j] - mean, 2));
  }
  return Math.sqrt(
    diffSqredArr.reduce(function(firstEl, nextEl) {
      return firstEl + nextEl;
    }) / tab.length
  );
}

function isFloat(n) {
  var num = parseFloat(n);
  return num === num && num % 1 !== 0;
}

function determineTypeOfStringData(thestring) {
  //do some magic to determine the actual data type of the string

  //check for number
  if (!Number.isNaN(Number(thestring))) {
    if (isFloat(thestring)) {
      thestring = parseFloat(thestring);
    } else {
      thestring = Number(thestring);
    }
  }
  return typeof thestring;
}

export default {
  name: "Explorer",
  data: function() {
    return {
      searchQuery: "",
      gridColumns: ["school.name", "2015.student.size"],
      /*
        gridData format:
        [
          {
            key:val,
            key:val,
            ...
          },
          {
            key:val,
            key:val,
            ...
          }
        ]
      */
      gridData: json,
      gridHeadings: headerinfo.keysToHeadings,
      currentSchool: json[0],
      statisticalData: {}
    };
  },
  methods: {
    toggleModal: function() {
      this.$refs.schoolModal.toggleActive();
    },
    toggleScoreModal: function() {
      this.$refs.scoreModal.toggleActive();
    },
    updateSchoolSelection: function(event) {
      //emits the ID of the school
      //resolve id to be
      this.currentSchool = event;
      this.toggleModal();
    },
    updateScoreValues: function(event) {
      if (event.length > 0) {
        for (var school in this.gridData) {
          //calculate scores for schools
          var score = 0;
          for (var k in event) {
            //k.key, k.value
            //if k.value is negative, it means that function should be decreasing over domain
            //k.value is also equal to the weight of the key in the score (mult function result by this)
            var localscore = 0;

            var d = this.statisticalData[event[k].key].d;
            var x = Number(this.gridData[school][event[k].key]);
            var a = this.statisticalData[event[k].key].median * -1;
            if (event[k].value > 0) {
              //positive; we want increasing over time, so d will be negative
              localscore = 1 / (1 + Math.pow(Math.E, -d * (x + a)));
              localscore *= event[k].value;
            } else {
              localscore = 1 / (1 + Math.pow(Math.E, d * (x + a)));
              localscore *= event[k].value * -1;
            }
            score += localscore;
          }
          this.gridData[school]["customScore"] = score.toString();
        }
        if (!this.gridColumns.includes("customScore")) {
          this.gridColumns.push("customScore");
        }
      } else {
        for (var school in this.gridData) {
          if (this.gridColumns.includes("customScore")) {
            this.gridColumns.splice(this.gridColumns.indexOf("customScore"), 1);
          }
          delete this.gridData[school]["customScore"];
        }
      }
    }
  },
  mounted: function() {
    //build numeric collections for columns
    var columns = {};
    for (var k in this.gridData[0]) {
      if (!(k in columns)) {
        columns[k] = [];
      }
    }
    for (var school in this.gridData) {
      for (var k in this.gridData[school]) {
        columns[k].push(this.gridData[school][k]);
      }
    }
    for (var collection in columns) {
      //remove undefined
      /* columns[collection] = columns[collection].filter(function(a) {
        return a !== "null" && a !== null;
      });*/
      //convert strings to numbers
      for (var key in columns[collection]) {
        var obj = columns[collection][key];
        if (determineTypeOfStringData(obj) === "number") {
          columns[collection][key] = Number(obj);
        } else {
          columns[collection].splice(key, 1);
        }
      }
    }

    var data = columns;
    var statisticalNumbers = {};
    for (var key in data) {
      //if it's an int do calculations
      if (keyTypes[key] === "int") {
        var statisticalAnalysis = {
          median: Median(data[key]),
          q1: Quartile_25(data[key]),
          q3: Quartile_75(data[key]),
          d: 0
        };
        var quartileMean =
          (statisticalAnalysis.q1 + statisticalAnalysis.q3) / 2;
        statisticalAnalysis.d =
          1.318824 *
          Math.pow(
            (statisticalAnalysis.q1 + statisticalAnalysis.q3) / 2,
            -1.002155
          );
        statisticalNumbers[key] = statisticalAnalysis;
      }
    }
    this.statisticalData = statisticalNumbers;
  },
  computed: {},
  components: {
    Table,
    AddButton,
    SchoolComponent,
    Menu,
    Score
  }
};
</script>
<style>
#Heading {
  height: 100px;
  width: 80%;
  margin: auto;
  position: relative;
  display: flex;
  padding-left: 10%;
  padding-right: 10%;
}
#Heading > h1 {
  font-size: 3em;
  margin: auto;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
}
.spacer {
  flex: 1;
}
#Heading > input {
  vertical-align: center;
  height: 1em;
}
.center-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.searchbox {
  padding: 0.25em;
  border: 2px solid #cadedf;
  border-radius: 5px;
}
.tableholder {
  width: 80%;
  margin: auto;
  position: relative;
  display: flex;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 2em;
  padding-bottom: 6em;
}
.tableholder table {
  border: 2px solid #779ee5;
  border-radius: 3px;
  background-color: #cadedf;
  width: 100%;
}
.tableholder tr:nth-child(odd) td {
  background-color: #cadedf;
}
.tableholder th {
  background-color: #779ee5;
  font-size: 1.5em;
  font-family: "Encode Sans Condensed", sans-serif;
  font-weight: 100;
  padding: 0.5em;
  color: white;
}
.tableholder td {
  font-size: 1em;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  padding: 0.25em;
  border: 5px solid white;
}
.button-holder {
  padding-left: 1em;
}
.button-holder button {
  background-color: #306598; /* Green */
  border: none;
  color: white;
  padding: 1em 1.5em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
.button-holder button:hover {
  background-color: #00b6ef;
}
</style>

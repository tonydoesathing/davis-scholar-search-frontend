<template>
  <div class="addButtonHolder">
    <div class="bubble" :class="{active:isActive}">
      <div class="bubbleContentHolder">
        <div class="centerContainer">
          <input type="text" placeholder="Search..." class="searchbox" name="query" v-model="searchQuery" autocomplete="off">

        
        </div>
        <div class="listholder">
          <ul>
            <li v-for="entry in filteredData" >
              <input type="checkbox" :id="entry.key" :value="entry.key" v-model="headingsActive"/>
              <label :for="entry.key">{{entry.heading}}</label>
            </li>
          </ul>
        </div>
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
      buttonIcon: "+",
      searchQuery: "",
      headingsActive: this.activeHeadings
    };
  },
  props: {
    headingCollection: {
      default: function() {
        return {
          heading: "niceHeading",
          heading2: "niceheading2"
        };
      }
    },
    activeHeadings: {
      type: Array,
      default: function() {
        var arr = [];
        for (var key in this.headinCollection) {
          arr.push(key);
        }
        return arr;
      }
    }
  },
  computed: {
    filteredData: function() {
      var searchQuery = this.searchQuery && this.searchQuery.toLowerCase();
      var results = [];
      //filter data from string

      if (searchQuery) {
        for (var key in this.headingCollection) {
          if (
            this.headingCollection[key].toLowerCase().indexOf(searchQuery) !==
            -1
          ) {
            results.push({
              heading: this.headingCollection[key],
              key: key
            });
          }
        }
        results.sort();
      } else {
        for (var key in this.headingCollection) {
          results.push({
            heading: this.headingCollection[key],
            key: key
          });
        }
        results.sort();
      }
      return results;
    }
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
  },
  watch: {
    headingsActive: function(val) {
      this.$emit("update:headings", this.headingsActive);
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

  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
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
  display: flex; /* establish flex container */
  flex-direction: column;
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
.centerContainer {
  display: flex; /* establish flex container */
  flex-direction: column; /* make main axis vertical */
  justify-content: center; /* center items vertically, in this case */
  align-items: center;
  padding-top: 1em;
  padding-bottom: 2em;
}
.centerContainer input {
  width: 65%;
}
.listholder {
  width: 95%;
  flex: 1;
  overflow-y: scroll;
  margin-bottom: 5%;
}
.listholder::-webkit-scrollbar {
  width: 1em;
  padding-right: 5px;
}

.listholder::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 5px;
}

.listholder::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
.listholder ul {
  padding-right: 1em;
  padding-bottom: 1em;
  padding-left: 1em;
}
</style>

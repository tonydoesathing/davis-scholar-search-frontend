<template>
  <table>
      <thead>
        <tr>
          <th v-for="key in columns"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }">
            {{ keyHeadings[key] | capitalize }}
            <span class="arrow" v-if="sortKey == key" :class="sortOrder > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in filteredData">
          <td v-for="key in columns">
            <span v-html="entryFilter(entry[key])"></span>
          </td>
        </tr>
      </tbody>
    </table>
  
    
</template>
<script>
import linkifyHtml from "linkifyjs/html";

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
  name: "demo-grid",
  props: {
    data: Array,
    columns: Array,
    filterKey: String,

    keyHeadings: {
      /*
        {
          "key": "Heading to Use"
        }

      */
      type: Object,
      default: function() {
        var headings = {};
        for (var column in this.columns) {
          headings[this.columns[column]] = this.columns[column];
        }
        return headings;
      }
    }
  },
  data: function() {
    return {
      sortKey: "",
      sortOrder: 1
    };
  },
  computed: {
    //filter the data according to string
    filteredData: function() {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrder;
      var data = this.data;
      var columns = this.columns;
      //filter data from string
      if (filterKey) {
        data = data.filter(function(row) {
          for (var column in columns) {
            if (row[columns[column]] !== null) {
              if (
                String(row[columns[column]])
                  .toLowerCase()
                  .indexOf(filterKey) !== -1
              ) {
                return true;
              }
            }
          }
          return false;
        });
      }
      //sort data according to column
      if (sortKey) {
        var columnType = this.columnsType[sortKey];
        data = data.sort(function(a, b) {
          a = a[sortKey];
          b = b[sortKey];
          //put null entries at the bottom 'cause we don't care about them
          if (a == null && b == null) {
            return 0;
          } else if (a == null && b !== null) {
            return 1;
          } else if (a !== null && b == null) {
            return -1;
          }

          if (columnType) {
            if (columnType === "number") {
              a = Number(a);
              b = Number(b);
              if (a > b) {
                return 1 * order;
              } else if (a < b) {
                return -1 * order;
              } else {
                return 0;
              }
            }
          }
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    },
    columnsType: function() {
      var types = {};
      for (var key in this.columns) {
        //if you just find null data, just sort via string
        //else determine type of sort
        types[this.columns[key]] = determineTypeOfStringData(
          this.data[0][this.columns[key]]
        );
      }
      return types;
    }
  },
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  methods: {
    sortBy: function(key) {
      this.sortKey = key;
      this.sortOrder *= -1;
    },
    entryFilter: function(str) {
      /*if (!str) return " ";
     */
      if (!str) {
        return "";
      } else {
        return linkifyHtml(str, {
          defaultProtocol: "https"
        });
      }
    }
  },
  watch: {
    columns: function(newval, oldval) {
      var newAdditions = [];
      for (var j in newval) {
        if (oldval.indexOf(newval[j]) === -1) {
          newAdditions.push(newval[j]);
        }
      }
    }
  }
};
</script>
<style>
th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th.active {
  color: #fff;
  text-decoration: underline;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>

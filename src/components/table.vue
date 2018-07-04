<template>
  <div>
    <table>
        <thead>
          <tr>
            <th v-for="key in columns"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }">
              {{ keyHeadings[key] | capitalize }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
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

    <h2>Debug</h2>
    <p>Sort key: {{this.sortKey}}</p>
    <p>Sort Order: {{this.sortOrders}}</p>
    <p>Column types: {{this.columnsType}}</p>
  </div>
  
    
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
    var sortOrders = {};
    this.columns.forEach(function(key) {
      sortOrders[key] = 1;
    });
    var types = {};
    for (var key in this.columns) {
      //types[key] = typeof this.data[0][key];
      types[this.columns[key]] = determineTypeOfStringData(
        this.data[0][this.columns[key]]
      );
    }
    return {
      sortKey: "",
      sortOrders: sortOrders,
      columnsType: types
    };
  },
  computed: {
    //filter the data according to string
    filteredData: function() {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      console.log("UPDATING WITH FOLLOWING SORT ORDER:");
      var order = this.sortOrders[sortKey] || 1;
      console.log(order);
      var data = this.data;
      //filter data from string
      if (filterKey) {
        data = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            );
          });
        });
      }
      //sort data according to column
      if (sortKey) {
        var columnType = this.columnsType[sortKey];
        data = data.sort(function(a, b) {
          a = a[sortKey];
          b = b[sortKey];
          if (columnType) {
            if (columnType === "number") {
              return (+a === +b ? 0 : +a > +b ? 1 : -1) * order;
            }
          }
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
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
      this.sortOrders[key] = this.sortOrders[key] * -1;
      this.$forceUpdate();
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
      for (var k in newAdditions) {
        this.sortOrders[newAdditions[k]] = 1;
        this.columnsType[newAdditions[k]] = determineTypeOfStringData(
          this.data[0][newAdditions[k]]
        );
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

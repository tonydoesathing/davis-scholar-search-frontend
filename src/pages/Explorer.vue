<template>
    <div>
      <div id="Heading">
        <div class="center-container">
          <h1>Explorer</h1>
        </div>
        
        <div class="spacer"></div>

        <div class="center-container">
          <input type="text" placeholder="Search..." class="searchbox" name="query" v-model="searchQuery">
        </div>
        
      </div>
      <div class="tableholder">
        <Table :data="gridData" :columns="gridColumns" :filter-key="searchQuery"/>
      </div>
      
    </div>
</template>

<script>
import Table from "../components/table";
import JSON from "../assets/test.json";

export default {
  name: "Explorer",
  data: function() {
    return {
      searchQuery: "",
      gridColumns: ["Book ID", "Book Name", "Category", "Price"],
      gridData: JSON
    };
  },
  components: {
    Table
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
</style>

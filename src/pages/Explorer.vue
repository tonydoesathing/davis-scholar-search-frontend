<template>
    <div>
      <div id="Heading">
        <div class="center-container">
          <h1>Explorer</h1>
        </div>
        
        <div class="spacer"></div>

        <div class="center-container">
          <input type="text" placeholder="Search..." class="searchbox">
        </div>
        
      </div>
      <div class="table"></div>
    </div>
</template>

<script>
export default {
  name: "Explorer",
  props: {}
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

.table {
  background-color: blue;
}
.searchbox {
  padding: 0.25em;
  border: 2px solid #cadedf;
  border-radius: 5px;
}
</style>

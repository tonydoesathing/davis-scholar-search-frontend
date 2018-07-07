<template>
    <div class="AboutPage">
      <div id="Heading" >
      
        <div class="center-container">
          <h1>About</h1>
          
        </div>
        
        <div class="spacer"></div>
        
      </div>
      <div class="contentholder">
        <h2>What it is</h2>
        <p>Davis Scholar Search is a tool to help potential Davis Scholars find Davis Schools to apply to.</p>
        <p>The main component of this tool is the College Explorer, which can be used to easily compare schools across recorded data.</p>
        <h2>Where does the data come from?</h2>
        <p>The data is compiled from the <a href="https://collegescorecard.ed.gov/data/documentation/">U.S. Department of Education's College Scorecard API</a>; that being said, the data is from 2015 and may not be entirely accurate, but it should still be able to help paint a statistical picture of the school.</p>
        <h2>Should I exclusively use this in making a decision?</h2>
        <p>No. Make your decisions holistically; however, this might help lower the number of websites you're scouring from 95 to 10.</p>
        <h2>How does the Custom Score work?</h2>
        <p>The custom scoring mechanism relies on a sigmoid weight function; essentially, you decide what you want to get a higher score (e.g. do you want a lower number of students to output a higher score or vice versa), and you decide how important you think that data column is (more important means its output will matter more in the total score), and the algorithm goes through each school, enters the data column value for that school into a sigmoid function (essentially the sigmoid function maps the value to a score from 0 to 1 based off of the statistical data of that data column), and then sums it all together.  Currently, it does not work on non-integer data categories.</p>
        <h2>Is it open source?</h2>
        <p>The code is hosted on <a href="https://github.com/tonydoesathing/davis-scholar-search-frontend">github</a>, but its documentation and organization is less than stellar.</p>
      </div>
      <Menu/>
    </div>
   
</template>

<script>
import Menu from "../components/menu";

export default {
  name: "About",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    Menu
  }
};
</script>
<style scoped>
#Heading {
  height: 100px;
  width: 80%;
  margin: auto;
  position: relative;
  display: flex;
  padding-left: 10%;
  padding-right: 10%;

  background-color: white;
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

.contentholder {
  width: 80%;
  margin: auto;
  position: relative;
  display: block;
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 6em;
}
.contentholder h2 {
  padding-bottom: 0.5em;
  padding-top: 1.3em;
}
</style>

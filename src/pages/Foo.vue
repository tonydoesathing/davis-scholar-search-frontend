<template>
    <div>
      <!-- spit out variable or compute javascript -->
      <h1>{{title}}</h1>
      <p>{{fullName}}</p>
      <p>Original message: "{{ message }}"</p>
      <p>Computed reversed message: "{{ reversedMessage }}"</p>
      <p>
        Ask a yes/no question:
        <!-- v-model links the variable and html together -->
        <!-- so when somebody inputs into text box variable is updated -->
        <input v-model="question">
      </p>

      <!-- you can bind a class object to a truthy value -->
      <!-- in this case, we bind it to a computed function -->
      <h3 v-bind:class="classObject" >{{ answer }}</h3>
      <ul>
        <li v-for="(name,index) of names" v-bind:key="name.key">{{index}}, {{name}}<button v-on:click="removeNameFromList(index)">X</button></li>
      </ul>
      <input v-model="nameTextBox">
      <button v-on:click="addNameToList">Add Name</button>
    </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";

export default {
  name: "Foo",
  props: {
    title: {
      default: "Basic Component",

      //Can specify the type so if something else is passed in it spits out an error
      type: String
    }
  },

  //this is where we store the data that the component uses
  data() {
    return {
      message: "Hello",
      firstName: "Foo",
      lastName: "Bar",
      question: "",
      isLoading: false,
      nameTextBox: "",
      names: ["Jimmy", "James", "John"],
      answer: "I cannot give you an answer until you ask a question!"
    };
  },

  //computed is cached! so it only recalcs if message has changed
  computed: {
    // a computed getter
    reversedMessage: function() {
      // `this` points to the vm instance
      return this.message
        .split("")
        .reverse()
        .join("");
    },
    fullName: {
      // getter, returns this for when {{fullname}}
      get: function() {
        return this.firstName + " " + this.lastName;
      },
      // setter, retuns this for when {{fullname = "Jimmy Johnson"}}
      set: function(newValue) {
        var names = newValue.split(" ");
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      }
    },
    classObject: function() {
      return {
        loading: this.isLoading
      };
    }
  },

  //watches for variable change and runs function
  watch: {
    question: function(newQuestion, oldQuestion) {
      this.isLoading = true;
      this.answer = "Waiting for you to stop typing...";
      this.debouncedGetAnswer();
    }
  },

  /*
    runs on component creation; putting this.debouncedGetAnswer
    here lets the component load the lodash script first
    and also have access to the component's methods
  */
  created: function() {
    // _.debounce is a function provided by lodash to limit how
    // often a particularly expensive operation can be run.
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },

  /*
    this is where we put most of our logic/functions referenced
    within this component
  */
  methods: {
    addNameToList: function() {
      console.log(this.nameTextBox);
      this.names.push(this.nameTextBox);
      this.nameTextBox = "";
    },
    removeNameFromList: function(index) {
      this.names.splice(index, 1);
    },
    getAnswer: function() {
      if (this.question.indexOf("?") === -1) {
        this.answer = "Questions usually contain a question mark. ;-)";
        this.isLoading = false;
        return;
      }
      this.answer = "Thinking...";
      var vm = this;
      axios
        .get("https://yesno.wtf/api")
        .then(function(response) {
          vm.isLoading = false;
          vm.answer = _.capitalize(response.data.answer);
        })
        .catch(function(error) {
          vm.isLoading = false;
          vm.answer = "Error! Could not reach the API. " + error;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
  color: red;
  text-decoration: underline;
}
</style>

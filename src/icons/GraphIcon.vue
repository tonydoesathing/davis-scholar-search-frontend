<template>
    <IconBase :icon-name="iconName" :width="width" :height="height" :iconColor="iconColor"><AscendingGraph v-if="ascending"/><DescendingGraph v-if="!ascending"/></IconBase>
</template>
<script>
import IconBase from "./IconBase"; 
import AscendingGraph from "./AscendingGraph";
import DescendingGraph from "./DescendingGraph";
import Color from "color";

export default {
  data: function() {
    return {};
  },
  props: {
    width: {
      type: [Number, String],
      default: "2.5em"
    },
    height: {
      type: [Number, String],
      default: "2.5em"
    },
    value: {
      type: Number,
      default: 0
    },
    ascending: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconColor: function() {
      var color = Color({ h: 207, s: 5, v: 75 });
      var values;
      var maxValue = 5;
      if (this.ascending) {
        var valueVar = this.value / maxValue;
        if (valueVar < 0) {
          valueVar = 0;
        }
        values = 100 - (50 * valueVar + 25);
        color = color.object();
        color = Color({ h: color.h, s: color.s, v: values });
      } else {
        var valueVar = this.value / maxValue;
        if (valueVar > 0) {
          valueVar = 0;
        }
        valueVar *= -1;
        values = 100 - (50 * valueVar + 25);
        color = color.object();
        color = Color({ h: color.h, s: color.s, v: values });
      }
      return color.hsl().string();
    },
    iconName: function() {
      var name = "";
      if (this.ascending) {
        name = "Higher is Better";
      } else {
        name = "Lower is Better";
      }
      return name;
    }
  },
  components: {
    IconBase,
    AscendingGraph,
    DescendingGraph
  }
};
</script>
<style scoped>
div {
  display: inline;
}
</style>

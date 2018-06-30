import Explorer from "./pages/Explorer";
import Bar from "./pages/Bar";

const routes = [
  {
    path: "/",
    component: Explorer,
    props: function(route) {
      var propsobj = {};
      if (route.query.headings) {
        propsobj["headings"] = route.query.headings;
      }
      return propsobj;
    }
  },
  {
    path: "/bar",
    component: Bar,
    props: function(route) {
      var propsobj = {};
      if (route.query.id.length > 0) {
        propsobj["id"] = route.query.id;
      }
      if (route.query.postid.length > 0) {
        propsobj["postid"] = route.query.postid;
      }
      return propsobj;
    }
  }
];

export default routes;

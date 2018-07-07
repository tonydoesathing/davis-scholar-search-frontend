import Explorer from "./pages/Explorer";
import About from "./pages/About";
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
    path: "/about",
    component: About
  }
];

export default routes;

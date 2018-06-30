import Foo from "./pages/Foo";
import Bar from "./pages/Bar";

const routes = [
  { path: "/foo", component: Foo },
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

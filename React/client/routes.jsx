const {
  Route,
  NotFoundRoute,
  DefaultRoute
} = ReactRouter;

var routes = (
  <Route name="root" handler={App} path="/">
    <Route name="dashboard" path="/dashboard" handler={Dashboard} />
    
  </Route>
)

var router = ReactRouter.create({
  routes: routes,
  location: ReactRouter.HistoryLocation
});

var showFirstList = function () {
  router.replaceWith("dashboard");
}

var subsReady;

// This data is used on every page; also we want to make sure we route to the
// first list instead of no list at all
var handles = [
  Meteor.subscribe("pages")
  // Meteor.subscribe("privateLists")
];

Meteor.startup(function () {
  router.run(function (Handler, state) {
    // If we are at the root and our subscriptions are done
    if (state.routes.length > 1 && state.routes[1].isDefault && subsReady) {
      showFirstList();
    }

    React.render(<Handler handles={ handles } />, document.body);
  });
});

// XXX this should be replaced by promises, probably...
Tracker.autorun(function (computation) {
  // Are all of the subscriptions done yet?
  subsReady = _.all(handles, function (handle) {
    return handle.ready();
  });

  // If they are, and we are at the root route, we should go to a valid list
  if (subsReady && router.getRouteAtDepth(1) &&
      router.getRouteAtDepth(1).isDefault) {
    showFirstList();
    computation.stop();
  }
});

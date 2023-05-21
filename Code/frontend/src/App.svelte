<script>
  import Router from "svelte-spa-router";
  import Navigation from "./Components/navigation.svelte";
  import routes from "./routes";

</script>

<!-- This part is always displayed -->
<Navigation></Navigation>

<div class="container mt-3">
  <!-- Here we load the page depending on the current URL -->
  <Router {routes} />
</div>

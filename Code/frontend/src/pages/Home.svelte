<script>
  import Carrousel from "../Components/Carrousel.svelte";
import PreisBarChart from "../Components/charts/PreisBarChart.svelte";

</script>
<div class="my-5" style="text-align: center">
  <img class="img-fluid logo" alt="Svelte Logo" src="images/Logo.png" />
</div>

<h1 class="mt-3">Willkommen bei der Produkteverwaltung der "Zuhause & Wohnen"</h1>

<Carrousel></Carrousel>

<style>
  .logo {
    height: 100px;
  }
  .mt-3 {
    text-align: center;
  }

  h1 {
    padding-bottom: 2%;
  }
</style>

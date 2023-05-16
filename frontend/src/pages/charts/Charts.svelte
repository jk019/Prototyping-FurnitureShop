<script>
  import AnzahlMoeblehaeuser from "../../Components/charts/AnzahlMoeblehaeuser.svelte";
  import AnzahlProdukteChart from "../../Components/charts/AnzahlProdukteChart.svelte";
  import AnzahlTeileChart from "../../Components/charts/AnzahlTeileChart.svelte";
  import PreisBarChart from "../../Components/charts/PreisBarChart.svelte";

  let wahl;

  import { fade } from 'svelte/transition';
  import AnzahlTeileProdukt from "../../Components/charts/AnzahlTeileProdukt.svelte";
  import AnzahlProdukteTeil from "../../Components/charts/AnzahlProdukteTeil.svelte";
  import AnzahlProdukteHaus from "../../Components/charts/AnzahlProdukteHaus.svelte";
	let visible = true;
</script>

<h1>Dashboard</h1>


<div class="card">
  <div class="card-body">
    <select class="form-select danger" name="dashboardselect" bind:value={wahl}>
      <option value="produkte">Produkte</option>
      <option value="teile">Teile</option>
      <option value="möbelhaus">Möbelhäuser</option>
  </select>

<br>

  <label>
	<input type="checkbox" bind:checked={visible}>
	inklusive Anzahl
</label>

  </div>
</div>






<div class="chart-container">
    {#if wahl == 'produkte'}
  <div class="row Produkte">
    <div class="col">
      <PreisBarChart />
    </div>
    {#if visible}
    <div class="col" transition:fade> <!-- Fade transition svelte => https://svelte.dev/examples/transition -->
      <AnzahlProdukteChart />
    </div>
    {/if}

    <div class="col">
      <AnzahlTeileProdukt/>
    </div>
    
  </div>
  {/if}
  {#if wahl == 'teile'}
  <div class="row Teile">
    {#if visible}
    <div class="col">
      <AnzahlTeileChart />
    </div>{/if}
    <div class="col">
      <AnzahlProdukteTeil/>
    </div>
    
  </div>
  {/if}

  {#if wahl == 'möbelhaus'}
  <div class="row Möbelhaus">
    {#if visible}
      
    
    <div class="col">
      <AnzahlMoeblehaeuser />
    </div>{/if}

    <div class="col">
      <AnzahlProdukteHaus/>
    </div>
  </div>
  {/if}
</div>

<style>
  .chart-container {
    padding: 15px;
    margin-top: 15px;
    background-color: papayawhip;
  }

  select{
    background-color: #546c5e;
    color: white;
    width:15%;
  }

  .card{
    width: 40%;
  }

  .card-body{
    width: 200%; /* damit der select Button die Breite behält */
  }

</style>

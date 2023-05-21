<script>
  import axios from "axios";
  import { each } from "svelte/internal";
  import Produkte from "../products/Produkte.svelte";

  export let params = {};

  let id;

  $: {
    // "Reactive Statement":
    // This block of is executed whenever the value of a variable in it changes.
    // See https://svelte.dev/tutorial/reactive-statements
    id = params.id;
    getHaus();
  }

  let moebelhaus = {
    Ort: "",
    Beschreibung: "",
    Produkte: [],
  };
  let allProducts = [];
  let selectedProdukt;

  function getHaus() {
    axios.get("http://localhost:3001/api/moebelhaus/" + id).then((response) => {
      moebelhaus = response.data;
      console.log(moebelhaus);
    });
  }

  // alle Produkte holen
  function getProducts() {
    axios.get("http://localhost:3001/api/products").then((response) => {
      allProducts = response.data;
    });
  }
  getProducts();

  //fügt neue Produkte zum Array des Möblhauses hinzu
  function updateArray() {
    moebelhaus.Produkte = [...moebelhaus.Produkte, selectedProdukt];
    setTimeout(updateMoebelhaus(), 100);
  }
  function updateMoebelhaus() {
    axios
      .put("http://localhost:3001/api/moebelhaus/edit/" + id, moebelhaus)
      .then((response) => {});
  }

  //setzt id zum löschen
  function setIdDelete(val) {
    selectedProdukt = val;
    setTimeout(deleteFromArray, 100);
  }

  //löscht Verbautes Produkt aus Array des Möbelhauses
  function deleteFromArray() {
    moebelhaus.Produkte = moebelhaus.Produkte.filter(
      (item) => item !== selectedProdukt
    );
    updateMoebelhaus();
  }
</script>
<a href="#/moebelhaeuser">
<button class="btn btn-secondary" type="button">
  <i class="fas fa-arrow-left" /> Zurück
</button></a>

<div class="row">
  <div class="col-4">
    <div class="card" style="width: 18rem;">
      <img src={moebelhaus.image} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{moebelhaus.Ort}</h5>
        <p class="card-text">{moebelhaus.Beschreibung}</p>
        <a href={"#/moebelhaus/edit/" + id} class="btn btn-primary">bearbeiten</a>
      </div>
    </div>
  </div>

  <div class="col-8">
    <div class="abstand">
      <br />
      <h1>Produkte in diesem Möbelhaus:</h1>
      <div />
    </div>

    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target=".multi-collapse"
      aria-expanded="false"
      aria-controls="multiCollapseExample1 multiCollapseExample2"
      >Produkte anzeigen</button
    >

    <div class="relation collapse multi-collapse">
      <div class="card-container">
        {#each allProducts as ap}
          {#each moebelhaus.Produkte as p}
            {#if ap._id == p}
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{ap.Bezeichnung}</h5>
                  <br />
                  <a href={"#/products/" + p} class="btn btn-secondary"
                    >Mehr dazu</a
                  >
                  <button
                    class="btn btn-delete"
                    type="button"
                    on:click={setIdDelete(p)}
                  >
                    <i class="fas fa-times" /> entfernen
                  </button>
                </div>
              </div>
            {/if}
          {/each}
        {/each}
      </div>
      <button
        class="btn btn-success"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i class="fas fa-plus" /> Produkt hinzufügen
      </button>
    </div>
  </div>
</div>

<div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">
          Produkt hinzufügen
        </h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div class="modal-body">
        <select
          class="form-select"
          id="inputGroupSelect01"
          bind:value={selectedProdukt}
        >
          {#each allProducts as p}
            <option value={p._id}>{p.Bezeichnung}</option>
          {/each}
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
          >Close</button
        >
        <button
          type="button"
          class="btn btn-primary"
          data-bs-dismiss="modal"
          on:click={updateArray}>Save changes</button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .card {
    margin-right: 2%;
    margin-bottom: 2%;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
  }

  .relation {
    background-color: lightgrey;
    padding-top: 2%;
    padding-left: 5%;
  }
</style>

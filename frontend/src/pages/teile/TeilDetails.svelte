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
    getTeil();
  }

  let teil = {
    Bezeichnung: "",
    Material: "",
    Gewicht: 0,
    Höhe: 0,
    Länge: 0,
    Breite: 0,
    Produkte: [],
  };

  let products = [];
  let selectedProdukt;

  //das Teil wird geholt und gespeichert
  function getTeil() {
    axios.get("http://localhost:3001/api/teile/" + id).then((response) => {
      teil = response.data;
    });
  }

  // alle Produkte holen
  function getProducts() {
    axios.get("http://localhost:3001/api/products").then((response) => {
      products = response.data;
    });
  }
  getProducts(); 
  
  // einzelnes Produkt speichern (wird gebraucht, um verbautes Produkt upzudaten)
  let produkt = {
    Preis: 0,
    Bezeichnung: "",
    Teile: [],
  };
  function getProdukt(x) {
    axios.get("http://localhost:3001/api/produkte/" + x).then((response) => {
      produkt = response.data;
    });
  }

  //fügt neue Produkte zum Array des Teils hinzu
  function updateArray() {
    getProdukt(selectedProdukt);
    teil.Produkte = [...teil.Produkte, selectedProdukt];
    // updatet dann direkt das Produkt, sodass das Produkt auch dieses Teil enthalten hat
    setTimeout(updateProduktTeile, 100);
  }
  function updateTeil() {
    axios
      .put("http://localhost:3001/api/teile/edit/" + id, teil)
      .then((response) => {});
  }

  //setzt dem Teil das Produkt als array und updatet es
  function updateProduktTeile() {
    produkt.Teile = [...teil.Produkte, id];
    updateProdukt();
  }

  //diese Funktion fügt dem Produkt das Teil hinzu
  function updateProdukt() {
    axios
      .put(
        "http://localhost:3001/api/produkte/update/" + selectedProdukt,
        produkt
      )
      .then((response) => {});
  }

  //setzt id zum löschen
  function setIdDelete(val) {
    selectedProdukt = val;
    getProdukt(val);
    setTimeout(deleteFromArray, 100);
  }

  //löscht Verbautes Produkt aus Array des Teils
  function deleteFromArray() {
    teil.Produkte = teil.Produkte.filter((item) => item !== selectedProdukt); // filtert das gespeicherte Produkt raus
    updateTeil();
    ProduktEntferntTeil();
  }

  //einfügen: updatet Teil wenn es aus Produkt gelöscht wird
  function ProduktEntferntTeil() {
    produkt.Teile = produkt.Teile.filter((item) => item !== id); //hier wird beim gespeichertem Produkt das Teil aus Array gelöscht
    updateProdukt();
  }
</script>

<div class="row">
  <div class="col-md-6">

  


<div class="mb-5">
  <a href="#/teile"
    ><button class="btn btn-secondary" type="button">
      <i class="fas fa-arrow-left" /> Zurück
    </button></a
  >

  <div class="row">
    <div class="col-8">
      <h1 class="mt-3">Teil</h1>
      <h3>ID: {id}</h3>
    </div>
  </div>

  <form>
    <fieldset disabled>
      <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Bezeichnung:</label>
        <input
          type="text"
          class="form-control"
          placeholder={teil.Bezeichnung}
        />
      </div>

      <div class="mb-3">
        <label for="disabledSelect" class="form-label">Material</label>
        <select id="disabledSelect" class="form-select">
          <option>{teil.Material}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Gewicht (g):</label>
        <input type="number" class="form-control" placeholder={teil.Gewicht} />
      </div>

      <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Höhe (mm):</label>
        <input type="number" class="form-control" placeholder={teil.Höhe} />
      </div>

      <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Länge (mm):</label>
        <input type="number" class="form-control" placeholder={teil.Länge} />
      </div>

      <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Breite (mm):</label>
        <input type="number" class="form-control" placeholder={teil.Breite} />
      </div>
    </fieldset>
  </form>
</div>

<div class="abstand">
  <a href={"#/teile/edit/" + teil._id}
    ><button class="btn btn-success" type="button">
      <i class="fas fa-edit" /> Teil bearbeiten
    </button></a
  >
</div>
</div>

<div class="col-md-6">

<div class="abstand">
  <br />
  <h3>wird in folgenden Produkten verwendet</h3>
  <div />
</div>

<p>
  <button
    class="btn btn-primary"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target=".multi-collapse"
    aria-expanded="false"
    aria-controls="multiCollapseExample1 multiCollapseExample2"
    >Produkte anzeigen</button
  >
</p>

<div class="relation collapse multi-collapse">
  <div class="card-container">
    {#each products as p}
      {#each teil.Produkte as pid}
        {#if p._id == pid}
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">{p.Bezeichnung}</h5>
              <br />
              <a href={"#/products/" + pid} class="btn btn-secondary"
                >Mehr dazu</a
              >
              <button
                class="btn btn-delete"
                type="button"
                on:click={setIdDelete(pid)}
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
          {#each products as p}
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
          on:click={updateArray}
          on:click={updateTeil}>Save changes</button
        >
      </div>
    </div>
  </div>
</div>
</div></div>
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

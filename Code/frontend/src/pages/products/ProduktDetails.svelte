<script>
  import axios from "axios";
  import { get } from "svelte/store";
  import Teile from "../teile/Teile.svelte";

  export let params = {};
  let id;

  $: {
    id = params.id;
    getProdukt();
  }

  let produkt = {
    Preis: 0,
    Bezeichnung: "",
    Teile: [],
  };

  let teile = [];

  //das Produkt wird geholt und gespeichert
  function getProdukt() {
    axios.get("http://localhost:3001/api/produkte/" + id).then((response) => {
      produkt = response.data;
    });
  }

  // alle Teile holen
  function getTeile() {
    axios.get("http://localhost:3001/api/teile").then((response) => {
      teile = response.data;
    });
  }
  getTeile();

  //fügt neue Teile zum Array des Produkts hinzu
  let selectedTeil;
  function updateArray() {
    getTeil(selectedTeil);
    produkt.Teile = [...produkt.Teile, selectedTeil];
    // updatet dann direkt das Teil, sodass das Teil auch in diesem Produkt verbaut ist
    setTimeout(updateTeilProdukte, 100);
  }
  function updateProdukt() {
    axios
      .put("http://localhost:3001/api/produkte/update/" + id, produkt)
      .then((response) => {});
  }

  // einzelnes Teil speichern (wird gebraucht, um verbautes Teil upzudaten)
  let teil = {
    Bezeichnung: "",
    Material: "",
    Gewicht: 0,
    Höhe: 0,
    Länge: 0,
    Breite: 0,
    Produkte: [],
  };
  function getTeil(x) {
    axios.get("http://localhost:3001/api/teile/" + x).then((response) => {
      teil = response.data;
    });
  }

  //setzt dem Teil das Produkt als array und updatet es
  function updateTeilProdukte() {
    teil.Produkte = [...teil.Produkte, id];
    updateTeil();
  }

  //diese Funktion fügt dem Teil das Produkt hinzu
  function updateTeil() {
    axios
      .put("http://localhost:3001/api/teile/edit/" + selectedTeil, teil)
      .then((response) => {});
  }

  //setzt id zum löschen
  function setIdDelete(val) {
    selectedTeil = val;
    getTeil(val);
    setTimeout(deleteFromArray, 100);
  }

  //löscht Verbautes Teil aus Array des Produkts
  function deleteFromArray() {
    produkt.Teile = produkt.Teile.filter((item) => item !== selectedTeil);
    updateProdukt();
    TeilEntferntProdukt();
  }

  //einfügen: updatet Teil wenn es aus Produkt gelöscht wird
  function TeilEntferntProdukt() {
    teil.Produkte = teil.Produkte.filter((item) => item !== id);
    updateTeil();
  }

  //holt alle Möbelhäuser
  let haeuser = [];

  function getHaeuser() {
    axios.get("http://localhost:3001/api/moebelhaeuser").then((response) => {
      haeuser = response.data;
    });
  }
  getHaeuser();
</script>

<div class="row">
  <div class="col-md-6">
    <div class="mb-5">
      <a href="#/products">
        <button class="btn btn-secondary" type="button">
          <i class="fas fa-arrow-left" /> Zurück
        </button></a
      >

      <h1 class="mt-3">Produkt</h1>
      <h3>ID: {id}</h3>
      <form>
        <fieldset disabled>
          <div class="mb-3">
            <label for="disabledTextInput" class="form-label"
              >Bezeichnung:</label
            >
            <input
              type="text"
              class="form-control"
              placeholder={produkt.Bezeichnung}
            />
          </div>

          <div class="mb-3">
            <label for="disabledTextInput" class="form-label"
              >Preis in CHF:</label
            >
            <input
              type="number"
              class="form-control"
              placeholder={produkt.Preis}
            />
          </div>
        </fieldset>
      </form>
    </div>
    <div class="abstand">
      <a href={"#/products/edit/" + produkt._id}
        ><button class="btn btn-success" type="button">
          <i class="fas fa-edit" /> Produkt bearbeiten
        </button></a
      >
    </div>
  </div>
  
  <div class="col-md-6">
    <div class="abstand">
      <br />
      <h3>wird aus folgenden Teilen hergestellt</h3>
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
        >Teile anzeigen</button
      >
    </p>
    <div class="relation collapse multi-collapse">
      <div class="card-container">
        {#each teile as teil}
          {#each produkt.Teile as tid}
            {#if teil._id == tid}
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">{teil.Bezeichnung}</h5>
                  <br />
                  <a href={"#/teile/" + tid} class="btn btn-secondary"
                    >Mehr dazu</a
                  >
                  <button
                    class="btn btn-delete"
                    type="button"
                    on:click={setIdDelete(tid)}
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
        <i class="fas fa-plus" /> Teil hinzufügen
      </button>
    </div>

    <div class="abstand">
      <br />
      <h3>In diesen Möbelhäusern verfügbar</h3>
      <div />
    </div>

    <p>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target=".multi-collapse2"
        aria-expanded="false"
        aria-controls="multiCollapseExample1 multiCollapseExample2"
        >Möbelhäuser anzeigen</button
      >
    </p>
    <div class="relation collapse multi-collapse2">
      <div class="card-container">
        {#each haeuser as h}
          {#each h.Produkte as hp}
            {#if id == hp}
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">{h.Ort}</h5>
                  <br />
                  <a href={"#/moebelhaus/" + h._id} class="btn btn-secondary"
                    >Mehr dazu</a
                  >
                </div>
              </div>
            {/if}
          {/each}
        {/each}
      </div>
    </div>

    <!-- hier kommt das Popup-Fenster -->
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
              Teil hinzufügen
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
              bind:value={selectedTeil}
            >
              {#each teile as t}
                <option value={t._id}>{t.Bezeichnung}</option>
              {/each}
            </select>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal">Close</button
            >
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              on:click={updateArray}
              on:click={updateProdukt}>Save changes</button
            >
          </div>
        </div>
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

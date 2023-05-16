<script>
  import axios from "axios";

  export let params = {};

  let id;

  $: {
    // "Reactive Statement":
    // This block of is executed whenever the value of a variable in it changes.
    // See https://svelte.dev/tutorial/reactive-statements
    id = params.id;
    getProdukt();
  }

  let produkt = {
    Preis: 0,
    Bezeichnung: "",
    Teile: [],
  };

  function getProdukt() {
    axios.get("http://localhost:3001/api/produkte/" + id).then((response) => {
      produkt = response.data;
    });
  }

  function updateProdukt() {
    axios
      .put("http://localhost:3001/api/produkte/update/" + id, produkt)
      .then((response) => {
        console.log("erfolg");
      });
  }

  function deleteProdukt() {
    axios
      .delete("http://localhost:3001/api/delete/produkte/" + id)
      .then((response) => {
        alert("Teil gelöscht");
      });
  }
</script>

<a href={"#/products/" + id}
  ><button class="btn btn-cancel" type="button">
    <i class="fas fa-times" /> cancel
  </button></a
>

<a href={"#/products/" + id}
  ><button on:click={updateProdukt} class="btn btn-success" type="button">
    <i class="fas fa-save" /> speichern
  </button></a
>

<a href="#/products"
  ><button on:click={deleteProdukt} class="btn btn-delete" type="button">
    <i class="fas fa-times" /> löschen
  </button></a
>

<div class="col-8">
  <h1 class="mt-3">Produkt (ID: {id})</h1>
</div>

<form>
  <div class="mb-3">
    <label for="disabledTextInput" class="form-label">Bezeichnung:</label>
    <input type="text" class="form-control" bind:value={produkt.Bezeichnung} />
  </div>

  <div class="mb-3">
    <label for="disabledTextInput" class="form-label">Preis in CHF:</label>
    <input type="number" class="form-control" bind:value={produkt.Preis} />
  </div>
</form>

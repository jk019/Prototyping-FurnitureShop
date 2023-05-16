<script>
  import axios from "axios";

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
    Produkte: []
  };

  function getTeil() {
    axios.get("http://localhost:3001/api/teile/" + id).then((response) => {
      teil = response.data;
    });
  }

  function updateTeil() {
    axios
      .put("http://localhost:3001/api/teile/edit/" + id, teil)
      .then((response) => {
        console.log("erfolg");
      });
  }

  function deleteTeil(){
    axios.delete("http://localhost:3001/api/teile/delete/" + id,).then((response) => {alert("Teil gelöscht");});
  }
</script>


<a href={"#/teile/" + id}
  ><button class="btn btn-cancel" type="button">
    <i class="fas fa-times" /> cancel
  </button></a
>

<a href={"#/teile/" + id}
  ><button on:click={updateTeil} class="btn btn-success" type="button">
    <i class="fas fa-save" /> speichern
  </button></a
>

<a href="#/teile"
  ><button on:click={deleteTeil} class="btn btn-delete" type="button">
    <i class="fas fa-times" /> löschen
  </button></a
>



<div class="col-8">
  <h1 class="mt-3">Teil (ID: {id})</h1>
</div>

<form>
  <div class="mb-3">
    <label for="disabledTextInput" class="form-label">Bezeichnung:</label>
    <input type="text" class="form-control" bind:value={teil.Bezeichnung} />
  </div>

  <div class="mb-3">
    <label for="disabledSelect" class="form-label">Material</label>
    <select id="disabledSelect" class="form-select" bind:value={teil.Material}>
      <option value="Holz">Holz</option>
      <option value="Aluminium">Aluminium</option>
      <option value="Plastik">Plastik</option>
      <option value="Fiberglass">Fiberglass</option>
      <option value="Baumwolle">Baumwolle</option>
      <option value="Eisen">Eisen</option>
      <option value="Karton">Karton</option>
      <option value="Stein">Stein</option>
    </select>
  </div>

  <div class="mb-3">
    <label for="disabledTextInput" class="form-label">Gewicht (g):</label>
    <input type="number" class="form-control" bind:value={teil.Gewicht} />
  </div>

  <div class="mb-3">
    <label for="disabledTextInput" class="form-label">Höhe (mm):</label>
    <input type="number" class="form-control" bind:value={teil.Höhe} />
  </div>

  <div class="mb-3">
    <label for="disabledTextInput" class="form-label">Länge (mm):</label>
    <input type="number" class="form-control" bind:value={teil.Länge} />
  </div>

  <div class="mb-3">
    <label for="disabledTextInput" class="form-label">Breite (mm):</label>
    <input type="number" class="form-control" bind:value={teil.Breite} />
  </div>
</form>

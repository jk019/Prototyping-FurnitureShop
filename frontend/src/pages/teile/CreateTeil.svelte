<script>
  import axios from "axios";

  let teil = {
    Bezeichnung: "",
    Material: "",
    Gewicht: "",
    Höhe: "",
    Länge: "",
    Breite: "",
    Produkte: [],
  };

  function addTeil() {
    axios
      .post("http://localhost:3001/api/teile", teil)
      .then((response) => {
        alert("Teil hinzugefügt");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
</script>

<button class="btn btn-secondary" type="button" onclick="history.back()">
  <i class="fas fa-arrow-left" /> Zurück
</button>
<h1 class="mt-3">Füge ein Teil hinzu</h1>

<form>
  <div class="mb-3">
    <label for="" class="form-label">Bezeichnung</label>
    <input class="form-control" type="text" bind:value={teil.Bezeichnung} />
  </div>

  <div class="input-group mb-3">
    <label class="input-group-text" for="inputGroupSelect01">Material</label>
    <select
      class="form-select"
      id="inputGroupSelect01"
      bind:value={teil.Material}
    >
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
    <label for="" class="form-label">Gewicht (g)</label>
    <input class="form-control" type="number" bind:value={teil.Gewicht} />
  </div>

  <div class="mb-3">
    <label for="" class="form-label">Höhe (mm)</label>
    <input class="form-control" type="number" bind:value={teil.Höhe} />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Länge (mm)</label>
    <input class="form-control" type="number" bind:value={teil.Länge} />
    <div class="mb-3">
      <label for="" class="form-label">Breite (mm)</label>
      <input class="form-control" type="number" bind:value={teil.Breite} />
    </div>
  </div>
  <a href="#/teile"><button on:click={addTeil} type="button" class="btn btn-secondary">
    Teil hinzufügen
  </button></a>
</form>

<script>
  import axios from "axios";

  let teile = [];

  function getTeile() {
    axios.get("http://localhost:3001/api/teile").then((response) => {
      teile = response.data;
    });
  }
  getTeile();
</script>

<div class="mb-5">
  <h1 class="mt-3">Liste aller Teile</h1>

  <a href="#/create-teil"
    ><button class="btn btn-success" type="button">
      <i class="fas fa-plus" /> Teil hinzufügen
    </button></a
  >

  <div class="card-container">
      {#each teile as teil}
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{teil.Bezeichnung}</h5>
            <h6 class="card-subtitle mb-2 text-muted">ID: {teil._id}</h6>
            <p class="card-text">Material: {teil.Material} <br> Gewicht: {teil.Gewicht}g</p>
            <a href={"#/teile/" + teil._id}
              ><button class="btn btn-secondary">Details</button>
            </a>
          </div>
        </div>
      {/each}
      </div>

</div>

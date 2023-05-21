<script>
  import axios from "axios";

  let product = {
    Preis: 0,
    Bezeichnung: "",
    Teile: [],
  };

  function addProduct() {
    axios
      .post("http://localhost:3001/api/products", product)
      .then((response) => {
        alert("Produkt hinzugefügt");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
</script>

<div class="mb-5">
  <button class="btn btn-secondary" type="button" onclick="history.back()">
    <i class="fas fa-arrow-left" /> Zurück
  </button>

  <h1 class="mt-3">Füge ein Produkt hinzu</h1>

  <form>
    <div class="mb-3">
      <label for="" class="form-label">Bezeichnung</label>
      <input
        class="form-control"
        type="text"
        bind:value={product.Bezeichnung}
      />
    </div>
    <div class="mb-3">
      <label for="" class="form-label">Preis in CHF</label>
      <input class="form-control" type="number" bind:value={product.Preis} />
    </div>
    <a href="#/products"><button on:click={addProduct} type="button" class="btn btn-secondary">
      Produkt hinzufügen
    </button></a>
  </form>
</div>

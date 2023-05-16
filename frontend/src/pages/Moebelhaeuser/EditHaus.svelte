<script>
    import axios from "axios";
  
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
  
  // holt sich das Haus über die ID
  function getHaus() {
    axios.get("http://localhost:3001/api/moebelhaus/" + id).then((response) => {
      moebelhaus = response.data;
      console.log(moebelhaus);
    });
  }
  
  //updated Möbelhaus in MongoDB
  function updateMoebelhaus() {
    axios
      .put("http://localhost:3001/api/moebelhaus/edit/" + id, moebelhaus)
      .then((response) => {});
  }
  
    function deleteMoebelhaus(){
      axios.delete("http://localhost:3001/api/moebelhaus/delete/" + id,).then((response) => {alert("Möbelhaus gelöscht");});
    }

    // holt sich Bild über Ortsname
    async function getImage() {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1?&key=AIzaSyDFKefE3abn_qmLzIyw1yZoRNQu6jp2O7U&cx=40957605d8cdd4249&q=${encodeURIComponent(moebelhaus.Ort)}&searchType=image&num=1`
    );
    moebelhaus.image = response.data.items[0].link;
    // ruft update-Funktion aus
    setTimeout(updateMoebelhaus(), 100);
  }
  </script>
  
  
  <a href={"#/moebelhaus/" + id}
    ><button class="btn btn-cancel" type="button">
      <i class="fas fa-times" /> cancel
    </button></a
  >
  
  <a href={"#/moebelhaus/" + id}
    ><button on:click={getImage} class="btn btn-success" type="button">
      <i class="fas fa-save" /> speichern
    </button></a
  >
  
  <a href="#/moebelhaeuser"
    ><button on:click={deleteMoebelhaus} class="btn btn-delete" type="button">
      <i class="fas fa-times" /> löschen
    </button></a
  >
  
  
  
  <div class="col-8">
    <h1 class="mt-3">Möbelhaus (ID: {id})</h1>
  </div>
  
  <form>
    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">Ort:</label>
      <input type="text" class="form-control" bind:value={moebelhaus.Ort} />
    </div>
    <div class="mb-3">
        <label for="disabledTextInput" class="form-label">Beschreibung:</label>
        <input type="text" class="form-control" bind:value={moebelhaus.Beschreibung} />
      </div>
  </form>
  
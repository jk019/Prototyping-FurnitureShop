<script>
  import axios from "axios";

  let moebelhaus = {
    Ort: "",
    Beschreibung :"",
    Produkte: [],
    image: "",
  };

  function addMoebelhaus() {
    axios
      .post("http://localhost:3001/api/moebelhaus", moebelhaus)
      .then((response) => {
        alert("Möbelhaus hinzugefügt");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getImage() {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1?&key=AIzaSyDFKefE3abn_qmLzIyw1yZoRNQu6jp2O7U&cx=40957605d8cdd4249&q=${encodeURIComponent(moebelhaus.Ort)}&searchType=image&num=1`
    );
    console.log(response.data);
    moebelhaus.image = response.data.items[0].link;
    setTimeout(addMoebelhaus(), 100);
  }
</script>

<button class="btn btn-secondary" type="button" onclick="history.back()">
  <i class="fas fa-arrow-left" /> Zurück
</button>

<h1 class="mt-3">Füge ein Möbelhaus hinzu</h1>

<form>
  <div class="mb-3">
    <label for="" class="form-label">Ort</label>
    <input class="form-control" type="text" bind:value={moebelhaus.Ort} />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Beschreibung</label>
    <textarea
      class="form-control"
      type="text"
      bind:value={moebelhaus.Beschreibung}
    />
  </div>
  <a href="#/moebelhaeuser"><button on:click={getImage(moebelhaus.Ort)} type="button" class="btn btn-secondary">
    Möbelhaus hinzufügen
  </button></a>
</form>

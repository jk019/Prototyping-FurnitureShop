<script>
  import axios from "axios";

  let image = "";
  let query = "Haus";
  /* getImage(); */
  async function getImage() {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1?&key=AIzaSyDFKefE3abn_qmLzIyw1yZoRNQu6jp2O7U&cx=40957605d8cdd4249&q=${encodeURIComponent(query)}&searchType=image&num=1`
    );
    image = response.data.items[0].link;
    console.log(image)
  }

  let haeuser = [];

  function getHaeuser() {
    axios.get("http://localhost:3001/api/moebelhaeuser").then((response) => {
      haeuser = response.data;
    });
  }

  getHaeuser();
</script>

<h1>Unsere Möbelhäuser</h1>

<a href="#/create-moebelhaus"
  ><button class="btn btn-success" type="button">
    <i class="fas fa-plus" /> Möbelhaus hinzufügen
  </button>
</a>

<div class="card-container">
  {#each haeuser as haus}
    <div class="card" style="width: 18rem;">
      <img src={haus.image} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{haus.Ort}</h5>
        <a href={"#/moebelhaus/" + haus._id} class="btn btn-secondary">Mehr dazu</a>
      </div>
    </div>
  {/each}
</div>


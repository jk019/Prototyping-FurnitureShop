<script>
  import axios from "axios";

  let products = [];

  function getProducts() {
    axios.get("http://localhost:3001/api/products").then((response) => {
      products = response.data;
      setTimeout(calcMean(), 100)
    });
  }
  getProducts();

  //berachnet Durchschnittspreis
  let mean = 0;
  function calcMean(){
    var x=0; 
    var total =0;
    for (let i=0; i<products.length; i++){
      total +=products[i].Preis;
      x++;
    }
    mean = total/x;
  }
  
  
</script>



<div class="mb-5">
  <h1 class="mt-3">Liste aller Produkte</h1>

  <div class="card oben">
    <div class="card-body">
      Durchschnittspreis der Produkte: CHF {mean}
    </div>
  </div>

  <a href="#/create-product"
    ><button class="btn btn-success" type="button">
      <i class="fas fa-plus" /> Produkt hinzufügen
    </button></a
  >

  
  <div class="card-container">
      {#each products as product}
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{product.Bezeichnung}</h5>
            <h6 class="card-subtitle mb-2 text-muted">ID: {product._id}</h6>
            <p class="card-text">CHF {product.Preis}.00</p>
            <a href={"#/products/" + product._id}
              ><button class="btn btn-secondary">Details</button>
            </a>
          </div>
        </div>
      {/each}
  </div>

</div>

<style>
  .oben{
    width: 30%;
    background-color: lightgray;
    color: #546c5e;
    font-weight: bolder;
  }
</style>

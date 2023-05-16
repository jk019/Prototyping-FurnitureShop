// Pages
import Home from "./pages/Home.svelte";

import Produkte from "./pages/products/Produkte.svelte";
import CreateProdukt from "./pages/products/CreateProdukt.svelte";
import ProduktDetails from "./pages/products/ProduktDetails.svelte";
import EditProdukt from "./pages/products/EditProdukt.svelte";

import Teile from "./pages/teile/Teile.svelte";
import CreateTeil from "./pages/teile/CreateTeil.svelte";
import TeilDetails from "./pages/teile/TeilDetails.svelte";
import EditTeil from "./pages/teile/EditTeil.svelte";

import Moebelhaeuser from "./pages/Moebelhaeuser/Moebelhaeuser.svelte";
import CreateMoebelhaus from "./pages/moebelhaeuser/CreateMoebelhaus.svelte";
import MoebelhausDetails from "./pages/Moebelhaeuser/MoebelhausDetails.svelte";
import EditMoebelhaus from "./pages/Moebelhaeuser/EditHaus.svelte";


import Charts from "./pages/charts/Charts.svelte";


export default {
  // Home
  "/": Home,
  "/home": Home,

  //Produkte
  "/products": Produkte,
  "/create-product": CreateProdukt,
  "/products/:id": ProduktDetails,
  "/products/edit/:id": EditProdukt,

  //Teile
  "/teile": Teile,
  "/create-teil": CreateTeil,
  "/teile/:id": TeilDetails,
  "/teile/edit/:id": EditTeil,

  //Möbelhäuser
  "/moebelhaeuser": Moebelhaeuser,
  "/create-moebelhaus": CreateMoebelhaus,
  "/moebelhaus/:id": MoebelhausDetails,
  "/moebelhaus/edit/:id": EditMoebelhaus,

   //Charts
   "/charts": Charts,

};

console.log("Scriptul a fost incarcat cu succes.");

const zoneData = {
  surface: {
    title: "Zona de Suprafata",
    depth: "Adancime: 0 - 200 metri",
    text: "Lumina solara abundenta permite dezvoltarea plantelor si sustine aproximativ 90 la suta din toate speciile marine."
  },
  twilight: {
    title: "Zona de Crepuscul",
    depth: "Adancime: 200 - 1.000 metri",
    text: "Doar o lumina slaba patrunde aici. Animalele au dezvoltat ochi sensibili sau folosesc bioluminiscenta."
  },
  midnight: {
    title: "Zona de Miezul Noptii",
    depth: "Adancime: 1.000 - 4.000 metri",
    text: "Lumina soarelui nu ajunge niciodata aici. Presiunea apei este extrema si temperaturile sunt foarte scazute."
  }
};

const displayTitle = document.getElementById("display-title");
const displayDepth = document.getElementById("display-depth");
const displayText = document.getElementById("display-text");

const btnSurface = document.getElementById("btn-surface");
const btnTwilight = document.getElementById("btn-twilight");
const btnMidnight = document.getElementById("btn-midnight");

function updateZone(zoneKey) {
  const selectedZone = zoneData[zoneKey];
  displayTitle.textContent = selectedZone.title;
  displayDepth.textContent = selectedZone.depth;
  displayText.textContent = selectedZone.text;
  console.log("Zona afisata: " + selectedZone.title);
}

btnSurface.addEventListener("click", function () {
  console.log("Butonul Suprafata a fost apasat.");
  updateZone("surface");
});

btnTwilight.addEventListener("click", function () {
  console.log("Butonul Crepuscul a fost apasat.");
  updateZone("twilight");
});

btnMidnight.addEventListener("click", function () {
  console.log("Butonul Miezul Noptii a fost apasat.");
  updateZone("midnight");
});

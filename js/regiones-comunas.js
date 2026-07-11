const REGIONES_COMUNAS = [
<<<<<<< HEAD
  { region: "Región Metropolitana", comunas: ["Santiago Centro","Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba","Independencia","La Cisterna","La Florida","La Granja","La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura","Quinta Normal","Recoleta","Renca","San Joaquín","San Miguel","San Ramón","Vitacura","Puente Alto","Pirque","San José de Maipo","Colina","Lampa","Tiltil","San Bernardo","Buin","Calera de Tango","Paine","Melipilla","Alhué","Curacaví","María Pinto","San Pedro","Talagante","El Monte","Isla de Maipo","Padre Hurtado","Peñaflor"] },
=======
  { region: "Región Metropolitana", comunas: ["Santiago","Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba","Independencia","La Cisterna","La Florida","La Granja","La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura","Quinta Normal","Recoleta","Renca","San Joaquín","San Miguel","San Ramón","Vitacura","Puente Alto","Pirque","San José de Maipo","Colina","Lampa","Tiltil","San Bernardo","Buin","Calera de Tango","Paine","Melipilla","Alhué","Curacaví","María Pinto","San Pedro","Talagante","El Monte","Isla de Maipo","Padre Hurtado","Peñaflor"] },
>>>>>>> master
  { region: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
  { region: "Biobío", comunas: ["Concepción", "Talcahuano", "Chillán"] },
  { region: "Araucanía", comunas: ["Temuco", "Villarrica", "Angol"] },
  { region: "Antofagasta", comunas: ["Antofagasta", "Calama", "Tocopilla"] }
];

function poblarRegiones(selectRegionId, selectComunaId) {
  const regionSelect = document.getElementById(selectRegionId);
  const comunaSelect = document.getElementById(selectComunaId);
  if (!regionSelect || !comunaSelect) return;

  regionSelect.innerHTML = '<option value="">Seleccione una región</option>';
  REGIONES_COMUNAS.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.region;
    opt.textContent = item.region;
    regionSelect.appendChild(opt);
  });

  regionSelect.addEventListener("change", () => actualizarComunas(selectRegionId, selectComunaId));
}

function actualizarComunas(selectRegionId, selectComunaId, valorComuna = "") {
  const regionSelect = document.getElementById(selectRegionId);
  const comunaSelect = document.getElementById(selectComunaId);
  if (!regionSelect || !comunaSelect) return;

  const regionData = REGIONES_COMUNAS.find(r => r.region === regionSelect.value);
  comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';

  if (regionData) {
    regionData.comunas.forEach(comuna => {
      const opt = document.createElement("option");
      opt.value = comuna;
      opt.textContent = comuna;
      if (valorComuna === comuna) opt.selected = true;
      comunaSelect.appendChild(opt);
    });
  }
}

window.REGIONES_COMUNAS = REGIONES_COMUNAS;
window.poblarRegiones = poblarRegiones;
window.actualizarComunas = actualizarComunas;

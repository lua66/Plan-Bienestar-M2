document.addEventListener("DOMContentLoaded",()=>{

const FORM_URL="https://docs.google.com/forms/d/e/1FAIpQLSdUCu_jSgP70VvRwlDIwUwctjxcuHS7OzB6PA9R5l0fs4Zpqg/viewform?usp=header";

const DAYS=["L","M","X","J","V","S","D"];
const FULL=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

const WEEK = [
  {
    diet:`DESAYUNO (9:30 aprox)
• Café o infusión
• Yogur natural con nueces
• 1 fruta (kiwi o manzana)
• 2 huevos cocidos

COMIDA
• Ensalada grande (lechuga, tomate, cebolla, zanahoria)
• Pechuga de pollo
• Frutos secos
• Infusión

CENA (antes de las 21:00)
• Sopa de Marisco`,
    work:`• Al levantarte: estiramientos 20 min
• 2 minutos de respiración profunda`
  },

  {
    diet:`DESAYUNO (9:30 aprox)
• Café o infusión
• Avena con bebida vegetal + 1 plátano pequeño
• Tortilla a la francesa

COMIDA
• Verduras salteadas
• Pescado al horno
• Pequeña ración patata 1
• Fruta
• Infusión

CENA (antes de las 21:00)
• Crema de verdura + pavo
• Yogur`,
    work:`• Al levantarte: estiramientos 20 min
• 3 minutos de respiración profunda en posición yoga`
  },

  {
    diet:`DESAYUNO (9:30 aprox)
• Café o infusión
• Yogur natural o kéfir con una cucharada de chia
• 1 Huevo cocido
• 1 Naranja

COMIDA
• brócoli al vapor y quinoa
• salmón al horno con hierbas
• alcachofas 2
• Infusión

CENA (antes de las 21:00)
• Ensalada pequeña con tomate,aguacate,rucula,espinaca,nueces,manzana
• Yogurt
• Sin pan, sin dulce`,
    work:`• Al levantarte: estiramientos 20 min
• Sentadillas espalda en la pared (20 seg x 2)
• 3 minutos de respiración en posición yoga`
  },

  {
    diet:`DESAYUNO (9:30 aprox)
• Café o infusión
• Tostada integral con queso crema y pavo
• frutos secos 1 puñado pequeño.

COMIDA
• lentejas con verduras y arroz
• Fruta
• Infusión

CENA (antes de las 21:00)
• Crema de verduras con jamón dulce`,
    work:`• Al levantarte: estiramientos 20 min
• Sentadillas espalda en la pared (30 seg x 2)
• 3 minutos de respiración en posición yoga`
  },

  {
    diet:`DESAYUNO (9:30 aprox)
• Café o infusión
• Bebida vegetariana de avena con linaza.
• 1 fruta
• 1 Huevo cocido

COMIDA
• Berenjena, Zanahoria y calabacín al horno
• carne magra de vacuno
• Naranja o mandarina
• Infusión

CENA (antes de las 21:00)
• Crema de verduras o caldo
• Yogurt`,
    work:`• Al levantarte: estiramientos 20 min
• Sentadillas espalda en la pared (40 seg x 2)
• 3 minutos de respiración en posición yoga`
  },

  {
    diet:`Hoy decides tú
? Desayuna normal
? Come algo que te guste y dobla la proteína
? Si quieres un postre, disfrútalo sin culpas
? Cena ligero`,
    work:`• Muévete como te apetezca
• Pasear, ordenar la casa o descansar`
  },

  {
    diet:`Alimentación tranquila
• Come despacio
• Prioriza comida casera y baja en sal
• Cena ligera`,
    work:`Reto del domingo
• Caminar 45 minutos`
  }
];

const STATUS={
  good:{e:"😁",p:"Muy bien hoy 💚"},
  mid:{e:"😯",p:"Vas bien 💚"},
  bad:{e:"😴",p:"Mañana seguimos 💚"}
};

const PHRASES={
  good:["Hoy sumaste salud 💚","Constancia tranquila 💚"],
  mid:["No hace falta perfecto 💚"],
  bad:["Descansar también es avanzar 💚"]
};

let progress=Array.from({length:7},()=>({diet:false,work:false}));
let currentDay=0;

const home=document.getElementById("homeCard");
const day=document.getElementById("dayCard");
const gym=document.getElementById("gymCard");
const commit=document.getElementById("commitCard");

function show(section){
  home.style.display="none";
  day.style.display="none";
  gym.style.display="none";
  commit.style.display="none";
  section.style.display="block";
}

function getState(i){
  const d=progress[i];
  if(d.diet&&d.work) return "good";
  if(d.diet||d.work) return "mid";
  return "bad";
}

function renderHome(){
  const grid=document.getElementById("weekGrid");
  grid.innerHTML="";

  for(let i=0;i<7;i++){
    const st=getState(i);
    const div=document.createElement("div");
    div.className=`dayBtn ${st}`;
    div.innerHTML=`${DAYS[i]}<br>${STATUS[st].e}`;
    div.onclick=()=>{currentDay=i;renderDay();};
    grid.appendChild(div);
  }

  const st=getState(0);
  document.getElementById("phraseText").textContent=PHRASES[st][0];
  document.getElementById("phraseHint").textContent="Entra en tu día y marca completado.";
  show(home);
}

function renderDay(){
  const st=getState(currentDay);
  document.getElementById("dayTitle").textContent=FULL[currentDay];
  document.getElementById("dayMood").textContent=STATUS[st].p;
  document.getElementById("dietText").textContent=WEEK[currentDay].diet;
  document.getElementById("workText").textContent=WEEK[currentDay].work;

  const dietToggle=document.getElementById("dietToggle");
  const workToggle=document.getElementById("workToggle");

  dietToggle.classList.toggle("on", progress[currentDay].diet);
  workToggle.classList.toggle("on", progress[currentDay].work);

  show(day);
}

document.getElementById("dietToggle").onclick=()=>{
  progress[currentDay].diet=!progress[currentDay].diet;
  renderDay();
};

document.getElementById("workToggle").onclick=()=>{
  progress[currentDay].work=!progress[currentDay].work;
  renderDay();
};

document.getElementById("closeDay").onclick=renderHome;
document.getElementById("btnHome").onclick=renderHome;

document.getElementById("openCommit").onclick=()=>show(commit);
document.getElementById("closeCommit").onclick=renderHome;
document.getElementById("goToForm").onclick=()=>window.open(FORM_URL,"_blank");

/* ================= GYM ================= */

const gymData={
  yoga:{
    title:"CLASES DE YOGA",
    subtitle:"Tu dosis semanal de paz 🧘‍♀️",
    days:[
      ["Lunes","Yoga despertar","https://youtu.be/_l5pd-g3MSg"],
      ["Martes","Yoga espalda","https://youtu.be/yGs0fyEWPS4"],
      ["Miércoles","Flexibilidad cadera","https://youtu.be/gNXD67fUs7c"],
      ["Jueves","Flow dinámico","https://youtu.be/NpdcHL4tEvk"],
      ["Viernes","Relajación profunda","https://youtu.be/GdUjU_hYEXk"]
    ]
  },

  pilates:{
    title:"CLASES DE PILATES",
    subtitle:"Control y postura 🤸",
    days:[
      ["Lunes","Pilates básico","https://youtu.be/j5nc4RgMk18"],
      ["Martes","Core hipopresivo","https://youtu.be/1_QpV0DwldQ"],
      ["Miércoles","Pilates con silla","https://youtu.be/c2lk0PeSwAM"],
      ["Jueves","Glúteos y piernas","https://youtu.be/LKIen1o0_oo"],
      ["Viernes","Total Body Flow","https://youtu.be/_j6DFxctXcY"]
    ]
  },

  tonificacion:{
    title:"TONIFICACIÓN",
    subtitle:"Fuerza muscular 💪",
    days:[
      ["Lunes","Brazos y hombros","https://youtu.be/eW_rqfTESho"],
      ["Martes","Rutina GAP","https://youtu.be/KmlZP531iys"],
      ["Miércoles","Full Body","https://youtu.be/QYaEa3wbIuw"],
      ["Jueves","Espalda firme","https://youtu.be/MBhaqlpN77c"],
      ["Viernes","Circuito quemagrasas","https://youtu.be/5SJEygZQrDA"]
    ]
  },

  sanacion:{
    title:"SANACIÓN INTERIOR",
    subtitle:"Respira, calma tu mente y reconecta 🕊️",
    days:[
      ["Lunes","Respiración consciente","https://youtu.be/inpok4MKVLM"],
      ["Martes","Meditación guiada","https://youtu.be/ZToicYcHIOU"],
      ["Miércoles","Relajación profunda","https://youtu.be/aNXKjGFUlMs"],
      ["Jueves","Calma mental","https://youtu.be/1vx8iUvfyCY"],
      ["Viernes","Respira y suelta","https://youtu.be/O-6f5wQXSu8"],
      ["Sábado","Meditación corta","https://youtu.be/4EaMJOo1jks"],
      ["Domingo","Gratitud y paz","https://youtu.be/6p_yaNFSYao"]
    ]
  }
};

const gymTitle=document.getElementById("gymTitle");
const gymSubtitle=document.getElementById("gymSubtitle");
const gymDays=document.getElementById("gymDays");

document.querySelectorAll(".gymItem").forEach(item=>{
  item.onclick=()=>{
    const key=item.dataset.gym;
    const data=gymData[key];

    if(!data) return;

    gymTitle.textContent=data.title;
    gymSubtitle.textContent=data.subtitle;
    gymDays.innerHTML="";

    data.days.forEach(d=>{
      const div=document.createElement("div");
      div.className="gymDay";
      div.innerHTML=`<span>${d[0]} · ${d[1]}</span><span>›</span>`;
      div.onclick=()=>window.open(d[2],"_blank");
      gymDays.appendChild(div);
    });

    show(gym);
  };
});

document.getElementById("closeGym").onclick=renderHome;

renderHome();

/* ARREGLO: cargar tabla progreso */
renderTabla();

});

/* RESET CLIENTE */

function resetProgreso(){
if(confirm("¿Seguro que quieres reiniciar los datos del cliente?")){
  localStorage.removeItem("progreso");
  if(typeof datos!=="undefined"){ datos = []; }
  if(typeof renderTabla==="function"){ renderTabla(); }

  const pesoActual=document.getElementById("pesoActual");
  const pesoPerdido=document.getElementById("pesoPerdido");
  const cinturaActual=document.getElementById("cinturaActual");
  const energiaActual=document.getElementById("energiaActual");

  if(pesoActual) pesoActual.innerText="0";
  if(pesoPerdido) pesoPerdido.innerText="0";
  if(cinturaActual) cinturaActual.innerText="0";
  if(energiaActual) energiaActual.innerText="0";
}
}

/* =========================
   PROGRESO CLIENTE
========================= */

let datos = JSON.parse(localStorage.getItem("progreso")) || [];

function renderTabla(){

const tabla = document.getElementById("tablaDatos");
if(!tabla) return;

tabla.innerHTML="";

datos.forEach(d=>{
tabla.innerHTML += `
<tr>
<td>${d.semana}</td>
<td>${d.peso}</td>
<td>${d.cintura}</td>
<td>${d.energia}</td>
</tr>
`;
});

calcularResumen();

}

function guardarProgreso(){

let semana = document.getElementById("semana").value;
let peso = parseFloat(document.getElementById("peso").value);
let cintura = document.getElementById("cintura").value;
let energia = document.getElementById("energia").value;

datos.push({semana,peso,cintura,energia});

localStorage.setItem("progreso",JSON.stringify(datos));

renderTabla();

}

function calcularResumen(){

if(datos.length==0) return;

let pesoInicial = datos[0].peso;
let ultimo = datos[datos.length-1];

document.getElementById("pesoActual").innerText = ultimo.peso;
document.getElementById("pesoPerdido").innerText = (pesoInicial - ultimo.peso).toFixed(1);
document.getElementById("cinturaActual").innerText = ultimo.cintura;
document.getElementById("energiaActual").innerText = ultimo.energia;

}
const key = "d54de004a7e7f3f2f2a6a080d19cc53b";


function toggleMode() {
    const html = document.documentElement
    html.classList.toggle("light")
  }
  

function loadFields(json){
    document.querySelector(".city").innerHTML = "Tempo em " + json.name;
    document.querySelector(".temp").innerHTML = Math.floor(json.main.temp) + "ºC"; 
    document.querySelector(".img-weather").src = `https://openweathermap.org/img/wn/${json.weather[0].icon}.png`;
    document.querySelector(".txt-weather").innerHTML = json.weather[0].description;
    document.querySelector(".humidity").innerHTML = "Umidade: " + json.main.humidity +"%";
    document.querySelector("body").style.backgroundImage = `url(./assets/bg/${json.weather[0].icon}.png)`;
    document.querySelector(".input-city").value = "";

    console.log(json);
}

async function loadCity(city){
    const json = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`).then(data => data.json())
    if(json.cod === 200){
        loadFields(json)
    } else {
        document.querySelector(".input-city").value = "";
        alert("Cidade não encontrada!")
    }
}

function searchCity(){
    const city = document.querySelector(".input-city").value;
    if(city.trim() != ""){
        loadCity(city);
    } else {
        document.querySelector(".input-city").value = "";
    }
}

function inputKeyPress(event){
    if (event.keyCode === 13) {
        // toggleMode(); remover quando implementar botão de troca de tema
        searchCity();
    }
}
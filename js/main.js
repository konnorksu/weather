'use strict';

class MyWeather {

    constructor (latitude, longitude) {
        this.URL = `https://www.7timer.info/bin/astro.php?lon=${longitude}&lat=${latitude}&ac=0&unit=metric&output=json&tzshift=0`;
    }

    getWeather() {
        fetch(this.URL)
        .then((response) => response.json() )
        //.then((data) => console.log( data ) )
        .then((data) => this.showWeather( data.dataseries ) )
    }

    showWeather( dataArray ) {
        weatherDiv.innerHTML = '';
        geolocationDiv.style.display = 'none';

        const table = document.createElement('table');
        const tHead = document.createElement('thead');
        const tBody = document.createElement('tbody');
        table.append(tHead);
        table.append(tBody);
        weatherDiv.append(table);

        tHead.innerHTML = `
            <tr>
                <th>ДАТА<br>время</th>
                <th>температура</th>
                <th>направление<br>ветра</th>
                <th>Вид<br>осадков</th>
            </tr>`;

        dataArray.forEach(data => {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td>' + data.timepoint + '</td>';
            tr.innerHTML +='<td>' + data.temp2m + '</td>';
            tr.innerHTML +='<td>' + data.wind10m.direction + '</td>';
            tr.innerHTML +='<td>' + data.prec_type + '</td>';
            tBody.append(tr);
        });

    }
}

const geolocationDiv  = document.getElementById('geolocationDiv');
const weatherDiv  = document.getElementById('weatherDiv');

const inputLatitude  = document.getElementById('inputLatitude');
const inputLongitude = document.getElementById('inputLongitude');
const btnGeolocation = document.getElementById('btnGeolocation');

const btnGetWeather = document.getElementById('btnGetWeather');

let Geolocation = null;

btnGeolocation.onclick = getGeolocation;
btnGetWeather.onclick = getWeather;

function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getGeolocationSuccess, getGeolocationError);
    } else {
        alert("Геолокация не поддерживается браузером");
    }

    function getGeolocationSuccess(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        inputLatitude.value = latitude;
        inputLongitude.value = longitude;
        Geolocation = new MyWeather(latitude, longitude);
    }

    function getGeolocationError(error) {
        console.log('GET GEOLOCATION ERROR:', error);
    }
}

function getWeather() {
    if (Geolocation === null) alert("Нет геоданных...");
    else Geolocation.getWeather();

}

const currentDate = new Date(); 
console.group('currentDate');
console.log('date:' , currentDate.getDate());
console.log('month:', currentDate.getMonth()+1);
console.log('year:' , currentDate.getFullYear());
console.log('hours:', currentDate.getHours());
console.log('min:', currentDate.getMinutes());
console.log('sec:', currentDate.getSeconds());
console.groupEnd();

// event.preventDefault()
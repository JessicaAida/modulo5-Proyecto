import _ from 'lodash';
import Chart from 'chart.js/auto';
import './estilo.css';
import Imagen from './logo_uvm.png';
import Datos from './datos.csv';
import yaml from './datos.yaml';
import json5 from './datos.json5';
import './estilo.scss';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then(registration => {
            console.log("SW registrado", registration);
        }).catch(err => {
            console.log("SW no registrado", err)
        });
    });
}

function componente() {
    const elemento = document.createElement("div");
    const imagenEncabezado = document.createElement("div");
    const encabezado = document.createElement("p");
    encabezado.innerHTML = "MÓDULO 5 BUILD TOOLS WEB PACK SERVER WORKERS";
    elemento.classList.add("fondo");
    const miImagen = new Image();
    miImagen.src = Imagen;
    imagenEncabezado.appendChild(miImagen);
    elemento.appendChild(encabezado);
    elemento.appendChild(imagenEncabezado);
    return elemento;
}

function graficarCSV() {
    var divPrincipal = document.createElement("div");
    divPrincipal.setAttribute("id", "grafica");
    divPrincipal.innerHTML = "";

    var ctxE = document.createElement("canvas");
    ctxE.setAttribute("id", "graficaCanvas");
    ctxE.style.width = "800px";
    var ctx = ctxE.getContext('2d');
    ctxE.setAttribute("id", "canvas5");
    divPrincipal.appendChild(ctxE);

    if (window.myChart) {
        myChart.clear();
        myChart.destroy();
    }

    window.myChart = new Chart(ctxE, {
        type: 'line',
        data: {
            labels: Datos[0],
            datasets: [{
                    label: '2022',
                    borderColor: "#337ab7",
                    backgroundColor: "#337ab7",
                    data: Datos[1],
                    borderWidth: 2
                },
                {
                    label: '2021',
                    borderColor: "#24135f",
                    backgroundColor: "#24135f",
                    data: Datos[2],
                    borderWidth: 2
                },
                {
                    label: '2020',
                    borderColor: "#2D9326",
                    backgroundColor: "#2D9326",
                    data: Datos[3],
                    borderWidth: 2
                },
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Cantidad de Consultas Registradas por Mes'
                },
                legend: {
                    position: 'top',
                },
            }
        }
    });
    myChart.update();
    return divPrincipal;
}

function datosAlumno() {
    const piePagina = document.createElement("div");
    piePagina.setAttribute("id", "piePagina");
    const spanNombre = document.createElement("p");
    const moduloNombre = document.createElement("p");
    const email = document.createElement("p");

    moduloNombre.innerHTML = json5.owner.module;
    spanNombre.innerHTML = json5.owner.name;
    email.innerHTML = json5.owner.email;

    piePagina.appendChild(moduloNombre);
    piePagina.appendChild(spanNombre);
    piePagina.appendChild(email);
    return piePagina;
}

function agregarTabla() {
    const contiene = document.createElement("div");
    const parrafo = document.createElement("p");
    parrafo.innerHTML = "Detalle de las consultas registradas por mes";
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    parrafo.setAttribute("id", "titulo");

    table.setAttribute("id", "tabladato");
    table.setAttribute("border", "1");

    var row;
    var colum;
    var anio = "2022";
    var i = 0;
    Datos.forEach(element => {

        row = document.createElement('tr');
        colum = document.createElement('td');
        if (i == 0) {
            colum.innerHTML = "/";
        } else {
            colum.innerHTML = anio;
        }

        row.appendChild(colum);

        for (let index = 0; index < element.length; index++) {
            console.log(element[index]);
            colum = document.createElement('td');
            colum.innerHTML = element[index];
            row.appendChild(colum);


        }

        tbody.appendChild(row);

        if (i != 0) {
            anio--;
        }
        i++;

    });
    table.appendChild(thead);
    table.appendChild(tbody);

    contiene.appendChild(parrafo);
    contiene.appendChild(table);

    return contiene;
}


console.log(yaml.title);
console.log(json5.owner.name);

document.body.appendChild(componente());
document.body.appendChild(agregarTabla());

document.body.appendChild(graficarCSV());
document.body.appendChild(datosAlumno());
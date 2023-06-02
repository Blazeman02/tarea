axios.get('https://mindicador.cl/api')
.then(function (response) {
  const indicators = response.data;
  const selector = document.getElementById('indicator-selector');
  
  for (const key in indicators) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = indicators[key].nombre;
    selector.appendChild(option);
  }

  // Agrega un evento de escucha al selector
  selector.addEventListener('change', function () {
    const selectedIndicator = this.value;
    getIndicatorData(selectedIndicator);
  });
})
.catch(function (error) {
  console.log(error);
});

function getIndicatorData(indicator) {
axios.get(`https://mindicador.cl/api/${indicator}`)
  .then(function (response) {
    const indicatorData = response.data.serie;
    const indicatorContainer = document.getElementById('indicator-container');
    
    // Limpia el contenido anterior
    indicatorContainer.innerHTML = '';

    // Crea elementos HTML y muestra la información del indicador
    for (let i = 0; i < indicatorData.length; i++) {
      const date = new Date(indicatorData[i].fecha);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const value = indicatorData[i].valor;

      const paragraph = document.createElement('p');
      paragraph.textContent = `${formattedDate}: ${value}`;
      indicatorContainer.appendChild(paragraph);
    }

    // Crear el gráfico
    createChart(indicator, indicatorData);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function createChart(indicator, indicatorData) {
const dates = [];
const values = [];

// Obtén las fechas y valores del último año
for (let i = 0; i < indicatorData.length; i++) {
  const date = new Date(indicatorData[i].fecha);
  dates.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
  values.push(indicatorData[i].valor);
}
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: dates,
    datasets: [{
      label: indicator,
      data: values,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true
  }
});
}

  
  
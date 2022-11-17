import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Weatherservice } from "variables/Weatherservice";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

function Dashboard() {

  const [tempChartSelected, setTempChartSelected] = useState('this_week');

  const [tempChartMin, setTempChartMin] = useState([]);
  const [tempChartMax, setTempChartMax] = useState([]);
  const [tempChartToday, setTempChartToday] = useState([]);
  const [tempChartLabels, setTempChartLabels] = useState([]);
  const [tempChartTodayLabels, setTempChartTodayLabels] = useState([]);
  const [humidityChart, setHumidityChart] = useState([]);
  const [humidityChartLabels, setHumidityChartLabels] = useState([]);
  const [rainfallChart, setRainfallChart] = useState([]);
  const [rainfallChartLabels, setRainfallChartLabels] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const weatherService = new Weatherservice();
    const newTempChartLabels = [];
    const newTempChartMin = [];
    const newTempChartMax = [];
    const newTempChartToday = [];
    const newTempChartTodayLabels = [];
    const newHumidityChart = [];
    const newRainfallChart = [];
    const newRainfallLabels = [];

    const failureCallback = (callback) => {
        console.log(callback);
    }

    if (window.navigator.geolocation) {
        // Geolocation available
        window.navigator.geolocation
            .getCurrentPosition((geoLocation) => {
                console.log(geoLocation.coords.latitude);
                console.log(geoLocation.coords.longitude);
                const locationData = {
                    lat: geoLocation.coords.latitude,
                    lon: geoLocation.coords.longitude
                };

                weatherService.getWeather(locationData).then((data) => {
                    setIsLoaded(true);
        
                    data.daily.forEach(day => {
        
                        const dateObject = new Date(day.dt * 1000);
                        const weekday = dateObject.toLocaleString("en-US", {weekday: "long"});
                        // const numericDate = dateObject.toLocaleString("en-US", {day: "numeric"});
        
                        newTempChartMin.push(day.temp.min);
                        newTempChartMax.push(day.temp.max);
                        newTempChartLabels.push(weekday);
                        newHumidityChart.push(day.humidity);
                    });
        
                    data.hourly.forEach(hour => {
        
                        const dateObject = new Date(hour.dt * 1000);
                        const hourTime = dateObject.toLocaleString("en-US", {hour: "numeric"});
        
                        newTempChartToday.push(hour.temp);
                        newTempChartTodayLabels.push(hourTime);
                    });
        
                    setTempChartMin(newTempChartMin);
                    setTempChartMax(newTempChartMax);
                    setTempChartToday(newTempChartToday);
                    setTempChartLabels(newTempChartLabels);
                    setHumidityChartLabels(newTempChartLabels);
                    setHumidityChart(newHumidityChart);
                    setTempChartTodayLabels(newTempChartTodayLabels);
        
                });
        
                weatherService.getCurrentRainfall(locationData).then((data) => {
                    console.log(data);
                    data.data.forEach(day => {
                        newRainfallChart.push(day.precip);
                        newRainfallLabels.push(day.valid_date);
                    });

                    setRainfallChart(newRainfallChart);
                    setRainfallChartLabels(newRainfallLabels);
                });            

            }, failureCallback);

    }
}, []);

const tempData = {
    labels: tempChartLabels,
    datasets: [
        {
            label: 'Min Temp (in Celcius)',
            data: tempChartMin,
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: .4
        },
        {
            label: 'Max Temp (in Celcius)',
            fontColor: "white",
            data: tempChartMax,
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: .4
        }
    ]
};

const tempTodayData = {
    labels: tempChartTodayLabels,
    datasets: [
        {
            label: 'Temp (in Celcius)',
            data: tempChartToday,
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: .4
        }
    ]
};

const humidityData = {
    labels: humidityChartLabels,
    datasets: [
        {
            label: 'Humidity %',
            data: humidityChart,
            fill: false,
            backgroundColor: '#D22B2B',
            borderColor: '#D22B2B',
            tension: .4
        }
    ]
};

const rainfallData = {
    labels: rainfallChartLabels,
    datasets: [
        {
            label: 'Rainfall (in mm)',
            data: rainfallChart,
            fill: false,
            backgroundColor: '#5D3FD3',
            borderColor: '#5D3FD3',
            tension: .4
        }
    ]
};
const options = {
  plugins: {  
    legend: {
      labels: {
        color: "white",  
      }
    }
  },
  scales: {
    x: {
      ticks: {
          color: "white"
      }
  },
  y: {
    ticks: {
        color: "white"
    }
}
  }
};

  return (
    <>
      <div className="content">
        <Row>
          <Col className="pr-md-1" md="6">
            <Card className="card-chart" style={{height: 400, width: 550, padding: 20}}>
              <CardHeader>
                <Row>
                  <Col className="text-left" lg="8">
                    <CardTitle tag="h2">Temperature Chart</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                {
                  tempChartSelected !== 'today' ? (
                      <Line data={tempData} options={options} />
                  ) : (
                      <Line data={tempTodayData} options={options} />
                  )
                }
                <div>
                    <Button
                      label="Today"
                      onClick={(e) => {
                        e.preventDefault();
                        if (tempChartSelected !== 'today') setTempChartSelected('today');
                      }}
                      className="mr-2 mb-2"
                    >Today</Button>
                    <Button
                      label="This Week"
                      onClick={(e) => {
                        e.preventDefault();
                        if (tempChartSelected !== 'this_week') setTempChartSelected('this_week');
                      }}
                      className="mr-2 mb-2"
                    >This week</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="pr-md-1" md="4">
            <Card className="card-chart" style={{height: 400, width: 550, padding: 20}}>
              <CardHeader>
                <CardTitle tag="h3">
                   Humidity Chart
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={humidityData}
                    options={options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          
        </Row>
        <Row>
        <Col lg="4">
            <Card className="card-chart" style={{height: 400, width: 550, padding: 20}}>
              <CardHeader>
                <CardTitle tag="h3">
                  Rainfall Chart
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={rainfallData}
                    options={options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;

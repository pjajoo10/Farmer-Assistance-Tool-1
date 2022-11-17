import axios from "axios";
import React, { useState, useEffect } from "react";
import { Weatherservice } from "variables/Weatherservice";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

function CropRecommendation() {

  const [nvalue,setNvalue] = useState();
  const [pvalue,setPvalue] = useState();
  const [kvalue,setKvalue] = useState();
  const [phvalue,setPhvalue] = useState();
  const [temp,setTemp] = useState();
  const [rain,setRain] = useState();
  const [humidity,setHumidity] = useState();
  const [finalresp, setFinalresp] = useState(["🪴"])

  const failureCallback = (callback) => {
    console.log(callback);
  }

  useEffect(() => {
    const weatherService = new Weatherservice();

    if (window.navigator.geolocation) {
        // Geolocation available
        window.navigator.geolocation
            .getCurrentPosition((geoLocation) => {
                const locationData = {
                    lat: geoLocation.coords.latitude,
                    lon: geoLocation.coords.longitude
                };

                weatherService.getCurrentWeather(locationData).then((data) => {
                    setHumidity(data.current.humidity);
                    setTemp(data.current.temp);
                });
        
                weatherService.getCurrentRainfall(locationData).then((data) => {
                    console.log(data);
                    setRain(data.data[0].precip);
                });

            }, failureCallback);

    }
    
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Croprecdata = {
      Nvalue : nvalue,
      Pvalue : pvalue,
      Kvalue : kvalue,
      Temp : temp,
      Humidity : humidity,
      PHvalue : phvalue,
      Rain : rain
    }
    await axios.post('http://localhost:5000/user/crop_recommendation', JSON.stringify(Croprecdata), {headers: {'Content-Type': 'application/json'}})
    .then((response) => {
      console.log(response.data.crop);
      setFinalresp(response.data.crop);
    })
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Soil Contents</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Nitrogen (N)</label>
                        <Input
                          placeholder="Nitrogen value"
                          type="number"
                          onChange={e => {
                            if(Number(e.target.value) < 0){
                              alert("Please enter a positive value")
                            }
                            else setNvalue(e.target.value);
                          }}
                          value={nvalue}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Phosphorus (P)</label>
                        <Input
                          placeholder="Phosphorus value"
                          type="number"
                          onChange={e => {
                            if(Number(e.target.value) < 0){
                              alert("Please enter a positive value")
                            }
                            else setPvalue(e.target.value);
                          }}
                          value={pvalue}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Potassium (K)</label>
                        <Input
                          placeholder="Potassium value"
                          type="number"
                          onChange={e => {
                            if(Number(e.target.value) < 0){
                              alert("Please enter a positive value")
                            }
                            else setKvalue(e.target.value);
                          }}
                          value={kvalue}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Soil PH</label>
                        <Input
                          placeholder="PH value"
                          type="number"
                          onChange={e => {
                            if(Number(e.target.value) < 0 || Number(e.target.value) > 14){
                              alert("Please enter a number between 0 to 14 ")
                            }
                            else setPhvalue(e.target.value);
                          }}
                          value={phvalue}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr style={{backgroundColor: 'white', marginBottom: 30, opacity: 0.5 }}/>
                  <h5 className="title">Weather Parameters</h5>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Temperature (C)</label>
                        <Input
                          placeholder="Temperature value"
                          type="number"
                          onChange={e => setTemp(e.target.value)}
                          value={temp}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Humidity</label>
                        <Input
                          placeholder="Humidity value"
                          type="number"
                          onChange={e => setHumidity(e.target.value)}
                          value={humidity}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Rainfall</label>
                        <Input
                          placeholder="Rainfall value"
                          type="number"
                          onChange={e => setRain(e.target.value)}
                          value={rain}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {nvalue && pvalue && kvalue && phvalue && temp && humidity && rain ? <Button className="btn-fill" type="submit" color="danger">
                  Know your crop
                </Button> : <Button className="btn-fill" color="danger" disabled>
                  Know your crop
                </Button>}
                </Form>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/Plantlogo.png")}
                    />
                    <h5 className="title">Crops You can grow :</h5>
                  <p className="description">
                      {finalresp.map((e) => {
                        return(
                            <p>{e}</p>
                        )
                      })}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CropRecommendation;

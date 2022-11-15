import React from "react";
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
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Nitrogen (N)</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Nitrogen value"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Phosphorus (P)</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Phosphorus value"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Potassium (K)</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Potassium value"
                          type="number"
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
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr style={{backgroundColor: 'white' }}/>
                  <h5 className="title">Weather Parameters</h5>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Temperature</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Nitrogen value"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Humidity</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Phosphorus value"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Rainfall</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Potassium value"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Know your crop
                </Button>
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
                    <li>
                      hi
                    </li>
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

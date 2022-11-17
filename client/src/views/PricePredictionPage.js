import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  Form,
  Row,
  Col,
  Input,
  FormGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

function PricePrediction() {
  const [dropName, setDropName] = useState("Choose your crop");
  const [date, setDate] = useState("");
  const [finalrep, SetFinalresp] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      crop : dropName,
      date : date
    }
    await axios.post('http://localhost:5000/user/price_prediction', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}})
    .then((response) => {
      console.log(response.data);
      SetFinalresp(response.data);
    })
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Predict prices of your desired crop </h5>
              </CardHeader>
              <CardBody>
              <h5 className="title">Please upload a topview picture of your infected crop</h5>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <UncontrolledDropdown color="success">
                        <DropdownToggle color="success">
                          {dropName}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={() =>{ setDropName("Rice") }}>Rice</DropdownItem>
                          <DropdownItem onClick={() =>{ setDropName("Maize") }}>Maize</DropdownItem>
                          <DropdownItem onClick={() =>{ setDropName("Apple") }}>Apple</DropdownItem>
                          <DropdownItem onClick={() =>{ setDropName("Papaya") }}>Papaya</DropdownItem>
                          <DropdownItem onClick={() =>{ setDropName("Moong") }}>Moong</DropdownItem>
                          <DropdownItem onClick={() =>{ setDropName("Cotton") }}>Cotton</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Col>
                    <Col className="pr-md-1" md="4" style={{marginTop:6}}>
                      <Input type="date" className="reactstrap-date-picker" onChange={(e) => {setDate(e.target.value)}}/>
                    </Col> 
                  </Row>
                  {dropName && date ? <Button className="btn-fill" color="danger" type="submit" style={{marginTop: 20}}>
                  Get WPI
                </Button> : <Button className="btn-fill" color="danger" style={{marginTop: 20}} disabled>
                  Get WPI
                </Button>}
                  
                </Form>
              </CardBody>
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
                      src={require("assets/img/growth.png")}
                    />
                    <h5 className="title">Estimated WPI of your crop is :</h5>
                  <p className="description">
                     {finalrep.low} --- {finalrep.high}
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

export default PricePrediction;

import React, { useState } from "react";
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

function PricePrediction() {
  const [dropName, setDropName] = useState("Choose your crop 🔽");
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
                <Form>
                  <Row>
                    <Col className="pr-md-1">
                      <UncontrolledDropdown>
                        <DropdownToggle>
                          {dropName}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={() =>{ setDropName("Rice") }}>Rice</DropdownItem>
                          <DropdownItem onClick={() =>{ setDropName("Maize") }}>Maize</DropdownItem>
                          <DropdownItem onClick={() =>{ setDropName("Apple") }}>Apple</DropdownItem>
                          <DropdownItem onClick={() =>{ setDropName("Grapes") }}>Grapes</DropdownItem>
                          <DropdownItem onClick={() =>{ setDropName("Orange") }}>Orange</DropdownItem>
                          <DropdownItem onClick={() =>{ setDropName("Moong") }}>Moong</DropdownItem>
                          <DropdownItem onClick={() =>{ setDropName("Cotton") }}>Cotton</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Col>
                    <Col className="pr-md-1">
                      <input type="date" style={{
                        backgroundColor: "#2dce89",
                        borderRadius: 6,
                        padding: "8px 12px",
                        width: 200,
                        color: "white",
                        display: "inline-block",
                        border: 0,
                        margin: 5
                      }}/>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Get PWI
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
                      src={require("assets/img/growth.png")}
                    />
                    <h5 className="title">Price of your crop is :</h5>
                  <p className="description">
                    Rs per quintel
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

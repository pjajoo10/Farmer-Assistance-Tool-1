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

function DiseaseDetection() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Disease Detection</h5>
              </CardHeader>
              <CardBody>
              <h5 className="title">Please upload a topview picture of your infected crop</h5>
                <Form>
                  <Row>
                    <Col className="pr-md-1">
                      <label className="lable-fill" style={{
                        backgroundColor: "#2dce89",
                        color: "white",
                        borderRadius: 6,
                        display: "inline-block",
                        padding: "6px 12px",
                        cursor: "pointer"
                      }}>
                        <input type="file" style={{display: "none"}} />
                        Choose your crop image
                      </label>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="danger" type="submit">
                  Detect disease
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
                      src={require("assets/img/ladybug.png")}
                      style={{padding:0}}
                    />
                    <h5 className="title">Your crop might be infected with :</h5>
                  <p className="description">
                    Typhoid
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

export default DiseaseDetection;

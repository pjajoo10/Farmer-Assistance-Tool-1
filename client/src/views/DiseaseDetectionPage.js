import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Form,
  Row,
  Col
} from "reactstrap";

function DiseaseDetection() {

  const [inputimg, setInputimg] = useState();
  const [finalresp, setfinalresp] = useState([]);
  const [crop, setCrop] = useState("CROP");
  const imageref = useRef(null);

  function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(e) {
      const imageFile = e.target.files[0]
      setInputimg(imageFile);
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", inputimg);
    await axios.post('http://localhost:5000/user/disease_detection', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then((response) => {
      setfinalresp(response.data);
      setCrop(response.data.crop);
    //   console.log(response.data.disease)
    })

  }

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
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-md-2" md="4">
                      <label style={{
                        background: "linear-gradient(to top right, #0c6b42, white 170%)",
                        color: "white",
                        borderRadius: 6,
                        display: "inline-block",
                        padding: "6px 12px",
                        cursor: "pointer",
                        margin: "4px 1px",
                        padding: 12,
                        fontWeight: "bold"
                      }}>
                        <input type="file" style={{display: "none"}} onChange={(e) => {
                          setInputimg(e.target.files[0]);
                          uploader(e);
                        }} />
                        Choose your crop image
                      </label>
                    </Col>
                    <Col className="pr-md-5">
                        {inputimg ? <Button className="btn-fill" color="danger" type="submit">Detect disease</Button> : <Button className="btn-fill" color="danger" type="button" disabled>Detect disease</Button>} 
                    </Col>
                  </Row>
                </Form>
                <Row>
                      <Col className="pr-md-1">
                      {result && <img ref={imageref} src={result} alt="" style={{
                        height: 300,
                        width: 425,
                        borderRadius: 5,
                        marginTop: 50,
                        boxShadow: "0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19)"
                      }}/>}
                      </Col>
                    </Row>
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
                      src={require("assets/img/ladybug.png")}
                      style={{padding:0}}
                    />
                    <h5 className="title"><span style={{color: "#44dd46", fontWeight: "bold"}}>{crop}</span> health status :</h5>
                    <p>{finalresp.disease}</p>
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

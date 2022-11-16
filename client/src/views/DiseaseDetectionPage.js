import React, { useEffect, useRef, useState } from "react";
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
  Col
} from "reactstrap";

function DiseaseDetection() {

  const [inputimg, setInputimg] = useState();
  const imageref = useRef(null);

  function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(e) {
      console.log(e.target.files);
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
  
  const removeImage = (id) => {
    let images = inputimg.filter((item) => item.id !== id)
    setInputimg(images);
    console.log(inputimg)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", inputimg);
    await axios.post('http://localhost:5000/user/disease_detection', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then((response) => {
      console.log(response.data);
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
                    <Col className="pr-md-1">
                      <label className="lable-fill" style={{
                        backgroundColor: "#2dce89",
                        color: "white",
                        borderRadius: 6,
                        display: "inline-block",
                        padding: "6px 12px",
                        cursor: "pointer"
                      }}>
                        <input type="file" style={{display: "none"}} onChange={(e) => {
                          setInputimg(e.target.files[0]);
                          uploader(e);
                        }} />
                        Choose your crop image
                      </label>
                      {result && <img ref={imageref} src={result} alt="" />}
                    </Col>
                  </Row>
                  {inputimg ? <Button className="btn-fill" color="danger" type="submit">Detect disease</Button> : <Button className="btn-fill" color="danger" type="button" disabled>Detect disease</Button>} 
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

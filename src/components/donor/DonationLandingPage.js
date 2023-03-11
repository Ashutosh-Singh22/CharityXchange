import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DonationForm from "./DonationForm";
import { DonorNavigationBar } from "./DonorNavigationBar";

export function DonationLandingPage() {
  const [showForm, setShowForm] = useState(false);
  const donorObj = JSON.parse(localStorage.getItem("donor"));
  const navigate = useNavigate();

  const handleDonateNowClick = () => {
    setShowForm(!showForm);
  };

  useEffect( () => {
    if(donorObj == null){
        navigate("/");
    }
},[]);

  return (
    <>
    <DonorNavigationBar></DonorNavigationBar>
    <Container fluid className="bg-light py-5">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={12}>
            <h1 className="text-center mb-4">Join us in making a difference</h1>
            <p className="lead text-center mb-5">
              Your support helps us continue to provide essential services to
              those in need.
            </p>
            <Row className="g-4 justify-content-center">
              <div className="col-md-8 text-center">
                <Card border="primary" className="h-100 rounded-3">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="mb-3">Make a Donation</Card.Title>
                    <Card.Text>
                      Your donation can change lives in more ways than one. It
                      can provide a family with a week's worth of food, offer a
                      homeless person a safe shelter, and also provide
                      stationary, clothing, and other essentials to those in
                      need. Your generosity can make a significant impact on
                      people's lives and provide them with the basic necessities
                      they need to thrive. Imagine the joy on a child's face
                      when they receive new clothes, or the gratitude a
                      struggling family feels when they receive your help. Your
                      donation can be the catalyst for change and create a
                      ripple effect of positivity in your community. Join us in
                      making a difference and donate today!
                    </Card.Text>
                    <Button
                      variant="primary"
                      size="lg"
                      className="align-self-center"
                      onClick={handleDonateNowClick}
                    >
                      Donate Now
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </Row>
            {showForm && <DonationForm />}
          </Col>
        </Row>
      </Container>
    </Container>
    </>
  );
};

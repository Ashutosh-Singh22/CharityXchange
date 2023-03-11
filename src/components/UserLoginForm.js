import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { donorLogin } from "../services/DonerApiService";
import { NavigationBar } from "./NavigationBar";
import ReCAPTCHA from "react-google-recaptcha";

export function UserLoginForm() {
  // Define state for form inputs and errors
  const [donorDetails, setDonorDetails] = useState({
    donorEmail: "",
    donorPassword: "",
  });
  const [verified, setVerified] = useState(true);
  const [loading, setLoading] = useState(false);
  const [donorEmailError, setDonorEmailError] = useState("");
  const [donorPasswordError, setDonorPasswordError] = useState("");
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDonorDetails({ ...donorDetails, [e.target.name]: e.target.value });
  };

  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    if (!validate()) {
      return;
    } else {
      setLoading(true);
        try {
          const response = await donorLogin(donorDetails);
          console.log(response);
          if (response.status === 200) {
            if(response.data != "" ){
              if(response.data.adminEmail){
                localStorage.setItem("admin", JSON.stringify(response.data));
                console.log(JSON.parse(localStorage.getItem("admin")));
                navigate('/adminDonationAssign');
              }
              else if(response.data.donorId){
                localStorage.setItem("donor", JSON.stringify(response.data));
                console.log(JSON.parse(localStorage.getItem("donor")));
                navigate('/donorHome');
              }
              else if(response.data.recipientId){
                localStorage.setItem("recipient", JSON.stringify(response.data));
                console.log(JSON.parse(localStorage.getItem("recipient")));
                navigate('/recipientHome');
              }
              else if(response.data.volunteerId){
                localStorage.setItem("volunteer", JSON.stringify(response.data));
                console.log(JSON.parse(localStorage.getItem("volunteer")));
                navigate('/volunteerHome');
              }
            }
            else {
              setErrors("Invalid Login Credentials");
            }
          }
        } catch (error) {
          setErrors("An error occurred. Please try again.");
        } finally {
          setLoading(false);
        }

    }
  };

  const validate = () => {
    let isValid = true;
    // donorEmail validation
    if (donorDetails.donorEmail.trim() === "") {
      setDonorEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorDetails.donorEmail)) {
      setDonorEmailError("Email is not valid");
      isValid = false;
    } else {
      setDonorEmailError("");
    }

    // donorPassword validation
    if (donorDetails.donorPassword.trim() === "") {
      setDonorPasswordError("Password is required");
      isValid = false;
    } else if (donorDetails.donorPassword.length < 8) {
      setDonorPasswordError("Password must be atleast 8 characters long");
      isValid = false;
    } else {
      setDonorPasswordError("");
    }
    return isValid;
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Container className="mt-4">
        <Form onSubmit={handleSubmit}>
          <h1 className="mb-4">User Login Form</h1>
          <Row>
            <Col lg={12}>
              <Form.Group className="mb-3">
                <Form.Label>User Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="donorEmail"
                  value={donorDetails.donorEmail}
                  onChange={handleChange}
                />
                {donorEmailError && (
                  <span style={{ color: "red" }}>{donorEmailError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={12}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="donorPassword"
                  value={donorDetails.donorPassword}
                  onChange={handleChange}
                />
                {donorPasswordError && (
                  <span style={{ color: "red" }}>{donorPasswordError}</span>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Col>
            {errors && <span  style={{ color: "red" }}>{errors}  </span> }
          </Col>
          <ReCAPTCHA
            sitekey="6LdSFOwkAAAAAAdPhuTZa3qn88dNytu-u7CqbAZi"
            onChange={onChange}
          />
          <Button type="submit" variant="success" disabled={verified}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </Container>
    </>
  );
}

import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getVolunteerFromServer, saveVolunteer } from "../../services/VolunteerApiService";
import { VolunteerNavigationBar } from "./VolunteerNavigationBar";

export function VolunteerEditProfile() {

    const [volunteerDetails, setVolunteerDetails] = useState({});
    const volunteerObj = JSON.parse(localStorage.getItem("volunteer"));
    const navigate = useNavigate();

    //for error State
    const [volunteerNameError, setVolunteerNameError] = useState("");
    const [volunteerPhoneError, setVolunteerPhoneError] = useState("");
    const [volunteerAlternatePhoneError, setVolunteerAlternatePhoneError] = useState("");
    const [volunteerEmailError, setVolunteerEmailError] = useState("");
    const [volunteerPasswordError, setVolunteerPasswordError] = useState("");
    const [confirmVolunteerPasswordError, setConfirmVolunteerPasswordError] =
        useState("");
    const [volunteerZipCodeError, setVolunteerZipCodeError] = useState("");
    const [volunteerAgeError, setVolunteerAgeError] = useState("");

    async function getVolunteerDetails() {
        const response = await getVolunteerFromServer(volunteerObj.volunteerId);
        if (response.status === 200) {
            const updatedVolunteerDetails = {
                ...response.data,
                volunteerConfirmPassword: response.data.volunteerPassword,
            };
            setVolunteerDetails(updatedVolunteerDetails);
            console.log(volunteerDetails);
        }
    };

    //componentDidMount
    useEffect(() => {
        if(volunteerObj == null){
            navigate("/");
        }
        getVolunteerDetails();
    }, []);

    const handleChange = (e) => {
        setVolunteerDetails({ ...volunteerDetails, [e.target.name]: e.target.value });
    };

    // Define function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form inputs
        if (!validate()) {
            return;
        }
        else {
            const formData = {
                volunteerId: volunteerDetails.volunteerId,
                volunteerName: volunteerDetails.volunteerName,
                volunteerPhone: volunteerDetails.volunteerPhone,
                volunteerAlternatePhone: volunteerDetails.volunteerAlternatePhone,
                volunteerEmail: volunteerDetails.volunteerEmail,
                volunteerPassword: volunteerDetails.volunteerPassword,
                volunteerZipCode: volunteerDetails.volunteerZipCode,
                volunteerAge: volunteerDetails.volunteerAge,
            }

            const response = await saveVolunteer(formData);
            console.log(response.data); 
            if (response.status === 200) {
                navigate("/volunteerProfile"); 
            }
        }
    };

    //validation of field
    const validate = () => {
        let isValid = true;
        // volunteerName validation
        if (volunteerDetails.volunteerName.trim() === "") {
            setVolunteerNameError("VolunteerName is required");
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(volunteerDetails.volunteerName)) {
            setVolunteerNameError("Volunteer name can only contain letters");
            isValid = false;
        } else {
            setVolunteerNameError("");
        }

        // volunteerPhone validation
        if (volunteerDetails.volunteerPhone.trim() === "") {
            setVolunteerPhoneError("Volunteer Phone number is required");
            isValid = false;
        } else if (!/^[0-9]+$/.test(volunteerDetails.volunteerPhone)) {
            setVolunteerPhoneError("Volunteer Phone number can only contain numbers");
            isValid = false;
        } else if (volunteerDetails.volunteerPhone.length !== 10) {
            setVolunteerPhoneError("Volunteer Phone number must be 10 digit");
            isValid = false;
        } else {
            setVolunteerPhoneError("");
        }

        // volunteerAlternatePhone validation
        if (volunteerDetails.volunteerAlternatePhone.trim() === "") {
            //dont do anything, allow it
        } else if (!/^[0-9]+$/.test(volunteerDetails.volunteerAlternatePhone)) {
            setVolunteerAlternatePhoneError("Volunteer Phone number can only contain numbers");
            isValid = false;
        } else if (volunteerDetails.volunteerAlternatePhone.length !== 10) {
            setVolunteerAlternatePhoneError("Volunteer Phone number must be 10 digit");
            isValid = false;
        } else {
            setVolunteerAlternatePhoneError("");
        }

        // VolunteerEmail validation
        if (volunteerDetails.volunteerEmail.trim() === "") {
            setVolunteerEmailError("Volunteer Email is required");
            isValid = false;
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(volunteerDetails.volunteerEmail)
        ) {
            setVolunteerEmailError("Email is not valid");
            isValid = false;
        } else {
            setVolunteerEmailError("");
        }

        // Volunteer ZIP code validation
        if (volunteerDetails.volunteerZipCode.trim() === "") {
            setVolunteerZipCodeError("Volunteer ZIP code is required");
            isValid = false;
        }
        else if (!/^[0-9]{6}$/.test(volunteerDetails.volunteerZipCode)) {
            setVolunteerZipCodeError("Please enter a valid 6-digit ZIP code");
            isValid = false;
        } else {
            setVolunteerZipCodeError("");
        }

        // Volunteer age validation
        if (volunteerDetails.volunteerAge == null  ) {
            setVolunteerAgeError("Volunteer Age is required");
            isValid = false;
        }
        else if (volunteerDetails.volunteerAge < 18) {
            setVolunteerAgeError("Age should be greater than or equal to 18");
            isValid = false;
        } else {
            setVolunteerAgeError("");
        }

        // password validation
        if (volunteerDetails.volunteerPassword.trim() === "") {
            setVolunteerPasswordError("Volunteer Password is required");
            isValid = false;
        } else if (volunteerDetails.volunteerPassword.length < 8) {
            setVolunteerPasswordError(
                "VolunteerPassword must be at least 8 characters long"
            );
            isValid = false;
        } else {
            setVolunteerPasswordError("");
        }
        // Confirm password validation
        if (volunteerDetails.volunteerConfirmPassword.trim() === "") {
            setConfirmVolunteerPasswordError(
                "confirm Volunteer Password is required"
            );
            isValid = false;
        } else if (
            volunteerDetails.volunteerPassword !==
            volunteerDetails.volunteerConfirmPassword
        ) {
            setConfirmVolunteerPasswordError("Password Not Matched");
            isValid = false;
        } else {
            setConfirmVolunteerPasswordError("");
        }
        return isValid;
    };

    return (
        <>
            <VolunteerNavigationBar></VolunteerNavigationBar>
            <Container className="mt-4 mb-4 text-center">
                <Alert>
                    Volunteer Details
                </Alert>
            </Container>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Volunteer Name:</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" name='volunteerName' value={volunteerDetails.volunteerName} onChange={handleChange} />
                                {volunteerNameError && <span style={{ color: "red" }}>{volunteerNameError} </span>}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Volunteer Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name='volunteerEmail' value={volunteerDetails.volunteerEmail} onChange={handleChange} />
                                {volunteerEmailError && <span style={{ color: "red" }}>{volunteerEmailError}</span>}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label> Volunteer Phone Number:</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone" name='volunteerPhone' value={volunteerDetails.volunteerPhone} onChange={handleChange} />
                                {volunteerPhoneError && <span style={{ color: "red" }}>{volunteerPhoneError}</span>}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label> Volunteer Alternate Phone Number: (optional)</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter alternate phone"
                                    name="volunteerAlternatePhone"
                                    value={volunteerDetails.volunteerAlternatePhone}
                                    onChange={handleChange}
                                />
                                {volunteerAlternatePhoneError && (
                                    <span style={{ color: "red" }}>{volunteerAlternatePhoneError}</span>
                                )}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Volunteer ZIP Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter ZIP code"
                                    name="volunteerZipCode"
                                    value={volunteerDetails.volunteerZipCode}
                                    onChange={handleChange}
                                />
                                {volunteerZipCodeError && (
                                    <span style={{ color: "red" }}>{volunteerZipCodeError}</span>
                                )}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Volunteer Age</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter age"
                                    name="volunteerAge"
                                    value={volunteerDetails.volunteerAge}
                                    onChange={handleChange}
                                />
                                {volunteerAgeError && (
                                    <span style={{ color: "red" }}>{volunteerAgeError}</span>
                                )}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Volunteer Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name='volunteerPassword' value={volunteerDetails.volunteerPassword} onChange={handleChange} />
                                {volunteerPasswordError && <span style={{ color: "red" }}>{volunteerPasswordError}</span>}
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm VolunteerPassword</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" name='volunteerConfirmPassword' value={volunteerDetails.volunteerConfirmPassword} onChange={handleChange} />
                                {confirmVolunteerPasswordError && <span style={{ color: "red" }}>{confirmVolunteerPasswordError}</span>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button type='submit' variant="success">Save Volunteer</Button>
                </Form>
            </Container>
        </>
    );
}

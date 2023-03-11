import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getDonorFromServer, saveDonor } from "../../services/DonerApiService";
import { DonorNavigationBar } from "./DonorNavigationBar";

export function DonorEditProfile() {

  const [donorDetails, setDonorDetails] = useState({});
  const donorObj = JSON.parse(localStorage.getItem("donor"));
  const navigate = useNavigate();

  //for error State
  const [donorNameError, setDonorNameError] = useState("");
  const [donorPhoneError, setDonorPhoneError] = useState("");
  const [donorEmailError, setDonorEmailError] = useState("");
  const [donorPasswordError, setDonorPasswordError] = useState("");
  const [confirmDonorPasswordError, setConfirmDonorPasswordError] = useState("");
  const [donorAddressError, setDonorAddressError] = useState("");
  const [donorZipCodeError, setDonorZipCodeError] = useState("");

  async function getDonorDetails() {
    const response= await getDonorFromServer(donorObj.donorId);
    if (response.status === 200) {
        const updatedDonorDetails = {
            ...response.data,
            donorConfirmPassword: response.data.donorPassword,
          };
          setDonorDetails(updatedDonorDetails);
        console.log(donorDetails);
      }
  };
   
    //componentDidMount
    useEffect( () => {
        if(donorObj == null){
            navigate("/");
        }
        getDonorDetails();
    }, []);


    const handleChange = (e) => {
        setDonorDetails({...donorDetails, [e.target.name]:e.target.value});      
    };

    // Define function to handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Validate form inputs
        if (!validate()) {
            return;
        }   
        else{
            const formData={
                    donorId: donorDetails.donorId,
                    donorName: donorDetails.donorName,
                    donorPhone: donorDetails.donorPhone,
                    donorEmail: donorDetails.donorEmail,
                    donorPassword: donorDetails.donorPassword,
                    donorAddress: donorDetails.donorAddress,
                    donorZipCode: donorDetails.donorZipCode
                }

            const response = await saveDonor(formData);
            console.log(response.data);
            if (response.status === 200) {
                navigate("/donorProfile");
            }
        }      
    };

    //validation of field
    const validate = () => {
        let isValid = true;
        // donorName validation
        if (donorDetails.donorName.trim() === '') {
            setDonorNameError('donorName is required');
            isValid = false;
        } else if (!/^[a-zA-Z0-9\s]+$/.test(donorDetails.donorName)) {
            setDonorNameError('donorName can only contain letters and numbers');
            isValid = false;
        } else {
            setDonorNameError('');
        }

         // donorPhone validation
         if (donorDetails.donorPhone.trim() === '') {
            setDonorPhoneError('donorPhone number is required');
            isValid = false;
          } else if (!/^[0-9]+$/.test(donorDetails.donorPhone) ) {
            setDonorPhoneError('donorPhone number can only contain numbers');
            isValid = false;
          } 
         else if (donorDetails.donorPhone.length!=10 ) {
            setDonorPhoneError('donorPhone number must be 10 digit');
            isValid = false;
          }
          else {
            setDonorPhoneError('');
          }
          
        // donorEmail validation
        if (donorDetails.donorEmail.trim() === '') {
            setDonorEmailError('donorEmail is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorDetails.donorEmail)) {
            setDonorEmailError('Email is not valid');
            isValid = false;
        } else {
            setDonorEmailError('');
        }

        // Donor Address validation
        if (!donorDetails.donorAddress.trim()) {
            setDonorAddressError("Donor Address is required");
            isValid = false;
        } else {
            setDonorAddressError("");
        }
  
        // Donor ZIP code validation
        if (!donorDetails.donorZipCode.trim()) {
            setDonorZipCodeError("Donor ZIP code is required");
            isValid = false;
        } else if (!/^\d{6}$/.test(donorDetails.donorZipCode)) {
            setDonorZipCodeError("Please enter a valid 6-digit ZIP code");
            isValid = false;
        } else {
            setDonorZipCodeError("");
        }
  
        // password validation
        if (donorDetails.donorPassword.trim() === '') {
            setDonorPasswordError('donorPassword is required');
            isValid = false;
        } else if (donorDetails.donorPassword.length < 8) {
            setDonorPasswordError('donorPassword must be at least 8 characters long');
            isValid = false;
        } else {
            setDonorPasswordError('');
        }
        // Confirm password validation 
        if (donorDetails.donorConfirmPassword.trim() === '') {
            setConfirmDonorPasswordError('confirmDonorPassword is required');
            isValid = false;
        } else if (donorDetails.donorPassword !== donorDetails.donorConfirmPassword) {
            setConfirmDonorPasswordError('Password Not Matched');
            isValid = false;
        } else {
            setConfirmDonorPasswordError('');
        }
        return isValid;
    };
  
    return (
        <>
        <DonorNavigationBar></DonorNavigationBar>
            <Container className="mt-4 mb-4 text-center">
                <Alert>
                    Donor Details
                </Alert>
            </Container>
            <Container>
                   <Form onSubmit={handleSubmit}>
                   <Row>
                       <Col lg={6}>
                           <Form.Group className="mb-3">
                               <Form.Label>Donor Name:</Form.Label>
                               <Form.Control type="text" placeholder="Enter name" name='donorName' value={donorDetails.donorName} onChange={handleChange} />
                               {donorNameError && <span style={{ color: "red" }}>{donorNameError} </span> }
                           </Form.Group>
                       </Col>
                       <Col lg={6}>
                           <Form.Group className="mb-3">
                               <Form.Label>Donor Email</Form.Label>
                               <Form.Control type="email" placeholder="Enter email" name='donorEmail' value={donorDetails.donorEmail}  onChange={handleChange} />
                               {donorEmailError && <span style={{ color: "red" }}>{donorEmailError}</span>}
                           </Form.Group>
                       </Col>
                       <Col lg={6}>
                           <Form.Group className="mb-3">
                               <Form.Label> Donor Phone Number:</Form.Label>
                               <Form.Control type="text" placeholder="Enter phone" name='donorPhone' value={donorDetails.donorPhone} onChange={handleChange} />
                               {donorPhoneError && <span  style={{ color: "red" }}>{donorPhoneError}</span>}
                           </Form.Group>
                       </Col>
                       <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Donor Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  name="donorAddress"
                  value={donorDetails.donorAddress}
                  onChange={handleChange}
                />
                {donorAddressError && (
                  <span style={{ color: "red" }}>{donorAddressError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Donor ZIP Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter ZIP code"
                        name="donorZipCode"
                        value={donorDetails.donorZipCode}
                        onChange={handleChange}
                        />
                        {donorZipCodeError && (
                        <span style={{ color: "red" }}>{donorZipCodeError}</span>
                        )}
                </Form.Group>
            </Col>
                       <Col lg={6}>
                           <Form.Group className="mb-3">
                               <Form.Label>Donor Password</Form.Label>
                               <Form.Control type="password" placeholder="Enter Password" name='donorPassword' value={donorDetails.donorPassword}  onChange={handleChange} />
                               {donorPasswordError && <span  style={{ color: "red" }}>{donorPasswordError}</span>}
                           </Form.Group>
                       </Col>
                       <Col lg={6}>
                           <Form.Group className="mb-3">
                               <Form.Label>Confirm DonorPassword</Form.Label>
                               <Form.Control type="password" placeholder="Confirm Password" name='donorConfirmPassword' value={donorDetails.donorConfirmPassword} onChange={handleChange} />
                               {confirmDonorPasswordError && <span  style={{ color: "red" }}>{confirmDonorPasswordError}</span> }                          
                           </Form.Group>
                       </Col>
                   </Row>
                   
                   <Button type='submit' variant="success">Save Donor</Button>
               </Form>
            
            </Container>      
        </>
    );
}

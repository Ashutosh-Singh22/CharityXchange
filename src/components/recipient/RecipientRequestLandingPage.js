import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRecipientFromServer } from "../../services/RecipientApiService";
import DonationForm from "./DonationForm";
import { RecipientNavigationBar } from "./RecipientNavigationBar";

export function RecipientRequestLandingPage() {
  const [showForm, setShowForm] = useState(false);
  const [recipientDetails, setRecipientDetails] = useState({});
  const recipientObj = JSON.parse(localStorage.getItem("recipient"));
  const navigate = useNavigate();

  async function fetchRecipientDetails(){
    const response = await getRecipientFromServer(recipientObj.recipientId);
    console.log(response.data);
    setRecipientDetails(response.data);
  }
  
  useEffect( ()=>{
    if(recipientObj == null){
      navigate("/");
    }
    fetchRecipientDetails();
  },[]);

  const handleDonateNowClick = () => {
    setShowForm(!showForm);
  };

  return(
    <>
      {(()=>{
        if(recipientDetails.kycverified){
        return(
          <>
       <RecipientNavigationBar status={recipientDetails.kycverified} ></RecipientNavigationBar>
       <Container fluid className="bg-light py-5">
         <Container>
           <Row className="justify-content-center align-items-center">
             <Col lg={12}>
              <h1 className="text-center mb-4">
                Request Donations for Stationary, Raw Food and Clothing
              </h1>
              <p className="lead text-center mb-5">
                You can request a donation through CharityXchange. Our
                platform helps bridge the gap between donors and
                recipients by providing an appropriate platform for
                donation requests.
              </p>
               <Row className="g-4 justify-content-center">
                <div className="col-md-8 text-center">
                   <Card border="primary" className="h-100 rounded-3">
                     <Card.Body className="d-flex flex-column justify-content-between">
                       <Card.Title className="mb-3">Request a Donation</Card.Title>
                       <Card.Text>
                        Kindly complete the donation request form
                        provided below, and our team will ensure that
                        your needs for stationary, raw food, and
                        clothing are fulfilled by connecting you with
                        donors who can provide the necessary support.
                       </Card.Text>
                       <Button
                         variant="primary"
                         size="lg"
                         className="align-self-center"
                         onClick={handleDonateNowClick}
                       >
                         Request Now
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
        }else
        {
          navigate('/recipientHome');
        }
      })()}
    </>
  );

  // if(recipientDetails.kycverified){
  //   return (
  //     <>
  //     <RecipientNavigationBar status={recipientDetails.kycverified} ></RecipientNavigationBar>
  //     <Container fluid className="bg-light py-5">
  //       <Container>
  //         <Row className="justify-content-center align-items-center">
  //           <Col lg={12}>
  //             <h1 className="text-center mb-4">Join us in making a difference</h1>
  //             <p className="lead text-center mb-5">
  //               Your support helps us continue to provide essential services to
  //               those in need.
  //             </p>
  //             <Row className="g-4">
  //               <Col md={8}>
  //                 <Card className="h-100">
  //                   <Card.Img variant="top" src="https://picsum.photos/300/200" />
  //                   <Card.Body>
  //                     <Card.Title>Make a Donation</Card.Title>
  //                     <Card.Text>
  //                       Your donation can change lives in more ways than one. It
  //                       can provide a family with a week's worth of food, offer a
  //                       homeless person a safe shelter, and also provide
  //                       stationary, clothing, and other essentials to those in
  //                       need. Your generosity can make a significant impact on
  //                       people's lives and provide them with the basic necessities
  //                       they need to thrive. Imagine the joy on a child's face
  //                       when they receive new clothes, or the gratitude a
  //                       struggling family feels when they receive your help. Your
  //                       donation can be the catalyst for change and create a
  //                       ripple effect of positivity in your community. Join us in
  //                       making a difference and donate today!
  //                     </Card.Text>
  //                     <Button
  //                       variant="primary"
  //                       size="lg"
  //                       onClick={handleDonateNowClick}
  //                     >
  //                       Request Now
  //                     </Button>
  //                   </Card.Body>
  //                 </Card>
  //               </Col>
  //             </Row>
  //             {/* {showForm && <DonationForm setShowForm={setShowForm} />} */}
  //             {showForm && <DonationForm />}
  //           </Col>
  //         </Row>
  //       </Container>
  //     </Container>
  //     </>
  //   );
  // }
  // else{
  //   navigate('/recipientHome');
  // }


};

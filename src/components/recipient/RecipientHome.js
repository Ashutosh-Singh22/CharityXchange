import { useEffect, useMemo, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRecipientFromServer } from "../../services/RecipientApiService";
import { RecipientNavigationBar } from "./RecipientNavigationBar";

export function RecipientHome() {

  const [recipientDetails, setRecipientDetails] = useState({});
  const recipientObj = JSON.parse(localStorage.getItem("recipient"));
  const navigate = useNavigate();

  const fetchRecipientDetails = async () => {
    const response = await getRecipientFromServer(recipientObj.recipientId);
    console.log("inside fetchRecipientFromServer "+response.data);
    setRecipientDetails(response.data);
  }

  useMemo(() => {
    fetchRecipientDetails();
    console.log('this will run the first time the component renders!');
  },[]);

  useEffect( ()=>{
    if(recipientObj == null){
      navigate("/");
    }
    console.log('this will run the second time the component renders!');
  },[]);

  //having different elements to render based on kyc-status
  if(recipientDetails.kycverified){
    console.log("inside if");
    return (
        <>  <RecipientNavigationBar status={recipientDetails.kycverified}></RecipientNavigationBar>
                <Container className="text-center mt-5">
                <Alert variant="primary">
                    Welcome to Recipient Interface.
                </Alert>    
                <p>Here you can put your raw food, clothes, stationary requirements.</p>
            </Container> 
        </>
      );
  }
  else if(!recipientDetails.kycverified){
    console.log("inside else if");
    return (
        <>  <RecipientNavigationBar status={recipientDetails.kycverified}></RecipientNavigationBar>
                <Container className="text-center mt-5">
                <Alert variant="primary">
                    Welcome to Recipient Interface.
                </Alert>    
                <Alert variant="danger">
                ____!Your RegistrationId verification is currently in progress. Please wait!____
                </Alert>
            </Container> 
        </>
      );
  }
};

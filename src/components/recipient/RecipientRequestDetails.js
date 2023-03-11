import { useEffect, useState } from "react";
import { Alert, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRecipientFromServer } from "../../services/RecipientApiService";
import { RecipientNavigationBar } from "./RecipientNavigationBar";

export function RecipientRequestDetails(){

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

    if(recipientDetails.kycverified){
        return(
            <>
                <RecipientNavigationBar status={recipientDetails.kycverified}></RecipientNavigationBar>
                <Container className="mt-4 mb-4 text-center">
                    <Alert>
                    Table for the recipient made donation requests
                    </Alert>
                </Container>
    
                <Container>
                    <Table  >
                        <thead>
                            <tr style={{ textAlign: "center" }}>
                                <th colspan="3" >QuantityRequired</th>
                                <th> || </th>
                                <th colspan="3" >QuantityReceived</th>
                            </tr>
                            <tr style={{ textAlign: "center" }}>
                                <th>Raw Food</th>
                                <th>Clothes Food</th>
                                <th>Stationary Food</th>
                                <th>||</th>
                                <th>Raw Food</th>
                                <th>Clothes Food</th>
                                <th>Stationary Food</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ textAlign: "center" }}>
                                <td>{recipientDetails.rawFoodQuantityRequired}</td>
                                <td>{recipientDetails.stationaryQuantityRequired}</td>
                                <td>{recipientDetails.clothesQuantityRequired}</td>
                                <td>||</td>
                                <td>{recipientDetails.rawFoodQuantityReceived}</td>
                                <td>{recipientDetails.stationaryQuantityReceived}</td>
                                <td>{recipientDetails.clothesQuantityReceived}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
    else{
    navigate('/recipientHome');
    }
}
import { useEffect, useState } from "react";
import { Alert, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRecipientList } from "../../services/RecipientApiService";
import { AdminNavigationBar } from "./AdminNavigationBar";

export function AdminRecipientDetails(){

    const [recipientDetails, setRecipientDetails] = useState([]);
    const adminObj = JSON.parse(localStorage.getItem("admin"));
    const navigate = useNavigate();

    async function fetchRecipientDetails(){
    const response = await getRecipientList();
    console.log(response.data);
    setRecipientDetails(response.data);
    }

    useEffect( ()=>{
        console.log("inside"+adminObj);
        if(adminObj == null){
            navigate("/");
        }
        fetchRecipientDetails();
    },[]);

    return(
        <>
            <AdminNavigationBar></AdminNavigationBar>
            <Container className="mt-4 mb-4 text-center">
                <Alert>
                    All Recipients detail
                </Alert>
            </Container>

            <Container>
                <Table  >
                    <thead>
                        <tr style={{ textAlign: "center" }}>
                            <th colSpan="3">Basic Info</th>
                            <th>||</th>
                            <th colspan="3">QuantityRequired</th>
                            <th> || </th>
                            <th colspan="3">QuantityReceived</th>
                        </tr>
                        <tr style={{ textAlign: "center" }}>
                            <th>RecipientId</th>
                            <th>Recipient Name</th>
                            <th>Recipient KYCStatus</th>
                            <th>||</th>
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
                        {
                            recipientDetails.map( (rd) =>{
                                return(
                                    <tr style={{ textAlign: "center" }}>
                                    <td>{rd.recipientId}</td>
                                    <td>{rd.recipientName}</td>
                                    <td>{`${rd.kycverified}`}</td>
                                    <td>||</td>
                                    <td>{rd.rawFoodQuantityRequired}</td>
                                    <td>{rd.rawFoodQuantityRequired}</td>
                                    <td>{rd.clothesQuantityRequired}</td>
                                    <td>||</td>
                                    <td>{rd.clothesQuantityReceived}</td>
                                    <td>{rd.stationaryQuantityReceived}</td>
                                    <td>{rd.stationaryQuantityReceived}</td>
                                </tr>
                                );
                            } )
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
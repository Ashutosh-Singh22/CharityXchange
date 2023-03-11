import { useEffect, useState } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUnverifiedRecipientList, updateRecipientKYCStatus } from "../../services/RecipientApiService";
import { AdminNavigationBar } from "./AdminNavigationBar";

export function AdminRecipientVerification(){

    const [ recipientDetails, setRecipientDetails] = useState([]);
    const adminObj = JSON.parse(localStorage.getItem("admin"));
    const navigate = useNavigate();

    async function fetchRecipientData() {
        const response = await getUnverifiedRecipientList();
        setRecipientDetails(response.data);
        console.log(response.data);
    }

    //for fetching the initial data
    useEffect( () => {
        console.log("inside"+adminObj);
        if(adminObj == null){
            navigate("/");
        }
        fetchRecipientData();
    },[]);

    function handleChange(e, recipientObj){
        recipientObj.kycverified = e.target.value;
    }

    async function saveChanges(recipientObj){

        if(recipientObj.kycverified != "true")
            return;

        console.log(recipientObj);
        const response = await updateRecipientKYCStatus(recipientObj);
        fetchRecipientData();
    }

    return(
        <>
        <AdminNavigationBar></AdminNavigationBar>
            <Container className="mt-4 mb-4 text-center">
                <Alert>
                   Pending KYC verification of recipient
                </Alert>
            </Container>

            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>RecipientId</th>
                            <th>RecipientName</th>
                            <th>RegistrationId</th>
                            <th>Recipient Address</th>
                            <th>Recipient ZipCode</th>
                            <th>Approve KYC</th>
                            <th>ClickToUpdate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recipientDetails.map((rd) => {
                                return (
                                    <tr>
                                        <td>{rd.recipientId}</td>
                                        <td>{rd.recipientName}</td>
                                        <td>{rd.recipientRegistrationId}</td>
                                        <td>{rd.recipientAddress}</td>
                                        <td>{rd.recipientZipCode}</td>
                                        <td> <select name="kycverified" 
                                            onChange={ (e) => {handleChange(e,rd)} }>
                                                <option value={null}>Select</option>
                                                <option value="false">Unverified</option>
                                                <option value="true">Verified</option>
                                            </select></td>

                                            <td><Button onClick={ () => saveChanges(rd)}  className="btn-sm">Save</Button> </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
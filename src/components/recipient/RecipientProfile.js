import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getRecipientFromServer } from "../../services/RecipientApiService";
import { RecipientNavigationBar } from "./RecipientNavigationBar";

export function RecipientProfile() {

    const [recipientDetails, setRecipientDetails] = useState({});
    const recipientObj = JSON.parse(localStorage.getItem("recipient"));
    const navigate = useNavigate();

    async function fetchRecipientDetails(){
        const response = await getRecipientFromServer(recipientObj.recipientId);
        //console.log(response.data);
        setRecipientDetails(response.data);
    };

    //componentDidMount
    useEffect(() => {
        if(recipientObj == null){
            navigate("/");
          }
        fetchRecipientDetails();
    }, []);

    return (
        <>
        <RecipientNavigationBar status={recipientDetails.kycverified} ></RecipientNavigationBar>
            <Table striped bordered hover>

                <tbody>
                    <tr>
                        <th>Recipient Name</th>
                        <td>{recipientDetails.recipientName}</td>
                    </tr>
                    <tr>
                        <th>Recipient Phone Number</th>
                        <td>{recipientDetails.recipientPhone}</td>
                    </tr>
                    <tr>
                        <th>Recipient Email</th>
                        <td>{recipientDetails.recipientEmail}</td>
                    </tr>
                    <tr>
                        <th>Recipient RegistrationId</th>
                        <td>{recipientDetails.recipientRegistrationId}</td>
                    </tr>
                    <tr>
                        <th>Recipient KYC status</th>
                        <td>{`${recipientDetails.kycverified}`}</td>
                    </tr>
                    {/* <tr>
                        <th>Recipient Address</th>
                        <td>{}</td>
                    </tr>
                    <tr>
                        <th>Recipient ZIP code</th>
                        <td>{}</td>
                    </tr> */}
                    <tr>
                        <th>Recipient Password</th>
                        <td>{recipientDetails.recipientPassword}</td>
                    </tr>
                </tbody>
            </Table>
            {/* {recipientDetails.kycverified && <Link to={"/recipientEditProfile"}>Edit Profile</Link>} */}

        </>
    );
};

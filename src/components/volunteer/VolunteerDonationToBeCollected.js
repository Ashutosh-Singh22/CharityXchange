import { useEffect, useState } from "react";
import { getVolunteerDonationDetailsToBeCollected, updateDonorDonationDetail } from "../../services/DonationApiService";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { VolunteerNavigationBar } from "./VolunteerNavigationBar";
import { useNavigate } from "react-router-dom";

export function VolunteerDonationToBeCollected() {

    const [donorDonationDetails, setDonorDonationDetails] = useState([]);
    const volunteerObj = JSON.parse(localStorage.getItem("volunteer"));
    const navigate = useNavigate();
   
    const fetchDonorDonationData = async () => {
        const response = await getVolunteerDonationDetailsToBeCollected(volunteerObj.volunteerId);
        //tobecollected data 1st page;

        setDonorDonationDetails(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        if(volunteerObj == null){
            navigate("/");
        }
        fetchDonorDonationData();  
        }, []);

    function handleChange(e, donorDonationObj){
        donorDonationObj.donationStatus = e.target.value;
    }

    async function saveChanges(donorDonationObj){
        const response = await updateDonorDonationDetail(donorDonationObj);
        console.log(response.data);
        //fetching updated details into state
        fetchDonorDonationData();
    }

    return (
        <>
            <VolunteerNavigationBar></VolunteerNavigationBar>
            <Container className="mt-4 mb-4 text-center">
                <Alert>
                    Donation to be collected by volunteers
                </Alert>
            </Container>

            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>DonationId</th>
                            {/* <th>RawFoodQuantity</th>
                            <th>ClothesQuantity</th>
                            <th>StationaryQuantity</th> */}
                            
                            {/* 1st */}
                            <th>DonorName</th>
                            <th>DonorContactDetails</th>
                            <th>DonorAddress</th>

                            {/* 2nd */}
                            {/* <th>RecipientName</th>
                            <th>RecipientContactDetails</th>
                            <th>RecipientAddress</th> */}
                            <th>DonationStatus</th>
                            <th>ClickToUpdate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donorDonationDetails.map((dd) => {
                                return (
                                    <tr>
                                        <td>{dd.donationId}</td>
                                        <td>{dd.donor.donorName}</td>
                                        <td>{dd.donor.donorPhone}</td>
                                        <td>~Donor Address!</td>
                                        {/* <td>{dd.recipient.recipientName}</td>
                                        <td>{dd.recipient.recipientPhone}</td>
                                        <td>~recipient Address!</td> */}
                                        <td>
                                            <select name="donationStatus" required 
                                            onChange={ (e) => {handleChange(e,dd)} }>
                                                <option value="toBeCollected">toBeCollected</option>
                                                <option value="isCollected">isCollected</option>
                                                {/* <option value="isDelivered">isDelivered</option>  */}
                                            </select>
                                        </td>
                                        <td><Button onClick={ () => saveChanges(dd)}  className="btn-sm">Save</Button> </td>
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
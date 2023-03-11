import { useEffect, useState } from "react";
import { getAssignedDonationDetails } from "../../services/DonationApiService";
import { Alert, Container, Table } from "react-bootstrap";
import { AdminNavigationBar } from "./AdminNavigationBar";
import { useNavigate } from "react-router-dom";

export function AdminDonationAlreadyAssign(){

    const [ donorDonationDetails, setDonorDonationDetails ] = useState([]);
    const adminObj = JSON.parse(localStorage.getItem("admin"));
    const navigate = useNavigate();

    async function fetchDonorDonationData() {
        const response = await getAssignedDonationDetails();
        console.log("donor donation data");
        console.log(response.data);
        setDonorDonationDetails( response.data );
    }

    //for fetching the initial data
    useEffect( () => {
        console.log("inside"+adminObj);
        if(adminObj == null){
            navigate("/");
        }
        fetchDonorDonationData();
    },[]);

    return(
        <>
        <AdminNavigationBar></AdminNavigationBar>
            <Container className="mt-4 mb-4 text-center">
                <Alert>
                Table for assigning volunteer to collect donation
                </Alert>
            </Container>

            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>DonationId</th>
                            <th>DonorAssigned</th>
                            <th>VolunteerAssigned</th>
                            <th>RecipienntAssigned</th>
                            <th>DonationStatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donorDonationDetails.map((dd) => {
                                return (
                                    <tr>
                                        <td>{dd.donationId}</td>
                                        <td>{dd.donor.donorName}</td>
                                        <td>{dd.volunteer.volunteerName}</td>
                                        <td>{dd.recipient.recipientName}</td>
                                        <td>~toBeAdded~</td>
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
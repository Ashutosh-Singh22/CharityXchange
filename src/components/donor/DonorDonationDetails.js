import { useEffect, useState } from "react";
import { getDonorDonationDetails } from "../../services/DonationApiService";
import { Alert, Container, Table } from "react-bootstrap";
import { DonorNavigationBar } from "./DonorNavigationBar";
import { useNavigate } from "react-router-dom";

export function DonorDonationDetails(){

    const [ donorDonationDetails, setDonorDonationDetails ] = useState([]);
    const donorObj = JSON.parse(localStorage.getItem("donor"));
    const navigate = useNavigate();

    const fetchDonationDetails = async () => {
        const response = await getDonorDonationDetails(donorObj.donorId);
        console.log(response.data);
        setDonorDonationDetails( response.data );
    }

    useEffect( () => {
        if(donorObj == null){
            navigate("/");
        }
        fetchDonationDetails();
    },[]);


    return(
        <>
            <DonorNavigationBar></DonorNavigationBar>
            <Container className="mt-4 mb-4 text-center">
                <Alert>
                Table for the donor made donation details
                </Alert>
            </Container>

            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>DonationId</th>
                            <th>RawFoodQuantity</th>
                            <th>ClothesQuantity</th>
                            <th>StationaryQuantity</th>
                            <th>VolunteerAssigned</th>
                            <th>VolunteerContactDetails</th>
                            <th>VolunteerAltContactDetails</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donorDonationDetails.map((dd) => {
                                return (
                                    <tr>
                                        <td>{dd.donationId}</td>
                                        <td>{dd.rawFoodQuantity}</td>
                                        <td>{dd.clothesQuantity}</td>
                                        <td>{dd.stationaryQuantity}</td>
                                        <td>{(dd.volunteer && dd.volunteer.volunteerName) || "--"}</td>
                                        <td>{(dd.volunteer && dd.volunteer.volunteerPhone) || "--"}</td>
                                        <td>{(dd.volunteer && dd.volunteer.volunteerAlternatePhone) || "--"}</td>

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
import { useEffect, useState } from "react";
import { getNotAssignedDonationDetails, updateDonorDonationDetail } from "../../services/DonationApiService";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { getVolunteerList } from "../../services/VolunteerApiService";
import { getVerifiedRecipientList } from "../../services/RecipientApiService";
import { AdminNavigationBar } from "./AdminNavigationBar";
import { useNavigate } from "react-router-dom";

export function AdminDonationAssign(){

    const [ donorDonationDetails, setDonorDonationDetails ] = useState([]);
    const [ volunteerDetails, setVolunteerDetails] = useState([]);
    const [ recipientDetails, setRecipientDetails] = useState([]);
    const adminObj = JSON.parse(localStorage.getItem("admin"));
    const navigate = useNavigate();


    async function fetchDonorDonationData() {
        const response = await getNotAssignedDonationDetails();
        console.log("donor donation data");
        console.log(response.data);
        setDonorDonationDetails( response.data );
    }

    async function fetchVolunteerData() {
        const response = await getVolunteerList();
        console.log("volunteer data");
        console.log(response.data);
        setVolunteerDetails( response.data );
    }

    async function fetchRecipientData() {
        const response = await getVerifiedRecipientList();
        console.log("recipient data");
        console.log(response.data);
        setRecipientDetails( response.data );
    }

    //for fetching the initial data
    useEffect( () => {
        console.log("inside"+adminObj);
        if(adminObj == null){
            navigate("/");
        }
        fetchDonorDonationData();
        fetchVolunteerData();
        fetchRecipientData();
    },[]);

    //causing infinite loop
    // useEffect( () => {
    //     fetchDonorDonationData();
    // },[donorDonationDetails]);

    function handleChangeForVolunteer(e, ddObj){
        console.log(ddObj.donationId);
        console.log(e.target.value+"  "+e.target.name);

        //adding volunteer to donorDonationDetails after finding the selected dropdown
        // for (var index in donorDonationDetails){
        //     if(donorDonationDetails[index].donationId == donationId){
        //         donorDonationDetails[index].volunteer = volunteerDetails.find( volunteer => {
        //             return volunteer.volunteerId == e.target.value;
        //         });
        //     }  
        // }

        ddObj.volunteer = volunteerDetails.find( volunteer => {
            return volunteer.volunteerId == e.target.value;
        });

        console.log("after adding volunteer to ddd");
        console.log(donorDonationDetails);
    }

    function handleChangeForRecipient(e, ddObj){
        console.log(ddObj.donationId);
        console.log(e.target.value+"  "+e.target.name);

        ddObj.recipient = recipientDetails.find( recipient => {
            return recipient.recipientId == e.target.value;
        });

        console.log("after adding recipient to ddd");
        console.log(donorDonationDetails);
    }

    async function saveChanges(donorDonationObj){

        //need to add validate because initial volunteer value is null
        if(donorDonationObj.volunteer == null)
            return; //need to add more user friendly logic

        //need to add validate because initial volunteer value is null
        if(donorDonationObj.recipient == null)
            return; //need to add more user friendly logic

        //when clicked on SAVE, we get the donorDonationObj with updated volunteer
        console.log(donorDonationObj);

        //below code is working, commented for now
        const response = await updateDonorDonationDetail(donorDonationObj);

        //fetching updated details into state
        fetchDonorDonationData();
    }

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
                            <th>RawFoodQuantity</th>
                            <th>ClothesQuantity</th>
                            <th>StationaryQuantity</th>
                            <th>ChooseVolunteer</th>
                            <th>ChooseRecipient</th>
                            <th>ClickToSave</th>
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
                                        <td> <select name="volunteer"
                                            
                                            onChange={ (e) => {handleChangeForVolunteer(e, dd)} }
                                            required>
                                                <option value={null}>Select</option>
                                                {
                                                    volunteerDetails.map( (volun) => {
                                                        return (
                                                            <option value = {volun.volunteerId}>{volun.volunteerName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </td>
                                        <td> <select name="recipient"
                                            
                                            onChange={ (e) => {handleChangeForRecipient(e, dd)} }
                                            required>
                                                <option value={null}>Select</option>
                                                {
                                                    recipientDetails.map( (recep) => {
                                                        return (
                                                            <option value = {recep.recipientId}>{recep.recipientName}</option>
                                                        )
                                                    })
                                                }
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
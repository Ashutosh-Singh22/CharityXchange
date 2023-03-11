import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getVolunteerFromServer } from "../../services/VolunteerApiService";
import { VolunteerNavigationBar } from "./VolunteerNavigationBar";

export function VolunteerProfile() {

    const [volunteerDetails, setVolunteerDetails] = useState({});
    const volunteerObj = JSON.parse(localStorage.getItem("volunteer"));
    const navigate = useNavigate();

    const getVolunteerDetails = async () => {
        const response = await getVolunteerFromServer(volunteerObj.volunteerId);
        if (response.status === 200) {
            setVolunteerDetails(response.data);
            console.log(response.data);
        }
    };

    //componentDidMount
    useEffect(() => {
        if(volunteerObj == null){
            navigate("/");
        }
        getVolunteerDetails();
    }, []);

    return (
        <>
        <VolunteerNavigationBar></VolunteerNavigationBar>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Volunteer Name</th>
                        <td>{volunteerDetails.volunteerName}</td>
                    </tr>
                    <tr>
                        <th>Volunteer Age</th>
                        <td>{volunteerDetails.volunteerAge}</td>
                    </tr>
                    <tr>
                        <th>Volunteer Phone Number</th>
                        <td>{volunteerDetails.volunteerPhone}</td>
                    </tr>
                    <tr>
                        <th>Volunteer Alternate Phone Number</th>
                        <td>{volunteerDetails.volunteerAlternatePhone}</td>
                    </tr>
                    <tr>
                        <th>Volunteer Email</th>
                        <td>{volunteerDetails.volunteerEmail}</td>
                    </tr>
                    <tr>
                        <th>Volunteer ZipCode</th>
                        <td>{volunteerDetails.volunteerZipCode}</td>
                    </tr>
                    <tr>
                        <th>Volunteer Password</th>
                        <td>{volunteerDetails.volunteerPassword}</td>
                    </tr>
                </tbody>
            </Table>
            <Link to={"/volunteerEditProfile"}>Edit Profile</Link>

        </>
    );
};

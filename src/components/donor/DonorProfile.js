import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getDonorFromServer } from "../../services/DonerApiService";
import { DonorNavigationBar } from "./DonorNavigationBar";

export function DonorProfile() {

    const [donorDetails, setDonorDetails] = useState({});
    const donorObj = JSON.parse(localStorage.getItem("donor"));
    const navigate = useNavigate();

    const getDonorDetails = async () => {
        const response = await getDonorFromServer(donorObj.donorId);
        if (response.status === 200) {
            setDonorDetails(response.data);
            console.log(response.data);
        }
    };

    //componentDidMount
    useEffect(() => {
        if(donorObj == null){
            navigate("/");
        }
        getDonorDetails();
    }, []);

    return (
        <>
        <DonorNavigationBar></DonorNavigationBar>
            <Table striped bordered hover>

                <tbody>
                    <tr>
                        <th>Donor Name</th>
                        <td>{donorDetails.donorName}</td>
                    </tr>
                    <tr>
                        <th>Donor Phone Number</th>
                        <td>{donorDetails.donorPhone}</td>
                    </tr>
                    <tr>
                        <th>Donor Email</th>
                        <td>{donorDetails.donorEmail}</td>
                    </tr>
                    <tr>
                        <th>Donor Address</th>
                        <td>{donorDetails.donorAddress}</td>
                    </tr>
                    <tr>
                        <th>Donor ZIP code</th>
                        <td>{donorDetails.donorZipCode}</td>
                    </tr>
                    <tr>
                        <th>Donor Password</th>
                        <td>{donorDetails.donorPassword}</td>
                    </tr>
                </tbody>
            </Table>
            <Link to={"/donorEditProfile"}>Edit Profile</Link>
        </>
    );
};

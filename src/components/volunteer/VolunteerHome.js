import { useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { VolunteerNavigationBar } from "./VolunteerNavigationBar";

export function VolunteerHome(){

    const volunteerObj = JSON.parse(localStorage.getItem("volunteer"));
    const navigate = useNavigate();

    useEffect( () => {
        if(volunteerObj == null){
            navigate("/");
        }
    },[]);

    return (
        <>
        <VolunteerNavigationBar></VolunteerNavigationBar>
        <Container className="text-center mt-5">
            <Alert variant="primary">
                Welcome to Volunteer Interface.
            </Alert>
            <p>Here you can view the donations to collect and deliver.</p>
        </Container>
        </>   
    );
}
import { useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DonorNavigationBar } from "./DonorNavigationBar";

export function DonorHome(){

    const donorObj = JSON.parse(localStorage.getItem("donor"));
    const navigate = useNavigate();

    useEffect( () => {
        if(donorObj == null){
            navigate("/");
        }
    },[]);

    return (
        <>
        <DonorNavigationBar></DonorNavigationBar>
        <Container className="text-center mt-5">
            <Alert variant="primary">
                Welcome to Donor Interface.
            </Alert>
            <p>Here you can donate and also track them.</p>
        </Container>
        </>
        
    );
}
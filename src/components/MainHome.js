import { Container, Row, Card, Col } from "react-bootstrap";
import { NavigationBar } from "./NavigationBar";

export function MainHome() {
  return (
    <>
    <NavigationBar></NavigationBar>
    <Container className="text-center mt-5">
      <h1>CharityXchange: NGO Donation PhilanthroPortal</h1>
      <p className="lead">
        Our mission is to help you make a positive impact on the world by
        enabling you to easily donate to causes you care about.
      </p>
      <Container className="mt-4">
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Body className="text-center">
                <Card.Title>Stationary Needs</Card.Title>
                <Card.Text>
                  According to a report by the National Sample Survey Office,
                  only 65% of Indian households have access to stationery items.
                  This means that a large number of children and adults do not
                  have access to basic stationery items such as notebooks, pens,
                  and pencils. Your donation can help bridge this gap and
                  provide access to education and learning opportunities for
                  those in need. Let's come together to create a brighter future
                  for all.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12}>
            <Card>
              <Card.Body className="text-center">
                <Card.Title>Food Needs</Card.Title>
                <Card.Text>
                  Did you know that more than 194 million people in India are
                  undernourished and struggle to have access to nutritious food?
                  Your donation can make a difference in their lives. You can
                  help us in our mission to end hunger and food insecurity in
                  India.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12}>
            <Card>
              <Card.Body className="text-center">
                <Card.Title>Clothing Needs</Card.Title>
                <Card.Text>
                  Did you know that approximately 40% of India's population
                  lives below the poverty line? Many of these individuals lack
                  access to basic necessities like warm clothing. Your donation
                  to our clothing drive can help provide essential clothing
                  items to those in need. You can donate money to purchase new
                  clothing, or even donate gently used clothing items that you
                  no longer need. Your generosity can make a real difference in
                  someone's life.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
    </>
  );
}

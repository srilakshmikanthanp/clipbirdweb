import { PageContainer } from "@toolpad/core";
import { Col, Container, Row } from "react-bootstrap";
import DashboardHeader from "./DashboardHeader";

export default function Dashboard() {
  return (
    <PageContainer maxWidth={false}>
      <Container fluid>
        <Row className="mb-5">
          <Col>
            <DashboardHeader />
          </Col>
        </Row>
        <Row className="mb-3 g-3 align-items-stretch justify-content-center">
        </Row>
      </Container>
    </PageContainer>
  )
}

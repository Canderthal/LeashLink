import { Container, Row, Col } from "reactstrap"

const NoService = () => {
    return (
        <Container>
            <Row className="text-center"><h1>No Services Found</h1></Row>
            <Row className="text-center"><h3>Check back later</h3></Row>
        </Container>

    )

}

export default NoService
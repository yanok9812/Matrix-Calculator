import React from 'react';
import {Container, Row, Col, Button} from "reactstrap";
import {Link} from "react-router-dom";
import githubLogo from '../githubLogo.png';
import './matrixCalculator.css';

function MainPanelPage () {
    return (
        <div className="page-container">
            <div style={{textAlign:"center"}}>
                <Container style={{textAlign:"center"}}>
                    <div style={{fontFamily: "Optima, sans-serif", fontSize: "40px"}}>
                        Matrix Calculator
                        <a 
                            href="https://github.com/yanok9812/Matrix-Calculator"
                            style={{
                                marginLeft: 20
                            }}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={githubLogo} alt="github" width="50"/>
                        </a>
                    </div>
                    <hr/>
                    <div style={{marginBottom: "20px"}}>
                            Welcome! Please choose a function you want to use from below:
                    </div>
                    
                    <Row>
                        <Col sm="3" className="d-none d-md-block"/>
                        <Col>

                            <Link to="/addition">
                                <Button className="functionButton">
                                    Addition
                                </Button>
                            </Link>
                        </Col>

                        <Col>
                            <Link to="/multiplication">
                                <Button className="functionButton">
                                    Multiplication
                                </Button>
                            </Link>
                        </Col>
                        <Col sm="3" className="d-none d-md-block"/>
                    </Row>

                    <Row style={{height:"80px"}} className="d-none d-sm-block"/>

                    <Row>
                        <Col sm="3" className="d-none d-md-block"/>
                        <Col>
                            <Link to="/transpose">
                                <Button className="functionButton">
                                    Transpose
                                </Button>
                            </Link>
                        </Col>


                        <Col>
                            <Link to="/determinant">
                                <Button className="functionButton">
                                    Determinant
                                </Button>
                            </Link>
                        </Col>
                        <Col sm="3" className="d-none d-md-block"/>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default MainPanelPage;
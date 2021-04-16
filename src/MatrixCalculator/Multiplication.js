import React from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import multiply from "./multiply.png";
import './matrixCalculator.css';
import HeaderBar from '../HeaderBar/headerBar';

class Multiplication extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            numOfRow1: 4,
            numOfCol1: 4,
            
            numOfRow2: 4,
            numOfCol2: 4,

            matrix1: this.initializeEmpty2dArray(4,4),
            matrix2: this.initializeEmpty2dArray(4,4),
            displayResult: false
        }
    }

    initializeEmpty2dArray(numOfRow, numOfCol) {
        var arr = [];
        for (var i=0; i < numOfRow; i++) {
            var row = [];
            for(var j=0; j < numOfCol; j++) {
                row.push('');
            }
            arr.push(row);
        }
        return arr;
    }

    handleSizeChange = (event) => {
        
        var size = event.target.value;

        if (size.length > 1 || isNaN(size) || event.target.value > 9){
            alert("Please only enter integers between 1 and 9");
            return;
        }

        if (event.target.name === "numOfRow1")
            this.setState({
                numOfRow1: event.target.value,
                matrix1: this.initializeEmpty2dArray(event.target.value, this.state.numOfCol1),
            })
        
        if (event.target.name === "numOfCol1" || event.target.name === "numOfRow2")
            this.setState({
                numOfCol1: event.target.value,
                numOfRow2: event.target.value,
                matrix1: this.initializeEmpty2dArray(this.state.numOfRow1, event.target.value),
                matrix2: this.initializeEmpty2dArray(event.target.value, this.state.numOfCol2)
            })

        if (event.target.name === "numOfCol2")
            this.setState({
                numOfCol2: event.target.value,
                matrix2: this.initializeEmpty2dArray(this.state.numOfRow2, event.target.value)

            })

        this.setState({displayResult: false});
    }

    handleEntryChange = (event) => {
        const rowNum = event.target.getAttribute("cordinate").split(",")[0];
        const colNum = event.target.getAttribute("cordinate").split(",")[1];
        var currentMatrix;

        if(isNaN(event.target.value)){
            alert("Please only enter numbers");
            return;
        }


        if(event.target.getAttribute("matrixno") == 1){
            currentMatrix = this.state.matrix1;
            currentMatrix[rowNum][colNum] = event.target.value;
            this.setState({matrix1: currentMatrix});
        }
        else if(event.target.getAttribute("matrixno") == 2){
            currentMatrix = this.state.matrix2;
            currentMatrix[rowNum][colNum] = event.target.value;
            this.setState({matrix2: currentMatrix});
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    fillInRandomValues = (id) => {

        var arrayOfRandomValues = []
        var numOfRow = (id === 1? this.state.numOfRow1: this.state.numOfRow2);
        var numOfCol = (id === 1? this.state.numOfCol1: this.state.numOfCol2);

        for (var i=0; i<numOfRow; i++) {
            var row = []
            for (var j=0; j<numOfCol; j++)
                row.push(this.getRandomInt(100));
            arrayOfRandomValues.push(row);
        }

        if (id === 1) {
            this.setState({matrix1: arrayOfRandomValues});
        }
        else if (id === 2) {
            this.setState({matrix2: arrayOfRandomValues});
        }

    }

    generateMatrix = (id) => {
        var entryList = [];
        var keyNum = 0;
        var numOfRow = id === 1? this.state.numOfRow1 : this.state.numOfRow2;
        var numOfCol = id === 1? this.state.numOfCol1 : this.state.numOfCol2;

        for(var i = 0; i<numOfRow; i++) {
            var row = [];
            for(var j = 0; j<numOfCol; j++)
                row.push( <Form.Control
                                matrixno={id}
                                key={keyNum++}
                                cordinate={[i,j]}
                                value={id==1? 
                                        this.state.matrix1[i][j]
                                        :this.state.matrix2[i][j] }
                                className="matrixEntry"
                                onChange={this.handleEntryChange}
                                style={{display: "inline-block"}}
                                /> );
            entryList.push(row);
        }
        return entryList;
    }

    computeSingleGridResult = (rowNum, colNum) => {

        const row = this.state.matrix1[rowNum] || [];
        const col = [];
        for(var i=0; i<this.state.numOfRow2; i++)
            col.push(this.state.matrix2[i][colNum]);
        
        var dotProduct = 0;
        for(var j=0; j<this.state.numOfCol1; j++)
            dotProduct += row[j]*col[j];
        return dotProduct;
    }

    generateResultMatrix = () => {
        var entryList = [];
        var keyNum = 0;
        for(var i = 0; i<this.state.numOfRow1; i++) {
            var row = [];
            for(var j = 0; j<this.state.numOfCol2; j++)
                row.push( <Form.Control
                                disabled
                                style={{fontSize:"11px", display: "inline-block"}}
                                key={keyNum++}
                                cordinate={[i,j]}
                                value={ this.computeSingleGridResult(i, j) }
                                className="matrixEntry"
                                onChange={this.handleEntryChange}
                                /> );
            entryList.push(row);
        }

        return entryList;
    }

    displayResult = () => {
        this.setState({displayResult: true});
    }

    clear = (id) => {
        if(id === 1){
            this.setState({matrix1: this.initializeEmpty2dArray(this.state.numOfRow1, this.state.numOfCol1)})
        }
        if(id === 2){
            this.setState({matrix2: this.initializeEmpty2dArray(this.state.numOfRow2, this.state.numOfCol2)})
        }
    }

    reset = () => {
        this.setState({
            numOfRow1: 4,
            numOfCol1: 4,
            numOfRow2: 4,
            numOfCol2: 4,
            matrix1: this.initializeEmpty2dArray(4,4),
            matrix2: this.initializeEmpty2dArray(4,4),
            displayResult: false,
            resultMatrix: null
        })
    }

    moveToResult = () => {
        document.getElementById("result").scrollIntoView({behavior: "smooth"});
    }

    render() {
        const matrix1 = this.generateMatrix(1);
        const matrix2 = this.generateMatrix(2);
        const resultMatrix = this.generateResultMatrix();
        var rowNum = 0;
        return (
            <div className="page-container">
                    <HeaderBar/>
                    <div style={{ textAlign: "center" }}>
                        <Container style={{display: "inline-block"}}>
                            <div style={{fontFamily: "Optima, sans-serif", fontSize: "40px"}}>
                                Matrix Multiplication
                            </div>
                            <hr/>
                            <div style={{marginBottom: "10px"}}>
                                    Please specify size for both matrices (Max 9 for both row and col):
                                    <br/>
                                    The number of columns of matrix 1 must equal to the number of rows of matrix 2
                            </div>
                            <Row>
                                <Col xs="12" md="6">
                                    <Form.Control
                                        name="numOfRow1"
                                        value={this.state.numOfRow1}
                                        className="matrixEntry"
                                        onChange={this.handleSizeChange}
                                        style={{display: "inline-block", borderRadius: "5rem"}}
                                    />
                                    <i className="fas fa-times faIconCross" style={{display: "inline-block"}}></i>
                                    <Form.Control
                                        name="numOfCol1"
                                        value={this.state.numOfCol1}
                                        className="matrixEntry"
                                        onChange={this.handleSizeChange}
                                        style={{display: "inline-block", borderRadius: "5rem"}}
                                    />
                                    <hr/>
                                    <Form>
                                        { matrix1.map( (row) => ( (<div key={++rowNum}> {row} </div>) ) ) }
                                        <br/>
                                        { this.state.numOfRow1 == 0 || this.state.numOfCol1 == 0? null:(
                                            <>
                                                <Button
                                                    variant="outline-primary"
                                                    className="no-box-shadow"
                                                    onClick={()=>(this.fillInRandomValues(1))}>
                                                    fill in random values
                                                </Button>
                                                <Button
                                                    onClick={()=>{this.clear(1)}}
                                                >
                                                    clear
                                                </Button>
                                            </>
                                    )
                                    }
                                    </Form>
                                </Col>
                                <Col className="d-md-none" style={{marginTop: "30px", marginBottom: "20px"}}>
                                    <hr/>
                                </Col>
                                <Col xs="12" md="6">
                                    <Form.Control
                                        name="numOfRow2"
                                        value={this.state.numOfRow2}
                                        className="matrixEntry"
                                        onChange={this.handleSizeChange}
                                        style={{display: "inline-block", borderRadius: "5rem"}}
                                    />
                                    <img 
                                        className="margin-side-5"
                                        width="20" 
                                        src={multiply} 
                                        alt="multiply"
                                        style={{
                                            marginLeft: 5,
                                            marginRight: 5,
                                        }}
                                    /> 
                                    <Form.Control
                                        name="numOfCol2"
                                        value={this.state.numOfCol2}
                                        className="matrixEntry"
                                        onChange={this.handleSizeChange}
                                        style={{display: "inline-block", borderRadius: "5rem"}}
                                    />
                                    <hr/>
                                    <Form>
                                        { matrix2.map( (row) => ( (<div key={++rowNum}> {row} </div>) ) ) }
                                        <br/>
                                        { this.state.numOfRow2 == 0 || this.state.numOfCol2 == 0? null:(
                                        <>
                                        <Button 
                                            variant="outline-primary"
                                            className="no-box-shadow"
                                            onClick={()=>(this.fillInRandomValues(2))}>
                                            fill in random values
                                        </Button>
                                        <Button
                                            onClick={()=>{this.clear(2)}}
                                        >
                                            clear
                                        </Button>
                                        </>
                                    )
                                    }
                                    </Form>
                                </Col>
                            </Row>
                            
                            {
                                this.state.displayResult? 
                                (
                                    <Button style={{marginTop:"30px"}} onClick={this.reset}>
                                        reset
                                    <br/>
                                    </Button>
                                ): (
                                <Button style={{marginTop:"30px"}} 
                                        onClick={()=>{
                                            this.displayResult();
                                            setTimeout(this.moveToResult, 100);
                                }}>
                                    See the product!
                                <br/>
                                <div style={{fontSize: "13px"}}>
                                    (empty grids are treated as 0)
                                </div>
                                </Button>
                                )
                            }
                            
                            
                            {   this.state.displayResult? (
                                <div id = "result">
                                    <hr/>
                                    Here's the result (change inputs and result will be updated instantly):
                                    <br/> <br/>
                                    {resultMatrix.map((row) => ( (<div key={++rowNum}> {row} </div>) ) )}
                                </div>
                                ) : null
                            }

                        </Container>
                    </div>
            </div>
        );
    }
}

export default Multiplication;
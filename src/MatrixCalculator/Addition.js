import React from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import './matrixCalculator.css';
import multiply from './multiply.png';
import HeaderBar from '../HeaderBar/headerBar';

class Addition extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            numOfRow: 4,
            numOfCol: 4,
            matrix1: this.initializeEmpty2dArray(4,4),
            matrix2: this.initializeEmpty2dArray(4,4),
            displayResult: false,
            resultMatrix: null
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

        if (size.length > 1 || isNaN(size) || event.target.value > 9) {
            alert("Please only enter integers between 1 and 9");
            return;
        }

        if (event.target.name === "numOfRow")
            this.setState({ numOfRow: event.target.value,
                matrix1: this.initializeEmpty2dArray(event.target.value, this.state.numOfCol),
                matrix2: this.initializeEmpty2dArray(event.target.value, this.state.numOfCol),
                displayResult: false        
            })
        if (event.target.name === "numOfCol")
            this.setState({ numOfCol: event.target.value,
                matrix1: this.initializeEmpty2dArray(this.state.numOfRow, event.target.value),
                matrix2: this.initializeEmpty2dArray(this.state.numOfRow, event.target.value),
                displayResult: false
            })
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
            this.setState({matrix1: currentMatrix})
        }
        else if(event.target.getAttribute("matrixno") == 2){
            currentMatrix = this.state.matrix2;
            currentMatrix[rowNum][colNum] = event.target.value;
            this.setState({matrix2: currentMatrix})
        }
    }

    generateMatrix = (id) => {
        var entryList = [];
        var keyNum = 0;
        for(var i = 0; i<this.state.numOfRow; i++) {
            var row = [];
            for(var j = 0; j<this.state.numOfCol; j++)
                row.push( <Form.Control
                                matrixno={id}
                                key={keyNum++}
                                cordinate={[i,j]}
                                value={id==1? 
                                        this.state.matrix1[i][j]
                                        :this.state.matrix2[i][j] }
                                className="matrixEntry"
                                onChange={this.handleEntryChange}
                                style={{display: "inline"}}
                                /> );
            entryList.push(row);
        }
        return entryList;
    }

    generateResultMatrix = () => {
        var entryList = [];
        var keyNum = 0;
        for(var i = 0; i<this.state.numOfRow; i++) {
            var row = [];
            for(var j = 0; j<this.state.numOfCol; j++)
                row.push( <Form.Control
                                disabled
                                key={keyNum++}
                                cordinate={[i,j]}
                                value={ Number(this.state.matrix1[i][j]) + Number(this.state.matrix2[i][j]) }
                                className="matrixEntry"
                                onChange={this.handleEntryChange}
                                /> );
            entryList.push(row);
        }
        return entryList;
    }
    
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    displayResult = () => {
        this.setState({displayResult: true});
    }

    fillInRandomValues = (id) => {

        var arrayOfRandomValues = []
        for (var i=0; i<this.state.numOfRow; i++){
            var row = []
            for (var j=0; j<this.state.numOfCol; j++)
                row.push(this.getRandomInt(100));
            arrayOfRandomValues.push(row);
        }

        if (id === 1) {
            this.setState({matrix1: arrayOfRandomValues});
        }
        else if (id===2) {
            this.setState({matrix2: arrayOfRandomValues});
        }
    }

    clear = (id) => {
        if(id === 1){
            this.setState({matrix1: this.initializeEmpty2dArray(this.state.numOfRow, this.state.numOfCol)})
        }
        if(id === 2){
            this.setState({matrix2: this.initializeEmpty2dArray(this.state.numOfRow, this.state.numOfCol)})
        }
    }

    reset = () => {
        this.setState({
            numOfRow: 4,
            numOfCol: 4,
            matrix1: this.initializeEmpty2dArray(4,4),
            matrix2: this.initializeEmpty2dArray(4,4),
            displayResult: false,
            resultMatrix: null
        })
    }

    moveToResult = () => {
        document.getElementById("result").scrollIntoView({behavior: "smooth"});
    }

    render(){
        const matrix1 = this.generateMatrix(1);
        const matrix2 = this.generateMatrix(2);
        const resultMatrix = this.generateResultMatrix();
        var rowNum = 0;
        return (
            <div className="page-container" style={{textAlign:"center"}}>
                    <HeaderBar/>
                    <div style={{ textAlign: "center" }} className="calculator">
                        <Container style={{display: "inline-block"}}>
                            <div style={{fontFamily: "Optima, sans-serif", fontSize: "40px"}}>
                                Matrix Addition
                            </div>
                            <hr/>
                            <div style={{marginBottom: "5px"}}>
                                    Please specify size for both matrices (Max 9 for both row and col):
                                    <br/>
                                    (They need to have the same size in order to be added up)
                            </div>
                            <Form.Control
                                input={this.state.matrix1}
                                name="numOfRow"
                                value={this.state.numOfRow}
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
                                input={this.state.matrix2}
                                name="numOfCol"
                                value={this.state.numOfCol}
                                className="matrixEntry"
                                onChange={this.handleSizeChange}
                                style={{display: "inline-block", borderRadius: "5rem"}}
                            />
                            <hr/>
                            <Row>
                                <Col xs="12" lg="6">
                                    <Form>
                                        { matrix1.map( (row) => ( (<div key={++rowNum}> {row} </div>) ) ) }
                                    </Form>
                                    <br/>
                                    { this.state.numOfRow === 0 || this.state.numOfCol === 0? null:(
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
                                </Col>
                                <Col className="d-lg-none" style={{marginTop: "30px", marginBottom: "20px"}}>
                                    <hr/>
                                </Col>
                                <Col xs="12" lg="6">
                                    <Form>
                                        { matrix2.map( (row) => ( (<div key={++rowNum}> {row} </div>) ) ) }
                                    </Form>
                                    <br/>
                                    { this.state.numOfRow === 0 || this.state.numOfCol === 0? null:(
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
                                </Col>
                            </Row>
                            
                            {   
                                this.state.displayResult? 
                                (
                                    <Button style={{marginTop:"30px"}} onClick={this.reset}>
                                        reset
                                    <br/>
                                    </Button>
                                ):(
                                <Button style={{marginTop:"30px"}} 
                                        onClick={()=>{
                                                        this.displayResult();
                                                        setTimeout(this.moveToResult, 100);
                                                    }}>
                                    Add them up!
                                    <br/>
                                    <span style={{fontSize: "13px"}}>
                                        (empty grids are treated as 0)
                                    </span>
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
                            <div id="result"/>
                        </Container>
                    </div>
            </div>
        );
    }
}

export default Addition;
import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import multiply from "./multiply.png";
import './matrixCalculator.css';
import HeaderBar from '../HeaderBar/headerBar';

class Transpose extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            numOfRow: 4,
            numOfCol: 4,
            matrix: this.initializeEmpty2dArray(4,4),
            resultMatrix: false,
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
            alert("Please only enter integers between 1 and 9")
            return;
        }

        if (event.target.name === "numOfRow")
            this.setState({ 
                numOfRow: event.target.value,
                matrix: this.initializeEmpty2dArray(event.target.value, this.state.numOfCol),
                
            })
        if (event.target.name === "numOfCol")
            this.setState({ 
                numOfCol: event.target.value,
                matrix: this.initializeEmpty2dArray(this.state.numOfRow, event.target.value),
            })

        this.setState({displayResult: false});
    }

    handleEntryChange = (event) => {
        const rowNum = event.target.getAttribute("cordinate").split(",")[0];
        const colNum = event.target.getAttribute("cordinate").split(",")[1];

        if(isNaN(event.target.value)){
            alert("Please only enter numbers");
            return;
        }

        var currentMatrix = this.state.matrix;
        currentMatrix[rowNum][colNum] = event.target.value;
        this.setState({matrix: currentMatrix})
    }

    generateMatrix = () => {
        var entryList = [];
        var keyNum = 0;
        for(var i = 0; i<this.state.numOfRow; i++) {
            var row = [];
            for(var j = 0; j<this.state.numOfCol; j++)
                row.push( <Form.Control
                                key={keyNum++}
                                cordinate={[i,j]}
                                value={ this.state.matrix[i][j] }
                                className="matrixEntry"
                                onChange={this.handleEntryChange}
                                style={{display: "inline-block"}}
                                /> );
            entryList.push(row);
        }
        return entryList;
    }

    generateResultMatrix = () => {
        var entryList = [];
        var keyNum = 0;
        for(var i = 0; i<this.state.numOfCol; i++) {
            var row = [];
            for(var j = 0; j<this.state.numOfRow; j++)
                row.push( <Form.Control
                                disabled
                                key={keyNum++}
                                cordinate={[i,j]}
                                value={ this.state.matrix[j][i] || 0 }
                                className="matrixEntry"
                                onChange={this.handleEntryChange}
                                style={{display: "inline-block"}}
                                /> );
            entryList.push(row);
        }
        return entryList;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    fillInRandomValues = () => {

        var arrayOfRandomValues = []
        for (var i=0; i<this.state.numOfRow; i++){
            var row = []
            for (var j=0; j<this.state.numOfCol; j++)
                row.push(this.getRandomInt(100));
            arrayOfRandomValues.push(row);
        }
        
        this.setState({matrix: arrayOfRandomValues});
    }

    clear = () => {
        this.setState({
            matrix: this.initializeEmpty2dArray(this.state.numOfRow, this.state.numOfCol)
        });
    }

    displayResult = () => {
        this.setState({displayResult: true});
    }

    reset = () => {
        this.setState({
            numOfRow: 4,
            numOfCol: 4,
            matrix: this.initializeEmpty2dArray(4,4),
            displayResult: false,
            resultMatrix: null
        })
    }

    moveToResult = () => {
        document.getElementById("result").scrollIntoView({behavior: "smooth"});
    }

    render(){
        const matrix = this.generateMatrix(1);
        const resultMatrix = this.generateResultMatrix();
        var rowNum = 0;
        return (
            <div className="page-container">
                    <HeaderBar/>
                    <div style={{ textAlign: "center" }}>
                        <Container style={{display: "inline-block"}}>
                            <div style={{fontFamily: "Optima, sans-serif", fontSize: "40px"}}>
                                Matrix Transpose
                            </div>
                            <hr/>
                            <div style={{marginBottom: "5px"}}>
                                    Please specify size of the matrix (Max 9 for both row and col):
                                    <br/>
                            </div>
                            <Form.Control
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
                                name="numOfCol"
                                value={this.state.numOfCol}
                                className="matrixEntry"
                                onChange={this.handleSizeChange}
                                style={{display: "inline-block", borderRadius: "5rem"}}
                            />
                            <hr/>
                                <Form>
                                    { matrix.map( (row) => ( (<div key={++rowNum}> {row} </div>) ) ) }
                                    <br/>
                                    { this.state.numOfRow == 0 || this.state.numOfCol == 0? null:(
                                        <>
                                        <Button 
                                            variant="outline-primary"
                                            className="no-box-shadow"
                                            onClick={()=>(this.fillInRandomValues(1))}>
                                            fill in random values
                                        </Button>

                                        <Button
                                            onClick={this.clear}
                                        >
                                            Clear
                                        </Button>
                                        </>
                                    )
                                    
                                    }
                                </Form>
                            {this.state.displayResult? null:<hr/>}
                            {
                                this.state.displayResult? (
                                    <Button style={{marginTop:"30px"}} onClick={this.reset}>
                                        reset
                                    <br/>
                                    </Button>
                                ): (
                                <Button style={{marginTop:"30px"}} onClick={()=>{
                                    this.displayResult();
                                    setTimeout(this.moveToResult, 100);
                                }}>
                                    Transpose the matrix!
                                    <br/>
                                    <span style={{fontSize: "13px"}}>
                                        (empty grids are treated as 0)
                                    </span>
                                </Button>
                                )
                                   
                            }
                            
                            {   this.state.displayResult? (
                                <div id="result">
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

export default Transpose;
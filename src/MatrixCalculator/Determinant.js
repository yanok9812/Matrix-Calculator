import React from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import multiply from "./multiply.png";
import './matrixCalculator.css';
import HeaderBar from '../HeaderBar/headerBar';

class Determinant extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            numOfRow: 4,
            numOfCol: 4,
            matrix: this.initializeEmpty2dArray(4,4),
            result: 0,
            displayResult: false,
            loading: false
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

        this.setState({
            numOfRow: event.target.value,
            numOfCol: event.target.value,
            matrix: this.initializeEmpty2dArray(event.target.value, this.state.numOfCol),
            displayResult: false
            })
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

    displayResult = () => {
        this.setState({displayResult: true});
    }

    copy_matrix = (matrix) => {
        var copy = [];
        for(var i=0; i<matrix.length; i++) {
            var row = [];
            for(var j=0; j<matrix[0].length; j++)
                row.push(matrix[i][j]);
            copy.push(row);
        }
        return copy;
    }

    split_matrix = (matrix, colNum) => {
        matrix.shift();
        for(var i=0; i < matrix.length; i++)
            matrix[i].splice(colNum,1);
    }

    calc_determinant = (matrix) => {
        if (matrix.length === 2){
            return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
        }
        
        var det = 0;
        for(var i=0; i<matrix.length; i++){
            var matrix_copy = this.copy_matrix(matrix);
            this.split_matrix(matrix_copy, i);
            det += (-1)**(i) * (matrix[0][i]||0) * this.calc_determinant(matrix_copy);
        }
        
        return det;
    }

    clear = () => {
        this.setState({
            matrix: this.initializeEmpty2dArray(this.state.numOfRow, this.state.numOfCol)
        });
    }

    handleCalc = async () => {
        const det = this.calc_determinant(this.state.matrix);
        this.setState({
            displayResult: true,
            result: det,
            loading: false
        });
    }

    render(){
        const matrix = this.generateMatrix(1);
        var rowNum = 0;
        return (
            <div className="page-container">
                <HeaderBar/>
                    <div style={{ textAlign: "center" }}>
                        <Container style={{display: "inline-block"}}>
                            <div style={{fontFamily: "Optima, sans-serif", fontSize: "40px"}}>
                                Matrix Determinant
                            </div>
                            <hr/>
                            <div style={{marginBottom: "5px"}}>
                                    Please specify size of the matrices (Max 9 for both row and col):
                                    <br/>
                                    (The input matrix needs to have same number of columns and rows)
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
                                        <Button onClick={this.clear}>
                                            Clear
                                        </Button>
                                        </>
                                    )
                                    
                                    }
                                </Form>
                            {this.state.displayResult? null:<hr/>}
                                
                                <Button style={{marginTop:"30px"}} onClick={()=>{    
                                    this.setState({loading: true});
                                    this.handleCalc();}}>
                                    
                                        {this.state.loading?
                                        (<Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                        </Spinner>):
                                        (<>
                                        <span style={{fontSize: "15px"}}>
                                            Calculate the Determinant
                                        </span>
                                        <br/>
                                        <span style={{fontSize: "13px"}}>
                                            (empty grids are treated as 0)
                                        </span>
                                        </>)
                                        }                                   
                                
                                </Button>
                                
                            
                            {   this.state.displayResult? (
                                <div>
                                    <hr/>
                                    The determinant is: 
                                    <span> {this.state.result} </span>
                                    <br/> <br/>
                                </div>
                                ) : null
                            }

                        </Container>
                    </div>
            </div>
        );
    }
}

export default Determinant;
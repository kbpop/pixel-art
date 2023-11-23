import logo from './logo.svg';
import './App.css';
import { Container, Card, Row, Col, Button, Form, Table} from 'react-bootstrap';
import React, { useState } from 'react';

function App() {
    const [rangeXValue, setRangeXValue] = useState(0); // Initial value
    const [rangeYValue, setRangeYValue] = useState(0);
    const [color, setColor] = useState("#000000");
    const [mouseDown, setmouseDown] = useState(false)

    const createDivs = () => {
      const divs = [];
      for (let i = 0; i < rangeXValue; i++) {
        let row = []
        for (let j = 0; j < rangeYValue; j++) {
          row.push(<div key={`${i}-${j}`} className="grid-item m-1 p-0 fs-1" onMouseMove = {onMouseColor} style={{ backgroundColor: '#FFFFFF', border: '1px solid #CCCCCC' }}></div>);
        }
        divs.push(row)
      }
      return divs;
    };


    
    const handleXRangeChange = (e) => {
      setRangeXValue(e.target.value);
      createDivs()
      // Additional actions based on the range value can be performed here
      // For example, update other components or make API calls
    };

    const handleYRangeChange = (e) => {
      setRangeYValue(e.target.value)
      createDivs()
    }

    const colorChange = (e) => {
      setColor(e.target.value)
    }

    const onMouseColor = (e) => {
      if(mouseDown){
        // console.log(e)
        // console.log(color)
        e.target.style.backgroundColor = color; // Accessing currentTarget from the synthetic event
        console.log(e.target.style.backgroundColor)
      }
      
    }

    const downMouse = (e) => {
      setmouseDown(true)
    }

    const upMouse = () => {
      setmouseDown(false)
    }

    const clearScreen = () => {
      createDivs()
    }


    

  return (
    <div className="App">
      <header className="App-header" onMouseDown={() => downMouse()} onMouseUp={() => upMouse()}>
        <div className='bg-white text-dark border rounsded m-5'>
          <Row>
            <Col className='m-4'>
            <label for="verticalRange" className="form-label font-size-4">Columns</label>
              <input type="range" className="form-range" min="0" max="50" value={rangeYValue} onChange={handleYRangeChange} id="verticalRange" /> 
              {rangeYValue}  
            </Col>
            <Col>
              
            </Col>
            <Col className='m-4'>
              <label for="horizontalRange" className="form-label font-size-4">Rows</label>
              <input type="range" className="form-range" min="0" max="50" value={rangeXValue} onChange={handleXRangeChange} id="horizontalRange" /> 
              {rangeXValue}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className='m-4 bg-green' id='createGrid'>
                Create Grid
              </Button>
              <Button className='m-4 bg-green' id='clearGrid' onClick={clearScreen()}>
                Clear Grid
              </Button>

              <input type='color' onChange={colorChange} />
              <Button className='m-4 bg-green' id='erase'>
                Erase
              </Button>
              <Button className='m-4 bg-green' id='paint'>
                Paint
              </Button>
            </Col>
          </Row>
        </div>
        <Row>
            <div className='text-black bg-white m-0 border rounded'>
                {createDivs().map((row, rowIndex) => (
                            <Row key={rowIndex}  className='m-0 p-0'>{row.map((cell, colIndex) => (
                                <Col className='g-0 m-0 p-0' key={colIndex}>{cell}</Col>
                                
                              ))}
                            </Row>
                          ))}
            </div>
          </Row>
      </header>
    </div>
  );
}

export default App;

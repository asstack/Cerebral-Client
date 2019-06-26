import React, {Component} from 'react';
import { connect } from 'react-redux'
import uuidv1 from 'uuid'
import {ReferenceLine, Label, LabelList, ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Area, Line} from 'recharts';

class Assessment extends Component {

  constructor(props){
    super(props)
    this.state={
      temp:[20,12,31,21] 
    }
  }
  
  componentDidMount = () => {
    
  }

  test_chart = () => {
    return( 
      <AreaChart width={500} height={325} data={[{name: 'month 1', uv: 11}, {name: 'month 2', uv: 8, pv:11}, {name: 'month 3', uv: 16}]}>
        <XAxis dataKey="name" position='bottom' dy={10} fontSize={14}/>
        <YAxis type="number" domain={[0,21]}>
           <Label angle={-90} value='Anxiety score' position='insideLeft' style={{textAnchor: 'middle', fontSize:'16px', fill:'#250044'}} />
        </YAxis>
        <CartesianGrid stroke="#E9E7E9"/>
        <Area type="monotone" dataKey="uv" stroke="#e1e5f5" fill="#e1e5f5"/>
        <ReferenceLine y={20} stroke="#250044" strokeDasharray="3 3" label={{ value: 'Baseline', fill: '#250044' }}/>
      </AreaChart>
    )
  }


  assessment_result = (type, data) => {
    return (
      <div className="align-self-start main-content-wide-card">
        <div className="d-flex flex-row amt-rst-container">
          <div className = "d-flex flex-column amt-left-panel">
            <div className = "d-flex flex-row description">
              Anxiety
            </div>
            <div className = "d-flex flex-row title">
              Moderate
            </div>
            <div className = "d-flex flex-row description">
              Current Assessment score:
            </div>
            <div className = "d-flex flex-row score">
              20
              <div className="total">/22</div>
            </div>
          </div>
          <div className = "d-flex flex-column align-self-center amt-graph-panel">
            {this.test_chart()}
            <div className = "d-flex justify-content-center description">Assessment timeline (months)</div>
          </div>
        </div>
      </div>  
    ) 
  }


  default_view = () => {
    return (  
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex flex-row justify-content-between">
          <div></div>
          <div className="d-flex justify-content-end text-main-title">Assessment Results</div>
        </div>
        <div className="d-flex flex-column main-content-row">
          {this.assessment_result('depression',[20,11,33,22,11])}
        </div>
      </div> 
    ) 
  }




  render(){
    return this.default_view() 
  }


}

export default Assessment

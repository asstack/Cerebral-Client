import React, {Component} from 'react';
import { connect } from 'react-redux'
import {get_visits_for_patient} from "../../actions/patient_action"
import uuidv1 from 'uuid'
import {ReferenceLine, Label, LabelList, ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Area, Line} from 'recharts';

class Assessment extends Component {

  constructor(props){
    super(props)
    this.state={
      scores:{isi:[], phq:[], gad:[]},
      is_ready:false
    }
  }
  
  //data = {dep: [{name:'month n', uv:number}]}
  //
  //isi_score: null, phq_score: 20, gad_score: 12,
  componentDidMount = () => {
    const id = this.props.user.attributes.id
    let scores = {isi:[], phq:[], gad:[]}
    this.props.get_visits_for_patient(id).then((resp)=> {
      resp.data.sort((v1, v2) => { return v1.id - v2.id})
      resp.data.map((item, index)=> {
        if(item.isi_score!=null){
          scores['isi'].push({name:"month "+index, uv:item.isi_score})
        } 
        if(item.phq_score!=null){
          scores['phq'].push({name:"month "+index, uv:item.phq_score})
        } 
        if(item.gad_score!=null){
          scores['gad'].push({name:"month "+index, uv:item.gad_score})
        } 
      })
      this.setState({scores:scores, is_ready:true})  
    }) 
    
  }

  get_total_score = (type) => {
    if(type==='phq') return 27
    else if(type==='gad') return 21
    else if(type==='isi') return 28
    else return 0;
  }

  get_severity = (type, score) => {
    if(type==='phq'){
      if(score < 5) return 'No Depression'; 
      else if(score < 10) return 'Mild';
      else if(score < 15) return 'Moderate';
      else if(score < 20) return 'Moderately severe'
      else return 'Severe' 
    }else if(type === 'gad'){ 
      if(score < 5) return 'No Anxiety'; 
      else if(score < 10) return 'Mild';
      else if(score < 15) return 'Moderate';
      else return 'Severe' 
    }else if(type === 'isi'){
      if(score < 8) return 'No Insomnia'; 
      else if(score < 15) return 'Subthreshold';
      else if(score < 22) return 'Moderately severe';
      else return 'Severe' 
    }else 
      return 'Unknown' 
  }

  get_graph_label = type => {
    if(type==='phq') return 'Depression score'
    else if(type==='gad') return 'Anxiety score'
    else if(type==='isi') return 'Insomnia score'
    else return "Unknown"
  }

  
  assessment_chart = (type, data) => {
    return( 
      <AreaChart width={550} height={325} 
                 margin={{ top: 20, right: 80, left: 0, bottom: 0 }}
                 data={data.length===1?[{name:null, uv:data[0].uv}, data[0]]:data}>
        <XAxis dataKey="name" position='bottom' dy={10} fontSize={14}/>
        <YAxis type="number" domain={[0, this.get_total_score(type)]}>
           <Label angle={-90} value={this.get_graph_label(type)} position='insideLeft' style={{fontWeight:600, textAnchor: 'middle', fontSize:'16px', fill:'#250044'}} />
        </YAxis>
        <CartesianGrid stroke="#E9E7E9" />
        <Area type="monotone" dataKey="uv" stroke="#e1e5f5" fill="#e1e5f5"/>
        <ReferenceLine y={data[0].uv} stroke="#250044" strokeDasharray="3 3" label={{fontWeight:600, fontSize:'16px', position:'right', value: 'Baseline', fill: '#250044' }}/>
      </AreaChart>
    )
  }

  assessment_result = (type, title, data) => {
    return (
      <div className="align-self-start main-content-wide-card">
        <div className="d-flex flex-row amt-rst-container">
          <div className = "d-flex flex-column amt-left-panel">
            <div className = "d-flex flex-row description">
              {title}
            </div>
            <div className = "d-flex flex-row title">
              {this.get_severity(type, data[data.length-1].uv)}
            </div>
            <div className = "d-flex flex-row description">
              Current Assessment score:
            </div>
            <div className = "d-flex flex-row score">
              {data[data.length-1].uv}
              <div className="total">/{this.get_total_score(type)}</div>
            </div>
          </div>
          <div className = "d-flex flex-column align-self-center amt-graph-panel">
            {this.assessment_chart(type, data)}
            <div className = "d-flex justify-content-center description">Assessment timeline (months)</div>
          </div>
        </div>
      </div>  
    ) 
  }


  default_view = () => {  
    const data = this.state.scores
    console.log("data:", data)
    return (  
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex flex-row justify-content-between">
          <div></div>
          <div className="d-flex justify-content-end text-main-title">Assessment Results</div>
        </div>
        <div className="d-flex flex-column main-content-row">
          {data.phq.length>0?this.assessment_result('phq','DEPRESSION',data.phq):null}
          {data.gad.length>0?this.assessment_result('gad','ANXIETY',data.gad):null}
          {data.isi.length>0?this.assessment_result('isi','INSOMNIA',data.isi):null}

        </div>
      </div> 
    ) 
  }




  render(){
    if(this.state.is_ready) return this.default_view() 
    else return null
  }


}

export default connect(null, {get_visits_for_patient}) (Assessment)

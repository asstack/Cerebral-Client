import React, {Component} from 'react';
import { connect } from 'react-redux'
import {get_visits_for_patient} from "../../actions/patient_action"
import Moment from 'moment';
import uuidv1 from 'uuid'

class SubscriptionInformation extends Component {

  constructor(props){
    super(props)
    this.state = {
      history:[], 
      is_ready:false
    }
  }

  componentDidMount = () => {
    const id = this.props.user.attributes.id
    let subs = []
    this.props.get_visits_for_patient(id).then((resp) => {
      resp.data.map((val, idx) => {
        if(val.answers){
          let target = val.answers.filter(val => (val.question.name==='medication_preference' || val.question.name === 'dosage_preference'))
            .map(f_obj=>{return {[f_obj.question.name]:f_obj}}) 
              .reduce((map, obj) => {
                const key = Object.keys(obj)[0];
                map[key] = obj[key];
                return map;
              }, {})
          target['created_at'] = val.service_line.updated_at; 
          target['id'] = val.id; 
          subs.push(target)
        }
      }) 
      
      //subs.sort((v1, v2) => {
      // return Moment.utc(v1.created_at).diff(Moment.utc(v2.created_at))});
      //TODO:Date seems not correct, so using id for sorting 
      subs.sort((v1, v2) => {
        return v1.id>v2.id; 
      })
      this.setState({history:subs, is_ready:true})
    })  
  }

  subscription_info = (type, data) => {
    const title = type==='recent'?'MY RECENT SUBSCRIPTION':'SUBSCRIPTION HISTORY'

    let med_preference = JSON.parse(data.medication_preference.response)
    console.log("med preference:", med_preference)
    return <div key={uuidv1()} className="align-self-start main-content-wide-card">
      <div className="d-flex flex-column card-items-container">
        <div className="d-flex flex-column justify-content-center patient_basic-info">
          <div className="d-flex flex-column">
            <div className="small-card-title">{title}</div>
            <div className="d-flex flex-row medication-holder"> 
              <div className="d-flex align-items-center patient-info-photo-holder"> 
                <img alt="medication info" className = "medication-info-photo" 
                  src={process.env.PUBLIC_URL + '/img/medication/'+(med_preference.name||'01-bottle')+'.svg'}/>
              </div>
              <div className="d-flex flex-column subscription-col-1">
                <div className="subscription-text-holder subscription-text">
                  {med_preference.name===null?'Medication: Pending':med_preference.name +" ("+med_preference.brand_name+")"}
                </div> 
                <div className="subscription-text-holder subscription-text">
                  {med_preference.name===null?'Dosage: Pending':data.dosage_preference.response+" mg"}
                </div> 
                <div className="subscription-text-holder subscription-text">
                  $45.00
                </div> 
              </div>
              <div className="d-flex flex-column">
                <div className="subscription-text-holder subscription-text">prescription status</div> 
                <div className="d-flex flex-row">
                  <img alt="ready for info" className = "patient-info-status-icon" src={process.env.PUBLIC_URL + '/img/ready.png'}/>
                  <div className="subscription-subtext">
                    Pending - Waiting for approval from doctor
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div> 
    </div>
  }

  subscription_no_info = (type) => {
    const title = type==='recent'?'MY RECENT SUBSCRIPTION':'SUBSCRIPTION HISTORY'
    return <div className="align-self-start main-content-wide-card">
      <div className="d-flex flex-column card-items-container">
        <div className="d-flex flex-column justify-content-center patient_basic-info">
          <div className="d-flex flex-column">
            <div className="small-card-title">{title}</div>
            <div className="d-flex flex-row"> 
              <div className="subscription-subtext">
                You have no previous subscriptions
              </div>
            </div>
          </div> 
        </div>
      </div> 
    </div>
  }

  default_view = () => {
    let history = this.state.history.slice(1)
    return (  
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex flex-row justify-content-between">
          <div></div>
          <div className="d-flex justify-content-end text-main-title">SUBSCRIPTION INFORMATION</div>
        </div>
        <div className="d-flex flex-column main-content-row">
          {this.state.history.length>0?this.subscription_info('recent', this.state.history[0]):this.subscription_no_info('recent')}
          {history.length>0?history.map((item, index) => this.subscription_info('history', item)):this.subscription_no_info('history')}  
        </div>
      </div> 
    ) 
  }



  render(){
    if(this.state.is_ready) return this.default_view()
    else return null
  }

}

export default connect(null, {get_visits_for_patient}) (SubscriptionInformation)

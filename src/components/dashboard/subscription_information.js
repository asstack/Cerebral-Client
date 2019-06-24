import React, {Component} from 'react';
import { connect } from 'react-redux'
import {get_visits_for_patient} from "../../actions/patient_action"
import Moment from 'moment';

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
          target['updated_at'] = val.service_line.updated_at; 
          subs.push(target)
        }
      }) 
      
      subs.sort((v1, v2) => {
        return Moment.utc(v1.created_at).diff(Moment.utc(v2.created_at))});
      this.setState({history:subs, is_ready:true})
    })  
  }

  subscription_info = (type, data) => {
    const title = type==='recent'?'MY RECENT SUBSCRIPTION':'SUBSCRIPTION HISTORY'
    console.log("subscription info", data)
    return <div className="align-self-start main-content-wide-card">
      <div className="d-flex flex-column card-items-container">
        <div className="d-flex flex-column justify-content-center patient_basic-info">
          <div className="d-flex flex-column">
            <div className="small-card-title">{title}</div>
            <div className="d-flex flex-row medication-holder"> 
              <div className="d-flex align-items-center patient-info-photo-holder"> 
                <img alt="medication info" className = "medication-info-photo" src={process.env.PUBLIC_URL + '/img/medication/bupropion.svg'}/>
              </div>
              <div className="d-flex flex-column subscription-col-1">
                <div className="subscription-text-holder subscription-text">{data.medication_preference.response}</div> 
                <div className="subscription-text-holder subscription-text">Dosage {"("+data.dosage_preference.response+")"}</div> 
                <div className="subscription-text-holder subscription-text">$45.00</div> 
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
            <div className="d-flex flex-row medication-holder"> 
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
    console.log("check history:", history, "total:", this.state.history)
    return (  
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex flex-row justify-content-between">
          <div></div>
          <div className="d-flex justify-content-end text-main-title">SUBSCRIPTION INFORMATION</div>
        </div>
        <div className="d-flex flex-column main-content-row">
          {this.subscription_info('recent', this.state.history[0])}
          {history.length>0?history.map((item, index) => this.subscription_info('history', item)):null}  
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

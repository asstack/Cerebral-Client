import React, {Component} from 'react'
import {Router, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import * as components from '../../components/question_components/components'
import RegisterManager from '../../components/question_types/register_manager'

class Account extends Component {

  constructor(props){
    super(props)
    this.state = {
    
    }
  }
  
  //check info and if exists, push to next
  componentDidMount(){
    if(this.state.login_info){ 
      this.props.history.push(this.props.next_url) 
    }  
  } 



  //if got something from parent, go there
  page_update_helper = () => {
    if(this.props.next_url){
      this.props.history.push(this.props.next_url) 
    }else{
      this.props.history.push('/therapist/dashboard')
    } 
  }

  render(){
    return (
      <div className="d-flex flex-column container-noprogress">
        <div className="d-flex flex-row justify-content-left header-noprogress">
          <img className="cerebral-logo" src={process.env.PUBLIC_URL + '/img/logo.png'}/>
        </div>
        <div className="d-flex flex-column question-container">
          <div className="d-flex flex-column main-noprogress">
            <div className="description_noprogress">
              <h1>Create or Sign in an account to refer patient</h1>
            </div>
            <RegisterManager signin_submit_action = {this.props.sign_in_handler} register_submit_action = {this.props.register_handler} view_type={this.props.default_type}/>
          </div> 
        </div> 
       </div> 
   );
  }
}

const mapStateToProps = (state) => ({
  login_info : state.global_reducer.current_user
})

export default withRouter(connect(mapStateToProps, {}) (Account)) 

import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import RegisterManager from '../../components/question_types/register_manager'
import * as therapist_actions from '../../actions/therapist_action'
import * as global_actions from '../../actions/user_auth_action'
import Alert from 'react-s-alert'

class Account extends Component {

  constructor(props){
    super(props)
    this.state = {
      type: this.props.default_type   
    }
    this.title_ref = React.createRef();    
  }
  
  //check info and if exists, push to next
  componentDidMount(){
    if(this.props.login_info.attributes.therapist){ 
      this.props.update_type_handler(this.props.next_type)
    }  
  } 
  
  sign_in_handler = info => { 
    const {global_actions} = this.props
    global_actions.sign_in(info).then ((resp) => {
      this.props.update_type_handler(this.props.next_type)
    })
      .catch((err)=> { Alert.error(err.message) })

  } 

  register_handler = info => {
    const {therapist_actions, global_actions}=this.props
    global_actions.register_and_set_user(info)
      .then(() => {return global_actions.sign_in(info)})
        .then(() => { return therapist_actions.create_therapist_from_user() })
          .then(() => {this.props.update_type_handler(this.props.next_type)})
      .catch((err) => {
        Alert.error(err.message)
      })
  }

  update_type_handler = (type) => {
    this.setState({type:type}) 
  }


  view = () => { 
    let wording = this.state.type==='register'?"Create an account to refer patients":"Sign in to refer patients"
    return(
      <div className="container-progress">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-center flex-row menu-bar">
            <div className= "col d-flex justify-content-between solid-border-bottom text-small menu-bar-item-holder">
              <img alt="arrow btn" src={process.env.PUBLIC_URL + '/img/arrow.png'} className="arrow-btn" onClick={e=>this.props.update_type_handler('cover')}/>
              <div className="align-self-end menu-item">  Therapist Information </div>
              <div></div>
            </div>      
            <div className= "col d-flex justify-content-between solid-border-bottom__unselected text-small__unselected  menu-bar-item-holder">
              <div></div>
              <div className="align-self-end menu-item">  Patient Information </div>
              <div></div>
            </div>      
         
          </div>
          <div className="d-flex flex-column question-container">
            <div className="d-flex flex-column main-noprogress">
              <div className="description_noprogress">
                <h1>{wording}</h1>
              </div>
              <RegisterManager update_type = {this.update_type_handler} user_type = "therapist" signin_submit_action = {this.sign_in_handler} register_submit_action = {this.register_handler} view_type={this.props.default_type}/>
            </div> 
          </div> 

       </div>    
     </div>
    ) 
  }

  render(){
    return (this.view())
 }
}

const mapStateToProps = (state) => ({
  login_info : state.global_reducer.current_user
})

const mapDispatchToProps = (dispatch) => {
  return {
    therapist_actions: bindActionCreators(therapist_actions, dispatch),
    global_actions: bindActionCreators(global_actions, dispatch)
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Account)) 

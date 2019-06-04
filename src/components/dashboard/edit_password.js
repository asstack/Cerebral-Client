import React, {Component} from 'react';
import * as components from '../question_components/components'

//not sure patient and therapist can share this component
class EditPassword extends Component {

  constructor(props){
    super(props) 
    this.state = {
      type:'read',
      password:'',
      new_password:'',
      new_password_confirm:'',
    }
  }

  edit_btn_handler=(type)=>{
    if(type==='read') this.setState({type:'write'}) 
    else this.setState({type:'read'})
  } 

  //TODO: practics: california -> where get and set this info
  read_view = () =>(
    <div className="align-self-start main-content-small-card">
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">MY PROFILE</div>
        <div className="small-card-item">
          <input type="text" placeholder="Password" disabled={true}/>
        </div>
        <div className="small-card-item">
          <input type="text" placeholder="New Password" disabled={true}/>
        </div>
        <div className="small-card-btn" onClick={e=>this.edit_btn_handler('read')}>EDIT</div>
      </div> 
    </div> 
  ) 

  write_view = () =>(
    <div className="align-self-start main-content-small-card">
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">MY PROFILE</div>

        <div className="small-card-item">
          <input type="text" placeholder="Password"/>
        </div>
        <div className="small-card-item">
          <input type="text" placeholder='New password'/>
        </div>
        <div className="small-card-item">
          <input type="email" placeholder='New password (confirm)'/>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="small-card-btn" onClick={e=>this.edit_btn_handler('write')}>Submit</div>
          <div className="small-card-btn" onClick={e=>this.edit_btn_handler('write')}>Cancel</div>
        </div>
      </div> 
    </div> 
  ) 

  render(){
    let view = this.state.type==='read'?this.read_view():this.write_view()
    return view 
  }


}


export default EditPassword

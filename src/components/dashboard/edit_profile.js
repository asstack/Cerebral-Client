import React, {Component} from 'react';

//not sure patient and therapist can share this component
class EditProfile extends Component {

  constructor(props){
    super(props) 
    this.state = {
      type:'read',
      email:this.props.attr.email,
      first_name:this.props.attr.first_name,
      last_name:this.props.attr.last_name,
      new_email:'',
      new_first_name:'',
      new_last_name:''
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
        <div className="small-card-item">{this.state.first_name}</div>
        <div className="small-card-item">{this.state.last_name}</div>
        <div className="small-card-item">{this.state.email}</div>
        <div className="small-card-btn" onClick={e=>this.edit_btn_handler('read')}>EDIT</div>
      </div> 
    </div> 
  ) 

  write_view = () =>(
    <div className="align-self-start main-content-small-card">
      <div className="d-flex flex-column card-items-container">
        <div className="small-card-title">MY PROFILE</div>

        <div className="small-card-item">
          <input type="text" placeholder="First Name" defaultValue={this.state.first_name}/>
        </div>
        <div className="small-card-item">
          <input type="text" placeholder='Last Name' defaultValue={this.state.last_name}/>
        </div>
        <div className="small-card-item">
          <input type="email" placeholder='Email' defaultValue={this.state.email}/>
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


export default EditProfile

import React, {Component} from 'react'
import axios from 'axios'
import uuidv1 from 'uuid'

class SelectorComponent extends Component {
  constructor(props){
    super(props)  
    this.state={
      question:null,
      is_ready:false,
    }
  }
  
  componentDidMount(){
    this.setState({question:this.props.question, is_ready:true}) 
    if(this.props.prv_answer){
      this.setState({prv_answer:JSON.parse(this.props.prv_answer)})
    }

    /*
     * just keep it for future
    navigator.geolocation.getCurrentPosition(position=>{
      const key = " " //need google geocode api key 
      const pos = position.coords
      const temp_l = pos.latitude
      const temp_r = pos.longitude
      console.log("position:", position.coords)

      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${temp_l},${temp_r}&sensor=true&key=${key}`).then(resp=>{
        const location = resp.data.results[0]
        location.address_components.map((data, index)=>{
          if(data.types[0]==="administrative_area_level_1"){
            console.log("get data long name:", data.long_name)
          }}
        )
      })
    })
    */
    
  }
 


  submit_btn_handler = (item, index) => {
    if(this.props.type ==='bank_selector'){
      this.props.submit_action(item) 
    }else{
      let ans = ""
      if(this.props.question.assessment_type!==null){
        ans = JSON.stringify({score: this.state.question.options.length-index-1, answer:item.name, index:index})
      }else{
        ans = JSON.stringify({answer:item.name, index:index})
      }
      this.props.submit_action(ans, this.props.question) 
    }
  }



  selector_items = (options, class_type) => {
    return options.map((item, index) => {
      let selected=""
      if(this.state.prv_answer && index===this.state.prv_answer.index){
        selected="selected"
      } 
      return (<input key={uuidv1()} className = {class_type+" "+selected} onClick={e=>this.submit_btn_handler(item, index)} 
        type="button" value={item.title}/>
      )
    })}

  selector = () => {
    const class_type = this.props.question.options.length>2? "button-multi-selector":"button-two-selector";
    return (
      <div className="d-flex flex-row justify-content-between selector-component flex-wrap">
        {this.selector_items(this.state.question.options, class_type)}
      </div>
    )
  }

  render(){
    if(this.state.is_ready) return this.selector()  
    else return null
  }

}

export default SelectorComponent

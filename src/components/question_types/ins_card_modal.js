import React, {Component} from 'react'
import moment from 'moment'
import * as components from '../question_components/components'


class InsCardModal extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount=()=>{

  }

  input_update_handler = e =>{

  }
  confirm_btn_handler = e => {

  }
  
  get_file_handler = (data) => {

    var fr = new FileReader();
    //fr.onloadend = this.handleFile;
    console.log(data[0].type)
    //"image/png" image/jpeg
    const type = data[0].type
    if(type === 'image/png'|| type==='image/jpeg'){ 
      fr.onload= this.file_onload_handler; 
      fr.readAsDataURL(data[0]); 
      this.setState({file_type:type})
    }else{
      alert("Please use image file")
    }
 }


  render(){
    return(
      <Modal show={open} onHide={() => close()}>
        <Modal.Body>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-center">
              <button variant="secondary" onClick={() => close(false)}>
                Take photo with Webcam
              </button>
            </div> 
            <div className="d-flex flex-row justify-content-center">
              <Dropzone onDrop={acceptedFiles => this.get_file_handler(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                  <section>
                    <div {...getRootProps( {className: 'dropzone'})}>
                      <input {...getInputProps()} />
                        <p>Upload photo</p>
                    </div>
                  </section>
                )}
              </Dropzone>	          
              <button variant="primary" onClick={() => close(true)}>
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }

}
export default InsCardModal



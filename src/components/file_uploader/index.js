import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import * as components from '../question_components/components'
import * as util from '../../utils/common'

class FileUploader extends Component {

	constructor(props){
		super(props)
    this.state = {
      file:null,
      file_type:null
    }
	}

  file_onload_handler = (e) => {
    const content = e.target.result;
    this.setState({file:content}) 
  }

  get_file_handler = (data) => {

    var fr = new FileReader();
    const type = data[0].type
    if(type === 'image/png'|| type==='image/jpeg'){ 
      fr.onload= this.file_onload_handler; 
      fr.readAsDataURL(data[0]); 
      this.setState({file_type:type})
    }else{
      alert("Please use image file")
    }
 }

  confirm_btn_handler = e => {
    if(this.state.file){
      const blobs = util.imgtoBlob(this.state.file, this.state.file_type)
      console.log("check file agail:", blobs) 
      this.props.submit_action(blobs, this.state.file_type, this.props.file_name, this.props.question)
    } 
  }

  clear_data_handler = e => { 
    this.setState({file:null}) 
  }

	//TODO: number of files, type, and path of file 
	//TODO: write a function to upload files

  view = () => {
    if(this.state.file){
      return( 
        <div>
          <div className="id-image-holder"> 
            <img alt="upload img" className="id-image" src={this.state.file}/>
          </div>
            {components.confirm_button_type_1(this.confirm_btn_handler, "Confirm Image")}
            {components.confirm_button_type_2(this.clear_data_handler, "Upload again")}
        </div>
      ) 
    }else{
      return (
        <div>
					<Dropzone onDrop={acceptedFiles => this.get_file_handler(acceptedFiles)}>
  					{({getRootProps, getInputProps}) => (
    					<section>
      					<div {...getRootProps( {className: 'dropzone'})}>
        					<input {...getInputProps()} />
        						<p>Drag image(png or jpeg) here, or click to select files</p>
      					</div>
    					</section>
  					)}
					</Dropzone>
				</div>
       )
    }
  }

	render() {
		return (
      this.view() 
    )
	}
}

export default FileUploader

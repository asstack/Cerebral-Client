import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import * as components from '../question_components/components'

class FileUploader extends Component {

	constructor(props){
		super(props)
    this.state = {
      file:null
    }
	}

  file_onload_handler = (e) => {
    const content = e.target.result;
    //console.log('file content',  content)
    //
    this.setState({file:content}) 
  }

  get_file_handler = (data) => {
      var fr = new FileReader();
      //fr.onloadend = this.handleFile;
      fr.onload= this.file_onload_handler;
      fr.readAsDataURL(data[0]); 
 }

  confirm_btn_handler = e => {
    if(this.state.file){
      this.props.submit_action()
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
            <img className="id-image" src={this.state.file}/>
          </div>
			    <div className="d-flex flex-row justify-content-center">
            {components.confirm_button_type_2(this.clear_data_handler, "Upload again")}
            {components.confirm_button_type_1(this.confirm_btn_handler, "Confirm Image")}
          </div>	
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
        						<p>Drag 'n' drop some files here, or click to select files</p>
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

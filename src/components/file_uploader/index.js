import React, {Component} from 'react'
import Dropzone from 'react-dropzone'


class FileUploader extends Component {

	constructor(props){
		super(props)
	}

	//TODO: number of files, type, and path of file 
	//TODO: write a function to upload files
	render() {
		return (
			<div>
				<div>
					<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
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
			</div>
		)
	}
}

export default FileUploader

import { connect } from 'react-redux'
import { get_side_effects } from '../../actions/patient_action'
import CheckBoxComponent from './checkbox';

class SideEffects extends CheckBoxComponent {
  

  componentDidMount = () => {
    this.props.get_side_effects(this.props.service_line.id).then((resp) => {
      // TODO: update global store with patient information
      console.log("get_side_effects resp: ", resp)
      this.setState({
        ...this.state,
        options: resp,
        checked_options: new Array(resp.length).fill(false)  
      });
    })
  }
}

const mapStateToProps = (state) => {

	return {
    service_line: state.patient_reducer.service_line
	}
}

export default connect(mapStateToProps, {get_side_effects}) (SideEffects)

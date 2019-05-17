import {QuestionPreference, prop_methods} from './question_preference'
import { connect } from 'react-redux'
import { get_treatments } from '../../actions/patient_action'


class MedicationPreference extends QuestionPreference {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {

    // TODO: get the selected medication so we can load dosages

    this.props.get_treatments(this.props.service_line.id).then((resp) => {
      console.log("get_treatments resp: ", resp)
      this.setState({
        ...this.state,
        options: resp.data
      });
    })
  }
}

const mapStateToProps = (state) => {

	return {
    service_line: state.patient_reducer.service_line
	}
}

export default connect(mapStateToProps, {...prop_methods, get_treatments}) (MedicationPreference)
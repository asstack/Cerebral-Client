import { connect } from 'react-redux'
import {QuestionPreference, prop_methods} from './question_preference'
import { get_treatments } from '../../actions/patient_action'

class DosagePreference extends QuestionPreference {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    this.props.get_treatments().then((resp) => {
      // TODO: update global store with patient information
      console.log("get_treatments resp: ", resp)
      this.setState({
        ...this.state,
        options: resp.data
      });
    })
  }
}

export default connect(null, {...prop_methods, get_treatments}) (DosagePreference)
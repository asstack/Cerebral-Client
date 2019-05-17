import { connect } from 'react-redux'
import {QuestionPreference, prop_methods} from './question_preference'
import { get_treatments, get_current_answer_by_name } from '../../actions/patient_action'

class DosagePreference extends QuestionPreference {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {

    const {get_current_answer_by_name, get_treatment_dosages} = this.props

    get_current_answer_by_name('medication_preference').then(function(med_pref_resp) {
      get_treatment_dosages(med_pref_resp).then((resp) => {
        // TODO: update global store with patient information
        console.log("get_treatment_dosages resp: ", resp)
        this.setState({
          ...this.state,
          options: resp
        });
      })
    })
  }
}

export default connect(null, {...prop_methods, get_treatments, get_current_answer_by_name}) (DosagePreference)
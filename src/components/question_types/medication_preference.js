import {QuestionPreference, prop_methods} from './question_preference'
import { connect } from 'react-redux'

class MedicationPreference extends QuestionPreference {
  constructor(props) {
    super(props)
  }
}

export default connect(null, prop_methods) (MedicationPreference)
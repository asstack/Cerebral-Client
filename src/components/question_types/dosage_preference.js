import { connect } from 'react-redux'
import {QuestionPreference, prop_methods} from './question_preference'

class DosagePreference extends QuestionPreference {
  constructor(props) {
    super(props)
  }
}

export default connect(null, prop_methods) (DosagePreference)
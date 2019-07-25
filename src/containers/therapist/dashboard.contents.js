import React, { Component } from 'react';
import EditProfile from '../../components/dashboard/edit_profile';
import EditPassword from '../../components/dashboard/edit_password';
import PatientsList from '../../components/dashboard/patients_list';
import MessageProcessManager from '../../components/dashboard/message_process_manager';

// TODO: will use it as wrapper
class DashboardContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      type: this.props.type,
      patients_list: this.props.patients_list
    };
  }

  componentWillReceiveProps = next_props => {
    this.setState({ user: next_props.user, type: next_props.type, patient_list: next_props.patient_list });
    window.scrollTo(0, 0);
  };

  // move xxx_view into common area and pass as parameter
  patient_info_view = () => {
    return (
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex justify-content-end text-main-title desktop-only">Profile Information</div>
        <div className="d-flex flex-column">
          <div className="d-flex flex-row justify-content-between main-content-row flex-wrap">
            <EditProfile attr={this.state.user.attributes} />
            <EditPassword attr={this.state.user.attributes} />
          </div>
        </div>
      </div>
    );
  };

  patient_list_view = () => {
    return (
      <div className="d-flex flex-column profile-main-content">
        <div className="d-flex justify-content-end text-main-title desktop-only">Profile Information</div>
        <div className="d-flex flex-column">
          <PatientsList attr={this.state.user.attributes} />
        </div>
      </div>
    );
  };

  type_to_view = type => {
    switch (type) {
      case 'profile_info':
        return this.patient_info_view();
      case 'patients_list':
        return <PatientsList attr={this.state.user.attributes} />;
      case 'message':
        return <MessageProcessManager user={this.state.user} view_type="message_box" />;
      default:
        return 'Invalid url';
    }
  };

  render() {
    return this.type_to_view(this.state.type);
  }
}

export default DashboardContents;

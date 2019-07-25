import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import default_icon from '../../img/user.png';
import { update_app_state } from '../../actions';
import { sign_out, update_service_line, update_patient_question_banks } from '../../actions/patient_action';
import DashboardContents from './dashboard.contents';
import './dashboard.scss';

class PatientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view_type: 'profile_info',
      user: this.props.user,
      is_ready: false
    };
  }

  componentDidMount() {
    console.log('dash board patient Did mount user:', this.props.user);
    if (!this.props.user.attributes['access-token']) {
      this.props.history.push('/patient/sign_in');
    } else {
      this.setState({ is_ready: true });
    }
  }

  // updated user information
  componentWillReceiveProps = next_props => {
    console.log('dash board Will receive patient user:', this.props.user);
    if (next_props.user.id === null || next_props.user.patient === null) {
      this.props.history.push('/patient/sign_in');
    }
    this.setState({ user: next_props.user });
  };

  app_state_checkout_handler = e => {
    this.props.update_patient_question_banks(['checkout'], 0).then(() => {
      this.props.history.push('/patient/checkout');
    });
  };

  sign_out_handler = e => {
    this.props.sign_out();
    this.props.history.push('/patient/sign_in');
  };

  update_type_handler = type => {
    this.setState({ view_type: type });
  };

  type_to_view = () => {
    return <DashboardContents user={this.state.user} type={this.state.view_type} />;
  };

  toggleNavState = () => {
    this.setState(prevState => ({
      showNav: !prevState.showNav
    }));
  };

  updateType = type => {
    this.update_type_handler(type);
    this.toggleNavState();
  };

  view = () => {
    const type = this.state.view_type;
    const menu_css = 'd-flex nav-menu--item justify-content-center align-items-center profile-side-item';
    const menu = (
      <>
        <div className={cx(menu_css, type === 'profile_info' ? 'item-selected' : '')} onClick={() => this.updateType('profile_info')}>
          Profile Information
        </div>
        <div className={cx(menu_css, type === 'subscription_info' ? 'item-selected' : '')} onClick={() => this.updateType('subscription_info')}>
          Subscription Information
        </div>
        <div className={cx(menu_css, type === 'message' ? 'item-selected' : '')} onClick={() => this.updateType('message')}>
          Messages
        </div>
        <div className={cx(menu_css, type === 'result' ? 'item-selected' : '')} onClick={() => this.updateType('result')}>
          My Assessment Results
        </div>
        <div className={cx(menu_css, 'mob-only')} onClick={e => this.sign_out_handler()}>
          Logout
        </div>
      </>
    );
    return (
      <div className={cx('d-flex flex-row therapist-noprogress', this.state.showNav ? 'no-scroll' : '')}>
        <div className={cx('d-flex flex-column profile-side-bar-holder', this.state.showNav ? 'visible' : '')}>
          <div className="header">
            <div className="d-flex justify-content-center profile-logo">
              <a href={process.env.REACT_APP_MAIN_PAGE_URL}>
                <img className="cerebral-logo" src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="link to main page" />
              </a>
            </div>
            <div className={cx('nav-opener', this.state.showNav ? 'open' : '')} onClick={this.toggleNavState}>
              <span />
            </div>
          </div>

          <div className={cx('profile-side-items-holder nav-menu', this.state.showNav ? 'visible' : '')}>
            <div className="profile-side-title-holder desktop-only">
              <img className="profile-image" src={default_icon} alt="link to profile" />
              <div className="d-flex justify-content-center profile-side-title">WELCOME {this.props.user.attributes.first_name}</div>
            </div>
            {menu}
          </div>
        </div>
        <div className=" d-flex justify-content-end profile-top-menu desktop-only">
          <div className="log-out-holder text-logout" onClick={() => this.sign_out_handler()}>
            Logout
          </div>
        </div>
        <div className="d-flex flex-column profile-main-holder">
          <div className="profile-main-container">{this.type_to_view()}</div>
        </div>
      </div>
    );
  };

  render() {
    if (this.state.is_ready) return this.view();
    return null;
  }
}

export default withRouter(
  connect(
    null,
    {
      sign_out,
      update_patient_question_banks,
      update_app_state,
      update_service_line
    }
  )(PatientDashboard)
);

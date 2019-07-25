import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import DashboardContents from './dashboard.contents';
import * as therapist_actions from '../../actions/therapist_action';
import * as global_actions from '../../actions/user_auth_action';

class TherapistDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view_type: 'profile_info',
      user: this.props.user
    };
  }

  // therapist info check in here
  componentDidMount() {
    const user_info = this.props.user.attributes;

    if (user_info.id === null || user_info.therapist === null) {
      this.props.history.push('/therapist/member');
    }
  }

  // don't need to check token in here. will check at entry point
  componentWillReceiveProps = next_props => {
    if (next_props.user.id === null || next_props.user.therapist === null) {
      this.props.history.push('/therapist/member');
    }
    this.setState({ user: next_props.user });
  };

  update_type_handler = type => {
    this.setState({ view_type: type });
  };

  // TODO: update url in router ex) dashboard/message
  type_to_view = () => {
    return <DashboardContents user={this.state.user} type={this.state.view_type} patients_list={null} />;
  };

  redirect_to_refer = () => {
    this.toggleNavState();
    this.props.history.push('/therapist/patient_refer');
  };

  logout_handler = () => {
    this.props.global_actions.reset_state();
    this.props.history.push('/therapist/cover');
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

  render() {
    const type = this.state.view_type;
    const menu_css = 'd-flex nav-menu--item justify-content-center align-items-center profile-side-item';

    const menu = (
      <>
        <div className={type === 'profile_info' ? `${menu_css} item-selected` : menu_css} onClick={() => this.updateType('profile_info')}>
          Profile Information
        </div>
        <div className={type === 'patients_list' ? `${menu_css} item-selected` : menu_css} onClick={() => this.updateType('patients_list')}>
          Patient Lists
        </div>
        <div className={type === 'message' ? `${menu_css} item-selected` : menu_css} onClick={() => this.updateType('message')}>
          Messages
        </div>
        <div className="d-flex justify-content-center confirm-btn-holder">
          <input className="col dashboard-side-btn text-btn" onClick={this.redirect_to_refer} type="button" value="Refer patients" />
        </div>
      </>
    );

    return (
      <div className={cx('d-flex flex-row therapist-noprogress', this.state.showNav ? 'no-scroll' : '')}>
        <div className={cx('d-flex flex-column profile-side-bar-holder', this.state.showNav ? 'visible' : '')}>
          <div className="header">
            <div className="d-flex justify-content-center profile-logo">
              <a href={process.env.REACT_APP_MAIN_PAGE_URL}>
                <img alt="link to main page" className="cerebral-logo" src={`${process.env.PUBLIC_URL}/img/logo.png`} />
              </a>
            </div>
            <div className={cx('nav-opener', this.state.showNav ? 'open' : '')} onClick={this.toggleNavState}>
              <span />
            </div>
          </div>
          <div className={cx('profile-side-items-holder nav-menu', this.state.showNav ? 'visible' : '')}>
            <div className="profile-side-title-holder">
              <div className="d-flex justify-content-center profile-side-title">WELCOME {this.props.user.attributes.first_name}</div>
            </div>
            {menu}
          </div>
        </div>

        <div className=" d-flex justify-content-end profile-top-menu desktop-only">
          <div className="log-out-holder text-logout" onClick={() => this.logout_handler()}>
            Logout
          </div>
        </div>
        <div className="d-flex flex-column profile-main-holder">
          <div className="profile-main-container">{this.type_to_view()}</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    therapist_actions: bindActionCreators(therapist_actions, dispatch),
    global_actions: bindActionCreators(global_actions, dispatch)
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(TherapistDashboard)
);

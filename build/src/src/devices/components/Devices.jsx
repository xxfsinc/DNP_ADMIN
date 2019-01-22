import React from "react";
import status from "status";
import { connect } from "react-redux";
import {
  addDevice,
  removeDevice,
  toggleAdmin,
  toggleGuestUsers,
  resetGuestUsersPassword
} from "../actions";
import { createStructuredSelector } from "reselect";
import * as selector from "../selectors";
import DeviceList from "./DeviceList";
import GuestUsers from "./GuestUsers";
import Loading from "components/Loading";

class DevicesView extends React.Component {
  constructor() {
    super();
    this.state = {
      // Initial states of variables must be defined in the constructor
      deviceName: "",
      deviceId: ""
    };
  }

  handleAddDevice() {
    this.props.addDevice(this.state.deviceName);
  }

  removeDevice(id) {
    this.props.removeDevice(id);
  }

  toggleAdmin(id, isAdmin) {
    this.props.toggleAdmin(id, isAdmin);
  }

  updateDeviceName(e) {
    this.setState({
      deviceName: e.target.value
    });
  }

  updateDeviceId(e) {
    this.setState({
      deviceId: e.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <status.components.DependenciesAlert
          deps={["wamp", "vpn", "externalIP"]}
        />
        <div className="section-title">Devices</div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Device's unique name"
            aria-label="Device's unique name"
            aria-describedby="basic-addon2"
            value={this.state.deviceName}
            onChange={this.updateDeviceName.bind(this)}
            onKeyPress={e => {
              if (e.key === "Enter") this.handleAddDevice.bind(this)();
            }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.handleAddDevice.bind(this)}
            >
              Add device
            </button>
          </div>
        </div>

        {this.props.fetching && this.props.deviceList.length === 0 ? (
          <Loading msg="Loading device list..." />
        ) : (
          <React.Fragment>
            <DeviceList
              deviceList={this.props.deviceList}
              removeDevice={this.removeDevice.bind(this)}
              toggleAdmin={this.toggleAdmin.bind(this)}
            />

            {this.props.deviceList.length ? (
              <GuestUsers
                guestUsersDevice={this.props.guestUsersDevice}
                toggleGuestUsers={this.props.toggleGuestUsers}
                resetGuestUsersPassword={this.props.resetGuestUsersPassword}
              />
            ) : null}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  deviceList: selector.getDevicesWithoutGuest,
  guestUsersDevice: selector.getGuestUsersDevice,
  fetching: selector.getFetching
});

// Uses bindActionCreators to wrap action creators with dispatch
const mapDispatchToProps = {
  // Ensure id contains only alphanumeric characters
  addDevice: id => addDevice(id.replace(/\W/g, "")),
  removeDevice,
  toggleAdmin,
  toggleGuestUsers,
  resetGuestUsersPassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevicesView);

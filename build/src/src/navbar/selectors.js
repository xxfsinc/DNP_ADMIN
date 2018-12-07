// NAVBAR
import { NAME } from "./constants";

// Selectors provide a way to query data from the module state.
// While they are not normally named as such in a Redux project, they
// are always present.

// The first argument of connect is a selector in that it selects
// values out of the state atom, and returns an object representing a
// component’s props.

// I would urge that common selectors by placed in the selectors.js
// file so they can not only be reused within the module, but
// potentially be used by other modules in the application.

// I highly recommend that you check out reselect as it provides a
// way to build composable selectors that are automatically memoized.

// From https://jaysoo.ca/2016/02/28/applying-code-organization-rules-to-concrete-redux-code/

// EXTERNAL

export const chainData = state => state.chainData;

// INTERNAL

const local = state => state[NAME];
export const getDappnodeIdentity = state => {
  const params = Object.assign({}, local(state).dappnodeIdentity || {});
  // Remove keys that contain an undefined value
  Object.keys(params).forEach(key => {
    if (!params[key]) delete params[key]
  })
  // If the static IP is set, don't show the regular IP
  if (params.staticIp && params.ip) delete params.ip

  return params
};

export const getNotifications = state => local(state).notifications

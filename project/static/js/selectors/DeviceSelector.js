import MobileDetect from 'mobile-detect';

const device = new MobileDetect(window.navigator.userAgent);

export const phoneSelector = () => device.phone();

export const mobileSelector = () => device.mobile();

export const tabletSelector = () => device.tablet();

export const userAgentSelector = () => device.userAgent();

export const osSelector = () => device.os();

export const isPhoneSelector = () => Boolean(phoneSelector());

export default {
  phoneSelector,
  mobileSelector,
  tabletSelector,
  userAgentSelector,
  osSelector,
  isPhoneSelector,
};
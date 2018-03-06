import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

// Use module factory instead of Jest's automocking feature
jest.mock('./LocationService', () => ({
  canGetUserLocation: jest.fn(() => true),
  getUserLocation: jest.fn((cb) => cb({}))
}));

jest.mock('./WeatherService');
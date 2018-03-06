import React from 'react';
import {mount} from 'enzyme';
import AppContainer from './AppContainer';
import MapComponent from './MapComponent';
import { getUserLocation, canGetUserLocation } from './LocationService';
import { getWeather } from './WeatherService';

beforeEach(() => {
  getUserLocation.mockReset();
  getWeather.mockReset();
});

it('renders without crashing', () => {
  mount(<AppContainer />);
});

it('gets the location of user if navigator is available', () => {
  canGetUserLocation.mockImplementationOnce(() => true);
  mount(<AppContainer />);
  expect(getUserLocation).toHaveBeenCalled();
});

it('does not get the location of user if navigator is not available', () => {
  canGetUserLocation.mockImplementationOnce(() => false);
  mount(<AppContainer />);
  expect(getUserLocation).not.toHaveBeenCalled();
});

it('should call getWeather if cannot get location of user', () => {
  canGetUserLocation.mockImplementationOnce(() => false);
  let component = mount(<AppContainer />);
  expect(getWeather).toBeCalled()
})

it('should call getWeather on map click', () => {
  canGetUserLocation.mockImplementationOnce(() => false);
  let component = mount(<AppContainer />);
  let map = component.find(MapComponent);
  map.simulate('click')
  expect(getWeather).toBeCalled();
})




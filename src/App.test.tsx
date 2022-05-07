import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from './App';
import axios, { AxiosResponse } from 'axios';
import { GeoCoordinates } from './types/GeoCoordinates';
import * as hooks from './hooks/useGeoLocation';
import { GeoLocationResult } from './hooks/useGeoLocation';

const mockedAxios = axios as jest.Mocked<typeof axios>;

const DEFAULT_POSITION: GeoCoordinates = {
  lat: 51.5,
  lng: -0.12,
};

async function renderApp() {
  render(<App defaultPosition={DEFAULT_POSITION} />);
  // Wait for page to finish rendering
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/Fetching weather.../i),
  );
}

describe('App', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue(mockedWeatherResponse);
    jest.clearAllMocks();
  });

  test('renders titles', async () => {
    await renderApp();

    expect(screen.getByText('Wish you were here')).toBeInTheDocument();
    expect(screen.getByText('Where would you like to go?')).toBeInTheDocument();
  });

  test('calls api with the location of user if navigator is available', async () => {
    const mockGeoLocationResult: GeoLocationResult = {
      latitude: 1,
      longitude: 2,
      isComplete: true,
    };

    jest
      .spyOn(hooks, 'useGeoLocation')
      .mockImplementation(() => mockGeoLocationResult);

    await renderApp();

    expect(hooks.useGeoLocation).toHaveBeenCalled();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      `/.netlify/functions/weather-service?lat=${mockGeoLocationResult.latitude}&lng=${mockGeoLocationResult.longitude}`,
    );
  });

  test('uses default location if navigator is not available', async () => {
    const mockGeoLocationResult: GeoLocationResult = {
      isComplete: true,
    };

    jest
      .spyOn(hooks, 'useGeoLocation')
      .mockImplementation(() => mockGeoLocationResult);

    await renderApp();

    expect(hooks.useGeoLocation).toHaveBeenCalled();
    expect(mockedAxios.get).toBeCalledWith(
      `/.netlify/functions/weather-service?lat=${DEFAULT_POSITION.lat}&lng=${DEFAULT_POSITION.lng}`,
    );
  });

  test('renders weather details', async () => {
    const mockGeoLocationResult: GeoLocationResult = {
      latitude: 1,
      longitude: 2,
      isComplete: true,
    };

    jest
      .spyOn(hooks, 'useGeoLocation')
      .mockImplementation(() => mockGeoLocationResult);

    await renderApp();

    expect(screen.queryByText(/Weather in London/)).toBeInTheDocument();
    expect(screen.queryByText(/14℃/)).toBeInTheDocument();
  });

  test('renders loading message when locating', async () => {
    const mockGeoLocationResult: GeoLocationResult = {
      isComplete: false,
    };

    jest
      .spyOn(hooks, 'useGeoLocation')
      .mockImplementation(() => mockGeoLocationResult);

      render(<App defaultPosition={DEFAULT_POSITION} />);

    expect(screen.queryByText(/Finding your location/)).toBeInTheDocument();
  });
});

const mockedWeatherResponse: AxiosResponse = {
  data: {
    coord: {
      lon: DEFAULT_POSITION.lng,
      lat: DEFAULT_POSITION.lat,
    },
    name: 'London',
    main: {
      temp: 14.0,
      feels_like: 12.02,
      temp_min: 10.99,
      temp_max: 14.72,
      pressure: 1023,
      humidity: 79,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    sys: {
      type: 2,
      id: 268730,
      country: 'GB',
      sunrise: 1651552130,
      sunset: 1651605947,
    },
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

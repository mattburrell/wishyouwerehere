import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from './App';
import axios, { AxiosResponse } from 'axios';
import { GeoCoordinates } from './types/GeoCoordinates';
import { geoLocationEnabled, getUserLocation } from './utils/location';

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
    //@ts-ignore
    geoLocationEnabled.mockReset();
    //@ts-ignore
    getUserLocation.mockReset();
  });

  test('renders titles', async () => {
    await renderApp();

    expect(screen.getByText('Wish you were here')).toBeInTheDocument();
    expect(screen.getByText('Where would you like to go?')).toBeInTheDocument();
  });

  test('calls api with the location of user if navigator is available', async () => {
    const lat = 1;
    const lng = 2;
    //@ts-ignore
    geoLocationEnabled.mockImplementationOnce(() => true);
    //@ts-ignore
    getUserLocation.mockImplementationOnce((sb, eb) =>
      sb({
        coords: {
          latitude: lat,
          longitude: lng,
        },
      }),
    );

    await renderApp();

    expect(getUserLocation).toHaveBeenCalled();
    expect(mockedAxios.get).toBeCalledTimes(1);
    expect(mockedAxios.get).toBeCalledWith(
      `/.netlify/functions/weather-service?lat=${lat}&lng=${lng}`,
    );
  });

  test('uses default location if navigator is not available', async () => {
    //@ts-ignore
    geoLocationEnabled.mockImplementationOnce(() => false);

    await renderApp();

    expect(getUserLocation).not.toHaveBeenCalled();
    expect(mockedAxios.get).toBeCalledWith(
      `/.netlify/functions/weather-service?lat=${DEFAULT_POSITION.lat}&lng=${DEFAULT_POSITION.lng}`,
    );
  });

  test('renders weather details', async () => {
    await renderApp();
    expect(await screen.findByText('Weather in London')).toBeInTheDocument();
    expect(await screen.findByText('14℃')).toBeInTheDocument();
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

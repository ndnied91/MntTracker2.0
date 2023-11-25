export const getWeather = async (name) => {
  let zipcode = '';
  switch (name) {
    case 'huntermtn':
      zipcode = '12442 US';
      break;
    case 'mountsnow':
      zipcode = '05356 US';
      break;
    case 'northstarcalifornia':
      zipcode = '96161 US';
      break;
    case 'kirkwood':
      zipcode = '95646 US';
      break;
    case 'parkcitymountain':
      zipcode = '84060 US';
      break;
    case 'keystoneresort':
      zipcode = '80435 US';
      break;
    case 'breckenridge':
      zipcode = '80424 US';
      break;
    case 'heavenly':
      zipcode = '96150 US';
      break;
    case 'okemo':
      zipcode = '05149 US';
      break;
    case 'stowe':
      zipcode = '05672 US';
      break;
    case 'libertymountainresort':
      zipcode = '17320 US';
      break;

    default:
      zipcode = '07067 US';
  }

  const options = { method: 'GET', headers: { accept: 'application/json' } };

  return fetch(
    `https://api.tomorrow.io/v4/weather/forecast?location=${zipcode}&timesteps=1d&units=imperial&apikey=${process.env.TOMORROW_API}`,
    options
  )
    .then(async (response) => {
      const res = await response.json();
      const daily = res.timelines.daily;
      let weather = [];
      daily.map((i) => {
        let obj = {
          date: new Date(i.time).toLocaleDateString('en-US'),
          tempAvg: i.values.temperatureAvg,
          conditions: i.values.weatherCodeMax,
          low: i.values.temperatureMin,
          high: i.values.temperatureMax,
        };
        weather.push(obj);
      });
      return weather;
    })
    .catch((err) => {
      console.error(err);
    });
};

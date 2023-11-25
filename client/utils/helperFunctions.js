export const renderImage = (code) => {
  let imgIcon = '';

  switch (true) {
    case (code) => 5000 && code <= 5102:
      imgIcon = 'heavySnow';
      break;
    case code === 1000:
      imgIcon = 'sunny';
      break;
    case code === 1001:
      imgIcon = 'cloudy';
      break;
    case code === 1100:
      imgIcon = 'mostlyClear';
      break;
    case code === 1101:
      imgIcon = 'partlyCloudy';
      break;
    case code === 1102:
      imgIcon = 'mostlyCloudy';
      break;
    case code === 2000:
      imgIcon = 'fog';
      break;

    case code === 2100:
      imgIcon = 'lightFog';
      break;
    case code === 4000:
      imgIcon = 'drizzle';
      break;

    case code === 4200:
      imgIcon = 'lightRain';
      break;

    default:
      imgIcon = null;
  }
  if (imgIcon === null) {
    console.log(code);
  }

  return imgIcon;
};

export const formatDate = (i) => {
  let date = new Date(i);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  return `${month}/${day} `;
};

export const formatDateTime = (time) => {
  const date = formatDate(time);
  time = new Date(time);
  return `${date} @ ${time.toLocaleTimeString()}`;
};

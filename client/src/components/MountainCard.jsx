import { TbAerialLift } from 'react-icons/tb';
import { GiTrail } from 'react-icons/gi';
import { HiExternalLink } from 'react-icons/hi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import {
  renderImage,
  formatDate,
  formatDateTime,
} from '../../utils/helperFunctions';
import { useGlobalContext } from '../context';

const MountainCard = ({
  _id,
  trailsOpen,
  liftsOpen,
  formattedName,
  updatedAt,
  report,
  forecast,
}) => {
  const { userContext, updateFavorite, removeFavorite, favorites } =
    useGlobalContext();

  const addToFavorites = () => {
    updateFavorite({
      _id,
      trailsOpen,
      liftsOpen,
      formattedName,
      updatedAt,
      report,
      forecast,
    });
  };

  const removeFromFavorites = (_id) => {
    removeFavorite(_id);
  };

  const renderIcon = () => {
    if (favorites.some((e) => e._id === _id)) {
      return (
        <AiFillStar
          style={{ fontSize: '30px', color: 'grey' }}
          onClick={() => removeFromFavorites(_id)}
        />
      );
    }

    return (
      <AiOutlineStar
        style={{ fontSize: '30px', color: 'grey' }}
        onClick={() => addToFavorites(formattedName)}
      />
    );
  };

  const renderWeather = () => {
    let currentData = new Date().toLocaleDateString('en-US');
    const newData = [];
    forecast.map((i, index) => {
      if (i.date === currentData) {
        return newData.push(...[...forecast.slice(index, index + 3)]);
      }
    });
    return newData.map(({ date, high, low, tempAvg, conditions }, index) => {
      return (
        <div className="text-center justify-self-center" key={index}>
          {formatDate(date)}

          <img
            src={`/${renderImage(conditions)}.png`}
            alt={renderImage(conditions)}
          />
          <div>
            <div className="text-sm mt-2"> {tempAvg}°</div>
            <span className="text-xs pr-2">H:{Math.round(high)}°</span>
            <span className="text-xs">L:{Math.round(low)}°</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="card w-96 h-72 bg-slate-100 shadow-xl m-5 p-4 rounded-md hover:shadow-2xl hover:scale-101 transition duration-300 ">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg capitalize ">
            <div className="flex items-center">
              {userContext ? <div> {renderIcon()}</div> : null}
              {formattedName.toUpperCase() === 'LIBERTYMOUNTAIN'
                ? 'LIBERTYMNT'
                : formattedName.toUpperCase()}
            </div>
          </h1>
          <div className="flex items-center">
            <span className="text-xs text-slate-500">
              Updated:
              {formatDateTime(updatedAt)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-around pt-3 pb-3 ">
          <span className="flex items-center text-xl">
            {' '}
            <GiTrail className="mr-2 text-2xl" />{' '}
            <span className="text-gray-600 text-base">{trailsOpen}</span>
          </span>

          <span className="flex items-center text-xl">
            <TbAerialLift className="mr-2 text-3xl" />
            <span className="text-gray-600 text-base">{liftsOpen}</span>
          </span>
        </div>

        <div className="grid grid-flow-col "> {renderWeather()}</div>
      </div>
      <div className="text-center pt-2 flex justify-around items-center">
        <a
          target="_blank"
          rel="noopener"
          href={report}
          className="flex items-center text-gray-600"
        >
          Get Mountain Report <HiExternalLink className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default MountainCard;

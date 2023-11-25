import MountainCard from './MountainCard';

const MountainLayout = ({ mountains }) => {
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {mountains.map((item, index) => {
          return <MountainCard key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

export default MountainLayout;

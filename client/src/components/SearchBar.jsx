const SearchBar = ({ setSearchItems }) => {
  return (
    <div className=" m-auto text-center bg-slate-200 h-20 lg:h-24 flex items-center lg:w-2/5 justify-center rounded-sm shadow-xl  md:mt-0 mb-5 md:mb-10">
      <input
        placeholder="search"
        type="search"
        className="md:w-full w-80 md:ml-24 md:mr-24 md:h-12 p-4 rounded-sm bg-slate-100 border border-solid border-slate-400"
        onChange={(e) => setSearchItems(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

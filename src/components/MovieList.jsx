const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      {props?.movies?.map((movie) => (
        <div className="movie" key={movie.imdbID}>
          <div className="image-container">
            <img src={movie.Poster} alt="movie" />
          </div>
          <div
            onClick={() => props.handleFavouriteClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;

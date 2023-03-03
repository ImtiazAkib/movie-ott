import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList";
import TextLinkExample from "./components/Navbar";
import MovieListHeading from "./components/MovieListHeading";
import AddFavourite from "./components/AddFavourite";
import RemoveFavourites from "./components/RemoveFavourite";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=71f5da`)
      .then((req) => req.json())
      .then((res) => {
        if (!isCancelled) {
          res.Response === "False"
            ? setMovies([
                {
                  Title: "The Avengers",
                  Year: "2012",
                  imdbID: "tt0848228",
                  Type: "movie",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
                },
                {
                  Title: "Avengers: Endgame",
                  Year: "2019",
                  imdbID: "tt4154796",
                  Type: "movie",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
                },
                {
                  Title: "Avengers: Infinity War",
                  Year: "2018",
                  imdbID: "tt4154756",
                  Type: "movie",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
                },
                {
                  Title: "Avengers: Age of Ultron",
                  Year: "2015",
                  imdbID: "tt2395427",
                  Type: "movie",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
                },
                {
                  Title: "The Avengers",
                  Year: "1998",
                  imdbID: "tt0118661",
                  Type: "movie",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
                },
                {
                  Title: "The Avengers: Earth's Mightiest Heroes",
                  Year: "2010–2012",
                  imdbID: "tt1626038",
                  Type: "series",
                  Poster:
                    "https://m.media-amazon.com/images/M/MV5BYzA4ZjVhYzctZmI0NC00ZmIxLWFmYTgtOGIxMDYxODhmMGQ2XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg",
                },
              ])
            : setMovies(res.Search);
        }
      });
    // console.count("fetch url done");
    return () => {
      // console.count("cancelled done");
      isCancelled = true;
    };
  }, [searchValue]);

  useEffect(() => {
    handleFavouriteMovies();
  }, [favourites.length]);

  const handleFavouriteMovies = () => {
    let movies = localStorage.getItem("FavouriteMovies");
    setFavourites(JSON.parse(movies));
  };

  const handleLocalStorage = (items) => {
    localStorage.setItem("FavouriteMovies", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const myFavoutiteMovies = [...favourites, movie];
    setFavourites(myFavoutiteMovies);
    handleLocalStorage(myFavoutiteMovies);
  };
  const removeFavouriteMovie = (removeMovie) => {
    const filteredMovies = favourites.filter(
      (movie) => movie.imdbID !== removeMovie.imdbID
    );
    const myFavoutiteMovies = filteredMovies;
    handleLocalStorage(myFavoutiteMovies);
    setFavourites(myFavoutiteMovies);
  };

  return (
    <div className="container-fluid movie-container">
      <TextLinkExample search={setSearchValue} />
      <div className="d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
      </div>
      <div className="movies">
        <MovieList
          movies={movies}
          handleFavouriteClick={addFavouriteMovie}
          favouriteComponent={AddFavourite}
        />
      </div>
      <div className="d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="movies">
        <MovieList
          movies={favourites}
          handleFavouriteClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;

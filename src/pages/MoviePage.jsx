/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import "../styles/movie.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function MoviePage() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    getData();
    setName("");
    setYear("");
  };

  const getData = () => {
    axios
      .get(`http://www.omdbapi.com/?s=${name}&y=${year}&apikey=cac83bd1`)
      .then((res) => setData(res.data.Search));
  };

  return (
    <div className="moviePage">
      <div className="movieContainer">
        <h1>Search Movie</h1>

        <form onSubmit={submitForm}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Movie Name"
            onChange={(e) => setName(e.target.value.toLowerCase())}
          />{" "}
          <br />
          <input
            type="text"
            name="year"
            id="year"
            placeholder="Movie Year"
            onChange={(e) => setYear(e.target.value)}
          />{" "}
          <br />
          <button className="searchButton">Search</button>
        </form>

        <div className="movies">
          <Box sx={{ flexGrow: 1, padding: "40px" }}>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{ marginTop: 30 }}
            >
              {data &&
                data.map((q, key) => (
                  <Grid item xs={2} key={key}>
                    <Card sx={{ height: "100%" }}>
                      <div>
                        <CardMedia
                          component="img"
                          image={q.Poster}
                          alt={q.Title}
                          sx={{ height: 400 }}
                        />
                        <CardContent sx={{ padding: "10px" }}>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{
                              textTransform: "uppercase",
                              textAlign: "center",
                              fontWeight: 500,
                              fontFamily: "inherit",
                            }}
                          >
                            {q.Title}
                          </Typography>
                        </CardContent>
                        <CardContent sx={{ padding: 0 }}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                              fontWeight: 700,
                              textAlign: "center",
                              margin: "0px",
                              fontFamily: "inherit",
                            }}
                          >
                            {q.Year}
                          </Typography>
                        </CardContent>
                      </div>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;

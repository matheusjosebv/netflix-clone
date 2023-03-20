import React from "react";
import css from "./FeaturedMovie.module.scss";

export default function FeaturedMovie({ item }) {
  let firstDate = new Date(item.first_air_date);
  let genres = [];
  for (let i in item.genres) {
    genres.push(item.genres[i].name);
  }

  let description = item.overview;
  if (description.length > 200) {
    description = description.substring(0, 200) + "...";
  }
  return (
    <section
      className={css.Featured}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className={css.vertical}>
        <div className={css.horizontal}>
          <div className={css.name}>{item.original_name}</div>
          <div className={css.info}>
            <div className={css.points}>{item.vote_average} pontos</div>
            <div className={css.year}>{firstDate.getFullYear()}</div>
            <div className={css.seasons}>
              {item.number_of_seasons} temporada
              {item.number_of_seasons !== 1 ? "s" : ""}
            </div>
          </div>
          <div className={css.description}>{description}</div>
          <div className={css.buttons}>
            <a href={`/watch/${item.id}`} className={css.watchbutton}>
              ► Assistir
            </a>
            <a href={`/list/add/${item.id}`} className={css.mylistbutton}>
              + Minha Lista
            </a>
          </div>
          <div className={css.genres}>
            <strong>Gêneros:</strong> {genres.join(", ")}
          </div>
        </div>
      </div>
    </section>
  );
}

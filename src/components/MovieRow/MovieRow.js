import React, { useEffect, useState } from "react";
import css from "./MovieRow.module.scss";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

export default function MovieRow({ title, items }) {
  const [scrollX, setScrollX] = useState(0);

  const [maxX, setMaxX] = useState(Infinity);

  useEffect(() => {
    const update = () => {
      setMaxX(items.results.length * -150 + window.innerWidth - 80);
    };
    update();
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, [items]);

  function handleLeftArrow() {
    let x = scrollX + 300;
    setScrollX(x > 0 ? 0 : x);
  }

  function handleRightArrow() {
    let x = scrollX - 300;
    setScrollX(x <= maxX ? maxX : x);
  }

  return (
    <div className={css.MovieRow}>
      <h2>{title}</h2>
      <div
        className={css.left}
        onClick={handleLeftArrow}
        style={{
          visibility: scrollX >= 0 ? "hidden" : "visible",
          opacity: scrollX >= 0 ? 0 : 1,
        }}
      >
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div
        className={css.right}
        onClick={handleRightArrow}
        style={{
          visibility: scrollX <= maxX ? "hidden" : "visible",
          opacity: scrollX <= maxX ? 0 : 1,
        }}
      >
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className={css.listarea}>
        <div
          className={css.list}
          style={{
            marginLeft: scrollX,
            width: items.results.length * 150,
          }}
        >
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div key={key} className={css.item}>
                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

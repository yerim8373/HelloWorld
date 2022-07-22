import { useState } from "react";
import classes from "./LoadingSpinner.module.css";

const LodingSpinner = (props) => {
  const [count, setCount] = useState(props.viewCount);

  if (props.viewCount) {
    const num = setTimeout(() => setCount(count - 1), 1000);

    if (count <= 0) clearTimeout(num);
  }

  return (
    <>
      <div className={classes.loading_spinner}></div>
      {props.viewCount && count > 0 && (
        <div className={classes.loading_spinner_count}>{count}</div>
      )}
    </>
  );
};

export default LodingSpinner;

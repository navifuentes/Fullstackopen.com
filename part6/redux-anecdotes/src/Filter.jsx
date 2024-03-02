import { useDispatch } from "react-redux";
import filterReducer, { filterChange } from "./reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch({ type: "filter/filterChange", payload: e.target.value });
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;

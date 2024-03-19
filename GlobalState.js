
import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  mode: 'white',
  fontColor: 'white',
  backGroundColor:"#E5E7EB",
};

const { setGlobalState, useGlobalState } = createGlobalState(initialState);

export { useGlobalState, setGlobalState };




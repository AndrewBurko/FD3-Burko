import { ref, child, get } from "firebase/database";

import { updateLoadState, updateData } from "./winesSlice";
import database from "../firebase-config";

export async function winesLoad(dispatch) {

  dispatch(updateLoadState( {state: 1, error: null} ));
  const dbRef = ref(database);

  get(child(dbRef, "wines/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        dispatch(updateLoadState( {state: 2, error: null} ));
        dispatch(updateData(snapshot.val()));
      } else {
        dispatch(updateLoadState( {state: 3, error: "No data"} ));
        console.error("No data");
      }
    })
    .catch((err) => {
      dispatch(updateLoadState( {state: 3, error: err.message} ));
      console.error(err);
    }
    )
};
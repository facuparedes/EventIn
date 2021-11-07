import event from "../../../api/firebase/models/event";
import { where } from "firebase/firestore";

export const GET_EVENTS = "GET_EVENTS";
export const GET_DETAILS = "GET_DETAILS";
export const GET_EVENTS_BY_TITLE = "GET_EVENTS_BY_TITLE";
export const GET_EVENTS_CATEGORY = "GET_EVENTS_CATEGORY";
export const IS_LOGGED = "IS_LOGGED";
export const GET_EVENTS_DATE = "GET_EVENTS_DATE";

export const getEvents = () => {
  return async function (dispatch) {
    let result = await event.findAll();

    return dispatch({
      type: GET_EVENTS,
      payload: result,
    });
  };
};

export const getEventsByCategory = (category) => {
  return async function (dispatch) {
    var resultCat = [];
    resultCat = await event.find(where("category", "==", category) /* .orderBy('date','asc') */);
    if (resultCat.length > 0) {
      console.log("PROP start FIREBASE", resultCat[0].start);
      return dispatch({
        type: GET_EVENTS_CATEGORY,
        payload: resultCat,
      });
    } else alert("No hay eventos en esa Categoría");
  };
};

export const getEventsByDate = (date) => {
  var filterDate= [];
  return async function (dispatch) {
    let resultDate = await event.findAll();
    filterDate = resultDate.filter((d) => d.start.toLocaleDateString() === date.toLocaleDateString());
    if(filterDate.length>0){
      return dispatch({
        type: GET_EVENTS_DATE,
        payload: filterDate,
      });
    }else alert("no hay eventos en esa fecha");
  };
};

export const getEventsByName = (title) => {
  return async function (dispatch) {
    let result = await event.find(where("title", "==", title));
    return dispatch({
      type: GET_EVENTS_BY_TITLE,
      payload: result,
    });
  };
};

export const getDetails = (id) => {
  return {
    type: GET_DETAILS,
    payload: id,
  };
};

export const changeIsLogged = (id) => {
  return {
    type: IS_LOGGED,
    payload: id,
  };
};

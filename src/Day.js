import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as firebase from "firebase";
import config from "./config";
import { createPortal } from "react-dom";

export default function Day(props) {
  const dispatch = useDispatch();
  const array = useSelector(state => state.array);
  //const [array, setArray] = useState();
  const [firstDay, setFirstDay] = useState();
  const [lastDay, setLastDay] = useState();
  const [nextDay, setNextDay] = useState("");
  const [previousDay, setPreviousDay] = useState("");
  const [arrayMarked, setArrayMarked] = useState();
  const [endCombo, setEndCombo] = useState(false);
  const [startCombo, setStartCombo] = useState(false);
  const [sort, setSort] = useState();
  const selected = useSelector(state => state.selected);
  const selectedArray = useSelector(state => state.selectedArray);
  const uid = useSelector(state => state.uid);

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const aujourdhui = new Date();
  const jour = aujourdhui.getUTCDate();
  const mois = aujourdhui.getUTCMonth();

  const months = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre"
  ];

  const dateRef = firebase
    .database()
    .ref()
    .child("Users/" + uid + "/projects/");

  useEffect(() => {
    dateRef.on("value", snapshot => {
      //setData(snapshot.val());
      getDaysMarked(snapshot.val());
    });
  }, [selectedArray]);

  const getDaysMarked = data => {
    const bdd = Object.entries(data);
    const bddByProject = bdd.filter(item => item[1].id === selectedArray.id);
    const daysByProject = bddByProject.map(item => item[1]);
    const getProject = daysByProject[0];
    const refArray = getProject.doneDays;

    const setArray = Object.values(refArray).map(item => item.id);

    const sorting = Object.values(refArray).filter(
      item => item.name === props.month
    );
    setSort(sorting);
    const setFirst = sorting.sort(function(a, b) {
      return a.jour - b.jour;
    });

    setArrayMarked(setArray);

    if (sort != null && setArray > 1) {
      setFirstDay(sorting[0].id);
      setLastDay(sorting[sorting.length - 1].id);
    }

    if (setArray.indexOf(nextDay) === -1) {
      setEndCombo(true);
    } else {
      setEndCombo(false);
    }
    if (setArray.indexOf(previousDay) === -1) {
      setStartCombo(true);
    } else {
      setStartCombo(false);
    }
    console.log(lastDay);
  };

  const isMarked = (id, month, task) => {
    const idDay = (id + month).toString();

    if (arrayMarked.indexOf(props.value) === -1) {
      const projectRef = firebase
        .database()
        .ref(
          "Users/" +
            uid +
            "/projects/" +
            selectedArray.id +
            "/doneDays/" +
            idDay
        )
        .set({ id: idDay, jour: id, name: month, project: selectedArray.id });
    } else if (arrayMarked.length > 1) {
      const DayRef = firebase
        .database()
        .ref()
        .child("Users/" + uid + "/projects/" + selected + "/doneDays/" + idDay);
      DayRef.remove();
    }
  };
  /*
  useLayoutEffect(() => {
    if (props.id < 10) {
      const next = (parseInt(props.number) + 1 + props.month).toString();
      const previous = (parseInt(props.number) - 1 + props.month).toString();
      const zero = "0";
      const concatnext = (zero + next).toString();
      const concatprev = (zero + previous).toString();
      setNextDay(concatnext);
      setPreviousDay(concatprev);
    }
    if (props.id === 9) {
      const next = (parseInt(props.number) + 1 + props.month).toString();
      const previous = (parseInt(props.number) - 1 + props.month).toString();
      const concatnext = next.toString();
      const concatprev = previous.toString();
      setNextDay(concatnext);
      setPreviousDay(concatprev);
    }
    if (props.id === 10) {
      const next = (parseInt(props.number) + 1 + props.month).toString();
      const previous = (parseInt(props.number) - 1 + props.month).toString();
      const concatnext = next.toString();
      const concatprev = previous.toString();
      setNextDay(concatnext);
      setPreviousDay(concatprev);
    } else {
      const next = (parseInt(props.number) + 1 + props.month).toString();
      const previous = (parseInt(props.number) - 1 + props.month).toString();
      setNextDay(next);
      setPreviousDay(previous);
    }
  }, [arrayMarked]);
*/
  return (
    <div className="day" onClick={() => isMarked(props.id, props.month)}>
      {props.id + props.month === jour + months[mois]
        ? props.number + " Today"
        : props.number}

      {arrayMarked ? (
        arrayMarked.indexOf(props.value) > -1 ? (
          <div
            style={{ backgroundColor: props.color }}
            className={
              arrayMarked.length === 1 ||
              (startCombo === true && endCombo === true)
                ? "Calendar_Marker onlyOne"
                : firstDay === props.value || startCombo === true
                ? "Calendar_Marker firstDay"
                : lastDay === props.value || endCombo === true
                ? "Calendar_Marker lastDay"
                : "Calendar_Marker"
            }
          >
            {" "}
          </div>
        ) : null
      ) : null}
    </div>
  );
}

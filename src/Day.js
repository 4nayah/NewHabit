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
  const [arrayMarked, setArrayMarked] = useState();
  const [endCombo, setEndCombo] = useState(false);
  const [startCombo, setStartCombo] = useState(false);
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

  useLayoutEffect(() => {
    dateRef.on("value", snapshot => {
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
    const setFirst = sorting.sort(function(a, b) {
      return a.jour - b.jour;
    });

    const arrayModif = setArray.filter(item => item !== "0Juillet");

    //console.log(setArray);
    console.log(setArray);

    setArrayMarked(setArray);

    if (sorting.length > 1 && firstDay !== sorting[0].id) {
      setFirstDay(sorting[0].id);
      setLastDay(sorting[sorting.length - 1].id);
    }

    const endLine = (props.id + 1 + props.month).toString();
    const startLine = (props.id - 1 + props.month).toString();
    const findNext = setArray.indexOf(endLine);
    const findPrev = setArray.indexOf(startLine);
    setEndCombo(findNext);
    setStartCombo(findPrev);
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
              startCombo === -1 && endCombo === -1
                ? "Calendar_Marker onlyOne"
                : firstDay === (props.id + props.month).toString() ||
                  startCombo === -1
                ? "Calendar_Marker firstDay"
                : lastDay === (props.id + props.month).toString() ||
                  endCombo === -1
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

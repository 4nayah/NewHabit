import React, { useState, useEffect, useLayoutEffect } from "react";
import ListApp from "./ListApp";
import Calendar from "./Calendar";
import { useSelector, useDispatch } from "react-redux";
import Intro from "./Intro";
import NavBar from "./NavBar";
import * as firebase from "firebase";
import config from "./config";

export default function Main() {
  const [habit, setHabit] = useState("");
  const [color, setColor] = useState("");
  const [list, setList] = useState([]);
  const [project, setProject] = useState([]);
  const dispatch = useDispatch();
  const array2 = useSelector(state => state.array2);
  const selectedArray = useSelector(state => state.selectedArray);
  const uid = useSelector(state => state.uid);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const rootRef = firebase
    .database()
    .ref()
    .child("Users/" + uid);

  const dateRef = firebase
    .database()
    .ref()
    .child("Users/" + uid + "/projects/" + selectedArray.id);

  /*


  useEffect(() => {
    dateRef.on("value", snapshot => {
      //setData(snapshot.val());

      if (snapshot.val()) {
        const truc = Object.entries(snapshot.val());
        const arrayTruc = truc.map(item => item[1]);
        const mappedTruc = arrayTruc[1];
        const tri = Object.entries(mappedTruc);
        const mapping = tri.map(item => item[1]);
        const arrayMap = mapping.map(item => item);
        setData(arrayMap);
      }
    });
  });
*/

  useEffect(() => {
    rootRef.on("value", snapshot => {
      if (Object.keys(snapshot.val().projects).length > 0) {
        const truc = Object.entries(snapshot.val().projects);
        const arrayTruc = truc.map(item => item);
        setProject(arrayTruc);
      }

      /*
      dateRef.on("value", snapshot => {
        //setData(snapshot.val());

        if (snapshot.val()) {
          const truc = Object.entries(snapshot.val());
          const arrayTruc = truc.map(item => item[1]);
          const mappedTruc = arrayTruc[1];
          const tri = Object.entries(mappedTruc);
          const mapping = tri.map(item => item[1]);
          const arrayMap = mapping.map(item => item);
          setData(arrayMap);
          console.log(arrayMap);
        }
      });*/
    });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const id = new Date().getTime();
    setList([...list, { id: id, task: habit, color: color }]);
    /*
    dispatch({
      type: "CREATE_TASK",
      payload: { id: id, project: habit, color: color }
    });*/
    setHabit("");

    firebase
      .database()
      .ref("Users/" + uid + "/projects/" + id)
      .set({
        project_name: habit,
        color: color,
        doneDays: {
          Day: {
            id: "01Day",
            jour: "jourDeLaSemaine",
            name: "moisDelAnnée",
            project: id
          }
        },
        id: id
      });
  };
  /**/
  const deleteTask = id => {
    const projectRef = firebase
      .database()
      .ref()
      .child("Users/" + uid + "/projects/" + id);
    projectRef.remove();
  };

  const changeTask = task => {
    const getProject = project.filter(item => item[1].id === task);
    dispatch({
      type: "SELECT_TASK",
      payload: getProject[0][1]
    });
    setSelected(getProject[0][1]);
  };

  const showCalendar = id => {
    return <Calendar Cuid={id} />;
  };

  return (
    <div className="main_container">
      <NavBar />
      <Intro />
      <h1>Creez votre nouvelle habitude</h1>
      <form onSubmit={handleSubmit} className="form_container">
        <input
          type="text"
          onChange={e => setHabit(e.target.value)}
          placeholder="Une nouvelle habitude ?"
          value={habit}
          name="element"
        />

        <select name="color" onChange={e => setColor(e.target.value)}>
          <option value="">--Select a color--</option>
          <option value="#5FAD56" style={{ color: "#5FAD56" }}>
            &#xf04d; Limegreen
          </option>
          <option value="#F2C14E" style={{ color: "#F2C14E" }}>
            &#xf04d; Yellow
          </option>
          <option value="#F78154" style={{ color: "#F78154" }}>
            &#xf04d; Orange
          </option>
          <option value="#4D9078" style={{ color: "#4D9078" }}>
            &#xf04d; Dark Green
          </option>
          <option value="#B4436C" style={{ color: "#B4436C" }}>
            &#xf04d; Purple
          </option>
          <option value="#EB5160" style={{ color: "#EB5160" }}>
            &#xf04d; Red
          </option>
        </select>
        {habit.length > 1 ? (
          <button type="submit">Submit</button>
        ) : (
          <button type="submit" disabled>
            Non
          </button>
        )}
      </form>
      <ul>
        {project.length > 0
          ? project.map(item => (
              <ListApp
                key={item[1].id}
                id={item[1].id}
                task={item[1].project_name}
                delete={() => deleteTask(item[1].id)}
                changeTask={() => changeTask(item[1].id)}
                show={() => showCalendar(item[1].id)}
              />
            ))
          : null}
      </ul>
      {selected.id != null ? <Calendar /> : null}
    </div>
  );
}

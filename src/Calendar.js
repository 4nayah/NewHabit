import React, { useState, Fragment, useEffect } from "react";
import Day from "./Day";
import { useSelector, useDispatch } from "react-redux";

export default function Calendar() {
  const [thisMonth, setThisMonth] = useState([]);
  const [Goffset, setGOffset] = useState([]);
  const selected = useSelector(state => state.selected);
  const selectedArray = useSelector(state => state.selectedArray);
  const [index, setIndex] = useState({});
  const array = useSelector(state => state.array);
  const dispatch = useDispatch();
  const aujourdhui = new Date();
  const jour = aujourdhui.getUTCDate();
  const mois = aujourdhui.getUTCMonth();
  const arrayMarked = array.map(item => item.id);
  const days = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
  ];

  // 0 = lundi
  // 1 = mardi
  // 2 = mercredi
  // 3 = jeudi
  // 4 = vendredi
  // 5 = samedi
  // 6 = dimanche

  const months = [
    { value: "Janvier", days: "31", offset: 2 },
    { value: "Fevrier", days: "29", offset: 5 },
    { value: "Mars", days: "31", offset: 6 },
    { value: "Avril", days: "30", offset: 2 },
    { value: "Mai", days: "31", offset: 4 },
    { value: "Juin", days: "30", offset: 0 },
    { value: "Juillet", days: "31", offset: 2 },
    { value: "Aout", days: "31", offset: 5 },
    { value: "Septembre", days: "30", offset: 1 },
    { value: "Octobre", days: "31", offset: 3 },
    { value: "Novembre", days: "30", offset: 6 },
    { value: "Decembre", days: "31", offset: 1 }
  ];

  const getDays = month => {
    const getMonth = months.filter(mois => mois.value === month);
    setIndex({
      value: getMonth[0].value,
      days: getMonth[0].days,
      offset: getMonth[0].offset
    });
    const filter = days.filter(item => item < getMonth[0].days + 1);
    const filterOffset = days.filter(item => item < getMonth[0].offset + 1);
    setThisMonth(filter);
    setGOffset(filterOffset);
  };

  useEffect(() => {
    if (!index.value) {
      const getMonth = months.filter(
        moits => moits.value === months[mois].value
      );
      setIndex({
        value: getMonth[0].value,
        days: getMonth[0].days,
        offset: getMonth[0].offset
      });
      const filter = days.filter(item => item < getMonth[0].days + 1);
      const filterOffset = days.filter(item => item < getMonth[0].offset + 1);
      setThisMonth(filter);
      setGOffset(filterOffset);
    }
  });

  const from = array.filter(item => item.project === selectedArray.id);

  return (
    <div className="Main_Calendar">
      <p>
        Vous avez pris l'habitude de {selectedArray.project} depuis
        {" " + from.length} jours
      </p>
      <button onClick={() => getDays(months[mois].value)}>Today</button>
      <div className="Calendar_Month_Selection">
        {months.map(month => (
          <p
            className="Calendar_Months"
            onClick={() => getDays(month.value)}
            key={month.value}
          >
            {month.value}
          </p>
        ))}
      </div>
      <div className="Calendar">
        <div className="Calendar_Header">
          <p className="Headers">Lundi</p>
          <p className="Headers">Mardi</p>
          <p className="Headers">Mercredi</p>
          <p className="Headers">Jeudi</p>
          <p className="Headers">Vendredi</p>
          <p className="Headers">Samedi</p>
          <p className="Headers">Dimanche</p>
        </div>
        <div className="Calendar_Days">
          {Goffset.map(offset => (
            <div className="day" key={offset}>
              {" "}
            </div>
          ))}
          {thisMonth.map(month => (
            //<div className="day">{month}</div>
            <Day
              number={month}
              id={month}
              month={index.value}
              value={(month + index.value).toString()}
              key={(month + index.value).toString()}
              color={selectedArray.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

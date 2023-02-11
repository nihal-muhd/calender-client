import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-hot-toast";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import axios from "../../Config/axios";

import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalenderPart.css";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const CalenderPart = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getTask() {
      const res = await axios.get("/get-task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllEvents(res.data.task);
    }
    getTask();
  }, []);

  const handleAddEvent = async () => {
    if (newEvent.title === "") {
      toast.error("Please add task");
    } else {
      setAllEvents([...allEvents, newEvent]);
      await axios.post("/add-task", newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewEvent({ title: "", start: "", end: "" });
      toast.success("Task added");
    }
  };

  const handleEventDrop = async (e) => {
    const { end, event, start } = e;
    event.end = end;
    event.start = start;
    await axios.post(
      "/event-drop",
      { end, event, start },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    toast('Task date changed',{
      icon:'⚡️'
    })
  };

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  let day = weekday[d.getDay()];

  return (
    <div className="CalenderPart">
      <div className="Upper-CalenderPart">
        <div>
          <h1 style={{ fontFamily: "serif" }}>Hola amigo, it's {day} 🌝☕</h1>
        </div>
        <div className="Addevent-CalenderPart">
          <input
            type="text"
            placeholder="🖊️ Add today's task..."
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <DatePicker
            placeholderText="Start Date"
            style={{ marginRight: "10px" }}
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
            className="DatePicker"
          />
          <DatePicker
            placeholderText="End Date"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
            className="DatePicker"
          />
        </div>
        <button className="button" onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <div className="">
        <DragAndDropCalendar
          selectable
          localizer={localizer}
          events={allEvents}
          onEventDrop={handleEventDrop}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 450 }}
        />
      </div>
    </div>
  );
};

export default CalenderPart;

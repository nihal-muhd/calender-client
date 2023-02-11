import React, { useEffect, useState } from "react";
import "./AllTask.css";
import axios from  '../../Config/axios'

const AllTask = () => {
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

  return (
    <div className="AllTask">
      <table>
        <thead>
          <tr>
            <th>Sl no</th>
            <th>Task</th>
            <th>Start date</th>
            <th>End date</th>
          </tr>
        </thead>
        <tbody>
          {allEvents?.map((v, i) => {
            return (
              <tr>
                <td>{i}</td>
                <td>{v.title}</td>
                <td>{v?.start}</td>
                <td>{v?.end}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllTask;

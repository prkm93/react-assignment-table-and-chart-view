import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Pagination from "./components/Pagination/Pagination";
import { fetchUsers } from './components/services/fetchUser';
import { config } from "./components/config/constant";
import UserList from "./components/Users/UserList";
import { Form } from "react-bootstrap";
import Chart from "./components/Chart/Chart";

function App() {

  const [switchView, setSwitchView] = useState(true);
  const [userList, setUserList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const totalNumberOfPages = Math.ceil(allUsers.length/config.PAGE_SIZE);

  let pagesVisited = pageNumber * config.PAGE_SIZE;

  useEffect(() => {
    fetchUsers(setUserList, setAllUsers);

    return (() => fetchUsers(setUserList, setAllUsers));
  }, []);

  return (
    <Container>
      <div className="switch">
        <Form.Check
          className="my-2" 
          type="switch"
          id="custom-switch"
          label="Switch for Chart or Table view"
          onChange={() => setSwitchView(prevState => !prevState)}
        />
      </div>
      
      {
        switchView ? 
        <>
          <UserList 
            userList={userList.slice(pagesVisited - config.PAGE_SIZE, pagesVisited)} 
            allUsers={allUsers.slice(pagesVisited - config.PAGE_SIZE, pagesVisited)}
            setUserList={setUserList}
          />
          <Pagination
            totalPages={totalNumberOfPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </>
        :
        <Chart allUsers={allUsers}/>
      }
    </Container>
  );
}

export default App;

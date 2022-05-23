import React, { useState, useEffect } from 'react';
import {BsFillArrowDownSquareFill , BsFillArrowUpSquareFill } from "react-icons/bs";
import { Table } from "react-bootstrap";
import { config } from "../config/constant";
import styles from "./UserList.module.css";
import User from './User';
import Input from '../UI/Input';

const UserList = (props) => {

  const { userList, allUsers } = props;

  const [currentUserList, setCurrentUserList] = useState(userList);
  const [nameSort, setNameSort] = useState(false);
  const [locationSort, setLocationSort] = useState(false);
  const [registeredSort, setRegisteredSort] = useState(false);

  useEffect(() => {
      setCurrentUserList(userList);
  }, [userList]);

  /**
   * function to column sorting
   * @param {*} param column name based on which sorting need to be performed
   */
  const handleSorting = (param) => {

    let tempUsers = structuredClone(userList);
  
    switch (param) {
        case "name"      : setNameSort(prevState => !prevState); 
                            if (nameSort) {
                                tempUsers.sort((a,b) => a.name.localeCompare(b.name));
                            } else {
                                tempUsers.sort((a,b) => b.name.localeCompare(a.name));
                            }
                            break;
        case "location"  : setLocationSort(prevState => !prevState);
                            if (locationSort) {
                                tempUsers.sort((a,b) => a.location.localeCompare(b.location));
                            } else {
                                tempUsers.sort((a,b) => b.location.localeCompare(a.location));
                            }
                            break;
       case "registered" : setRegisteredSort(prevState => !prevState);
                            if (registeredSort) {
                                tempUsers.sort((a,b) => a.registered.localeCompare(b.registered));
                            } else {
                                tempUsers.sort((a,b) => b.registered.localeCompare(a.registered));
                            }
                            break;
        default : break;
    }

    setCurrentUserList(tempUsers);
  }

  /**
   *  To delete selected user
   * @param {*} id of user
   */
  const deleteHandler = (id) => {
     
    const ifDelete = window.confirm("Do you want to delete the user?");
    
    if (ifDelete) {
        let tempUsers = [...userList];
        let index = tempUsers.findIndex(user => user.id === id);
        tempUsers.splice(index, 1);
        setCurrentUserList(tempUsers);
    }

  }

  /**
   *  function to perform search
   * @param {*} column can be name, location, registered Date, phone
   * @param {*} word search Parameter
   */
  const handleSearch = (column, word) => {
    let tempUsers = [...userList];

    // for name and location
    const filteredUsers = tempUsers.filter(item =>  item[column].toLowerCase().includes(word.toLowerCase()) );
    setCurrentUserList(filteredUsers);
    
    if (column === "registered") {
       
        const filteredUsers = tempUsers.filter(item =>  new Date(item.registered).toLocaleDateString().includes(word) );
        setCurrentUserList(filteredUsers);

    } else if (column === "phone") {

        const filteredUsers = tempUsers.filter(item => item.phone.includes(word) );
        setCurrentUserList(filteredUsers);

    }

    if (word === "") {
        setCurrentUserList(allUsers);
    }
  }

  return (

    <>
        <h5 className="text-center my-2">User Data Table</h5>
        {
        userList.length ?
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th onClick={() => handleSorting(config.name_param)}>
                        Name {nameSort ? <BsFillArrowDownSquareFill/> : <BsFillArrowUpSquareFill/> }
                    </th>
                    <th onClick={() => handleSorting(config.location_param)}>
                        Location {locationSort ? <BsFillArrowDownSquareFill/> : <BsFillArrowUpSquareFill/> }
                    </th>
                    <th onClick={() => handleSorting(config.registeredDate_param)}>
                        Registered {registeredSort ? <BsFillArrowDownSquareFill/> : <BsFillArrowUpSquareFill/> }
                    </th>
                    <th>Phone</th>
                    <th>Picture </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                        ["name", "location", "registered", "phone"].map(type => {
                            return (
                            <td key={type}>
                                <Input
                                    type="text"
                                    placeholder={`search by ${type === "registered" ? "registered date" : type}`}
                                    onSearch={handleSearch}
                                    column={type}
                                />
                            </td>
                            )
                        })
                    }
                </tr>
                {
                    currentUserList.length ? currentUserList.map(user => {
                        return (
                            <User 
                                key={user.id} 
                                {...user}
                                onDelete={deleteHandler}
                            />
                        );
                    }) 
                    : <tr className="text-center">
                        <td  colSpan={6} className={styles.noResults}>No results found!</td>
                      </tr>
                }    
            </tbody>
        </Table>
        :  
        <div className="text-center"> 
            <p colSpan={5}>Loading...</p>
        </div>
        }
    </>
  )
}

export default UserList;
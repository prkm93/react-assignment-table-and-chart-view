import React from 'react';
import {Button} from "react-bootstrap";

const User = (props) => {

  const { id, name, location, registered, phone, picture } = props;  

  return (
    <tr>
        <td>{name}</td>
        <td>{location}</td>
        <td>{new Date(registered).toLocaleDateString()}</td>
        <td>{phone}</td>
        <td className="text-center"><img src={picture} alt={picture}/></td>
        <td><Button variant="danger" onClick={() => props.onDelete(id)}>Delete</Button></td>
    </tr>
  );
}

export default User;
import React from 'react';
import styles from "./Input.module.css";

function Input(props) {
  return (
    <div>
        <input
            className={styles.input} 
            type={props.type} 
            placeholder={props.placeholder}
            onChange={(e) => props.onSearch(props.column, e.target.value)}
        />
    </div>
  )
}

export default Input;
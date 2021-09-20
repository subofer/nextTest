import React from "react";
import {useRef } from "react";


export default function Home() {
  
  const fileInputRef = useRef();
  const noteInputRef = useRef();
  
  function onSubmit(event) {
    event.preventDefault()
    const nota = noteInputRef.current.value
    const files = fileInputRef.current.files;
    const body = new FormData();

    for (let index = 0; index <= files.length; index++) {
      body.append(nota, files[index])
    }
    console.log(body)
    fetch("/api/upload", {
      method: "POST",
      body
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={fileInputRef} type="file" multiple />
      <input ref={noteInputRef} type="text"/>
      <button type="submit">Submit</button>
    </form>
  );
}
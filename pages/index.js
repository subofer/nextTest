import React, { useLayoutEffect } from "react";
import {useRef, useState, useEffect } from "react";


export default function Home() {
  
  const fileInputRef = useRef();
  const noteInputRef = useRef();
  
  const [archivos, setArchivos] = useState([])
  
  useEffect(() => {

  },[archivos]);

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

  function fileList(dir) {
    fetch("/api/filelist", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({dir, pepe: "tu vieja"}), // body data type must match "Content-Type" header
      
    })
    .then(res => res.json())
    .then(res => setArchivos(res))
  }

  return (
    <>
    <form onSubmit={onSubmit}>
      <input ref={fileInputRef} type="file" multiple />
      <input ref={noteInputRef} type="text"/>
      <button type="submit">Submit</button>
    </form>
    <div id="filelist">{
          archivos.map(file =>
            <h2 key={file} onClick={() => fileList('./documents/'+file+'/')}>{file}</h2>
          )}
    
    </div>
    <button onClick={() => fileList("./documents/")}>File List</button>
    </>
  );
}
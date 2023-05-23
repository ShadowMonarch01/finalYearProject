import React from 'react';
import {read, utils } from 'xlsx'

export const Parsexl = () => {

  const handleFile = async(e)=>{
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const wb = read(data);

    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    const Ndata = utils.sheet_to_json(ws); // generate objects
    console.log(Ndata);
  }

  return (
    <div>
        <h1>Parse XL</h1>

        <br/>

        <input type='file' onChange={(e)=>handleFile(e)}/>
    </div>
  )
}
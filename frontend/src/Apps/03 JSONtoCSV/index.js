import React, { useState } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import "./styles.css";
import Navbar from './Navbar';

import json_example from "./example";

function JSONtoCSVApp() {
  const [data,setData] = useState('')
  const [output,setOutput] = useState('')
  //[{"nombre":"carlos"},{"nombre":"david"}]

  const onResetTextArea = () => {
    setData('')
    setOutput('')
  }

  const onExample = () => {
    setData(json_example)
  }

  

  const onFormatJSON = () => {
    setData(JSON.stringify(JSON.parse(data),null,2))
    //const jsonPretty = JSON.stringify(JSON.parse(data),null,2); 
    //console.dir(jsonPretty, {depth: null, colors: true})
  }

  const onJSONtoCSV = () => {
    //setData(JSON.stringify(JSON.parse(data),null,2))
  
    const json_info = JSON.parse(data);
    //console.log(json_info)
    
    if(json_info instanceof Array){
      const row = json_info.map(x => {
        const objRow = [];
        const obj_props_size = Object.keys(x).length;
        Object.keys(x).forEach((key,index) => {
          //console.log(key,x[key],obj_props_size) 
          obj_props_size === index-1 ? objRow.push(`${x[key]}`) : objRow.push(`${x[key]};`)
        });
        return objRow.join('');
      })
      //console.log(row.join('\t\n'))
      setOutput(row.join('\t\n'))
    }else{
      console.log('es object')
      Object.keys(json_info).forEach((key) => console.log(key,json_info[key]));
    }
  }

  return (
    <>
    <Navbar onJSONtoCSV={onJSONtoCSV} onFormatJSON={onFormatJSON} onExample={onExample} onResetTextArea={onResetTextArea}></Navbar>
      <div>
        <CodeMirror
          value={data}
          options={{
            mode: 'javascript',
            theme: 'material',
            
            lineNumbers: true
          }}
          autoCursor={false}
          onChange={(editor, data, value) => {
            setData(value)
            setOutput('')
          }}
        />
      </div>
      <br></br>
      <div>
        <CodeMirror
          value={output}
          options={{
            mode: 'javascript',
            theme: 'base16-dark',
            lineNumbers: true,
            readOnly: true,
          }}
          onChange={(editor, data, value) => {
            
          }}
        />
      </div>
    </>
  );
}

export default JSONtoCSVApp;

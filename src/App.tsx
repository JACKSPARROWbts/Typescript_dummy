import React,{useEffect,useState} from 'react'

function App() {
  let apiresponse:any;
  var[state,setState]=useState(apiresponse="");
  var[condition,setCondition]=useState(apiresponse="");
  const[name,setName]=useState("");
  const[pass,setPass]=useState("")
  useEffect(()=>{
    callAPI();
  })
  const callAPI=()=>{
    fetch('http://localhost:3001')
    .then(res=>res.text())
    .then(res=>{
      setState(apiresponse=res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  const save=(e:any)=>{
    if(e.target.id==="name"){
   setName(e.target.value);
    }else{
      setPass(e.target.value);
    }
  }
  const submit=async(e:any)=>{
    e.preventDefault();
    fetch('http://localhost:3001',{
      method:"post",
      body:JSON.stringify({
        "name":name,
        "password":pass
      })
    })
    .then(res=>res.text())
    .then(res=>{
      setCondition(apiresponse=res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div>
      <form>
      <input type="text" name="name" id="name" onChange={save} ></input>
      <br></br>
      <input type="text" name="password" id="password" onChange={save} ></input>
      <br></br>
      <button type="submit" onClick={submit}>submit</button>
        </form>
      {state}
      {condition}
    </div>
  )
}

export default App

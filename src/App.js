import React from 'react';
import LeftBar from "./Components/LeftBar/LeftBar";
import MainBody from "./Components/MainBody/MainBody";
import RightBar from "./Components/RightBar/RightBar";

function App() {
  const [leftBarOption, setLeftBarOption] = React.useState("Home");
  return (
    <div className="layout row">
      <LeftBar leftBarOption={leftBarOption} setLeftBarOption={setLeftBarOption}/>
      <MainBody leftBarOption={leftBarOption}/>
      <RightBar/>
    </div>  
  );
}

export default App;

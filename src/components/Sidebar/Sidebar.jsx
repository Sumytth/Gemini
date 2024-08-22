import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [Extended, setExtended] = useState(false);
  //The Sidebar component uses prevPrompts to render the recent prompts and defines an onClick event to load a selected prompt.
  const { onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context);

  //Purpose: The loadPrompt function is designed to handle loading a specific prompt when it's selected.
  //Parameters: It takes one parameter, prompt, which is a string representing the prompt to load.
  // Functionality:
  // It calls setRecentPrompts(prompt), updating the state with the selected prompt.
  // It awaits the OnSent(prompt) function, which likely handles sending the prompt or performing some asynchronous operation with it.

  const loadPrompt = async (prompt) =>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }
  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="" />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {Extended ? <p>New Chat</p> : null}
        </div>
         {/* ternary operator */}
        {Extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index)=>{
              return(
        //Execution Flow
                     // User Clicks on a recent-entry Div: When a user clicks on one of these divs, the onClick event is triggered.
                    // Calling loadPrompt: The onClick handler calls loadPrompt with the item (which is a prompt) as the argument.
                    // State Update: Inside loadPrompt, setRecentPrompts(prompt) is called to update the state with the selected prompt.
                    // Asynchronous Operation: The OnSent(prompt) function is called and awaited. This function likely handles sending the prompt or performing some other asynchronous operation.

                <div key={index} onClick={()=>loadPrompt(item)} className="recent-entry" >
                 <img src={assets.message_icon} alt="" />
                 <p>{item.slice(0,18)}...</p>
                </div>

              )
            })}
            
          </div>
        ) : null}
        
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {Extended ? <p> Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {Extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {Extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

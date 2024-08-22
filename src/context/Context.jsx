import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const[input, setInput] = useState("")  //to save the input data
    const [recentPrompt, setRecentPrompt] = useState("") //when u click on the send button the input data saved in the recent propmpt
    const [prevPrompts, setPrevPrompts] = useState([]) // to show the input history into recent tab
    const [showResult, setShowResult] = useState(false) // it will hide the frontpage boxes and show the  prompt result
    const [loading, setLoading] = useState(false) // display the loading animation
    const [resultData, setResultData] = useState("") //on the 
    
    //adding Typing effect
    const delaypara = (index,nextWord) => {
        //loading animation
        setTimeout(function (){
            setResultData(prev => prev+ nextWord)
        }, 75*index);
    }

    const newChat = () => {

        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {

        setResultData("")  // result data will reset, so that our previous response will remove from state variable
        setLoading(true)
        setShowResult(true) // gonna show result
        let response;
        if(prompt !==undefined){
            
            response = await runChat(prompt);
            setRecentPrompt(prompt)

        }
        else{
            setPrevPrompts(prev => [...prev,input])  // whenever we call the onSent(), the input is added to the prevPrompts array.
            setRecentPrompt(input)
            response = await runChat(input)
        }
        // const response =   await runChat(input)
        let responseArray = response.split("**"); //**  bold */
        let newResponse ="";
        for (let i = 0 ;i < responseArray.length; i++)
        {  // it means the number is evennumber..which checks if "i" is even or if "i" is 0 .. and the content is added directly
            if( i===0 || i%2!==1){
                newResponse += responseArray[i]; // newResponse = newResponse + responseArray[i]
            }
            //If i % 2 === 1, i is odd, and the content is wrapped in <b> tags.
            else{
                newResponse += "<b>" +responseArray[i]+"</b>";
            }
        }
        //This to replace every single asterisk (*) in the newResponse string with an HTML line break (</br>). This effectively converts single asterisks into line breaks, enabling the formatted text to be displayed with proper line breaks in an HTML context.
        let newResponse2 = newResponse.split("*").join("</br>")
        //newResponse2 is a string containing the text you want to display.
        let newResponseArray = newResponse2.split(" ");
        //.split(" ") breaks this text into an array of words, where each element of the array is a word from the original string.

//         Example:
// If newResponse2 is "Hello world this is a test", then newResponseArray becomes ["Hello", "world", "this", "is", "a", "test"].

        for(let i = 0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delaypara(i, nextWord+" ")
        }
        setResultData(newResponse2)
        setLoading(false)
        setInput("") // input field will be reset
    }

   
// To access the above state variable and functions in main component and sidebar component
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
        
    }

    return (
        <Context.Provider value = {contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;




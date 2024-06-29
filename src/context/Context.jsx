import { createContext } from "react";
import runChat from "../config/gemini";
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompts, setPrevPrompts] = useState([])
    const [showResult, SetShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")


    const delayPara = (index,nextword) => {     //Important Logic:- typing effect
        setTimeout(() => {
            setResultData(prev=>prev+nextword)
        },75*index);
    }

    const newChat = () =>{
        setLoading(false)
        SetShowResult(false)
    }


    const onSent = async (prompt)=>{
        setResultData("")
        setLoading(true)
        SetShowResult(true)
        
        let response; 
        if(prompt !== undefined){
            setRecentPrompt(prompt)
            response = await runChat(prompt)
        }
        else{
            setRecentPrompt(input)
            setPrevPrompts([...prevPrompts,input])
            response = await runChat(input)
        }
        
        let responseArray = response.split("**")
        let newResponse="";
        for(let i=0; i<responseArray.length; i++)   //Important Logic:- remove **
        {
            if(i===0 || i%2===0){
                newResponse +=responseArray[i]
            }
            else{
                newResponse += "<br>"+"<b>"+ responseArray[i] +"</b>";
            }
        }

        newResponse = newResponse.replaceAll("*","<br>")    //remove *

        let newResponseArray = newResponse.split(" ")
        for(let i=0; i<newResponseArray.length; i++){
            delayPara(i,newResponseArray[i]+" ")
        }
        setLoading(false)
        setInput("")
    }

    

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider
import { useContext } from 'react'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)


  return (
    <div className='main min-h-screen flex-1 relative bg-[#131314] '>
      <div className="nav flex items-center justify-between px-5 py-3">
        <p className=' text-2xl cursor-pointer invert '>Gemini</p>
        <img className='w-10 rounded-full cursor-pointer' src={assets.user_icon} alt="" />
      </div>


      <div className="main-container m-auto" id='cont1'>

        {!showResult
        ?<>
        <div className="greet my-5 text-[56px] font-medium px-6 leading-none ">
            <p><span >Hello, Sarbajit</span></p>
            <p className=' text-[#444746] '>How can I help you today?</p>
        </div>

        <div className="cards mb-12">
            <div onClick={()=>onSent("Give me ways to add healthy foods to my diet")} className="card">
                <p className=' text-white'>Give me ways to add certain foods to my diet</p>
                <img className='invert' src={assets.compass_icon} alt="" />
            </div>
            <div onClick={()=>onSent("What's the reaction and impact of autonomous vehicles")} className="card">
                <p className=' text-white'>What’s the reaction and impact of autonomous vehicles</p>
                <img className='invert' src={assets.bulb_icon} alt="" />
            </div>
            <div onClick={()=>onSent("Brainstorm team bonding activities for our work retreat")} className="card">
                <p className=' text-white'>Brainstorm team bonding activities for our work retreat</p>
                <img className='invert' src={assets.message_icon} alt="" />
            </div>
            <div onClick={()=>onSent("How to improve the readability of a code")} className="card">
                <p className=' text-white'>How to improve the readability of a code</p>
                <img className='invert' src={assets.code_icon} alt="" />
            </div>
        </div></>
        :<div className='result text-white py-2 max-h-[75vh] overflow-y-scroll'>
           <div className="result-title flex items-center gap-5 my-10 ">
            <img className='w-10 rounded-full ' src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
           </div>  

           <div className="reult-data flex items-start gap-5 autoscrollable-wrapper">
            <img className='w-10' src={assets.gemini_icon} alt="" />
            {loading?
            <div className='loader w-full flex flex-col gap-2 '>
              <hr />
              <hr />
              <hr />
            </div>
            :<p className='text-lg' dangerouslySetInnerHTML={{__html:resultData}}></p>}
           </div>
      
        </div>}

        <div className="main-bottom fixed bottom-0 max-w-screen px-5 bg-[#131314] " id='cont2'>
            <div className="search-box flex items-center justify-between gap-5 px-3 py-3 bg-[#1e1f20] rounded-full ">
                <input onKeyDown={(e)=>e.key=='Enter'?onSent():null} onChange={(e)=>setInput(e.target.value)} value={input} className=' invert flex-1 p-2 border-none outline-none bg-[#e1e0df] ' type="text" placeholder='Enter a prompt Here'/>
                <div className=' flex items-center gap-3 '>
                    <img className=' invert w-6 cursor-pointer ' src={assets.gallery_icon} alt="" />
                    <img className=' invert w-6 cursor-pointer ' src={assets.mic_icon} alt="" />
                    {input?<img onClick={()=>onSent()} className=' invert w-6 cursor-pointer ' src={assets.send_icon} alt="" />:null}
                </div>
            </div>
            <p className="bottom-info text-sm text-center my-3 invert">
                Gemini may display inaccurate info, including about people, so double-check its responses. <span className=' underline'> Your privacy and Gemini Apps</span>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Main

import {assets} from '../../assets/assets'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'


const Sidebar = () => {
  const [extended, setExtended] = useState(true)    
  const {prevPrompts, onSent, setRecentPrompt, newChat} = useContext(Context)

  const loadPrompt = async(prompt) =>{
        setRecentPrompt(prompt)
        await onSent(prompt)
  }

  return (
    <div className={`sidebar bg-[#1e1f20] text-white ${extended?"w-1/5":"w-[85px] items-center"} flex flex-col justify-between rounded-sm`}>
      <div className='top'>
        <div className=" flex flex-col gap-y-12 h-36 m-5 mb-0">
            <div onClick={()=>setExtended(!extended)} className=' p-3  w-10 rounded-full hover:bg-[#393b3d] cursor-pointer'>
                <img className=' invert w-4 ' src={assets.menu_icon} alt="menu" />
            </div>
            <div className={`flex items-center justify-center ${extended?"w-32":"w-10"} gap-x-5 px-3 py-2 rounded-full cursor-pointer bg-[#282a2c] hover:bg-[#37393b] `}>
                <img className=' invert w-4' src={assets.plus_icon} alt="" />
                {extended?<p onClick={()=>newChat()}>New chat</p>:null}
            </div>
        </div>

        {extended
        ?
        <div className='  m-5 mt-2'>
            <p className='mb-3 ml-2'>Recent</p>
            <div className='chats'>
                {prevPrompts.map((prompt, index)=>{
                    return(<>
                        <div key={index} onClick={()=>loadPrompt(prompt)} className='chat flex gap-x-3 mb-1 hover:bg-[#004a77] w-full px-2 py-1 rounded-full cursor-pointer'>
                            <img className=' invert w-6 ' src={assets.message_icon} alt="" />
                            <div>{prompt.slice(0,12)}...</div>
                        </div>
                 </>)
                })}
                
            </div>
        </div>:null}


      </div>
        <div className="bottom fixed bottom-0 m-5  flex flex-col gap-y-1">
            <div className='flex gap-x-3 hover:bg-[#303131] p-2 rounded-full cursor-pointer'>
                <img className=' invert w-5 ' src={assets.question_icon} alt="" />
                {extended?<div className=' w-full'>Help</div>:null}
            </div>
            <div className='flex gap-x-3 hover:bg-[#303131] p-2 rounded-full cursor-pointer'>
                <img className=' invert w-5 ' src={assets.history_icon} alt="" />
                {extended?<div className=' w-full'>Activity</div>:null}
            </div>
            <div className='flex gap-x-3 hover:bg-[#303131] p-2 rounded-full cursor-pointer'>
                <img className=' invert w-5 ' src={assets.setting_icon} alt="" />
                {extended?<div className=' w-full'>Help</div>:null}
            </div>
      </div>
    </div>
  )
}

export default Sidebar

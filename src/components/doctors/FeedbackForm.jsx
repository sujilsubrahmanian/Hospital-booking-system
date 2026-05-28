import React, { useEffect, useState } from 'react'
import {AiFillStar} from 'react-icons/ai'
import { useParams } from 'react-router-dom'


const FeedbackForm = ({form}) => {

  const [rating,setRating]=useState()
  const [hover,setHover]=useState()
  const [reviewText,setReviewText]=useState('')
  const [token,setToken]=useState("")


  
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }
    else{
      setToken("")
    }
   })

  console.log(rating,reviewText);

  let params=useParams()
  const doctor=params.id;
  
  const handleReview=async(e)=>{
    
}


  return (
   <form action="">
    <div>
      <h3 className='text-[16px] leading-[30px] text-headingColor mb-4'>
         How Would you rate the overall experience ?
      </h3>
      <div>
        {[...Array(5).keys()].map((_,index)=>{
          index+=1;

          return(
            <button key={index} type='button'
            className={`${
              index <((rating && hover) || hover)
              ?"text-yellowColor"
              :"text-gray"
            } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
            onClick={()=>setRating(index)}
            onMouseEnter={()=>setHover(index)}
            onMouseLeave={()=>setHover(rating)}
            onDoubleClick={()=>{
              setHover(0)
              setRating(0)
            }}
            >
              <span>
                <AiFillStar/>
              </span>
            </button>
          )

     })}
      </div>
    </div>

    <div className='mt-3'>
    <h3 className='text-[16px] leading-[30px] text-headingColor mb-4'>
         Share Your Feedback Suggessions 
      </h3>

      <textarea onChange={(e)=>setReviewText(e.target.value)} name="" id="" cols="30" rows="5" placeholder='Write your message' 
      className='border border-solid border-blue-500 w-full p-3 rounded-md'>
        
      </textarea>

    </div>

    <button type='submit' onClick={handleReview} className='btn'>Submit Feedback</button>

   </form>
  )
}

export default FeedbackForm
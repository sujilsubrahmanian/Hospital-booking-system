import React from 'react'

const Contact = () => {
  return (
    <section>
      <div className='px-4 mx-auto max-w-screen-md'>
        <h2 className='heading text-center'>Contact Us</h2>
        <p className='font-light text-center text_para'>
        Got a technical issue? want to send feedback about a better feature? Let
us know.

        </p>
        <form className='py-4 md:py-0 m-5' action="">
      
        <div className='mb-5'>
          <input type="email" className='form-control' 
          placeholder='Enter Your Email' name='email'/>
          </div>    
          <div className='mb-5'>
          <input type="text" className='form-control' 
          placeholder='Subject' name='psd'/>
          </div> 
          <div className='mb-5'>
          <textarea  name="" id="" cols="30" rows="5" placeholder='Write your message' 
      className='border border-solid border-blue-500 w-full p-3 rounded-md'>
        
      </textarea>

          </div>  
           
           <div className='mb-3'>
            <button type='submit' className=' rounded-lg w-44 h-10 bg-primaryColor text-black '>Submit</button>
           </div>

           

      </form>

      </div>
    </section>
  )
}

export default Contact
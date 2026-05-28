import React from 'react'
import aboutimg from '../assets/images/about.png';
import abcard from '../assets/images/about-card.png'
import { Link } from 'react-router-dom';


const About = () => {
  return (
    <section>
        <div className='container'>
        <div className='flex justify-between flex-col lg:flex-row'>

            <div className='relative w-3/4 lg:w-1/2 xl:-w-[770px] z-10 order-2 lg:order-1 '>
                <img src={aboutimg} alt="" />
                <div className='absolute z-20 bottom-4 '>
                    <img src={abcard} alt="" />

                </div>
            </div>

            <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2  ml-9'>
                <h2 className='heading'> Proud to be one of the nations best</h2>
                <p className='text_para'>We take pride in being one of the nation's leading healthcare platforms, connecting patients with top medical professionals. Our commitment to quality care, convenience, and innovation ensures that everyone receives the medical attention they deserve.</p>
                <p className='text_para mt-3'>With a seamless appointment booking system and access to expert doctors, we strive to make healthcare more accessible. Your well-being is our priority, and we are dedicated to providing the best medical services to keep you healthy.</p>

                <Link to={'/'}>
                    <button className='btn'>Learn More</button> 

                </Link>
            </div>

        </div>
        </div>
    </section>
  )
}

export default About
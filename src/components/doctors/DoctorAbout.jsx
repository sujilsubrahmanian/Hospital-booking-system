import React from 'react'

const DoctorAbout = ({doctor}) => {
    return (
        <div>
            <div>
                <h3 className='flex items-center gap-2 font-semibold'>
                    About of
                    <span className='text-irisBlueColor font-bold leading-7'>
                       {doctor.name}
                    </span>
                </h3>
                <p className='text_para'>
                   {doctor.about}
                </p>
            </div>

    <div className='mt-3'>
        <h3 className='items-center text-headingColor font-semibold'>Education</h3>

        <ul className='pt-4 md:p-5'>
            <li className='flex  sm:flex-row sm:justify-between sm:items-end gap-5 mb-2 '>
                <div>
                   
                    <p className='text-[16px] font-medium leading-6 text-textColor'>
                     {doctor.education}
                    </p>
                    
                </div>
                <p className='text-[14px] font-medium leading-5 text-textColor'>
                  {doctor.specialty}
                    </p>

            </li>

        </ul>
    </div>

    <div className=''>
    <h3 className='items-center text-headingColor font-semibold'>Experience</h3>

    <ul className='pt-4 md:p-5 grid sm:grid-cols-2 gap-[30px]'>
    <li className="p-2 rounded-lg bg-gradient-to-r from-pink-400 to-red-400 text-white shadow-md flex items-center">
    <span className="text-lg font-semibold">
        {doctor.experience} Years
    </span>
</li>


    </ul>

    </div>

        </div>
    )
}

export default DoctorAbout
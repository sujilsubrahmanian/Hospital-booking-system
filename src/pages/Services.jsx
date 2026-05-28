import React from 'react'
import ServiceCard from '../components/services/ServiceCard'

const Services = () => {
  return (
    
    <section>
      <div className='container'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {
            services.map((item,index)=>(
                <ServiceCard item={item} index={index} key={index} />
            ))
        }
    </div>

      </div>
    </section>
  )
}

export default Services
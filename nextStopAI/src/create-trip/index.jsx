import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const handleInputChange=(name, value) => {
    
    setFormData({
      ...formData,
      [name]:value
    })
  };

  useEffect(()=>{
    console.log(formData);
  }, [formData])

  const onGenerateTrip = () => {
    if (formData?.duration > 5) {
      return;
    }
    console.log(formData)
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-40 px-45 mt-5 py-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.  </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Please enter your desired destination: </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Number of days:</h2>
          <Input placeholder={'example: 3'} type="number" 
            onChange={(e)=>handleInputChange('duration', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index)=>(
              <div key={index} 
              onClick={()=>handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                ${formData?.budget==item.title && 'shadow-lg border-black'}
              `}>
                <h2 className='text-2xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who are you travelling with?</h2>
          <div className='grid grid-cols-4 gap-5 mt-5'>
            {SelectTravelsList.map((item, index)=>(
              <div key={index} 
              onClick={()=>handleInputChange('people', item.people)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
              ${formData?.people==item.people && 'shadow-lg border-black'}
              `}>
                <h2 className='text-2xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        
        <div className='my-10 justify-end flex'>
          <Button onClick={onGenerateTrip}>
            Generate Trip!
          </Button>
        </div>
        

      </div>
    </div>
  )
}

export default CreateTrip
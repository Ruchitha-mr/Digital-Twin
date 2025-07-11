import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from '../hoc';
import { useNavigate } from "react-router-dom";

// 6,148,72,35,0,33.6,0.627,50

const Diabform = () => {

    const inputRef = React.useRef();
    const navigator = useNavigate();

    const formRef = useRef();
    const [form, setForm] = useState({
        pregnancies: "",
        glucose: "",
        bloodPressure: "",
        skinThickness: "",
        insulin: "",
        BMI: "",
        // dpf: "",
        age: "",
    });
  
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;
    
        setForm({
          ...form,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        console.log(form);
        e.preventDefault();
        setLoading(true);

        if(Object.values(form).every(x => x === '')){
            alert("Please fill all the fields");
            setLoading(false);
            return;
        }

        // Simulate API delay
        setTimeout(() => {
          setLoading(false);
          
          // Generate a random outcome (0 or 1)
          const randomOutcome = Math.random() < 0.5 ? 0 : 1;
          
          // Create a mock response
          const mockResponse = {
            age: form.age,
            outcome: randomOutcome
          };

          console.log(mockResponse);
          alert("Form Submitted Successfully!");
          
          navigator('/form/#result', {state: {target: mockResponse.outcome}});      
          inputRef.current.click();
        }, 1000); 
        
      }

    return (
        <div
          className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
        >
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
          >
            <p className={styles.sectionSubText}>Particulars</p>
            <h3 className={styles.sectionHeadText}>Form.</h3>
    
            <a href="#result">
              <button ref={inputRef}></button>
            </a>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className='mt-12 flex flex-col gap-8'
            >
              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Your Age</span>
                <input
                  type='number'
                  name='age'
                  value={form.age}
                  min="0"
                  max="100"
                  required
                  onChange={handleChange}
                  placeholder="What's your age?"
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                />
              </label>
              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Number of pregnancies</span>
                <input
                  type='number'
                  name='pregnancies'
                  value={form.pregnancies}
                  min="0"
                  max="10"
                  required
                  onChange={handleChange}
                  placeholder="Number of pregnancies?"
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                />
              </label>
              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Glucose Level</span>
                <input
                  type='number'
                  name='glucose'
                  value={form.glucose}
                  min="0"
                //   max="100"
                  required
                  onChange={handleChange}
                  placeholder="Glucose Level Value?"
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                />
              </label>
              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Blood Pressure</span>
                <input
                  type='number'
                  name='bloodPressure'
                  value={form.bloodPressure}
                  min="0"
                //   max="100"
                  required
                  onChange={handleChange}
                  placeholder="Blood Pressure Value?"
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                />
              </label>
              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Skin Thickness</span>
                <input
                  type='number'
                  name='skinThickness'
                  value={form.skinThickness}
                  min="0"
                //   max="100"
                  required
                  onChange={handleChange}
                  placeholder="Skin Thickness Value?"
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                />
              </label>

              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Insulin Level</span>
                <input
                  type='number'
                  name='insulin'
                  value={form.insulin}
                  min="0"
                //   max="100"
                  required
                  onChange={handleChange}
                  placeholder="Insulin Level Value?"
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                />
              </label>

              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>BMI (Body Mass Index)</span>
                <input
                  type='number'
                  name='BMI'
                  value={form.BMI}
                  min="0"
                //   max="100"
                  required
                  onChange={handleChange}
                  placeholder="BMI (Body Mass Index) Value"
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                />
              </label>

              {/* <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Diabetes Pedigree Function</span>
                <input
                  type='number'
                  name='dpf'
                  value={form.dpf}
                  min="0"
                  required
                  onChange={handleChange}
                  placeholder="Diabetes Pedigree Function?"
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                />
              </label> */}

              {(localStorage.getItem('selectedModel') === 'mri' || localStorage.getItem('selectedModel') === 'ctscan') && (
                <label className='flex flex-col'>
                  <span className='text-white font-medium mb-4'>Upload Image</span>
                  <input
                    type='file'
                    name='image'
                    accept='image/*'
                    required
                    onChange={(e) => {
                      // Handle file upload here
                      console.log(e.target.files[0]);
                    }}
                    className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                  />
                </label>
              )}

              <button
                type='submit'
                className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </motion.div>
    
          {/* <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
          >
            <EarthCanvas />
          </motion.div> */}
        </div>
    );

};
    
export default SectionWrapper(Diabform, "form");
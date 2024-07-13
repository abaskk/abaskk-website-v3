

const Experience = (props) => {
    const displayTechUse = (arr) => {
        const strArr = arr.toString()
        const formatted = strArr.replace(/,/g, ', ')
        return formatted
    }


    const experience = props.experience
    const experienceShow = experience.map((exp,index) => {
        return (
            <div key={index} className="flex justify-start">
            <div 
               className="flex flex-col basis-11/12 my-6 p-3 items-start dark:bg-dark_purp rounded-lg shadow md:flex-row md:max-w-5xl  ">
               <img className="object-scale-down w-full rounded-t-lg h-36 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={`https://drive.google.com/thumbnail?id=${exp.logo_gdrive_id}`} alt=""/>
               <div className="flex flex-col p-4 leading-normal">
                  <h5 className="mb-2 w-full text-2xl font-bold tracking-tight text-white ">{exp.company}</h5>
                  <p className=" font-normal text-white">{exp.start_date} - {exp.end_date} </p>
                  <p className=" font-normal text-white">Role: {exp.title}</p>
                  <p className=" font-normal text-white">Team: {exp.team}</p>
                  <p className=" font-normal text-white">Technologies used:  
                  {` ${displayTechUse(exp.technologies_used)}`}</p>
               </div>
            </div>
            </div>

        )
    })



    return (
        <div className="my-24">
            <div>
                <p className="text-3xl py-4">Experiences</p>
            </div>

                {experienceShow}

        </div>
    )

}

export default Experience
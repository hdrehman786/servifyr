import React from 'react';
import { useEnrolledProgram } from "../queries/programqueries";
import { toast } from 'react-toastify';
const ProgramCard = ({ program }) => {
  const enrolledPrograms = useEnrolledProgram();

  const getProgramId = (id) => {
    enrolledPrograms.mutate( id , {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        console.error("Enrollment failed:", error);
      }
    });
  };
  return (
    <div className="group relative rounded-[2rem] overflow-hidden bg-[#0d0d0d] border border-gray-900 transition-all hover:border-gray-600 shadow-2xl">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover brightness-50 group-hover:scale-105 group-hover:brightness-75 transition-all duration-700"
        />
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <span className="text-[#fff200] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{program.duration}</span>
        <h3 className="text-white font-black uppercase text-2xl mb-6 leading-tight group-hover:text-[#fff200] transition-colors">
          {program.title.split(' ').map((word, i) => (
            <React.Fragment key={i}>{word} <br /></React.Fragment>
          ))}
        </h3>

        <button onClick={() => getProgramId(program._id)} className="w-full bg-[#fff200] text-black font-black py-4 rounded-2xl uppercase text-xs tracking-widest transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
          Start Program
        </button>
      </div>
    </div>
  )
};


export default ProgramCard;
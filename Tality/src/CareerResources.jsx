import { useState } from "react";
import { ResumeSection } from "./ResumeSection";
import { NetworkingSection } from "./NetworkingSection";
import { InterviewSection } from "./InterviewSection";

export function CareerResource() {
    const[section, currentSection] = useState('resume')

    const changeSection = (section) =>{
        currentSection(section);
    }
  return (
    <>
      <div className="career-resources-section">
        <div className="career-title">
          <h1>Career Resources and Tips</h1>
        </div>
        <div className="section-nav">
            <button onClick={() => changeSection('resume')}>Resume Tips and Pointers</button>
            <button onClick={() => changeSection('interview')}>Going to the Interview</button>            
            <button onClick={() => changeSection('networking')}>Networking with others</button>
        </div>

        {section === 'resume' && <ResumeSection/>}
        {section === 'interview' && <InterviewSection/>}
        {section === 'networking' && <NetworkingSection/>}
      </div>
    </>
  );
}
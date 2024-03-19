import { useState } from 'react'
import './App.css'
import { DataProvider } from '@/providers/DataProvider';
import SideBar from "@components/SideBar";
import PersonalInfoForm from '@/components/PersonalInfoForm';
import PlanForm from '@/components/PlanForm';
import AddonsForm from '@components/AddonsForm';
import SummaryForm from '@components/SummaryForm';


function App() {


  const [formIdx, setFormIdx] = useState(0);
  const forms = [
    {
      title: "Your info",
      component: <PersonalInfoForm setFormIdx={setFormIdx} />,

    },
    {
      title: "Select Plan",
      component: <PlanForm setFormIdx={setFormIdx} />,
    },
    {
      title: "Add-ons",
      component: <AddonsForm setFormIdx={setFormIdx} />,
    },
    {
      title: "Summary",
      component: <SummaryForm setFormIdx={setFormIdx} />,
    },
    
  ]
  return (
    <div className='app'>
      <DataProvider>
        <div className='form_container'>
          <SideBar formIdx={formIdx} formTitles={forms.map(form => form.title)} />
          {forms[formIdx].component}
        </div>
      </DataProvider>
    </div>
  )
}

export default App

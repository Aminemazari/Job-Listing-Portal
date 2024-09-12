import React from 'react'
import style from "./style.module.css"
import Input from "./Input_Fields"
import { Checkbox } from 'antd';

const FilterBar = ({setMinSalary,setMaxSalary,setJobType,setWorkModel,setJobFunction,setExperienceLevel}) => {
    const onChangeJobType = (checkedValues) => {
        setJobType(checkedValues);
      };
      const onChangeWorkMode = (checkedValues) => {
        setWorkModel(checkedValues);
      };
      const onChangeExperienceLevel = (checkedValues) => {
        setExperienceLevel(checkedValues);
      };
      const onChangeJobFunctions = (checkedValues) => {
        setJobFunction(checkedValues);
      };
      const onChangeMin =(e)=>{
        setMinSalary(e.target.value)
      }
    const onChangeMax =(e)=>{
        setMaxSalary(e.target.value)
      }
      
      const JobTypeOptions = ['All', 'Full-Time ', 'Part-Time','Internship','Contract'];
      const WorkModeOptions=['On-Site','Remote','Hybrid']
      const JobFunctionOptions=['Marketing','Engineering','Design','Sales','Customer Service']
      const ExperienceLevelOptions=['Fresher/Entry-Level','Junior','Mid-Level','Senior','Lead/Managerial','Director/Executive']
    return (
    <div className={style.FilterBar}>
        <div className={style.salaryMinMax}>
            <p className={style.SalaryRange}>Salary Range</p>
            <div className={style.buttonMinMaxSalary}>
              <Input placeHolder={"Min"} onChange={onChangeMin}></Input>
              <Input placeHolder={"Max"} onChange={onChangeMax}></Input>
            </div>
        </div>

        <div className={style.selectionFilterCountainer}>
            <p className={style.SalaryRange}>Job Type</p>
            <div className={style.checkBox}>
            <Checkbox.Group options={JobTypeOptions}  onChange={onChangeJobType} className={style.checkBoxValue} />
            </div>
        </div>

        <div className={style.selectionFilterCountainer}>
            <p className={style.SalaryRange}>Work Mode</p>
            <div className={style.checkBox}>
            <Checkbox.Group options={WorkModeOptions}  onChange={onChangeWorkMode} className={style.checkBoxValue} />
            </div>
        </div>

        <div className={style.selectionFilterCountainer}>
            <p className={style.SalaryRange}>Job Functions</p>
            <div className={style.checkBox}>
            <Checkbox.Group options={JobFunctionOptions}  onChange={onChangeJobFunctions} className={style.checkBoxValue} />
            </div>
        </div>

        <div className={style.selectionFilterCountainer}>
            <p className={style.SalaryRange}>Experience Level</p>
            <div className={style.checkBox}>
            <Checkbox.Group options={ExperienceLevelOptions}  onChange={onChangeExperienceLevel} className={style.checkBoxValue} />
            </div>
        </div>

      
    </div>
  )
}

export default FilterBar

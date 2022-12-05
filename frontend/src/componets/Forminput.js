import React from 'react'

const Forminput = (values) => {
  return (
    <>
        <label>{values.label}</label>
        <input type={values.type} id={values.id} name={values.name} placeholder={values.placeholder} value={values.value} onChange={e => values.handleChange(e)} />
    </>
  )
}

export default Forminput
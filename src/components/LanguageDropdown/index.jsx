import './styles.scss'
import { useState } from 'react'
import FlagBrasil from '../../assets/flag-brasil.png'
import FlagEua from '../../assets/flag-eua.png'
import Select from 'react-select'

export const LanguageDropdown = () =>{
  const I18N_STORAGE_KEY = 'i18nextLng'
  const [language] = useState(localStorage.getItem(I18N_STORAGE_KEY))

  const handleSelectChange = (option) => {
    localStorage.setItem(I18N_STORAGE_KEY, option.value)
    window.location = window.location
  }
  
  const options = [
    { value: 'pt-BR', label: 'Portuguese', flag: FlagBrasil },
    { value: 'en', label: 'English', flag: FlagEua },
  ]

  const selectedOption = options.find((option) => option.value === language)
  const placeholder = selectedOption ? (
    <>
      <img src={selectedOption.flag} alt={selectedOption.label}/>
    </>
  ) : 'Select Language'


  return(
    <Select
      className="language"
      options={options}
      value={language}
      onChange={handleSelectChange}
      placeholder={placeholder}
      getOptionLabel={(option) => (
        <div className='option'>
          <img src={option.flag} alt={option.label}/>
          {option.label}
        </div>
      )}
    />
  )
}
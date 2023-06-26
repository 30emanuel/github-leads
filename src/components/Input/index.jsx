import './styles.scss'

export const Input = ({name, onChange, value, type}) =>{
    return(
        <input type={type} name={name} required onChange={onChange} value={value} />
    )
}
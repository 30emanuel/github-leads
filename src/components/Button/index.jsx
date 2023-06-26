import './styles.scss'

export const Button = ({disabled, style , text, onClick}) =>{
    return(
        <div className="container-btn">
            <button className={style} disabled={disabled} onClick={onClick}>{text}</button>
        </div>
    )
}
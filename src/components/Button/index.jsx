import './styles.scss'

export const Button = ({disabled, style , text, onClick, infoText}) =>{
    return(
        <div className="container-btn">
            <button className={style} disabled={disabled} onClick={onClick}>
                {text}
                {disabled && <span className="tooltiptext">{infoText}</span>}
            </button>
        </div>
    )
}
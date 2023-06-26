import './styles.scss'

export const ProgressBar = ({ progress }) => {
    return (
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
    )
};

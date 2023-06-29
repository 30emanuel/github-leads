import './styles.scss'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { gerateFile } from '../../helpers/gerateFile';
import { ProgressBar } from '../../components/ProgressBar';
import { useTranslation } from 'react-i18next';
import { i18n } from '../../translate/i18n';

export const Search = () => {
  const {owner, repository} = useParams()
  const GITHUB_STORAGE_KEY = 'KEY_GITHUB'
  const gitKey = localStorage.getItem(GITHUB_STORAGE_KEY)
  const [progress, setProgress] = useState(0)
  const [progressMsg, setProgressMsg] = useState('')
  const [index, setIndex] = useState(0)
  const [totalSearches, setTotalSearches] = useState(0)
  const { t } = useTranslation('search', { i18n })

  const downloadFile = async (owner, repository, gitKey) =>{
    const messages = t('gerateFileMsgs', { returnObjects: true })
    const file = await gerateFile(owner, repository, gitKey, setTotalSearches, setIndex , setProgress, setProgressMsg, messages)
    localStorage.removeItem(GITHUB_STORAGE_KEY)

    if(file){
      Swal.fire({
        title: messages.modals.success.title,
        text: messages.modals.success.text,
        confirmButtonText: 'Download',
        confirmButtonColor: 'var(--color-fourth)',
        customClass: 'modal-success'
      }).then((result) => {
        if (result.isConfirmed) {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(file)
          link.download = `${owner}/${repository}.xlsx`
          link.click()
          URL.revokeObjectURL(link.href)
        }
        window.location.assign(`/`)
      })
    }
  }

  useEffect(() => {
    downloadFile(owner, repository, gitKey)
  }, [owner, repository, gitKey]);
  
  return(
    <div className='search'>
      <header>
        <h1>{t('texts.title')}</h1>
        <h3>{t('texts.caption')}<a target='_blank' href='https://www.githubstatus.com' rel="noreferrer">{t('texts.link')}</a></h3>
      </header>
      <div className='progress'>
        <ProgressBar progress={progress}/>
        <h2>{progressMsg}</h2>
        <div className="progress-info">
          {index > 0 &&
          (<h2><span>{index}</span> {t('texts.progressTo')} {totalSearches}</h2>)}
        </div>
      </div>
      <footer>
        <h3>{t('texts.footer')}</h3>
      </footer>
    </div>
  )
}
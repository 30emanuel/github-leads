import './styles.scss'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { gerateFile } from '../../helpers/gerateFile';
import { ProgressBar } from '../../components/ProgressBar';

export const Search = () => {
  const {owner, repository, token} = useParams()
  const [progress, setProgress] = useState(0)
  const [progressMsg, setProgressMsg] = useState('Buscando usersnames...')
  const [index, setIndex] = useState(0)
  const [totalSearches, setTotalSearches] = useState(0)

  const downloadFile = async (owner, repository, token) =>{
    const file = await gerateFile(owner, repository, token, setTotalSearches , setIndex , setProgress, setProgressMsg)

    if(file){
      Swal.fire({
        title: 'Processamento concluído',
        text: 'Os dados foram buscados e formatados com sucesso, clique no botão abaixo para fazer o download da planilha',
        confirmButtonText: 'Download',
        confirmButtonColor: 'var(--color-fourth)',
        customClass: 'modal-success'
      }).then((result) => {
        if (result.isConfirmed) {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(file)
          link.download = `${repository}.xlsx`
          link.click()
          URL.revokeObjectURL(link.href)
        }
        window.location.assign(`/`)
      })
    }
  }

  useEffect(() => {
    downloadFile(owner, repository, token)
  }, []);
  
  return(
    <div className='search'>
      <header>
        <h1>Por favor, aguarde...</h1>
        <h3>O tempo de espera dependerá da quantidade de dados buscados, e da disponibilidade da api do github, você pode verificar a integridade da api <a target='_blank' href='https://www.githubstatus.com' rel="noreferrer">clicando aqui</a></h3>
      </header>
      <div className='progress'>
        <ProgressBar progress={progress}/>
        <h2>{progressMsg}</h2>
        <div className="progress-info">
          {index > 0 &&
          (<h2><span>{index}</span> de {totalSearches}</h2>)}
        </div>
      </div>
      <footer>
        <h3>Este processo pode durar até 20 minutos, portanto, pegue um café e relaxe, deixe que fazemos o trabalho duro para você</h3>
      </footer>
    </div>
  )
}
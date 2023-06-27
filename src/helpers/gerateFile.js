import axios from "axios"
import * as Excel from "exceljs";
import Swal from 'sweetalert2';

const workbook = new Excel.Workbook()
const worksheet = workbook.addWorksheet('My Sheet')

worksheet.columns = [
  { header: 'Name', key: 'name', width: 30 },
  { header: 'Email', key: 'email', width: 50 },
  { header: 'Location', key: 'location', width: 50 },
  { header: 'Hireable', key: 'hireable', width: 10 },
  { header: 'Blog', key: 'blog', width: 50 },
  { header: 'Company', key: 'company', width: 20 },
  { header: 'Created At', key: 'created_at', width: 30 },
]

export const gerateFile = async (owner, repository, token, setTotalSearches , setIndex , setProgress, setProgressMsg) =>{

  const fetchUsers = async (users) =>{
    setProgressMsg('Reunindo informações...')
    setTotalSearches(users.length)
    let index = 0
    for (const user of users) {
      index++
      setIndex(index)
      const responseUser = await axios.get(user.url, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        
      let { name, email, location , hireable , blog, company , created_at, } = responseUser.data;

      if(hireable === true){
        hireable = 'Yes'
      }else{
        hireable = 'No'
      }
      
      if(company === null){
        company = 'No Company'
      }
        
      if (email !== null && name?.length > 0) {
        await worksheet.addRow({ name, email, location, hireable, blog, company, created_at, });
      }
      setProgress(((index / users.length) * 75) + 25)
    }
  }

  try {
    const per_page = 100
    let page = 1 
    let response
    let users = []
    let rateLimit
    
    while (response?.data?.length !== 0) {
      response = await axios.get(
          `https://api.github.com/repos/${owner}/${repository}/stargazers?page=${page}&per_page=${per_page}`,
          {
              headers: {
                  Authorization: `Token ${token}` 
              }
          }
      )
  
      rateLimit = response.headers['x-ratelimit-remaining']
      users.push(...response.data)
      page++
    }
    setProgress(25)
    if(users.length > rateLimit){
      await Swal.fire({
        icon: 'warning',
        title: 'Aviso',
        text: `O número de chamadas é ${users.length}, mas a chave possui um limite atual de apenas ${rateLimit}. Você gostaria de buscar essa quantidade de dados possíveis?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--color-fourth)',
        cancelButtonColor: 'var(--color-primary)',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        customClass: 'modal-warning'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await fetchUsers(users.slice(0, rateLimit))
        } else {
          window.location.assign(`/`)
        }
      })
    }else{
      await fetchUsers(users)
    }

    const buffer = await workbook.xlsx.writeBuffer()
    const file = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    
    return file
  
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Repositorio não existe ou key invalida',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'var(--color-primary)',
      customClass: 'modal-erro'
    }).then(async(result) => {
      window.location.assign(`/`)
    })
    return null
  }
  
}
import React from "react"
import { useState } from "react";
import './styles.scss'
import Logo from '../../assets/logo.png'
import { Button } from "../../components/Button";
import { Faq } from "../../components/Faq";
import Swal from 'sweetalert2'
import { testKey } from "../../helpers/testKey";
import { Input } from "../../components/Input";


export const Main = () =>{
    const [formData, setFormData] = useState({
        repoUrl: '',
        key: ''
    })
    const [disabledButton, setDisabledButton] = useState(true)
    const [rateLimit, setRateLimit] = useState(0)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })

        if(name === 'key'){
            setRateLimit(0)
            setDisabledButton(true)
        }

    }

    const handleForm = (e) => {
        e.preventDefault()
        const url = formData.repoUrl.replace("https://", "")
        const parts = url.split("/")
        const owner = parts[1]
        const repository = parts[2]

        if(!formData.repoUrl.includes('github.com/') || !owner || !repository || formData.key === ''){
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Informe uma url valida',
                confirmButtonText: 'Ok',
                customClass: 'modal-erro',
                confirmButtonColor: 'var(--color-primary)',
            })
        }else{
            window.location.assign(`/search/${owner}/${repository}/${formData.key}`)
        }
    }

    const handleValidateKey = async (e) =>{
        e.preventDefault()
        const response = await testKey(formData.key)
        setDisabledButton(!response.isValid)
        setRateLimit(response.rateLimit)

        if(response.isValid ){
            Swal.fire({
                icon: 'success',
                title: 'Key valida',
                confirmButtonText: 'Ok',
                customClass: 'modal-sucess',
                confirmButtonColor: 'var(--color-fourth)',
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Informe uma key valida',
                confirmButtonText: 'Ok',
                customClass: 'modal-erro',
                confirmButtonColor: 'var(--color-primary)',
            })
        }
    }

    return(
        <div className="main">
            <header>
                <img src={Logo} alt="Logo" />
                <h1>Git Leads</h1>
                <h2>Consiga leads de desenvolvedores pelo github</h2>
            </header>
            <section className="container">
                <form >
                    <p>Qual repositório deseja pesquisar ?</p>
                    <Input type='text' value={formData.repoUrl} name='repoUrl' onChange={handleInputChange}/>
                    <p>Sua api-key. Não sabe onde encontrar ? <a target="_blank" href="https://docs.github.com/pt/authentication/connecting-to-github-with-ssh/managing-deploy-keys#set-up-deploy-keys" rel="noreferrer">Clique aqui</a></p>
                    <div className="key">
                        <Input type='text' value={formData.key} name='key' onChange={handleInputChange}/>
                        <Button infoText={'Informe uma key'} onClick={handleValidateKey} style='validate' text={'Validar'} disabled={!formData.key.length > 0}/>
                    </div>
                    <div className="limitRate">
                        {rateLimit > 0 &&
                        <h3>Voce pode fazer mais <span>{rateLimit}</span> chamadas para essa api-key nessa hora</h3>
                        }
                    </div>
                    <Button infoText={'Valide sua key'} onClick={handleForm} style='submit' disabled={disabledButton} text={'Give Me The Data'}/>
                </form>
            </section>
            <Faq/>
        </div>
    )
}
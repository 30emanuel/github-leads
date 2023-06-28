import React, { useState } from "react"
import './styles.scss'
import Logo from '../../assets/logo.png'
import { Button } from "../../components/Button";
import { Faq } from "../../components/Faq";
import Swal from 'sweetalert2'
import { testKey } from "../../helpers/testKey";
import { Input } from "../../components/Input";
import { useTranslation } from 'react-i18next';
import { i18n } from '../../translate/i18n';


export const Main = () =>{
    const [formData, setFormData] = useState({
        repoUrl: '',
        key: ''
    })
    const I18N_STORAGE_KEY = 'i18nextLng'
    const [disabledButton, setDisabledButton] = useState(true)
    const [rateLimit, setRateLimit] = useState(0)
    const [language] = useState(localStorage.getItem(I18N_STORAGE_KEY))
    const { t } = useTranslation('main', { i18n })

    const handleSelectChange = (event) =>{
        localStorage.setItem(I18N_STORAGE_KEY, event.target.value)
        window.location = window.location
    }

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
                title: t('modals.urlInvalid.title'),
                text: t('modals.urlInvalid.text'),
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
                title: t('modals.keyValid.title'),
                confirmButtonText: 'Ok',
                customClass: 'modal-success',
                confirmButtonColor: 'var(--color-fourth)',
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: t('modals.keyInvalid.title'),
                text: t('modals.keyInvalid.text'),
                confirmButtonText: 'Ok',
                customClass: 'modal-erro',
                confirmButtonColor: 'var(--color-primary)',
            })
        }
    }

    return(
        <div className="main">
            <div className="language">
                <select onChange={handleSelectChange} value={language} >
                    <option value="pt-BR">PT-BR</option>
                    <option value="en-US">EN</option>
                </select>
            </div>
            <header>
                <img src={Logo} alt="Logo" />
                <h1>{t('titles.title')}</h1>
                <h2>{t('titles.caption')}</h2>
            </header>
            <section className="container">
                <form >
                    <p>{t('form.repository')}</p>
                    <Input type='text' value={formData.repoUrl} name='repoUrl' onChange={handleInputChange}/>
                    <p>{t('form.key.paragraph')}<a target="_blank" href="https://docs.github.com/pt/authentication/connecting-to-github-with-ssh/managing-deploy-keys#set-up-deploy-keys" rel="noreferrer">{t('form.key.link')}</a></p>
                    <div className="key">
                        <Input type='text' value={formData.key} name='key' onChange={handleInputChange}/>
                        <Button 
                        text={t('form.buttons.validateKey.text')} 
                        infoText={t('form.buttons.validateKey.infoText')} 
                        onClick={handleValidateKey} 
                        style='validate' 
                        disabled={!formData.key.length > 0}
                        />
                    </div>
                    <div className="limitRate">
                        {rateLimit > 0 &&
                        <h3>{t('rateLimit.text', {
                            rateLimit: rateLimit
                        })}</h3>
                        }
                    </div>
                    <Button 
                    text={t('form.buttons.submit.text')}
                    infoText={t('form.buttons.submit.infoText')} 
                    onClick={handleForm} 
                    style='submit' 
                    disabled={disabledButton} 
                    />
                </form>
            </section>
            <Faq/>
        </div>
    )
}
import { Accordion } from '../Accordion'
import './styles.scss'
import { useTranslation } from 'react-i18next';
import { i18n } from '../../translate/i18n';


export const Faq = () =>{
    const { t } = useTranslation('faq', {i18n});
    const faqQuestions = t('questions', { returnObjects: true })

    return(
        <section className='faq'>
            <h2>FAQ</h2>
            <div className='questions'>
                {faqQuestions.map((question, i) => (
                    <Accordion key={i} question={question}/>
                ))}
            </div>
        </section>
    )
}
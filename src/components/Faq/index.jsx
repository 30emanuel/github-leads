import { Accordion } from '../Accordion'
import './styles.scss'


export const Faq = () =>{
    const faqQuestions = [
        {
            "title": "Como funciona ?",
            "response": "Buscamos pelo repositório do github pelas pessoas que curtiram aquele repositório e acompanham, em seguida, mapeamos aqueles usuários que tem o perfil público, e obtemos dados de email, data de criação, nome, etc, utilizando da própia api do github para tal, então, ao final do processo é gerado uma planilha com o consolidado de dados."
        },
        {
            "title": "Tem limite ?",
            "response": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus fugiat veritatis optio, maxime assumenda quis eligendi illo distinctio sapiente voluptates voluptatibus dolorem ut saepe, ducimus, dolores perspiciatis cum consequatur id?"
        },

    ]

    return(
        <section>
            <h2>FAQ</h2>
            <div className='questions'>
                {faqQuestions.map((question, i) => (
                    <Accordion key={i} question={question}/>
                ))}
            </div>
        </section>
    )
}
import styles from '../../style/pages/authentification/Login.module.scss'
import registerLogin from '../../interfaces/RegisterLogin'
import { useState } from 'react'
import axios from 'axios';

const Register: React.FC<registerLogin> = ({ registerLoginHandler }) => {

    const axios = require('axios')
    const [form, setForm] = useState<any>([])
    const [name, setName] = useState('')
    const [file, setFile] = useState()
    const stateHandler = () => {
        registerLoginHandler()
    }
   
    const formHandler = (e:any) => {
        setForm([name])
        console.log('123')
    }
    const buttonHandler = (e:any) => {
        e.preventDefault()

        axios({             
            url: "http://localhost:3030/api/user",             
            method:"post",             
            data: {                 
                firstname : "test",                 
                password: "test",
                img:{
                    data: "test",
                    contentType:"test"
                }          
            },             
            withCredentials: true,             
            /* auth: {                 
                username: username,                 
                password: password             
            }  */        
        }).then((res:any)=>res.data)   
    }
    const nameHandler = (e: any) => {
        setName(e.target.value)
    }

    const fileHandler = (e: any) => {
        setFile(e.target)
        console.log(e.target.value)
    }


    return (
        <div className={styles.container}>
            {/* <form  onSubmit="localhost:3030/api/createUserCollection" method='POST'> */}
            <form  onSubmit={formHandler}>
                <div className={styles.title}>
                    <h2>Inscrivez-vous</h2>
                </div>
                <div className={styles.form}>
                    <div>
                        <label htmlFor=""></label>
                        <input onChange={nameHandler} type="text" name="" id="" placeholder='Nom' />
                    </div>
                    <div>
                        <label htmlFor=""></label>
                        <input type="text" name="" id="" placeholder='Prénom' />
                    </div>
                    <div>
                        <label htmlFor=""></label>
                        <input type="text" name="" id="" placeholder='Adresse mail' />
                    </div>
                    <div>
                        <label htmlFor=""></label>
                        <input type="text" name="" id="" placeholder='Téléphone' />
                    </div>
                    <div>
                        <label htmlFor=""></label>
                        <input type="text" name="" id="" placeholder='Mot de passe' />
                    </div>
                    <div>
                        <label htmlFor=""></label>
                        <input type="text" name="" id="" placeholder='Confirmation du mot de passe'/>
                    </div>
                    <div>
                        <input type="file" onChange={fileHandler} />
                    </div>

                </div>
                <div className={styles.connection}>
                    <button onClick={buttonHandler}>Inscription</button>
                    <p>Vous avez déjà un compte ? <span onClick={stateHandler}>Connectez-vous</span></p>
                </div>
            </form>
        </div>
    )
}

export default Register
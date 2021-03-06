/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from 'src/hooks/useNavigation'
import { useAuth } from 'src/hooks/useAuth'

import { Header } from 'src/components/Header'
import { Container } from 'src/components/Dashboard/Container'
import { CLogin } from 'src/components/Dashboard/Login'
import { CSignUp } from 'src/components/Dashboard/SignUp'
import { CAbout } from 'src/components/Dashboard/About'
import { CAddProduct } from 'src/components/Dashboard/AddProduct'
import { CProductList } from 'src/components/Dashboard/ProductList'
import { CContact } from 'src/components/Dashboard/Contact'
import { ReAnimated } from 'src/components/reAnimated'
import { CButton } from 'src/components/Button'

import styles from './home.module.scss'
import { useEffect } from 'react'

export function Home() {
    const { currentComponent, changeCurrentComponent } = useNavigation()
    const { user } = useAuth()

    useEffect(()=> {
        if(!user) {
            changeCurrentComponent('Login')
            return;
        }
    }, [])

    return (
        <div
          className={styles.homeContainer}
        >
            <Header />
            <Container>
                { (currentComponent==='AddProduct' && user) && (<CAddProduct />) }

                { (currentComponent==='About' && user) && (<CAbout />) }
                { (currentComponent==='About' && !user) && (
                    <ReAnimated text="Awaiting user to get in..">
                        <CButton className={styles.redirect} onClick={()=>changeCurrentComponent('Login')}>
                            <span>Go login</span>
                        </CButton>
                    </ReAnimated>
                ) }

                { (currentComponent==='Login' && !user) && (<CLogin />) }
                { (currentComponent==='SignUp' && !user) && (<CSignUp />)}

                { (currentComponent==='ProductList' && user) && (<CProductList />) }
                { (currentComponent==='ProductList' && !user) && (
                    <ReAnimated text="Awaiting user to get in..">
                        <CButton className={styles.redirect} onClick={()=>changeCurrentComponent('Login')}>
                            <span>Go login</span>
                        </CButton>
                    </ReAnimated>
                ) }

                { (currentComponent==='Contact' && user) && (<CContact />) }
                { (currentComponent==='Contact' && !user) && (
                    <ReAnimated text="Awaiting user to get in..">
                        <CButton className={styles.redirect} onClick={()=>changeCurrentComponent('Login')}>
                            <span>Go login</span>
                        </CButton>
                    </ReAnimated>
                ) }

                { (!currentComponent && !user) && (<ReAnimated text="Loading data.." />) }
            </Container>
        </div>
    )
}
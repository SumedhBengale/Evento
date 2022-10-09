import { Auth, Storage } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import NavigationBar from '../../Components/NavigationBar/NavigationBar'
import CertificateCard from './CertificateCard'

function Certificates() {
    const [certificates, setCertificates] = useState(null)
    useEffect( () => {
        async function getCertificates() {
            const user = await Auth.currentAuthenticatedUser()
            setCertificates(await Storage.list('certificates/'+user.attributes['email']))
        }
        getCertificates()
    }, [])
    
  return (
    <>
        <NavigationBar></NavigationBar>
        <div>{
            certificates == null
            ? <div>No Certificates</div>
            : <div>{
                Array.from({length: Object.keys(certificates).length}, (_, index) => {
                    return <CertificateCard certificate={certificates[index]} key={index} />;
                  })
                }</div>
            }</div>

    </>
  )
}

export default Certificates
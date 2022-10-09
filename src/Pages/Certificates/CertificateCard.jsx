import { Storage } from 'aws-amplify'
import React, { useEffect, useState } from 'react'

function CertificateCard(props) {
    const [cert, setCert] = useState(null)

    useEffect(() => {
        async function getCertificate() {
            var cert = await Storage.get(props.certificate['key'])
            setCert(cert)
        }
      getCertificate()
    }, [])
    
  return (
    <>  
        <div>{cert == null 
        ?   <div>Loading</div> 
        :   <img src={cert}></img>
         }</div>
    </>
  )
}

export default CertificateCard
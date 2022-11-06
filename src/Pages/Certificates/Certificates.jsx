import { Auth, Storage } from "aws-amplify";
import React, { useEffect, useState } from "react";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import CertificateCard from "./CertificateCard";

function Certificates() {
  const [certificates, setCertificates] = useState(null);
  useEffect(() => {
    async function getCertificates() {
      const user = await Auth.currentAuthenticatedUser();
      setCertificates(
        await Storage.list("certificates/" + user.attributes["email"])
      );
    }
    getCertificates();
  }, []);

  return (
    <>
      <NavigationBar></NavigationBar>
      <div>
        {certificates == 0 || certificates == null ? (
          <div className="flex h-screen justify-center items-center">
            <img src="nothing.png"></img>
          </div>
        ) : (
          <div>
            <div className="grid lg:grid-cols-3 grid-cols-1">
              {Array.from(
                { length: Object.keys(certificates).length },
                (_, index) => {
                  return (
                    <div className="p-2 bg-slate-100 rounded-lg justify-center hover:scale-105 ease-in m-5 duration-75">
                      <CertificateCard
                        certificate={certificates[index]}
                        key={index}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Certificates;

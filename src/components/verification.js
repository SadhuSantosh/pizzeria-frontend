import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import VerificationImage from '../assets/pizza-verification.webp';
import { constants } from '../constants';

export default function EmailVerification({ setAppBar }) {
    const { id } = useParams()

    async function getVerified(id) {
        fetch(`${constants.API_BASE_URL}/user/verification/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res.message);
            })

    }
    useEffect(() => {
        getVerified(id);
    }, [id]);
    const history = useHistory();
    return (<>
        <div onClick={() => { history.push('/login') }} style={{ display: "flex", background: "#3f9eff", height: "100vh", width: "100%" }}>
            <img src={VerificationImage} style={{ margin: "auto" }} alt="verification" height="600px" />
        </div>
    </>);
}


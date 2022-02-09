import React, {useEffect} from 'react';

const Alert = (props)=>{
    const alertStyle = {
        color: 'red',
        fontSize: '20px',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center'
    }
    const {alert, removeAlert} = props;

    // removing the alert by passing on empty parameters 
    useEffect(()=>{
        const alertTimeout = setTimeout(()=>{
            removeAlert();
        },3000);
        return (()=>{
            clearTimeout(alertTimeout);
        })
    },[])
    return (
        <div style={alertStyle}>
            <div>
                {alert.message}
            </div>
        </div>
    )
};

export default Alert;
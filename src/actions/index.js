
import * as firebase from 'firebase';


export function signupAction(user) {

    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.pass)
            .then(() => {
                var ref = firebase.database().ref("signup/"+firebase.auth().currentUser.uid)
                ref.set({
                    name: user.name,
                    contact: user.contact,
                    email: user.email,
                })

            })




    }
}
export function details(user){
    return (dispatch)=>{
        
        dispatch({ type:"name" , payload: user.name })
        
        dispatch({ type:'email' , payload: user.email })
        
        dispatch({ type: 'contact', payload: user.contact}) 

    }
}
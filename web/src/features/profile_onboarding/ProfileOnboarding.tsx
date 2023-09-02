interface Props {
    username: string
}

// user is logged in, profile isn't created.
// we show a button to let user create a profile
// full of magic and whimsy 
// hehe
export const ProfileOnboarding = ({username}: Props) => {

    return (<div>This place could be yours, Create Profile?</div>)
}
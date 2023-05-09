export async function efetuarLogin(login) {
    try {
        const token = await fetch(
            'http://ec2-3-87-247-74.compute-1.amazonaws.com/authenticate/token', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'apikey': '015113800726989931734222ed16193979f96c30'
                },
                body: JSON.stringify(login)
            }
        )
        console.log('Sucesso ao ralizar login')
        return await token.json()
    } catch (error) {
        console.log('Erro ao realizar login')
        console.log(error)
    }
}
export async function salvarUsuario(usuario) {
    try {
        const response = await fetch(
            'http://ec2-54-166-238-5.compute-1.amazonaws.com/usuarios/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'apikey': '08372311f6a85eefb262763d6a5166dc6cb50e86'
            },
            body: JSON.stringify(usuario)
            
        })
        // console.log('Sucesso')
        const user = await response.json()
        console.log(user)
        return user
    } catch (error) {
        // console.log('Houve um erro')
        // console.log(error)
    }
}

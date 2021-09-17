let uri="https://accounts.spotify.com/api/token"

let dato1="grant_type=client_credentials"
let dato2="client_id=8a6257206d5d44c494835fc58814ce8d"
let dato3="client_secret=a486a025606c403aa621089d15b1f175"

let parametrosPOST={
    method:"POST",
    headers:{
        "Content-Type": 'application/x-www-form-urlencoded'
    },
    body:dato1+"&"+dato2+"&"+dato3
}

fetch(uri,parametrosPOST)
.then(function(respuesta){
    return(respuesta.json())
})
.then(function(respuesta){
    generarToken(respuesta)
})
.catch(function(error){
    console.log(error)
})

function generarToken(respuesta){
    const token=respuesta.token_type+" "+respuesta.access_token;
    buscarCanciones(token)
}

function buscarCanciones(token){
    const uri="https://api.spotify.com/v1/artists/7hJcb9fa4alzcOq3EaNPoG/top-tracks?market=us"

    let parametros={
        method:"GET",
        headers:{
            Authorization:token
        }
    }

    fetch(uri,parametros)
    .then(function(respuesta){
        return(respuesta.json())
    })
    .then(function(respuesta){
        pintarDatos(respuesta)
    })
    .catch(function(error){
        console.log(error)
    })
}

function pintarDatos(datos){
    let fila=document.getElementById("fila")

    datos.tracks.forEach(function(cancion){
        let columna=document.createElement("div")
        columna.classList.add("col")

        let tarjeta=document.createElement("div")
        tarjeta.classList.add("card")
        tarjeta.classList.add("h-100")

        let audio=document.createElement("audio")
        audio.classList.add("w-100")
        audio.classList.add("mt-5")
        audio.setAttribute("controls","controls")
        audio.src=cancion.preview_url

        let imagen=document.createElement("img")
        imagen.classList.add("card-img-top")
        imagen.src=cancion.album.images[0].url

        let nombre=document.createElement("h2")
        nombre.textContent=cancion.name

        let popularidad=document.createElement("h5")
        popularidad.textContent="popularidad: "+cancion.popularity

        tarjeta.appendChild(imagen)
        tarjeta.appendChild(nombre)
        tarjeta.appendChild(popularidad)
        tarjeta.appendChild(audio)
        columna.appendChild(tarjeta)
        fila.appendChild(columna)
    })
}
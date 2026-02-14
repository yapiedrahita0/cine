let peliculas = JSON.parse(localStorage.getItem("peliculas"));

if (!peliculas || peliculas.length === 0) {
    peliculas = [
        {
            id: 1,
            titulo: "Inception",
            genero: "Ciencia Ficción",
            director: "Christopher Nolan",
            ano: 2010,
            calificacion: 8.8,
            descripcion: "Un ladrón especializado en robar secretos a través de los sueños recibe la misión de implantar una idea.",
            imagen: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
            fecha: new Date()
        },
        {
            id: 2,
            titulo: "The Dark Knight",
            genero: "Acción",
            director: "Christopher Nolan",
            ano: 2008,
            calificacion: 9.0,
            descripcion: "Batman enfrenta al Joker, quien busca sumir a Gotham en el caos.",
            imagen: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            fecha: new Date()
        },
        {
            id: 3,
            titulo: "Interstellar",
            genero: "Ciencia Ficción",
            director: "Christopher Nolan",
            ano: 2014,
            calificacion: 8.7,
            descripcion: "Exploradores viajan por un agujero de gusano para salvar la humanidad.",
            imagen: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
            fecha: new Date()
        },
        {
            id: 4,
            titulo: "Titanic",
            genero: "Drama",
            director: "James Cameron",
            ano: 1997,
            calificacion: 7.9,
            descripcion: "Una historia de amor a bordo del famoso Titanic.",
            imagen: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
            fecha: new Date()
        },
        {
            id: 5,
            titulo: "Avengers: Endgame",
            genero: "Acción",
            director: "Anthony y Joe Russo",
            ano: 2019,
            calificacion: 8.4,
            descripcion: "Los Vengadores intentan revertir el daño causado por Thanos.",
            imagen: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
            fecha: new Date()
        },
        {
            id: 6,
            titulo: "The Shawshank Redemption",
            genero: "Drama",
            director: "Frank Darabont",
            ano: 1994,
            calificacion: 9.3,
            descripcion: "Un hombre injustamente condenado encuentra esperanza en prisión.",
            imagen: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            fecha: new Date()
        },
        {
            id: 7,
            titulo: "Gladiator",
            genero: "Acción",
            director: "Ridley Scott",
            ano: 2000,
            calificacion: 8.5,
            descripcion: "Un general romano busca venganza tras ser traicionado.",
            imagen: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
            fecha: new Date()
        },
        {
            id: 8,
            titulo: "The Conjuring",
            genero: "Terror",
            director: "James Wan",
            ano: 2013,
            calificacion: 7.5,
            descripcion: "Investigadores paranormales ayudan a una familia aterrorizada.",
            imagen: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
            fecha: new Date()
        },
        {
            id: 9,
            titulo: "The Matrix",
            genero: "Ciencia Ficción",
            director: "Lana y Lilly Wachowski",
            ano: 1999,
            calificacion: 8.7,
            descripcion: "Un hacker descubre que la realidad es una simulación creada por máquinas.",
            imagen: "https://image.tmdb.org/t/p/w500/aoiC5FPLkz9bH9Kz6sZ3L9w6z8D.jpg",
            fecha: new Date()
        },
        {
            id: 10,
            titulo: "Coco",
            genero: "Aventura",
            director: "Lee Unkrich",
            ano: 2017,
            calificacion: 8.4,
            descripcion: "Un niño viaja al mundo de los muertos para descubrir su historia familiar.",
            imagen: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
            fecha: new Date()
        }
    ];

    localStorage.setItem("peliculas", JSON.stringify(peliculas));
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
    { user: "admin", password: "admin123" },
    { user: "usuario", password: "1234" },
    { user: "demo", password: "demo" }
];

let usuarioLogueado = localStorage.getItem("usuarioLogueado");
let peliculaEditandoId = null;

const loginSection = document.getElementById("loginSection");
const mainContent = document.getElementById("mainContent");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const btnAgregar = document.getElementById("btnAgregar");

const gridPeliculas = document.getElementById("gridPeliculas");
const carouselMovies = document.getElementById("carouselMovies");
const sinResultados = document.getElementById("sinResultados");

const inputBuscar = document.getElementById("inputBuscar");
const selectGenero = document.getElementById("selectGenero");

const modalPelicula = new bootstrap.Modal(document.getElementById("modalPelicula"));
const modalDetalles = new bootstrap.Modal(document.getElementById("modalDetalles"));


document.addEventListener("DOMContentLoaded", () => {
    if (usuarioLogueado) mostrarApp();
    renderPeliculas();
});


document.getElementById("formLogin").addEventListener("submit", e => {
    e.preventDefault();
    const user = inputUser.value;
    const pass = inputPassword.value;

    const existe = usuarios.find(u => u.user === user && u.password === pass);

    if (existe) {
        localStorage.setItem("usuarioLogueado", user);
        mostrarApp();
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

document.getElementById("formRegistro").addEventListener("submit", e => {
    e.preventDefault();

    const user = inputUserReg.value;
    const pass = inputPasswordReg.value;
    const confirm = inputConfirmPassword.value;

    if (pass !== confirm) return alert("Las contraseñas no coinciden");
    if (usuarios.find(u => u.user === user)) return alert("Usuario ya existe");

    usuarios.push({ user, password: pass });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario registrado correctamente");
});

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    location.reload();
});

function mostrarApp() {
    loginSection.style.display = "none";
    mainContent.style.display = "block";
    btnLogin.style.display = "none";
    btnLogout.style.display = "inline-block";
    btnAgregar.style.display = "inline-block";
}


btnGuardarPelicula.addEventListener("click", () => {
    const nueva = {
        id: peliculaEditandoId || Date.now(),
        titulo: inputTitulo.value,
        genero: inputGenero.value,
        director: inputDirector.value,
        ano: inputAno.value,
        calificacion: inputCalificacion.value,
        descripcion: inputDescripcion.value,
        imagen: inputImagen.value,
        fecha: new Date()
    };

    if (peliculaEditandoId) {
        peliculas = peliculas.map(p => p.id === peliculaEditandoId ? nueva : p);
        peliculaEditandoId = null;
    } else {
        peliculas.push(nueva);
    }

    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    renderPeliculas();
    modalPelicula.hide();
    formPelicula.reset();
});


function renderPeliculas() {
    gridPeliculas.innerHTML = "";
    carouselMovies.innerHTML = "";

    let texto = inputBuscar.value.toLowerCase();
    let genero = selectGenero.value;

    let filtradas = peliculas.filter(p =>
        p.titulo.toLowerCase().includes(texto) &&
        (genero === "" || p.genero === genero)
    );

    sinResultados.style.display = filtradas.length === 0 ? "block" : "none";

    filtradas.forEach(p => {
        gridPeliculas.innerHTML += `
        <div class="col-md-4 col-lg-3">
            <div class="movie-card">
                <img src="${p.imagen}" class="movie-image">
                <div class="movie-content">
                    <div class="movie-title">${p.titulo}</div>
                    <div class="movie-genre">${p.genero}</div>
                    <div class="movie-meta">${p.director} - ${p.ano}</div>
                    <div class="movie-rating">${p.calificacion} ⭐</div>
                    <div class="movie-description">${p.descripcion}</div>
                    <div class="movie-actions">
                        <button class="btn btn-info btn-sm" onclick="verDetalles(${p.id})">Ver</button>
                        <button class="btn btn-warning btn-sm" onclick="editarPelicula(${p.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarPelicula(${p.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>`;

        carouselMovies.innerHTML += `
        <div class="slider-movie-card" onclick="verDetalles(${p.id})">
            <img src="${p.imagen}">
            <div class="slider-movie-info">
                <h6>${p.titulo}</h6>
            </div>
        </div>`;
    });
}


function verDetalles(id) {
    const p = peliculas.find(p => p.id === id);

    detallesTitulo.innerText = p.titulo;
    detallesGenero.innerText = p.genero;
    detallesDirector.innerText = p.director;
    detallesAno.innerText = p.ano;
    detallesCalificacion.innerText = p.calificacion;
    detallesDescripcion.innerText = p.descripcion;
    detallesImagen.src = p.imagen;

    modalDetalles.show();
}

function editarPelicula(id) {
    const p = peliculas.find(p => p.id === id);
    peliculaEditandoId = id;

    inputTitulo.value = p.titulo;
    inputGenero.value = p.genero;
    inputDirector.value = p.director;
    inputAno.value = p.ano;
    inputCalificacion.value = p.calificacion;
    inputDescripcion.value = p.descripcion;
    inputImagen.value = p.imagen;

    modalPelicula.show();
}

function eliminarPelicula(id) {
    if (!confirm("¿Eliminar película?")) return;
    peliculas = peliculas.filter(p => p.id !== id);
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    renderPeliculas();
}


inputBuscar.addEventListener("input", renderPeliculas);
selectGenero.addEventListener("change", renderPeliculas);


function scrollSlider(direction) {
    carouselMovies.scrollBy({
        left: direction * 300,
        behavior: "smooth"
    });
}


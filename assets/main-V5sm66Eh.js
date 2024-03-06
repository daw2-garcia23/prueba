(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const bd2 = [
  {
    autor: "Joel",
    fecha: " 20/11/2023",
    comentario: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) "
  },
  {
    autor: "Pedro",
    fecha: " 20/11/2023",
    comentario: " Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) "
  },
  {
    autor: "María",
    fecha: " 20/11/2023",
    comentario: " Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) "
  }
];
const tickets = [
  {
    codigo: "123",
    fecha: "20/01/2024",
    fechaResuelto: /* @__PURE__ */ new Date(),
    Aula: "DAW",
    Grupo: "1",
    Ordenador: "17",
    Descripcion: "No funciona el windows",
    Alumno: "Pedro Gómez",
    estat: "Resuelto"
  },
  {
    codigo: "456",
    fecha: /* @__PURE__ */ new Date(),
    Aula: "ASMX",
    Grupo: "2",
    Ordenador: "24",
    Descripcion: "Problemas al inciar sesión en usuario",
    Alumno: "Miguel Angel",
    estat: "Pendiente"
  },
  {
    codigo: "789",
    fecha: "11/11/2023",
    fechaResuelto: /* @__PURE__ */ new Date(),
    Aula: "DAM",
    Grupo: "3",
    Ordenador: "33",
    Descripcion: "Problemas con la red",
    Alumno: "Carlos Arrebola",
    estat: "Resuelto"
  },
  {
    codigo: "1010",
    fecha: "17/05/2021",
    fechaResuelto: /* @__PURE__ */ new Date(),
    Aula: "DAW",
    Grupo: "4",
    Ordenador: "1",
    Descripcion: "No enciende el PC",
    Alumno: "Will Smith",
    estat: "Resuelto"
  },
  {
    codigo: "1111",
    fecha: /* @__PURE__ */ new Date(),
    Aula: "DAM",
    Grupo: "5",
    Ordenador: "27",
    Descripcion: "El teclado no funciona",
    Alumno: "Bob Marley",
    estat: "Pendiente"
  }
];
const usuariosRegistrados = [
  {
    email: "joel@gmail.com",
    contraseña: "joel123"
  },
  {
    email: "carlos@gmail.com",
    contraseña: "carlos123"
  },
  {
    email: "marc@gmail.com",
    contraseña: "marc123"
  },
  {
    email: "diana@gmail.com",
    contraseña: "diana123"
  },
  {
    email: "pedro@gmail.com",
    contraseña: "pedro123"
  }
];
const comentario = (autor, fecha, comentario2) => {
  const template = `
    <div class="card p-3">
        <h5 class="text-end">Autor: <span>${autor}</span><span class="ms-4">${fecha}</span></h5>
         <span>${comentario2}</span>
     </div>
    `;
  return template;
};
const comentarios = {
  template: `
<div id="comentariosText">

</div>


`,
  script: () => {
    let html = "";
    bd2.forEach((item) => {
      html += comentario(item.autor, item.fecha, item.comentario);
    });
    document.querySelector("#comentariosText").innerHTML = html;
  }
};
const vistaMain = {
  template: `
   
    <div class="d-flex">
      <h1>Comentarios</h1><button class="btn btn-link ms-auto" id="volver">Volver</button>
    </div>


    <div class="">
      <form action="" class="form card p-3 shadow">
        <label for="comentario" class="form-label">Comentario: </label>
        <textarea class="form-control" col="3"></textarea>
        <label for="fecha" class="form-label me-2 mt-3">Fecha: </label>
        <div class="d-flex align-items-center">
          <input type="datetime-local" class="form-control w-25">
          <button class="btn btn-success ms-auto">Añadir comentario</button>
        </div>
      </form>
    
      <div class="mt-4" id="comentariosTexto">
          
      </div>
  
    `,
  script: () => {
    document.querySelector("#volver").addEventListener("click", () => {
      document.querySelector("main").innerHTML = panel.template;
      panel.pintarTickets();
    });
    document.querySelector("#comentariosTexto").innerHTML = comentarios.template;
    comentarios.script();
  }
};
const panel = {
  template: `<main class="container mt-5">
  <h1>Administración de incidencias</h1>
  <h2 class="mt-5">Tickets pendientes</h2>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>Código</th>
        <th>Fecha</th>
        
        <th>Aula</th>
        <th>Grupo</th>
        <th>Ordenador</th>
        <th>Descripción</th>
        <th>Alumno</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody id="ticketsPendientes">
     
    </tbody>
  </table>
  <h2 class="mt-5">Tickets resueltos</h2>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>Código</th>
        <th>Fecha</th>
        <th>Fecha resuelto</th>
        <th>Aula</th>
        <th>Grupo</th>
        <th>Ordenador</th>
        <th>Descripción</th>
        <th>Alumno</th>
      </tr>
    </thead>
    <tbody id="ticketsResueltos"> 

    </tbody>
  </table>
</main>
`,
  pintarTickets: () => {
    console.log("vamos a pintar los comentarios");
    let html1 = "";
    let html2 = "";
    for (let i = 0; i < tickets.length; i++) {
      const ticketHTMLResueltos = ` 
      <td>${tickets[i].codigo}</td> 
      <td>${tickets[i].fecha}</td>
      <td>${tickets[i].fechaResuelto}</td>
      <td>${tickets[i].Aula}</td>
      <td>${tickets[i].Grupo}</td>
      <td>${tickets[i].Ordenador}</td>
      <td>${tickets[i].Descripcion}</td>
      <td>${tickets[i].Alumno}</td>
      <td><button id="btnComentarResueltos" type="button" class="btn btn-primary"><i class="fa-regular fa-comment"></i></button></td>
      <td><button id="btnEliminarResueltos" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button></td>
     
    `;
      const ticketHTMLPendientes = ` 
      <td>${tickets[i].codigo}</td> 
      <td>${tickets[i].fecha}</td>
      <td>${tickets[i].Aula}</td>
      <td>${tickets[i].Grupo}</td>
      <td>${tickets[i].Ordenador}</td>
      <td>${tickets[i].Descripcion}</td>
      <td>${tickets[i].Alumno}</td>
      <td><button id="resolver" type="button" class="btn btn-success">Resolver</button></td>
      <td><button id="btnEditar" type="button" class="btn btn-warning"><i class="fa-solid fa-pen"></i></button></td>
      <td><button id="btnComentarPendientes" type="button" class="btn btn-primary"><i class="fa-regular fa-comment"></i></button></td>
      <td><button id="btnEliminarPendientes" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button></td>
    
    `;
      if (tickets[i].estat === "Resuelto") {
        html1 += `<tr>${ticketHTMLResueltos}</tr>`;
      } else {
        html2 += `<tr>${ticketHTMLPendientes}</tr>`;
      }
    }
    document.querySelector("#ticketsResueltos").innerHTML = html1;
    document.querySelector("#ticketsPendientes").innerHTML = html2;
    document.querySelector("#btnComentarPendientes").addEventListener("click", () => {
      console.log("dandole al botón para ver los comentarios");
      document.querySelector("main").innerHTML = vistaMain.template;
      vistaMain.script();
    });
    document.querySelector("#btnComentarResueltos").addEventListener("click", () => {
      console.log("dandole al botón para ver los comentarios");
      document.querySelector("main").innerHTML = vistaMain.template;
      vistaMain.script();
    });
  }
};
const registro = {
  template: `
      <div class="container">
          <div class="row justify-content-center mt-5"> 
              <div class="col-md-6">
                  <div class="card shadow rounded"> 
                      <div class="card-body">
                          <h2 class="mb-4 text-center">Registrarse</h2> 
                          <form id="formRegistro">
                              <div class="mb-3">
                                  <label for="nombre" class="form-label" required>Name</label>
                                  <input type="text" class="form-control" id="nombreRegistro" placeholder="Nombre">
                              </div>
                              <div class="mb-3">
                                  <label for="apellido" class="form-label" required>Surname</label>
                                  <input type="text" class="form-control" id="apellidoRegistro" placeholder="Apellido">
                              </div>
                              <div class="mb-3">
                                  <label for="email" class="form-label" required>Correo electrónico</label>
                                  <input type="email" class="form-control" id="emailRegistro" placeholder="usuario@example.com">
                              </div>
                              <div class="mb-3">
                                  <label for="contraseña" class="form-label" required>Contraseña</label>
                                  <input type="password" class="form-control" id="passwordRegistro" placeholder="Contraseña">
                              </div>
                              <div class="d-grid gap-2">
                                  <button type="submit" class="btn btn-primary" id="btnEntrarRegistro">Registrarse</button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `,
  script: () => {
    document.querySelector("#btnPanel").style.display = "none";
    document.querySelector("#btnComentarios").style.display = "none";
    document.querySelector("#btnEntrarRegistro").addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.querySelector("#emailRegistro").value;
      const contraseña = document.querySelector("#passwordRegistro").value;
      const nombre = document.querySelector("#nombreRegistro").value;
      if (nombre === "" || email === "" || contraseña === "") {
        Swal.fire({
          icon: "error",
          title: "Rellene todos los campos!!"
        });
        return;
      }
      if (usuariosRegistrados.find((usuario) => usuario.email === email)) {
        Swal.fire({
          icon: "error",
          title: "El usuario ya está registrado",
          text: "Por favor, utilice un correo electrónico diferente."
        });
        return;
      }
      const nuevoUsuario = { email, contraseña };
      usuariosRegistrados.push(nuevoUsuario);
      const usuariosGuardados = JSON.stringify(usuariosRegistrados);
      localStorage.setItem("usuarios", usuariosGuardados);
      Swal.fire({
        icon: "success",
        title: "Usuario registrado",
        text: "¡Gracias por registrarte!"
      }).then(() => {
        const nuevoUsuariosGuardados = localStorage.getItem("usuarios");
        console.log(nuevoUsuariosGuardados);
        const parseado = JSON.parse(nuevoUsuariosGuardados);
        console.log(parseado);
        document.querySelector("main").innerHTML = login.template;
        login.script();
      });
    });
  }
};
const login = {
  template: `
    <div class="container">
    <div class="row justify-content-center mt-5"> 
        <div class="col-md-6">
            <div class="card shadow rounded"> 
                <div class="card-body">
                    <h2 class="mb-4 text-center">Login</h2> 
                    <form id="formLogin">
                        <div class="mb-3">
                            <label for="email" class="form-label">Correo electrónico</label>
                            <input type="email" class="form-control" id="emailLogin" placeholder="usuario@example.com">
                        </div>
                        <div class="mb-3">
                            <label for="contraseña" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="passwordLogin" placeholder="Contraseña">
                        </div>
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary" id="btnEntrarLogin">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
  script: () => {
    document.querySelector("#btnPanel").style.display = "none";
    document.querySelector("#btnComentarios").style.display = "none";
    const usuariosGuardados = localStorage.getItem("usuarios");
    const usuariosGuardadosParse = JSON.parse(usuariosGuardados);
    console.log("usuarios disponibles para hacer login del localstorage", usuariosGuardadosParse);
    console.log("usuarios disponibles para hacer login de la bbdd   ", usuariosRegistrados);
    document.querySelector("#btnEntrarLogin").addEventListener("click", (event) => {
      event.preventDefault();
      const correo = document.querySelector("#emailLogin").value;
      const contraseña = document.querySelector("#passwordLogin").value;
      console.log("correo es: ", correo);
      console.log("contraseña es: ", contraseña);
      const usuario = usuariosRegistrados.find((user) => user.email === correo && user.contraseña === contraseña);
      if (usuario) {
        Swal.fire({
          icon: "success",
          title: "Bienvenido",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          document.querySelector("main").innerHTML = panel.template;
          panel.pintarTickets();
          document.querySelector("#btnLog").style.display = "none";
          document.querySelector("#btnReg").style.display = "none";
          document.querySelector("#btnPanel").style.display = "";
          document.querySelector("#btnComentarios").style.display = "";
          document.querySelector("#logout").innerHTML = '<button id="btnLogout" class="btn btn-outline-danger my-2 my-sm-0 " type="submit">Logout</button>';
          document.querySelector("#correoUsuario").innerHTML = "<p>Bienvenido, " + correo + "<p/>";
          document.querySelector("#btnLogout").addEventListener("click", () => {
            console.log("estas intentando desloguearte");
            localStorage.removeItem("usuarios");
            document.querySelector("main").innerHTML = registro.template;
            registro.script();
            document.querySelector("#btnLog").style.display = "";
            document.querySelector("#btnReg").style.display = "";
            document.querySelector("#btnPanel").style.display = "none";
            document.querySelector("#btnComentarios").style.display = "none";
            document.querySelector("#btnLogout").style.display = "none";
            document.querySelector("#correoUsuario").innerHTML = "";
          });
          document.querySelector("#btnEliminarResueltos").addEventListener("click", () => {
            console.log("Estas eliminando un comentario");
            tickets.findIndex((ticket) => ticket.codigo === codigo);
          });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en las credenciales"
        });
      }
    });
  }
};
const header = {
  template: `<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse d-flex justify-content-center align-items-center" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <p class="nav-link">Gestió d'incidències FPLLEFIA<span class="sr-only">(current)</span></p>
            </li>
        </ul>
        <div class="ps-2">
            <button id="btnPanel" class="btn btn-outline-success my-2 my-sm-0 " type="submit">Panel</button>
        </div>
        <div class="ps-2">
            <button id="btnComentarios" class="btn btn-outline-success my-2 my-sm-0 " type="submit">Comentarios</button>
        </div>  
        <div class="ps-2">
            <button id="btnReg"class="btn btn-outline-success my-2 my-sm-0" type="submit">Registro</button>
        </div>
        <div class="ps-2">
            <button id="btnLog" class="btn btn-outline-success my-2 my-sm-0 " type="submit">Login</button>
        </div>
        <div class="ps-2" id="logout">
        
        </div>
    </div>
    
    <div id="correoUsuario" class="d-flex justify-content-end pe-5">
                
    </div>
</nav>

`,
  script: () => {
    document.querySelector("#btnComentarios").addEventListener("click", () => {
      console.log("hola desde el boton de comentarios");
      document.querySelector("main").innerHTML = vistaMain.template;
      vistaMain.script();
    });
    document.querySelector("#btnReg").addEventListener("click", () => {
      console.log("hola desde el boton de registro");
      document.querySelector("main").innerHTML = registro.template;
      registro.script();
    });
    document.querySelector("#btnLog").addEventListener("click", () => {
      console.log("hola desde el boton de login");
      document.querySelector("main").innerHTML = login.template;
      login.script();
    });
    document.querySelector("#btnPanel").addEventListener("click", () => {
      console.log("hola desde el boton de panel");
      document.querySelector("main").innerHTML = panel.template;
      panel.pintarTickets();
    });
  }
};
document.querySelector("header").innerHTML = header.template;
header.script();
document.querySelector("main").innerHTML = panel.template;
panel.pintarTickets();

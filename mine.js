fetch("cuotas.JSON")
    .then((resp) => resp.json())
    .then((data) =>{
        //Recorremos las cuotas
    data.forEach((cuota) => {
    //Creamos la opción del select
    let option = document.createElement("option");
    option.value = cuota.cantidad;
    option.innerText = cuota.nombre;
    
    //Agregamos la opción al select
    select.append(option); 
});
        
    })

localStorage.clear();
sessionStorage.clear();

//Creo función cuotas
function agregarCuotaAHtml (cuota){
    let ul = document.createElement("ul");

    let li1 = document.createElement("li");
    li1.innerText = "Usted selecionó " + cuota.nombre;

    let li2 = document.createElement("li");
    li2.innerText = "Son " + cuota.cantidad + " cuotas sin interes";

    ul.append(li1, li2);

    contenedor.append(ul);
}
//Seleccionamos el contenedor
let contenedor = document.getElementById("contenedor"); 

//Seleccionamos el select
let select = document.getElementById("select-cuota");

//Creamos la opción nula
let optionNula = document.createElement("option");
optionNula.value = "";
optionNula.innerText = "Seleccionar forma de pago";
select.append(optionNula);


//Seleccionamos botón
let boton = document.getElementById("boton-1");
boton.addEventListener("click", () => {
    const valueSelect = select.value;

    if(valueSelect !== ""){
        const cuotaEncontrada = cuotas.find( (cuota) => {
            return cuota.cantidad == valueSelect;
        } );
        agregarCuotaAHtml(cuotaEncontrada);
       
        sessionStorage.setItem("Tipo", JSON.stringify(cuotaEncontrada.nombre)); //Envio al Session Storage, dentro del evento click.
        //Uso el metodo JSON.stringify para transformar el objeto en informacion

// alert(sessionStorage.getItem("Tipo")); //EJEMPLO del GETITEM
    }  
    //Seleccionamos botón ACEPTAR
let botonAceptar = document.getElementById("boton-2");
botonAceptar.addEventListener("click",()=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿ESTÁ DE ACUERDO CON LAS CUOTAS SELECCIONADAS?',
        text: "Puede modificar las cuotas",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ACEPTAR CUOTAS SELECCIONADAS',
        cancelButtonText: 'MODIFICAR LAS CUOTAS',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'ACEPTÓ LAS CUOTAS',
            'Gracias por elegirnos',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'MODIFICAR LAS CUOTAS',
            'Vuelva a elegir las cuotas',
            'error'
          )
        }
      })
})
})





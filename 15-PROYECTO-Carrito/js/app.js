//Variables
const shoppingCart= document.querySelector('#carrito');
const courseList= document.querySelector('#lista-cursos ');
const cartList=document.querySelector('#lista-carrito tbody');
const emptyCart= document.querySelector('#vaciar-carrito');
let itemsCart=[];


eventos();
function eventos(){

courseList.addEventListener('click',addCourse);

shoppingCart.addEventListener('click',removeCourse);
emptyCart.addEventListener('click',()=>{
    itemsCart=[];
    cleanHTML();


})

}


//Funciones
function addCourse(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const selectedCourse=e.target.parentElement.parentElement;

        dataRead(selectedCourse);
    }

}
function dataRead(dataCourse){

    const infoCourse={
            imagen: dataCourse.querySelector('img').src,
            titulo: dataCourse.querySelector('h4').textContent,
            precio: dataCourse.querySelector('.precio span').textContent,
            id: dataCourse.querySelector('a').getAttribute('data-id'),
            cantidad: 1
    }

    //revisar si un elemento existe
    const exist=itemsCart.some(dataCourse=> dataCourse.id === infoCourse.id);
    if(exist){
        const cursos=itemsCart.map(dataCourse=>{if(dataCourse.id===infoCourse.id){
                dataCourse.cantidad++;
                return dataCourse;
        }
        else{
            return dataCourse;
        }

    } 
            );

        itemsCart=[...cursos];
    }
    else{
        itemsCart=[...itemsCart,infoCourse];

    }
//agregar elementos carrito


    showCourseHTML();
}


function showCourseHTML(){

    cleanHTML();
    
    itemsCart.forEach(course=>{
        const {imagen,titulo,precio,cantidad,id}=course;
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="delete-course" data-id="${id}" > x </a>
        </td>
        `;
        cartList.appendChild(row);

    } 
        )


}
function cleanHTML(){
/*formaLenta    
cartList.innerHTML='';
*/
while(cartList.firstChild){
    cartList.removeChild(cartList.firstChild);
}

}
function removeCourse(e){
    e.preventDefault();
    if(e.target.classList.contains('delete-course')){

       const itemRemove= e.target.getAttribute('data-id');
        itemsCart=itemsCart.filter(course=> course.id !== itemRemove);
        showCourseHTML();
    }

}

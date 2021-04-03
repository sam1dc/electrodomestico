import { Component, OnInit,  Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

declare interface  inventarioInfo {
    nombre_del_equipo:string;
    descripcion:string;
    consumo_energetico:number;
    pesoKg:number;
    anchoCm:number;
    largoCm:number;
    alturaCm:number;
    imgprev:string;
}
let inventarioInfo: inventarioInfo; 



const inventario: inventarioInfo[] = [];


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit{

//Ouput: funcion que se usa para sacar o exportar una variable tipo <any> y objetos 
@Output() propagar = new EventEmitter<any>();
@Output() vistaform = new EventEmitter<boolean>();
@Input() boleanocompa:boolean;
//editar
@Input() editarForm;
@Input() inventarioEdit;
@Input() indexPosition:number;

  inventarioInfo = new FormGroup({ 
  nombre_del_equipo:  new FormControl("",[Validators.required]), 
  descripcion:  new FormControl(''),  
  consumo_energetico: new FormControl(0,[Validators.required]), 
  pesoKg: new FormControl(0, [Validators.required]), 
  anchoCm: new FormControl(0, [Validators.required]), 
  largoCm: new FormControl(0, [Validators.required]),  
  alturaCm: new FormControl(0, [Validators.required]),
  imgprev: new FormControl(''),
  check: new FormControl(false)
});

  name:string='';
  imgprev:string='assets/img/box.png';
  inventario: inventarioInfo[] = [];
  constructor() { 

  }

  ngOnInit(): void {
    this.inventarioInfo.reset();
  }

 
//subir una imagen
  changeListener($event): void {
    return this.readThis($event.target);
   }

    readThis(inputValue: any): void {


        var file: File = inputValue.files[0];
     if (!file.type.match('image.*')) {
       alert("NO ES UNA IMAGEN");
    return;
}
        var myReader: FileReader = new FileReader();
        var fileType = inputValue.parentElement.id;

       myReader.onloadend = (e) => {
        

         this.imgprev =  myReader.result as string;
         this.inventarioInfo.value.imgprev =  this.imgprev;


          // console.log("myreader.resutl: ", myReader.result);
       };

        myReader.readAsDataURL(file);

  }


//limitar caracteres espaciales
keyPress(event: KeyboardEvent) {
  const pattern = /[^e-]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (!pattern.test(inputChar)) {    
      // invalid character, prevent input
      event.preventDefault();
  }

}



  guardar(){
    // if (this.inventarioInfo.value.nombre_del_equipo == '') {
    //   alert("Debe asignar el nombre del equipo");
    //   return;
    // }
    this.inventario.push(this.inventarioInfo.value);
    this.inventarioInfo.value.imgprev =  this.imgprev;

    // console.log("nombre del equipo: ", this.inventario);
    //inserta un parametro a la variable creada, el arreglo de objetos obtenidos
    this.propagar.emit(this.inventario);

    //recibe el boleano del hermano y lo envia al padre @input y @Ouput
    this.boleanocompa = true;
    this.vistaform.emit(this.boleanocompa);
    

    this.inventarioInfo.reset();
    this.imgprev = 'assets/img/box.png';
    

  }
  

  enviarEditado(){

    let img = this.inventarioInfo.value.imgprev;


    this.inventario[this.editarForm.position] = this.inventarioInfo.value;
    this.inventario[this.editarForm.position].imgprev = this.imgprev;
    

    this.inventarioInfo.reset();
    this.imgprev = 'assets/img/box.png';

  }

  // grabar_localstorage(){
  //   localStorage.setItem("inventario", JSON.stringify(this.inventario) );
  // }

  // obtener_localstorage(){
  //   let local_inventario =  localStorage.getItem("inventario");
  //   console.log("locak store: ", JSON.parse(local_inventario));
  // }

  //funciones para validar
  get nombre(){
    return this.inventarioInfo.get('nombre_del_equipo');
  }

  get consumo(){
    return this.inventarioInfo.get('consumo_energetico');
  }

  get peso(){
    return this.inventarioInfo.get('pesoKg');
  }
  get ancho(){
    return this.inventarioInfo.get('anchoCm');
  }
  get largo(){
    return this.inventarioInfo.get('largoCm');
  }
  get altura(){
    return this.inventarioInfo.get('alturaCm');
  }

}



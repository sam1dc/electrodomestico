import { Component, Input,ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {


  title = 'Domestic-Inventory';
  resultencontrado=[];
  inventario:any =  [];
  result:any = [];
  resultNo:any = [];
  resultSelect:any = [];
  vista:boolean = true;
  titleEdit:boolean = true;

  resultBusqueda:number = 0;

  formEdit:object = {
   nombre: '',
    descripcion: '',
    energia: 0,
    pesokg: 0,
    ancho: 0,
    largo: 0,
    altura: 0,
    img: '',
    check: 0
  };
  sumadomestico:number=0;
  sumapeso:number=0;
  sumaancho:number=0;
  sumalargo:number=0;
  sumaalto:number=0;
  nombreVal:string;
  position:number;

  //recibe del formulario un arreglo
  // mensaje = parametro hijo recibido
  boleano(boleano){
    console.log("no lo uso", boleano);
    this.vista = boleano;
  }
  resultado(resultado){
    this.result = resultado;
     // console.log(resultado);
  }
	procesaPropagar(mensaje) {
    // determinar el dato obtenido
    // console.log(mensaje);
		this.inventario = mensaje;
		console.log("main", this.inventario);;
	}
  vistaform(vistaform){
    this.vista = vistaform;
  }

  checkbusqueda(i,event){
    
    this.inventario[i].check= event;
    console.log(this.inventario);
  }
  eliminar(index){
  this.inventario.splice(index,1);
  console.log("elemento eliminado: ",this.inventario)
  if (this.result.length > 0) {
      this.result.splice(index,1);
    }
  }
  editar(index){
      this.formEdit = {
        nombre: this.inventario[index].nombre_del_equipo,
        descripcion: this.inventario[index].descripcion,
        energia: this.inventario[index].consumo_energetico,
        pesokg: this.inventario[index].pesoKg,
        ancho: this.inventario[index].anchoCm,
        largo: this.inventario[index].largoCm,
        altura: this.inventario[index].alturaCm,
        img: this.inventario[index].imgprev,
        check: this.inventario[index].check,
        activar_btn: true,
        position: index
      }
     this.titleEdit = false;
  }


  busquedaSelect(){
    var resultcheck = this.inventario.filter(checkiando => checkiando.check  == true);
    //limpiar el res
 
    this.resultSelect=[];
    this.resultNo=[];
    this.sumadomestico = 0;
    this.sumapeso = 0;
    this.sumaalto = 0;
    this.sumalargo = 0;
    this.sumaancho = 0;


       for (var k = 0; k < resultcheck.length; k++) {
        this.sumadomestico=this.sumadomestico+resultcheck[k].consumo_energetico;
        this.sumapeso=this.sumapeso+resultcheck[k].pesoKg;
        this.sumaalto=this.sumaalto+resultcheck[k].alturaCm;
        this.sumalargo=this.sumalargo+resultcheck[k].largoCm;
        this.sumaancho=this.sumaancho+resultcheck[k].anchoCm;
        // console.log("consumo_energetico:",thisyyyyyyyyyyyyyyyyyyyyy
        // console.log("this.sumapeso:",this.sumapeso);
        // console.log("this.sumaalto:",this.sumaalto);
        // console.log("this.sumalargo:",this.sumalargo);
        // console.log("this.sumaancho",this.sumaancho);
       }
    

    console.log("resultado: ",  resultcheck );

    this.result =  resultcheck ;
    // vista para ver la busqueda
    this.vista = false;
    for (var i = 0; i < this.inventario.length; i++) {
    this.inventario[i].check = false
    }
    this.resultBusqueda = this.resultSelect.length;
  }

  limpiandoBusqueNav(limpiar){
    this.resultBusqueda = limpiar;
  }
  volver(){
    this.vista = true;
    this.resultBusqueda = 0;
  }
  sendEditrecibido(vistEditar){
    this.titleEdit = vistEditar;
  }

  //resultado del consumo_energetico
  resultadoConsumo(consumo){
    this.sumadomestico = consumo;
    console.log("recido del nav: ", consumo)
  }
  resultadoPeso(peso){
    this.sumapeso = peso;
    console.log("recido del nav: ", peso)
  }
  resultadoAncho(ancho){
    this.sumaancho = ancho;
    console.log("recido del nav: ", ancho)
  }
  resultadoLargo(largo){
    this.sumalargo = largo;
    console.log("recido del nav: ", largo)
  }
  resultadoAlto(alto){
    this.sumaalto = alto;
    console.log("recido del nav: ", alto)
  }

}

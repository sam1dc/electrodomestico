import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	@Input() vistaEdit:boolean;
	@Input() busquedarecibida:number;
	@Input() noEditar;
	@Input() inventarioRecibido:any;
	@Input() limpiandoValue:any;

	//totales
	@Input() sumaGetdomesctico:number;
	@Input() sumaGetpeso:number;
	@Input() sumaGetancho:number;
	@Input() sumaGetlargo:number;
	@Input() sumaGetalto:number;

	@Output() sendresultadosCosmeticos = new EventEmitter<number>();
	@Output() enviarPeso = new EventEmitter<number>();
	@Output() enviarAncho = new EventEmitter<number>();
	@Output() enviarLargo = new EventEmitter<number>();
	@Output() enviarAlto = new EventEmitter<number>();


	@Output() sendEdit = new EventEmitter<boolean>();
	@Output() limpiarBusqueda = new EventEmitter<number>();
	@Output() boleano = new EventEmitter<boolean>();
	@Output() result = new EventEmitter<any>();
	nombre =  new FormControl('', [Validators.required]);
	bolean:boolean = true;
  constructor() { }

  ngOnInit(): void {
  	// console.log(this.bolean);
  }

	


	buscar(){
		//limpiar resultado 

		this.sumaGetdomesctico = 0;
		this.sumaGetpeso = 0;
		this.sumaGetancho = 0;
		this.sumaGetlargo = 0;
		this.sumaGetalto = 0;
		console.log(this.nombre.value);
		console.log("invetario recibido: ", this.inventarioRecibido);
		const result = this.inventarioRecibido.filter(nombre => nombre.nombre_del_equipo == this.nombre.value);
		// console.log("resultado", result);
		if (result.length > 0) {
			this.bolean = false;
			//saca el boleano al padre
			this.boleano.emit(this.bolean);
			this.result.emit(result);
			// console.log("bolean true: ", this.bolean);
			// console.log("resutado puntoled: ", result.length);
		}
		else if(result.length == 0) {
			this.bolean = true;
			//saca el boleano al padre
			this.boleano.emit(this.bolean);
			console.log("result: ", result);
			//limpiar busqueda
		}
		this.busquedarecibida  = result.length;
		this.limpiarBusqueda.emit(this.busquedarecibida);
		


		console.log("ver el resueltado: ", result);

		for (var z = 0; z < result.length; z++) {
			this.sumaGetdomesctico = this.sumaGetdomesctico + result[z].consumo_energetico;
			this.sumaGetpeso = this.sumaGetpeso + result[z].pesoKg;
			this.sumaGetancho = this.sumaGetancho + result[z].anchoCm;
			this.sumaGetlargo = this.sumaGetlargo + result[z].largoCm;
			this.sumaGetalto = this.sumaGetalto + result[z].alturaCm;
       }

		this.sendresultadosCosmeticos.emit(this.sumaGetdomesctico);
		this.enviarPeso.emit(this.sumaGetpeso);
		this.enviarAncho.emit(this.sumaGetancho);
		this.enviarLargo .emit(this.sumaGetlargo);
		this.enviarAlto.emit(this.sumaGetalto);

	}

	detenerEdit(){
	    //no vaya a editar
	    console.log(this.noEditar);
	    this.noEditar.activar_btn = false;
	    this.vistaEdit = true;
	    this.sendEdit.emit(this.vistaEdit);
	    console.log("limpiando: ", this.limpiandoValue);
	    //limipiano al editar y luego ir al agregar
	    this.limpiandoValue.nombre = '';
	    this.limpiandoValue.descripcion = '';
	    this.limpiandoValue.energia = 0;
	    this.limpiandoValue.pesokg = 0;
	    this.limpiandoValue.ancho = 0;
	    this.limpiandoValue.largo = 0;
	    this.limpiandoValue.altura = 0;
	    this.limpiandoValue.img = '';
	    this.limpiandoValue.check = 0;
	}

}

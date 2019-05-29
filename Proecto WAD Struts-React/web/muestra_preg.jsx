/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */ const l ={
 
   display : "inline-block"
   
 };
class Muestra extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            text: [],
            opciones: [],
            eleccion: [],
            mensaje:'',
            calif: false
        
            
        };
         this.handleChange = this.handleChange.bind(this);
         this.handlerClick = this.handlerClick.bind(this);
    }
        componentWillMount ()  {
       
  fetch('http://localhost:8080/Proyecto_WAD_Struts-React/Data.xml')
  .then(response => response.text())
  
  .then(str => (new  window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => {
     var num_preg = parseInt(document.getElementById("numPreg").value,10);
     console.log(num_preg);
      var opts;
      var text_array;
      let preguntas = data.getElementsByTagName("pregunta");
      console.log(preguntas);
      let name =preguntas[num_preg-1].getElementsByTagName("nombre")[0].textContent;
      let texto = preguntas[num_preg-1].getElementsByTagName("texto")[0].textContent;
      text_array = texto.split("&");
      var long = text_array.length;
      text_array.pop();
      let grupos = preguntas[num_preg-1].getElementsByTagName("grupo");
      console.log(text_array);
   
    for(var i=0;i < grupos.length;i++){
        opts=grupos[i].getElementsByTagName("op");
         for(var j=0;j<opts.length;j++){
             
             o.push(opts[j].textContent);   
             if(j<1)
             correctas.push(opts[0].textContent);
        }
      }
          

          console.log(correctas+" respuestas correctas");
      this.setState({
          nombre : name,
          text: text_array,
          opciones: o
      });

  });

}
   
    handleChange(event){
   
   seleccionadas.push(event.target.value);
   console.log(seleccionadas);
  }
  
  handlerClick(){
      var auxState =true;
      for(var i =0;i<correctas.length;i++){
          if(seleccionadas[i]!== correctas[i])
              auxState=false;
              break;
      }
      console.log(seleccionadas);
      if(auxState===true)
            alert("correcto");
      else 
            alert("incorrecto");
        seleccionadas=[];
        
  }
 
    render(){
     
       
        return(
              
                <div id="uno" >
           <br></br>        
  
       {this.state.text.map( (item,i)=> (  
           
          <div key={i} style={l}> 
            {item}<Selects item={item} index={i} array={this.state.opciones} onChange={this.handleChange}/>
          </div>   
        ))} 

        <br></br> <button onClick={this.handlerClick}>valida</button>
            </div>

                );
        
    }
}

class Selects extends React.Component{
    constructor(props){
        super(props),
        this.state = {
      
            opt_selec : []
     
        };
       
    }
    componentWillMount(){
            var indexD =this.props.index;
            indexD = indexD * 4;
            var offset = indexD +3;
            var aux = new Array();
            
            for(var indexD;indexD<=offset;indexD++){
             
                aux.push(this.props.array[indexD]);
            }
            console.log(aux+" pre shuffle function");
              var currentIndex = aux.length, temporaryValue, randomIndex;

                // Mientras queden elementos a mezclar...
                while (0 !== currentIndex) {

                  // Seleccionar un elemento sin mezclar...
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex -= 1;

                  // E intercambiarlo con el elemento actual
                  temporaryValue = aux[currentIndex];
                  aux[currentIndex] = aux[randomIndex];
                  aux[randomIndex] = temporaryValue;
                }
            console.log(aux+" after shuffle function");
            this.setState({
                opt_selec :aux,
               
            });
    }
    
  onchange = (event) =>{
      this.props.onChange(event);
  }
    render(){            
        return(            
            <select className="hoola" onChange={this.onchange}>
                 <option key={this.props.index}>
                    select one ...
                    </option>
                 {this.state.opt_selec.map((item,i) =>(<option key={i} value={item}>{item}</option>))}
            </select>
            );
    }
    
}
ReactDOM.render (<Muestra />,document.getElementById('muestra'));
 var o = new Array();
 var x=0;
 var seleccionadas = new Array();
 var correctas = new Array();
 
 
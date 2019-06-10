const l ={
 
   display : "inline-block"
   
 };
 class Counter extends React.Component{
    render() {
    var textStyle = {
    fontSize: 72,
    fontFamily: "sans-serif",
    color: "#333",
    fontWeight: "bold"
    };
    return (
    <div style={textStyle}>
    {this.props.display}
    </div>
    );
    }
};
class Muestra extends React.Component{
    getInitialState() {
        return {
        count: 0
        };
     }
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            text: [],
            opciones: [],
            eleccion: [],
            mensaje:'',
            media:'',
            calif: false
            
        };
         this.handleChange = this.handleChange.bind(this);
         this.handlerClick = this.handlerClick.bind(this);
         this.siguiente = this.siguiente.bind(this);
         this.atras = this.atras.bind(this);
    }
        componentWillMount ()  {
       
  fetch('Data.xml')//CAMBIAR DEPENDIENDO DEL SERVIDOR
  .then(response => response.text())
  
  .then(str => (new  window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => {
     var compara = parseInt(document.getElementById("numExam").value,10);
     var num_preg = parseInt(document.getElementById("numExam").value,10);
     console.log(num_preg);
     var tests = data.getElementsByTagName("quiz");
     for(var j = 0; j < tests.length; j++){
         if(tests[j].getAttribute("quizID") === document.getElementById("numExam").value ){
          tam = tests[j].getElementsByTagName("testID");
         }
    }
      num_preg = tam[0].textContent;
      var opts;
      var text_array;
      let preguntas = data.getElementsByTagName("pregunta");
      console.log(preguntas);
      let name =preguntas[num_preg-1].getElementsByTagName("nombre")[0].textContent;
      let texto = preguntas[num_preg-1].getElementsByTagName("texto")[0].textContent;
      let m = preguntas[num_preg-1].getElementsByTagName("media")[0].textContent;
                   let extencion = m.split(".").pop();//obtener la extencion del archivo
           var typeM, aux;
           if(extencion==="jpeg"||extencion==="jpg"||extencion==="png"){
                typeM =  "<image width='320'height='240' src='http://localhost:8080/Proyecto_WAD_Struts-React/media/"+m+"'/>";
           }
           else if (extencion==="mp3"||extencion==="wav"){
                typeM = "<audio controls><source src='http://localhost:8080/Proyecto_WAD_Struts-React/media/"+m+"' type='audio/"+extencion+"'></audio>";
           }
           else if (extencion==="mpeg"||extencion==="mp4"||extencion==="wmv"){
               if(extencion==="wmv"){
                    aux = "video/x-ms-wmv";
               }
                  else{
                      aux="video/mp4";
                  }
                typeM = "<video width='320'height='240' controls> <source src='http://localhost:8080/Proyecto_WAD_Struts-React/media/"+m+"' type='"+aux+"'></video>";
           }
           
     console.log(typeM);
          document.getElementById("media").innerHTML = typeM;
      text_array = texto.split("&");
      var long = text_array.length;
      text_array.pop();
      let grupos = preguntas[num_preg-1].getElementsByTagName("grupo");
      console.log(text_array);
   o.splice(0,o.length);
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
          opciones: o,
          media:aux
      });

  });

}
   
    handleChange(event){
       // seleccionadas.pop();
 
   seleccionadas.push(event.target.value);
   console.log(seleccionadas);
  }
  
  handlerClick(){
      var auxState =true;
      var prom = 0;
      for(var i =0;i<correctas.length;i++){
          if(seleccionadas[i]!== correctas[i])
              auxState=false;
              break;
      }
      console.log(seleccionadas);
      if(auxState===true){
            alert("correcto");
        calificacion++;
        
        }
      else{ 
            alert("incorrecto");
        }
        seleccionadas.splice(0,seleccionadas.length);
        console.log(tam.length);
        prom = (calificacion * 10) / tam.length;
        this.setState({
        count: prom
        });
        
  }
  siguiente(e){
      this.setState({ nombre: '',
            text: [],
            opciones: [],
            eleccion: [],
            mensaje:'',
            media:'',
            calif: false});
      preguntaActual++;
      if(preguntaActual >= tam.length){
          alert("Hasta aqui termina el examen");
      }
      else{
     fetch('Data.xml')//CAMBIAR DEPENDIENDO DEL SERVIDOR
  .then(response => response.text())
  
  .then(str => (new  window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => {
     var num_preg = tam[preguntaActual].textContent;
     console.log(num_preg);
      
      var opts;
      var text_array;
      let preguntas = data.getElementsByTagName("pregunta");
      console.log(preguntas);
      let name =preguntas[num_preg-1].getElementsByTagName("nombre")[0].textContent;
      let texto = preguntas[num_preg-1].getElementsByTagName("texto")[0].textContent;
      let m = preguntas[num_preg-1].getElementsByTagName("media")[0].textContent;
               let extencion = m.split(".").pop();//obtener la extencion del archivo
           var typeM, aux;
           if(extencion==="jpeg"||extencion==="jpg"||extencion==="png"){
                typeM =  "<image width='320'height='240' src='http://localhost:8080/Proyecto_WAD_Struts-React/media/"+m+"'/>";
           }
           else if (extencion==="mp3"||extencion==="wav"){
                typeM = "<audio controls><source src='http://localhost:8080/Proyecto_WAD_Struts-React/media/"+m+"' type='audio/"+extencion+"'></audio>";
           }
           else if (extencion==="mpeg"||extencion==="mp4"||extencion==="wmv"){
               if(extencion==="wmv"){
                    aux = "video/x-ms-wmv";
               }
                  else{
                      aux="video/mp4";
                  }
                typeM = "<video width='320'height='240' controls> <source src='http://localhost:8080/Proyecto_WAD_Struts-React/media/"+m+"' type='"+aux+"'></video>";
           }
           
     console.log(typeM);
          document.getElementById("media").innerHTML = typeM;
      text_array = texto.split("&");
      var long = text_array.length;
      text_array.pop();
      let grupos = preguntas[num_preg-1].getElementsByTagName("grupo");
      console.log(text_array);
   o.splice(0,o.length);
        console.log(o);
        var ar = new Array();
    for(var i=0;i < grupos.length;i++){
        opts=grupos[i].getElementsByTagName("op");
        
         for(var j=0;j<opts.length;j++){
             
             ar.push(opts[j].textContent); 
             console.log(ar);
             if(j<1)
             correctas.push(opts[0].textContent);
        }
      }
         this.forceUpdate();

          console.log(correctas+" respuestas correctas");
      this.setState({
          nombre : name,
          text: text_array,
          opciones: ar,
          media:aux
      });
this.forceUpdate();
  });
      }
      e.preventDefault();
      correctas=new Array();
  }
  
 atras(e){
     this.setState({ nombre: '',
            text: [],
            opciones: [],
            eleccion: [],
            mensaje:'',
            media:'',
            calif: false});
      preguntaActual--;
      if(preguntaActual < 0){
          alert("Hasta aqui termina el examen");
          preguntaActual = 0;
      }
      else{
     fetch('Data.xml')//CAMBIAR DEPENDIENDO DEL SERVIDOR
  .then(response => response.text())
  
  .then(str => (new  window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => {
     var num_preg = tam[preguntaActual].textContent;
     console.log(num_preg);
      
      var opts;
      var text_array;
      let preguntas = data.getElementsByTagName("pregunta");
      console.log(preguntas);
      let name =preguntas[num_preg-1].getElementsByTagName("nombre")[0].textContent;
      let texto = preguntas[num_preg-1].getElementsByTagName("texto")[0].textContent;
      let m = preguntas[num_preg-1].getElementsByTagName("media")[0].textContent;
                   let extencion = m.split(".").pop();//obtener la extencion del archivo
           var typeM, aux;
           if(extencion==="jpeg"||extencion==="jpg"||extencion==="png"){
                typeM =  "<image width='320'height='240' src='http://localhost:8080/Proyecto_WAD_Struts-React/media/"+m+"'/>";
           }
           else if (extencion==="mp3"||extencion==="wav"){
                typeM = "<audio controls><source src='http://localhost:8080/Proyecto_WAD_Struts-React/media/"+m+"' type='audio/"+extencion+"'></audio>";
           }
           else if (extencion==="mpeg"||extencion==="mp4"||extencion==="wmv"){
               if(extencion==="wmv"){
                    aux = "video/x-ms-wmv";
               }
                  else{
                      aux="video/mp4";
                  }
                typeM = "<video width='320'height='240' controls> <source src='http://localhost:8080/Proyecto_WAD_Struts-React/media/"+m+"' type='"+aux+"'></video>";
           }
           
     console.log(typeM);
          document.getElementById("media").innerHTML = typeM;
      text_array = texto.split("&");
      var long = text_array.length;
      text_array.pop();
      let grupos = preguntas[num_preg-1].getElementsByTagName("grupo");
      console.log(text_array);
   o.splice(0,o.length);
        console.log(o);
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
          opciones: o,
          media:aux
      });

  });
      }
      e.preventDefault();
  }
 
    render(){
     
       
        return(
              
                <div id="uno" >
           <br></br>        
           <div id="media"></div>
           <br></br>   

       {this.state.text.map( (item,i)=> (  
           
          <div key={i} style={l}> 
            {item}<Selects item={item} index={i} array={this.state.opciones} onChange={this.handleChange}/>
          </div>   
        ))} 

        <br/><br/> <button onClick={this.handlerClick} class='btn-ghost round'>Calificar</button>
                <br/><br/> <button onClick={this.siguiente} class='btn-ghost round'>Siguiente</button>
                <br/><br/> <button onClick={this.atras} class='btn-ghost round'>Atras</button>
                        <Counter display={this.state.count}/>
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
 var tam = new Array();
 var preguntaActual = 0;
 var calificacion = 0;

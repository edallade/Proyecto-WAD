/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class EditaMW extends React.Component{
    constructor (){
        super();
        this.state = {
            nombre : '',
            text: [],
            boolean: true,
            idPreg:''
        }
        this.myFunction = this.myFunction.bind(this);
        this.cambio = this.cambio.bind(this);
        this.handlerName = this.handlerName.bind(this);
    }
    
    componentWillMount(){
               
          fetch('Data.xml')//CAMBIAR DEPENDIENDO DEL SERVIDOR
          .then(response => response.text())

          .then(str => (new  window.DOMParser()).parseFromString(str, "text/xml"))
          .then(data => {
             var num_preg = parseInt(document.getElementById("numPreg").value,10);
             console.log(num_preg);
 
              let preguntas = data.getElementsByTagName("pregunta");
              console.log(preguntas);
              let name =preguntas[num_preg-1].getElementsByTagName("nombre")[0].textContent;
              let texto = preguntas[num_preg-1].getElementsByTagName("texto")[0].textContent;   
              console.log(texto +" texto de la pregunta en el xml")
              this.setState({
                  nombre : name,
                  text: texto,
                 idPreg:num_preg
              });

          });
    }
    
     myFunction() {
             this.setState({
                boolean: false
              });
        var title = ""
        title = document.getElementById('title').value//obtener nombre de pregunta
        var txt = document.getElementById('txt').value;//texto de la pregunta
       var res = txt.split("&");//separar en un arreglo por partes el arreglo
     var    tamRes = res.length;
        console.log("Tamaño del arreglo: ", tamRes, " Arreglo: ", res);
       var  selMV = "";

        title = "<h1>" + title + "</h1>"

        selMV = "" + title

        if (txt == "") {
            alert("Ingresa una cadena por favor!");
        } else {
            for (var i = 0; i < tamRes - 1; i++) {
                selMV+="<br></br>Opciones de la palabra faltante : " + (i+1)
                for (var j =1; j< 5 ; j++){
                   selMV+="<br></br><input placeholder='Opción " + j + "' type='text' id='input" + (i+1) + "_"+ j +" ' name='input"+(i+1)+"_"+j+" ' />";                 
                }
            }
            //selMV += res[tamRes - 1];
            document.getElementById("sel").innerHTML = selMV;
            console.log("Texto con los inputs:", selMV);
        }
            
    }
    
    cambio(e){
        this.setState({text:e.target.value});
    }
    handlerName(e){
        this.setState({nombre:e.target.value});
    }
    render ()
    {
        var aux = this.state.text;
            if(this.state.boolean){
                        return (
                       <div id="texto">
                        <form action="guarda" method="post"  >
                            <br/><br/>Nombre de la Pregunta:<br/><br/><input onChange={this.handlerName} defaultValue={this.state.nombre} type="text" id="title" name="txt"  />
                            <br/><br/>Enunciado de la Pregunta:<br/><br/><textarea  onChange={this.cambio} type="text" id="txt" name="txt2" cols="50" rows="20" defaultValue={this.state.text}></textarea>
                         <p id="sel"></p>

                        <p id="final"></p>  
                        </form>
                        <br/><br/><button onClick={this.myFunction} class='btn-ghost round'>Siguiente</button>
                                    </div> 
                );
            }
            else{
                        return (
                       <div id="texto">
                           <form action="edita" method="post">
                            <br/><br/>Nombre de la Pregunta:<br/><br/><input value={this.state.nombre} type="text" id="title" name="txt"  />
                            <br/><br/>Enunciado de la Pregunta:<br/><br/><textarea  type="text" id="txt" name="txt2" cols="50" rows="20" value={this.state.text}></textarea>
                            <p id="sel"></p>

                            <p id="final"></p>

                            <p id="calificacion"></p>
                            <input type="text" hidden="true" name="idpreg" value={this.state.idPreg}/>
                            <br/><br/><input type='submit' value='Guardar' class='btn-ghost round'/>
                            
                            </form>
                           
                        </div> 
                );
            }
    }
}
ReactDOM.render(<EditaMW />, document.getElementById('mod'));
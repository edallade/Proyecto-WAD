const style1= {
    WIDTH: 350,
    HEIGHT: 20
}

const s2 = {
    WIDTH: 350,
    HEIGHT: 50
}
class Component extends React.Component{
    constructor(props){
        super(props);
       
        this.myFunction= this.myFunction.bind(this);
    }
    
    myFunction() {
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
    render(){
 
        return (
        <div id="texto">
        <form action="guarda" method="post">
        <br/><br/>Nombre de la Pregunta:<br/><br/><input placeholder="Nombre de la pregunta" type="text" id="title" name="txt"  />
        <br/><br/>Enunciado de la Pregunta:<br/><br/><textarea placeholder="Ejemplo: Esto es un & del ejercicio para &" type="text" id="txt" name="txt2" cols="50" rows="20" ></textarea>

    
 

    <p id="sel"></p>

    <p id="final"></p>

    <p id="calificacion"></p>
    <br/><br/><input type='submit' value='Guardar' class='btn-ghost round'/>
    </form>
    <br/><br/><button onClick={this.myFunction} class='btn-ghost round'>Siguiente</button>
                </div>
        
        );
    }
}
ReactDOM.render (<Component />,document.getElementById('c'));

    
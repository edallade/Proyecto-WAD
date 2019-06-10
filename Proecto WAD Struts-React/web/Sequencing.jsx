const style1 = {
    WIDTH: 350,
    HEIGHT: 20
}

const s2 = {
    WIDTH: 350,
    HEIGHT: 50
}
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            nombres:[]
        };
        this.myFunction = this.myFunction.bind(this);
    }

    myFunction() {
        var title, txt, res, tamRes, selMV, AuxData, auxSelect, finalMV, calificacionMV;
        var ArrayData = []
        var RandList = []
        var auxSelectArray = []
        var selectMWArray = []
        title = ""
        auxSelect = "";
        auxSelectArray = []
        finalMV = "";
        RandList = []
        ArrayData = []
        //Recuperamos el valor del elemento (input type text) y lo guardamos en las variables
        title = document.getElementById('title').value;
        txt = document.getElementById('txt').value;
        ///var str = "& Esto es un & del & de WAD para el & de Said";
        res = txt.split("&");
        tamRes = res.length;
        console.log("Tamaño del arreglo: ", tamRes, " Arreglo: ", res);
        selMV = "";
        //selMV es donde vamos a juntar el enunciado con los inputs

        title = "<h1>" + title + "</h1>"

        //Agregamos el título a selMV
        selMV = "<br><br>" + title

        if (txt == "") {
            alert("Ingresa una cadena por favor!");
        } else {
            ArrayData = txt.split(" ");
            document.getElementById('final').value = "";
            for (var i = 0; i < ArrayData.length; i++) {
                RandList.push(i); //Para generar los números random, metemos del 0 hasta n, dependiendo de los inputs que tengamos
            }

            console.log("ArraySequencing: ", ArrayData)
            ArrayData.forEach(function (data, index, err) {
                //Aquí genero una lista con números random del 0 a n 
                RandList = RandList.sort(function () {
                    return Math.random() - 0.5
                });
                console.log(index, "Random: " + RandList);
                //los id de cada select van a ir de 1 hasta n, para más adelante poder saber las respuestas correctas
                //Por default ponemos <option>Selecciona...</option> en el primer lugar
                auxSelect = "<select id='" + (index + 1) + "' name='" + (index + 1) + "'><option>Selecciona...</option>";
                //Este for nos ayuda a poner las opciones del selector en desorden
                RandList.forEach(function (randNum, i, error) {
                    console.log(index, randNum, i);
                    var aux1 = RandList[i]; //aux1, toma el valor[i] del arreglo de números random, y nos da un número de 0 a n
                    var auxS = ArrayData[aux1]; //auxS, toma el valor[aux1] del arreglo de la información obtenida en cada input
                    auxSelect += "<option value='" + aux1 + "'>" + auxS + "</option>";
                })
                auxSelect += "</select>";
                //auxSelectArray, es un arreglo porque necesitamos que todos los select, tengan un orden diferente en sus opciones
                //Por lo tanto, hacemos este paso n veces dependiendo del número de selects que tengamos
                auxSelectArray.push(auxSelect);
            });
            console.log("auxSelectArray: ", auxSelectArray)
            finalMV = "" + title
            auxSelectArray.forEach(function (element, i) {
                //Aquí juntamos el enunciado pero ahora le ponemos los selectores, siendo res[] el arreglo donde guardamos el enunciado
                //y element cada select guardado previamente en auxSelectArray
                finalMV += i + 1 + element + "<br>"
            })
            finalMV += "<br>";
            //Aquí le pasamos la información de "finalMV" a nuestro elemento <p id="final"></p>
            document.getElementById("final").innerHTML = finalMV;
        }
    }
    
     componentWillMount(){
          fetch('medios.xml')//CAMBIAR DEPENDIENDO DEL SERVIDOR
            .then(response => response.text())
            .then(str => (new  window.DOMParser()).parseFromString(str, "text/xml"))
            .then(data => {
                var lista = data.getElementsByTagName("medio");
                for (var i =0 ;i < lista.length;i++){
                    names.push(lista[i].textContent);
                }
                console.log(names);
                this.setState ({
                    nombres : names
                })
                         
            });
    }
    render() {

        return (
                <div id="texto">
                    <form action="guardar" method="post">
                        <br/><br/>Nombre de la Pregunta:<br/><br/><input placeholder="Nombre de la pregunta" type="text" id="title" name="txt"  />
                        <br/><br/>Enunciado de la Pregunta:<br/><br/><textarea placeholder="Ejemplo: Escribe cualquier cosa y listo" type="text" id="txt" name="txt2" cols="50" rows="20" ></textarea>
                
                
                
                
                        <p id="sel"></p>
                
                        <p id="final"></p>
                
                        <p id="calificacion"></p>
                        <br/><br/><input type='submit' value='Guardar' class='btn-ghost round'/>
                         <select class='btn-ghost round' id="sel" name="sel">
                 <option>
                    seleccione multimedia ...
                    </option>
                 {this.state.nombres.map((item,i) =>(<option key={i} value={item}>{item}</option>))}
                       </select>
                    </form>
                    <br/><br/><button onClick={this.myFunction} class='btn-ghost round'>Siguiente</button>
                </div>

                );
    }
}
ReactDOM.render(<Component />, document.getElementById('c'));
var names = new Array();
    
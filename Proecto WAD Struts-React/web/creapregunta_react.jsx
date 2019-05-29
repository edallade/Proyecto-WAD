/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
                selMV+="<br></br>Opciones de la palabra faltante :" + (i+1)
                for (var j =1; j< 5 ; j++){
                   selMV+=" <br></br><input type='text' id='input"+(i+1)+"_"+ j +" ' name='input"+(i+1)+"_"+j+" ' />";
                    
                }
                
                
            }
            selMV += res[tamRes - 1];
            document.getElementById("sel").innerHTML = selMV;
            console.log("Texto con los inputs:", selMV);
        }
    }
    render(){
 
        return (
        <div id="texto">
        <form action="guarda" method="post">
        <br/><br/>Nombre de la Pregunta:<br/><br/><input type="text" id="title" name="txt"  />
        <br/><br/>Enunciado de la Pregunta:<br/><br/><textarea type="text" id="txt" name="txt2" cols="50" rows="20" ></textarea>

    
 

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

            // var title, txt, res, tamRes, selMV, AuxData, auxSelect, finalMV, calificacionMV;
      /*  var ArrayData = []
        var RandList = []
        var auxSelectArray = []
        var selectMWArray = []
        var MWList = []
 

        function LimpiarInput() {
            document.getElementById('title').value = ""
            title = ""
            document.getElementById('txt').value = "";
            selMV = "";
            document.getElementById("sel").innerHTML = selMV;
            finalMV = "";
            document.getElementById("final").innerHTML = finalMV;
            calificacionMV = ""
            document.getElementById("calificacion").innerHTML = calificacionMV;
        }

        

        function Contestar(arr1, arr2) {
            calificacionMV = ""
            selectMWArray = []
            var selectMW = []
            for (var i = 0; i < tamRes - 1; i++) {
                var selectMW =
                {
                    index: (i + 1),
                    value: document.getElementById("" + (i + 1)).value
                }
                selectMWArray.push(selectMW);
            }
            var contCorrect = 0
            var totalCalif = 0

            selectMWArray.forEach(function (selectm, index) {
                index = index + 1
                selectm.index = selectm.index - 1
                if (selectm.index != selectm.value) {
                    console.log("Respuesta Incorrecta", index)
                } else {
                    contCorrect++;
                }
            })
            totalCalif = (contCorrect / (tamRes - 1)) * 10

            console.log(selectMWArray)
            calificacionMV = "Calificación: " + totalCalif
            if (totalCalif <= 5) {
                alert("Mal, sigue estudiando! ")
             } else if (totalCalif <= 7) {
                alert("Casi lo logras, sigue estudiando! ")
            } else if (totalCalif <= 9) {
                alert("Estás cerca de lograrlo, sigue estudiando!")
            } else if (totalCalif == 10) {
                alert("Excelente!")
            }
            document.getElementById("calificacion").innerHTML = calificacionMV;
        }
 
    GuardarDatos() {
      var  auxSelect = "";
        var auxSelectArray = []
        var finalMV = "";
        var RandList = []
        var ArrayData = []
        var    tamRes = res.length;
        document.getElementById('final').value = "";
        for (var i = 0; i < tamRes - 1; i++) {
            var auxInput = "input" + (i + 1);
          var   AuxData = document.getElementById(auxInput).value;
            ArrayData.push(AuxData);
            RandList.push(i); //Para generar los números random
            MWList.push(i); //La uso más adelante para la hora de contestar
        }
        console.log("ArrayMissingWords: ", ArrayData)
        ArrayData.forEach(function (data, index, err) {
            RandList = RandList.sort(function () { return Math.random() - 0.5 });
            console.log(index, "Random: " + RandList);
            auxSelect = "<select id='" + (index + 1) + "' name='" + (index + 1) + "'><option>Selecciona...</option>";
            RandList.forEach(function (randNum, i, error) {
                console.log(index, randNum, i);
                var aux1 = RandList[i];
                var auxS = ArrayData[aux1];
                auxSelect += "<option value='" + aux1 + "'>" + auxS + "</option>";
            })
            auxSelect += "</select>";
            auxSelectArray.push(auxSelect);
        });
        console.log("auxSelectArray: ", auxSelectArray)
        finalMV = "" + title
        auxSelectArray.forEach(function (element, i) {
            finalMV += res[i] + element
        })
        finalMV += res[tamRes - 1] + "<br><button onClick='Contestar()'>Contestar</button>";
        document.getElementById("final").innerHTML = finalMV;
    }
 *
 *
 *
 **/
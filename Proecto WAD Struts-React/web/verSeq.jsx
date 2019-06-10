class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            items: [],
            isLoaded: false
        }
    }

    componentDidMount() {



    }

    render() {
        return(
                <div id="texto">
                
                    <table id="tablad" border="1" class="redTable" ></table>
                
                    <p id="final"></p>
                
                    <br/><p id="calificacion"></p>
                
                </div>
                );
    }
}
ReactDOM.render(<MyComponent />, document.getElementById('app'));

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};
xhttp.open("GET", "Data.xml", true);
xhttp.send();


var title, txt, res, tamRes, selMV, AuxData, auxSelect, finalMV, calificacionMV;
var ArrayData = [];
var RandList = [];
var auxSelectArray = [];
var selectMWArray = [];
var quizQ="";
var tam = "";
var m="";
function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var tests = xmlDoc.getElementsByTagName("pregunta");
    for(var j = 0; j < tests.length; j++){
         if(tests[j].getAttribute("idpreg") === document.getElementById("numPreg").value ){
         quizQ = tests[j].getElementsByTagName("nombre")[0].textContent;
          tam = tests[j].getElementsByTagName("texto")[0].textContent;
          m= tests[j].getElementsByTagName("media")[0].textContent;
         }
    }
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
    title = "";
    auxSelect = "";
    auxSelectArray = [];
    finalMV = "";
    RandList = [];
    ArrayData = [];
    //Recuperamos el valor del elemento (input type text) y lo guardamos en las variables
    title = quizQ;
    txt = tam;
    res = txt.split(" ");
    tamRes = res.length;
    console.log("Tamaño del arreglo: ", tamRes, " Arreglo: ", res);
    selMV = "";
    //selMV es donde vamos a juntar el enunciado con los inputs

    title = "<h1>" + title + "</h1><br>"

    //Agregamos el título a selMV
    selMV = "" + title

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
        auxSelect += "</select><br>";
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
    finalMV += "<br><button onClick='Contestar()' class='btn-ghost round'>Contestar</button>";
    //Aquí le pasamos la información de "finalMV" a nuestro elemento <p id="final"></p>
    document.getElementById("final").innerHTML = finalMV;

}

function Contestar(arr1, arr2) {
    calificacionMV = ""
    selectMWArray = []
    var selectMW = []
    for (var i = 0; i < tamRes - 1; i++) {
        //En este for recuperamos los valores de las respuestas de cada select y los metemos a selectMWArray[]
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
        //Aquí comparamos, si el select con "id = 1" tiene como respuesta el "valor = 0", es correcto
        //Nuestra lógica es la siguiente: "id = n" debe tener como respuesta el "valor = n - 1"
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
    //Aquí le pasamos la información de "calificacionMV" a nuestro elemento <p id="calificacion"></p>
    document.getElementById("calificacion").innerHTML = calificacionMV;
}

/* let m = preguntas[num_preg-1].getElementsByTagName("media")[0].textContent;
                   let extencion = m.split(".").pop();//obtener la extencion del archivo
           var typeM, aux;
           if(extencion==="jpeg"||extencion==="jpg"||extencion==="png"){
                typeM =  "<image src='http://localhost:8080/Proyecto_WAD_Struts-React/media/"+m+"'/>";
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
          document.getElementById("media").innerHTML = typeM;*/
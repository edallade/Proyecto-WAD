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
            items: [],
            isLoaded: false
            
        };
         this.handleChange = this.handleChange.bind(this);
         this.handlerClick = this.handlerClick.bind(this);
         this.Contestar = this.Contestar.bind(this);
         this.siguiente = this.siguiente.bind(this);
         this.atras = this.atras.bind(this);
         this.principio = this.principio.bind(this);
         this.alfinale = this.alfinale.bind(this);
    }
        componentWillMount ()  {
       
  fetch('Data.xml')//CAMBIAR DEPENDIENDO DEL SERVIDOR
  .then(response => response.text())
  
  .then(str => (new  window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => {
     var num_preg = parseInt(document.getElementById("numExam").value,10);
     console.log(num_preg);
     var tests1 = data.getElementsByTagName("quiz");
     for(var j = 0; j < tests1.length; j++){
         if(tests1[j].getAttribute("quizID") === document.getElementById("numExam").value ){
          tam = tests1[j].getElementsByTagName("testID");
          console.log(tam[0].textContent);
         }
    }
     
     var tests = data.getElementsByTagName("pregunta");
    for (var j = 0; j < tests.length; j++) {
        if (tests[j].getAttribute("idpreg") === tam[0].textContent) {
            quizQ = tests[j].getElementsByTagName("nombre")[0].textContent;
            tama = tests[j].getElementsByTagName("texto")[0].textContent;
            m = tests[j].getElementsByTagName("media")[0].textContent;
        }
    }
    let extencion = m.split(".").pop();//obtener la extencion del archivo
    var typeM, aux;
    if (extencion === "jpeg" || extencion === "jpg" || extencion === "png") {
        typeM = "<image width='320'height='240' src='media/" + m + "'/>";
    } else if (extencion === "mp3" || extencion === "wav") {
        typeM = "<audio controls><source src='media/" + m + "' type='audio/" + extencion + "'></audio>";
    } else if (extencion === "mpeg" || extencion === "mp4" || extencion === "wmv") {
        if (extencion === "wmv") {
            aux = "video/x-ms-wmv";
        } else {
            aux = "video/mp4";
        }
        typeM = "<video width='320'height='240' controls> <source src='media/" + m + "' type='" + aux + "'></video>";
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
    txt = tama;
    res = txt.split(" ");
    tamRes = res.length;
    console.log("Tamaño del arreglo: ", tamRes, " Arreglo: ", res);
    selMV = "";
    //selMV es donde vamos a juntar el enunciado con los inputs

    title = "<h1>" + title + "</h1><br>";

    //Agregamos el título a selMV
    selMV = "" + title;

    ArrayData = txt.split(" ");
    document.getElementById('final').value = "";
    for (var i = 0; i < ArrayData.length; i++) {
        RandList.push(i); //Para generar los números random, metemos del 0 hasta n, dependiendo de los inputs que tengamos
    }

    console.log("ArraySequencing: ", ArrayData);
    ArrayData.forEach(function (data, index, err) {
        //Aquí genero una lista con números random del 0 a n 
        RandList = RandList.sort(function () {
            return Math.random() - 0.5;
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
            auxSelect += "<option value='" + auxS + "'>" + auxS + "</option>";
        });
        auxSelect += "</select><br>";
        //auxSelectArray, es un arreglo porque necesitamos que todos los select, tengan un orden diferente en sus opciones
        //Por lo tanto, hacemos este paso n veces dependiendo del número de selects que tengamos
        auxSelectArray.push(auxSelect);
    });
    console.log("auxSelectArray: ", auxSelectArray);
    finalMV = "" + title;
    auxSelectArray.forEach(function (element, i) {
        //Aquí juntamos el enunciado pero ahora le ponemos los selectores, siendo res[] el arreglo donde guardamos el enunciado
        //y element cada select guardado previamente en auxSelectArray
        finalMV += i + 1 + element + "<br>";
    });
    //Aquí le pasamos la información de "finalMV" a nuestro elemento <p id="final"></p>
    document.getElementById("final").innerHTML = finalMV;

  });

}
   
    handleChange(event){
       // seleccionadas.pop();
 
   seleccionadas.push(event.target.value);
   console.log(seleccionadas);
  }
   Contestar(arr1, arr2){
      
      calificacionMV = "";
    selectMWArray = [];
    var selectMW = [];
    for (var i = 0; i < tamRes; i++) {
        //En este for recuperamos los valores de las respuestas de cada select y los metemos a selectMWArray[]
        var selectMW =
                {
                    index: (i + 1),
                    value: document.getElementById("" + (i + 1)).value
                };
        selectMWArray.push(selectMW);
    }
    var contCorrect = 0;
    var totalCalif = 0;
    console.log(selectMWArray.length);
    console.log(selectMWArray);

    selectMWArray.forEach(function (selectm, index) {
        // index = index + 1
        //selectm.index = selectm.index - 1
        //Aquí comparamos, si el select con "id = 1" tiene como respuesta el "valor = 0", es correcto
        //Nuestra lógica es la siguiente: "id = n" debe tener como respuesta el "valor = n - 1"
        console.log("selectm ", selectm);
        console.log("selectMWArray ", selectMWArray);
        console.log("[", index, "] :", ArrayData[index]);
        if (ArrayData[index] !== selectm.value) {
            console.log("Respuesta Incorrecta", index);
        } else {
            console.log(contCorrect);
            contCorrect++;
        }
    });
    totalCalif = (contCorrect / tamRes) * 10;

    console.log(selectMWArray);
    calificacionMV = "Calificación: " + totalCalif;
    if (totalCalif <= 5) {
        alert("Mal, sigue estudiando! ");
    } else if (totalCalif <= 7) {
        alert("Casi lo logras, sigue estudiando! ");
    } else if (totalCalif <= 9) {
        alert("Estás cerca de lograrlo, sigue estudiando!");
    } else if (totalCalif === 10) {
        alert("Excelente!");
        calificacion++;
    }
    //Aquí le pasamos la información de "calificacionMV" a nuestro elemento <p id="calificacion"></p>
    document.getElementById("calificacion").innerHTML = calificacionMV;
      
      
        seleccionadas.splice(0,seleccionadas.length);
        console.log(tam.length);
        prom = (calificacion * 10) / tam.length;
        this.setState({
        count: prom
        });
        
  }
  
  handlerClick(arr1, arr2){
      calificacionMV = "";
    selectMWArray = [];
    var selectMW = [];
    for (var i = 0; i < tamRes; i++) {
        //En este for recuperamos los valores de las respuestas de cada select y los metemos a selectMWArray[]
        var selectMW =
                {
                    index: (i + 1),
                    value: document.getElementById("" + (i + 1)).value
                };
        selectMWArray.push(selectMW);
    }
    var contCorrect = 0;
    var totalCalif = 0;
    console.log(selectMWArray.length);
    console.log(selectMWArray);

    selectMWArray.forEach(function (selectm, index) {
        // index = index + 1
        //selectm.index = selectm.index - 1
        //Aquí comparamos, si el select con "id = 1" tiene como respuesta el "valor = 0", es correcto
        //Nuestra lógica es la siguiente: "id = n" debe tener como respuesta el "valor = n - 1"
        console.log("selectm ", selectm);
        console.log("selectMWArray ", selectMWArray);
        console.log("[", index, "] :", ArrayData[index]);
        if (ArrayData[index] !== selectm.value) {
            console.log("Respuesta Incorrecta", index);
        } else {
            console.log(contCorrect);
            contCorrect++;
        }
    });
    totalCalif = (contCorrect / tamRes) * 10;

    console.log(selectMWArray);
    calificacionMV = "Calificación: " + totalCalif;
    if (totalCalif <= 5) {
        alert("Mal, sigue estudiando! ");
    } else if (totalCalif <= 7) {
        alert("Casi lo logras, sigue estudiando! ");
    } else if (totalCalif <= 9) {
        alert("Estás cerca de lograrlo, sigue estudiando!");
    } else if (totalCalif === 10) {
        alert("Excelente!");
        calificacion++;
    }
    //Aquí le pasamos la información de "calificacionMV" a nuestro elemento <p id="calificacion"></p>
    document.getElementById("calificacion").innerHTML = calificacionMV;
      
      
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
     var num_preg = parseInt(document.getElementById("numExam").value,10);
     console.log(num_preg);
     
     var tests = data.getElementsByTagName("pregunta");
    for (var j = 0; j < tests.length; j++) {
        if (tests[j].getAttribute("idpreg") === tam[preguntaActual].textContent) {
            quizQ = tests[j].getElementsByTagName("nombre")[0].textContent;
            tama = tests[j].getElementsByTagName("texto")[0].textContent;
            m = tests[j].getElementsByTagName("media")[0].textContent;
        }
    }
    let extencion = m.split(".").pop();//obtener la extencion del archivo
    var typeM, aux;
    if (extencion === "jpeg" || extencion === "jpg" || extencion === "png") {
        typeM = "<image width='320'height='240' src='media/" + m + "'/>";
    } else if (extencion === "mp3" || extencion === "wav") {
        typeM = "<audio controls><source src='media/" + m + "' type='audio/" + extencion + "'></audio>";
    } else if (extencion === "mpeg" || extencion === "mp4" || extencion === "wmv") {
        if (extencion === "wmv") {
            aux = "video/x-ms-wmv";
        } else {
            aux = "video/mp4";
        }
        typeM = "<video width='320'height='240' controls> <source src='media/" + m + "' type='" + aux + "'></video>";
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
    txt = tama;
    res = txt.split(" ");
    tamRes = res.length;
    console.log("Tamaño del arreglo: ", tamRes, " Arreglo: ", res);
    selMV = "";
    //selMV es donde vamos a juntar el enunciado con los inputs

    title = "<h1>" + title + "</h1><br>";

    //Agregamos el título a selMV
    selMV = "" + title;

    ArrayData = txt.split(" ");
    document.getElementById('final').value = "";
    for (var i = 0; i < ArrayData.length; i++) {
        RandList.push(i); //Para generar los números random, metemos del 0 hasta n, dependiendo de los inputs que tengamos
    }

    console.log("ArraySequencing: ", ArrayData);
    ArrayData.forEach(function (data, index, err) {
        //Aquí genero una lista con números random del 0 a n 
        RandList = RandList.sort(function () {
            return Math.random() - 0.5;
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
            auxSelect += "<option value='" + auxS + "'>" + auxS + "</option>";
        });
        auxSelect += "</select><br>";
        //auxSelectArray, es un arreglo porque necesitamos que todos los select, tengan un orden diferente en sus opciones
        //Por lo tanto, hacemos este paso n veces dependiendo del número de selects que tengamos
        auxSelectArray.push(auxSelect);
    });
    console.log("auxSelectArray: ", auxSelectArray);
    finalMV = "" + title;
    auxSelectArray.forEach(function (element, i) {
        //Aquí juntamos el enunciado pero ahora le ponemos los selectores, siendo res[] el arreglo donde guardamos el enunciado
        //y element cada select guardado previamente en auxSelectArray
        finalMV += i + 1 + element + "<br>";
    });
    //Aquí le pasamos la información de "finalMV" a nuestro elemento <p id="final"></p>
    document.getElementById("final").innerHTML = finalMV;
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
     var num_preg = parseInt(document.getElementById("numExam").value,10);
     console.log(num_preg);
     
     var tests = data.getElementsByTagName("pregunta");
    for (var j = 0; j < tests.length; j++) {
        if (tests[j].getAttribute("idpreg") === tam[preguntaActual].textContent) {
            quizQ = tests[j].getElementsByTagName("nombre")[0].textContent;
            tama = tests[j].getElementsByTagName("texto")[0].textContent;
            m = tests[j].getElementsByTagName("media")[0].textContent;
        }
    }
    let extencion = m.split(".").pop();//obtener la extencion del archivo
    var typeM, aux;
    if (extencion === "jpeg" || extencion === "jpg" || extencion === "png") {
        typeM = "<image width='320'height='240' src='media/" + m + "'/>";
    } else if (extencion === "mp3" || extencion === "wav") {
        typeM = "<audio controls><source src='media/" + m + "' type='audio/" + extencion + "'></audio>";
    } else if (extencion === "mpeg" || extencion === "mp4" || extencion === "wmv") {
        if (extencion === "wmv") {
            aux = "video/x-ms-wmv";
        } else {
            aux = "video/mp4";
        }
        typeM = "<video width='320'height='240' controls> <source src='media/" + m + "' type='" + aux + "'></video>";
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
    txt = tama;
    res = txt.split(" ");
    tamRes = res.length;
    console.log("Tamaño del arreglo: ", tamRes, " Arreglo: ", res);
    selMV = "";
    //selMV es donde vamos a juntar el enunciado con los inputs

    title = "<h1>" + title + "</h1><br>";

    //Agregamos el título a selMV
    selMV = "" + title;

    ArrayData = txt.split(" ");
    document.getElementById('final').value = "";
    for (var i = 0; i < ArrayData.length; i++) {
        RandList.push(i); //Para generar los números random, metemos del 0 hasta n, dependiendo de los inputs que tengamos
    }

    console.log("ArraySequencing: ", ArrayData);
    ArrayData.forEach(function (data, index, err) {
        //Aquí genero una lista con números random del 0 a n 
        RandList = RandList.sort(function () {
            return Math.random() - 0.5;
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
            auxSelect += "<option value='" + auxS + "'>" + auxS + "</option>";
        });
        auxSelect += "</select><br>";
        //auxSelectArray, es un arreglo porque necesitamos que todos los select, tengan un orden diferente en sus opciones
        //Por lo tanto, hacemos este paso n veces dependiendo del número de selects que tengamos
        auxSelectArray.push(auxSelect);
    });
    console.log("auxSelectArray: ", auxSelectArray);
    finalMV = "" + title;
    auxSelectArray.forEach(function (element, i) {
        //Aquí juntamos el enunciado pero ahora le ponemos los selectores, siendo res[] el arreglo donde guardamos el enunciado
        //y element cada select guardado previamente en auxSelectArray
        finalMV += i + 1 + element + "<br>";
    });
    //Aquí le pasamos la información de "finalMV" a nuestro elemento <p id="final"></p>
    document.getElementById("final").innerHTML = finalMV;
  });
      }
      e.preventDefault();
  }
 principio(e){
     this.setState({ nombre: '',
            text: [],
            opciones: [],
            eleccion: [],
            mensaje:'',
            media:'',
            calif: false});
      preguntaActual=0;
      
     fetch('Data.xml')//CAMBIAR DEPENDIENDO DEL SERVIDOR
  .then(response => response.text())
  
  .then(str => (new  window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => {
     var num_preg = parseInt(document.getElementById("numExam").value,10);
     console.log(num_preg);
     
     var tests = data.getElementsByTagName("pregunta");
    for (var j = 0; j < tests.length; j++) {
        if (tests[j].getAttribute("idpreg") === tam[preguntaActual].textContent) {
            quizQ = tests[j].getElementsByTagName("nombre")[0].textContent;
            tama = tests[j].getElementsByTagName("texto")[0].textContent;
            m = tests[j].getElementsByTagName("media")[0].textContent;
        }
    }
    let extencion = m.split(".").pop();//obtener la extencion del archivo
    var typeM, aux;
    if (extencion === "jpeg" || extencion === "jpg" || extencion === "png") {
        typeM = "<image width='320'height='240' src='media/" + m + "'/>";
    } else if (extencion === "mp3" || extencion === "wav") {
        typeM = "<audio controls><source src='media/" + m + "' type='audio/" + extencion + "'></audio>";
    } else if (extencion === "mpeg" || extencion === "mp4" || extencion === "wmv") {
        if (extencion === "wmv") {
            aux = "video/x-ms-wmv";
        } else {
            aux = "video/mp4";
        }
        typeM = "<video width='320'height='240' controls> <source src='media/" + m + "' type='" + aux + "'></video>";
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
    txt = tama;
    res = txt.split(" ");
    tamRes = res.length;
    console.log("Tamaño del arreglo: ", tamRes, " Arreglo: ", res);
    selMV = "";
    //selMV es donde vamos a juntar el enunciado con los inputs

    title = "<h1>" + title + "</h1><br>";

    //Agregamos el título a selMV
    selMV = "" + title;

    ArrayData = txt.split(" ");
    document.getElementById('final').value = "";
    for (var i = 0; i < ArrayData.length; i++) {
        RandList.push(i); //Para generar los números random, metemos del 0 hasta n, dependiendo de los inputs que tengamos
    }

    console.log("ArraySequencing: ", ArrayData);
    ArrayData.forEach(function (data, index, err) {
        //Aquí genero una lista con números random del 0 a n 
        RandList = RandList.sort(function () {
            return Math.random() - 0.5;
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
            auxSelect += "<option value='" + auxS + "'>" + auxS + "</option>";
        });
        auxSelect += "</select><br>";
        //auxSelectArray, es un arreglo porque necesitamos que todos los select, tengan un orden diferente en sus opciones
        //Por lo tanto, hacemos este paso n veces dependiendo del número de selects que tengamos
        auxSelectArray.push(auxSelect);
    });
    console.log("auxSelectArray: ", auxSelectArray);
    finalMV = "" + title;
    auxSelectArray.forEach(function (element, i) {
        //Aquí juntamos el enunciado pero ahora le ponemos los selectores, siendo res[] el arreglo donde guardamos el enunciado
        //y element cada select guardado previamente en auxSelectArray
        finalMV += i + 1 + element + "<br>";
    });
    //Aquí le pasamos la información de "finalMV" a nuestro elemento <p id="final"></p>
    document.getElementById("final").innerHTML = finalMV;
  });
      
      e.preventDefault();
  }
 alfinale(e){
     this.setState({ nombre: '',
            text: [],
            opciones: [],
            eleccion: [],
            mensaje:'',
            media:'',
            calif: false});
      preguntaActual=tam.length - 1;
      
     fetch('Data.xml')//CAMBIAR DEPENDIENDO DEL SERVIDOR
  .then(response => response.text())
  
  .then(str => (new  window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => {
      
     var num_preg = parseInt(document.getElementById("numExam").value,10);
     console.log(num_preg);
     
     var tests = data.getElementsByTagName("pregunta");
    for (var j = 0; j < tests.length; j++) {
        if (tests[j].getAttribute("idpreg") === tam[preguntaActual].textContent) {
            quizQ = tests[j].getElementsByTagName("nombre")[0].textContent;
            tama = tests[j].getElementsByTagName("texto")[0].textContent;
            m = tests[j].getElementsByTagName("media")[0].textContent;
        }
    }
    let extencion = m.split(".").pop();//obtener la extencion del archivo
    var typeM, aux;
    if (extencion === "jpeg" || extencion === "jpg" || extencion === "png") {
        typeM = "<image width='320'height='240' src='media/" + m + "'/>";
    } else if (extencion === "mp3" || extencion === "wav") {
        typeM = "<audio controls><source src='media/" + m + "' type='audio/" + extencion + "'></audio>";
    } else if (extencion === "mpeg" || extencion === "mp4" || extencion === "wmv") {
        if (extencion === "wmv") {
            aux = "video/x-ms-wmv";
        } else {
            aux = "video/mp4";
        }
        typeM = "<video width='320'height='240' controls> <source src='media/" + m + "' type='" + aux + "'></video>";
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
    txt = tama;
    res = txt.split(" ");
    tamRes = res.length;
    console.log("Tamaño del arreglo: ", tamRes, " Arreglo: ", res);
    selMV = "";
    //selMV es donde vamos a juntar el enunciado con los inputs

    title = "<h1>" + title + "</h1><br>";

    //Agregamos el título a selMV
    selMV = "" + title;

    ArrayData = txt.split(" ");
    document.getElementById('final').value = "";
    for (var i = 0; i < ArrayData.length; i++) {
        RandList.push(i); //Para generar los números random, metemos del 0 hasta n, dependiendo de los inputs que tengamos
    }

    console.log("ArraySequencing: ", ArrayData);
    ArrayData.forEach(function (data, index, err) {
        //Aquí genero una lista con números random del 0 a n 
        RandList = RandList.sort(function () {
            return Math.random() - 0.5;
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
            auxSelect += "<option value='" + auxS + "'>" + auxS + "</option>";
        });
        auxSelect += "</select><br>";
        //auxSelectArray, es un arreglo porque necesitamos que todos los select, tengan un orden diferente en sus opciones
        //Por lo tanto, hacemos este paso n veces dependiendo del número de selects que tengamos
        auxSelectArray.push(auxSelect);
    });
    console.log("auxSelectArray: ", auxSelectArray);
    finalMV = "" + title;
    auxSelectArray.forEach(function (element, i) {
        //Aquí juntamos el enunciado pero ahora le ponemos los selectores, siendo res[] el arreglo donde guardamos el enunciado
        //y element cada select guardado previamente en auxSelectArray
        finalMV += i + 1 + element + "<br>";
    });
    //Aquí le pasamos la información de "finalMV" a nuestro elemento <p id="final"></p>
    document.getElementById("final").innerHTML = finalMV;
  });
      
      e.preventDefault();
  }
    render(){
     
       
        return(
              
        <div id="texto">
                
                    <table id="tablad" border="1" class="redTable" ></table>
                
                    <p id="final"></p>

        <br/><br/> <button onClick={this.handlerClick} class='btn-ghost round'>Calificar</button>
                <br/>
                <button onClick={this.principio} class='btn-ghost round'>Principio</button>
                <button onClick={this.siguiente} class='btn-ghost round'>Siguiente</button>
                <button onClick={this.atras} class='btn-ghost round'>Atras</button>
                <button onClick={this.alfinale} class='btn-ghost round'>Final</button>
                <br/><p id="calificacion"></p>
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
 var prom = 0;
 
      var title, txt, res, tamRes, selMV, AuxData, auxSelect, finalMV, calificacionMV;
        var ArrayData = [];
        var RandList = [];
        var auxSelectArray = [];
        var selectMWArray = [];
        var quizQ = "";
        var tama = "";
        var m = "";

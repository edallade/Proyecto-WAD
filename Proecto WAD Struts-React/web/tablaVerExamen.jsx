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
 
                    <br/><br/><p>Nombre del examen: <div id="nameQ"></div></p>
                    <div id="conta"></div>
                    <br/><br/><table id="tablad" border="1" class="redTable"></table>
                    <input type="text" name="idExamen" value={document.getElementById("numPreg").value} hidden="true"/>
                    
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

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var tests = xmlDoc.getElementsByTagName("pregunta");
    var tests2 = xmlDoc.getElementsByTagName("quiz");
    var cont = 0;
    var tam;
    var existe = false;
    var tabla = "<thead><tr><th>ID</th><th>Nombre</th><th>CHECK</th></tr></thead>";
    var quizQ = "<th>Name</th>";
    for(var j = 0; j < tests2.length; j++){
         if(tests2[j].getAttribute("quizID") === document.getElementById("numPreg").value ){
         quizQ = tests2[j].getElementsByTagName("name")[0].textContent;
          tam = tests2[j].getElementsByTagName("testID");
         }
    }
    for (var i = 0; i < tests.length; i++) {
        tabla += "<tr><td>";
        tabla += tests[i].getAttribute("idpreg");
        tabla += "</td><td>";
        tabla += tests[i].getElementsByTagName("nombre")[0].textContent;
        tabla += "</td><td>";
        
        for(var j = 0; j < tam.length; j++){
            if(tam[j].textContent === tests[i].getAttribute("idpreg")){
                tabla += "<input type='checkbox' name='Seleccionado' checked value='" + tests[i].getAttribute("idpreg") + "'/>";
                existe = true;
                break;
            }
        }
        if(existe === false){
            tabla += "<input type='checkbox' name='Seleccionado' value='" + tests[i].getAttribute("idpreg") + "'/>";
        }
        existe = false;
        tabla += "</td></tr>";
    }
    document.getElementById("tablad").innerHTML = tabla;
    document.getElementById("nameQ").innerHTML = quizQ;
    
}
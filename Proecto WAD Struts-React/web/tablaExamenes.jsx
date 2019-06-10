class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            items: [],
            isLoaded: false
        };
    }

    componentDidMount() {

    }

    render() {
        return(
                <div id="texto">
                    <a href="crearExamen.jsp?tipo=1"><button class='btn-ghost round'>Crear Examen Missing Words</button></a>
                    <a href="crearExamen.jsp?tipo=2"><button class='btn-ghost round'>Crear Examen Sequencing</button></a>
                        <table id="tablad" border="1" class="redTable"></table>
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
    var tests = xmlDoc.getElementsByTagName("quiz");
    var tipo = "";
    var tabla = "<thead><tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>Ver Examen</th><th>Probar Examen</th><th>Modificar Examen</th><th>Eliminar Examen</th></tr></thead>";
    for (var i = 0; i < tests.length; i++) {
        tipo = tests[i].getAttribute("tipo");
        tabla += "<tr><td>";
        tabla += tests[i].getAttribute("quizID");
        tabla += "</td><td>";
        tabla += tests[i].getElementsByTagName("name")[0].textContent;
        tabla += "</td><td>";

        if (tipo === "1") {
            tabla += "Missing Words";
            tabla += "</td><td>";
        } else {
            tabla += "Sequencing";
            tabla += "</td><td>";
        }
        
        tabla += "<a href='verExamen.jsp?idRef="+tests[i].getAttribute("quizID")+"'><button class='btn-ghost round'>Ver Examen</button></a>";
        tabla += "</td><td>";
        tabla += "<a href='modificarExamen.jsp?idRef="+tests[i].getAttribute("quizID")+"&nameExamen="+tests[i].getElementsByTagName("name")[0].textContent +"'><button class='btn-ghost round'>Modificar Examen</button></a>";
        tabla += "</td><td>";
        
        if (tipo === "1") {
            tabla += "<a href='probarExamen.jsp?idRef="+tests[i].getAttribute("quizID")+"&nameExamen="+tests[i].getElementsByTagName("name")[0].textContent +"'><button class='btn-ghost round'>Probar Examen</button></a>";
        tabla += "</td><td>";
        } else {
            tabla += "<a href='probarExamenS.jsp?idRef="+tests[i].getAttribute("quizID")+"&nameExamen="+tests[i].getElementsByTagName("name")[0].textContent +"'><button class='btn-ghost round'>Probar Examen</button></a>";
        tabla += "</td><td>";
        }
        
        
        
        tabla += "<form action='eliminarExamen' method='post'>  ";
        tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("quizID") + " class='btn-ghost round'>Eliminar Examen</button>";
        tabla += "</form > ";
        tabla += "</td></tr>";
    }
    document.getElementById("tablad").innerHTML = tabla;
}
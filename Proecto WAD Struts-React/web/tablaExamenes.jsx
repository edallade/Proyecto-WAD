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
                    <a href="crearExamen.jsp"><button class='btn-ghost round'>Crear Examen</button></a>
                    <form action="eliminarEjercicio" method="post">
                        <table id="tablad" border="1" class="redTable"></table>
                    </form>
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
    var tabla = "<thead><tr><th>ID</th><th>Nombre</th><th>Ver Pregunta</th><th>Modificar Pregunta</th><th>Eliminar Pregunta</th></tr></thead>";
    for (var i = 0; i < tests.length; i++) {
        tabla += "<tr><td>";
        tabla += tests[i].getAttribute("quizID");
        tabla += "</td><td>";
        tabla += tests[i].getElementsByTagName("name")[0].textContent;
        tabla += "</td><td>";
        tabla += "<button class='btn-ghost round'>Ver Examen</button>";
        tabla += "</td><td>";
        tabla += "<button class='btn-ghost round'>Modificar Examen</button>";
        tabla += "</td><td>";
        tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("id") + " class='btn-ghost round'>Eliminar Examen</button>";
        tabla += "</td></tr>";
    }
    document.getElementById("tablad").innerHTML = tabla;
}
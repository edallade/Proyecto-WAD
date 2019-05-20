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
                    <a href="crearExamen.jsp"><button>Crear Pregunta</button></a>
                    <form action="eliminarEjercicio" method="post">
                
                        <table id="tablad" border="1"></table>
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
xhttp.open("GET", "EjerciciosX.xml", true);
xhttp.send();

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var tests = xmlDoc.getElementsByTagName("test");
    var tabla = "<tr><th>ID</th><th>Nombre</th><th>Ver Pregunta</th><th>Modificar Pregunta</th><th>Eliminar Pregunta</th></tr>";
    for (var i = 0; i < tests.length; i++) {
        tabla += "<tr><td>";
        tabla += tests[i].getAttribute("id");
        tabla += "</td><td>";
        tabla += tests[i].getElementsByTagName("testName")[0].textContent;
        tabla += "</td><td>";
        tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("id") + ">Ver pregunta</button>";
        tabla += "</td><td>";
        tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("id") + ">Modificar pregunta</button>";
        tabla += "</td><td>";
        tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("id") + ">Eliminar pregunta</button>";
        tabla += "</td></tr>";
    }
    document.getElementById("tablad").innerHTML = tabla;
}
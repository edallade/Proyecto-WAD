/*const style = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};*/

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
                    <a href="crea.jsp"><button class='btn-ghost round'>Crear Pregunta</button></a>
                    <form action="eliminarEjercicio" method="post">
                
                        <table id="tablad" border="1" class="redTable" ></table>
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
    var tests = xmlDoc.getElementsByTagName("pregunta");
    var tabla = "<thead><tr><th>ID</th><th>Nombre</th><th>Ver Pregunta</th><th>Modificar Pregunta</th><th>Eliminar Pregunta</th></tr></thead>";
    for (var i = 0; i < tests.length; i++) {
        tabla += "<tr><td>";
        tabla += tests[i].getAttribute("idpreg");
        tabla += "</td><td>";
        tabla += tests[i].getElementsByTagName("nombre")[0].textContent;
        tabla += "</td><td>";
        tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("id") + " class='btn-ghost round'>Ver pregunta</button>";
        tabla += "</td><td>";
        tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("id") + " class='btn-ghost round'>Modificar pregunta</button>";
        tabla += "</td><td>";
        tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("id") + " class='btn-ghost round'>Eliminar pregunta</button>";
        tabla += "</td></tr>";
    }
    document.getElementById("tablad").innerHTML = tabla;
}
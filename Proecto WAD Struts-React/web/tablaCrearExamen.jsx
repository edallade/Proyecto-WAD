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
                    <form action="crearExamen" method="post">
                        <br/><br/><p>Nombre del examen: <input type="text" name="nombre"/></p>
                        <br/><br/><table id="tablad" border="1" class="redTable"></table>
                        <br/><br/><input type="submit" class='btn-ghost round'/>
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
    var tipo = "";

    var tabla = "<thead><tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>CHECK</th></tr></thead>";
    for (var i = 0; i < tests.length; i++) {

        tipo = tests[i].getAttribute("tipo");

        tabla += "<tr><td>";
        tabla += tests[i].getAttribute("idpreg");
        tabla += "</td><td>";
        tabla += tests[i].getElementsByTagName("nombre")[0].textContent;
        tabla += "</td><td>";

        if (tipo === "1") {
            tabla += "Missing Words";
            tabla += "</td><td>";
        } else {
            tabla += "Sequencing";
            tabla += "</td><td>";
        }

        tabla += "<input type='checkbox' name='Seleccionado' value='" + tests[i].getAttribute("idpreg") + "'/>";
        tabla += "</td></tr>";
    }
    document.getElementById("tablad").innerHTML = tabla;
}
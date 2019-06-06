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

    var tabla = "<thead><tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>Ver Pregunta</th><th>Modificar Pregunta</th><th>Eliminar Pregunta</th></tr></thead>";
    for (var i = 0; i < tests.length; i++) {
        tipo = tests[i].getAttribute("tipo");
        console.log("+++++++++++++++++TIPO: ",tipo);

        if (tipo === "1") { 
            //Missing Words
            tabla += "<tr><td>";
            tabla += tests[i].getAttribute("idpreg");
            tabla += "</td><td>";
            tabla += tests[i].getElementsByTagName("nombre")[0].textContent;
            tabla += "</td><td>";
            tabla += "Missing Words";
            tabla += "</td><td>";
            tabla += "<form action='verEjercicio' method='post'>  ";
            tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("idpreg") + " class='btn-ghost round'>Ver pregunta</button>";
            tabla += "</form>";
            tabla += "</td><td>";
            tabla += "<form action='EMW' method='post'>  ";
            tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("idpreg") + " class='btn-ghost round'>Modificar pregunta</button>";
            tabla += "</form>";
            tabla += "</td><td>";
            tabla += "<form action='eliminarEjercicio' method='post'>  ";
            tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("idpreg") + " class='btn-ghost round'>Eliminar pregunta</button>";
            tabla += "</form>";
            tabla += "</td></tr>";
            //Missing Words
        } else {
            //Sequencing
            tabla += "<tr><td>";
            tabla += tests[i].getAttribute("idpreg");
            tabla += "</td><td>";
            tabla += tests[i].getElementsByTagName("nombre")[0].textContent;
            tabla += "</td><td>";
            tabla += "Sequencing";
            tabla += "</td><td>";
            tabla += "<form action='verSequencing' method='post'>  ";
            tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("idpreg") + " class='btn-ghost round'>Ver pregunta</button>";
            tabla += "</form>";
            tabla += "</td><td>";
            tabla += "<form action='modSequencing' method='post'>  ";
            tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("idpreg") + " class='btn-ghost round'>Modificar pregunta</button>";
            tabla += "</form>";
            tabla += "</td><td>";
            tabla += "<form action='eliminarEjercicio' method='post'>  ";
            tabla += "<button name='idRef' type='submit' value=" + tests[i].getAttribute("idpreg") + " class='btn-ghost round'>Eliminar pregunta</button>";
            tabla += "</form>";
            tabla += "</td></tr>";
            //Sequencing
        }
    }
    document.getElementById("tablad").innerHTML = tabla;
}
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

        fetch('http://localhost:8080/LOGINSTRUTS2HIBERNATE_GOOD/Ejer1cicios.xml')
                .then(response => response.text())

                .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
                .then(data => console.log(data.getElementsByTagName("test")));

    }

    render() {
        return(
                <div id="texto">
                    <form action="crearExamen" method="post">
                        Nombre del examen: <input type="text" name="nombre"/>
                        <table id="tablad" border="1"></table>
                        <input type="submit"/>
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
    var tabla = "<tr><th>ID</th><th>Nombre</th><th>CHECK</th></tr>";
    for (var i = 0; i < tests.length; i++) {
        tabla += "<tr><td>";
        tabla += tests[i].getAttribute("id");
        tabla += "</td><td>";
        tabla += tests[i].getElementsByTagName("testName")[0].textContent;
        tabla += "</td><td>";
        tabla += "<input type='checkbox' name='Seleccionado' value='" + tests[i].getAttribute("id") + "'/>";
        tabla += "</td></tr>";
    }
    document.getElementById("tablad").innerHTML = tabla;
}
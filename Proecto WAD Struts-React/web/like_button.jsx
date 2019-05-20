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

        fetch('http://localhost:8080/LOGINSTRUTS2HIBERNATE_GOOD/Ejercicios.xml')
                .then(response => response.text())

                .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
                .then(data => console.log(data.getElementsByTagName("test")));

    }

    render() {
        return(
                <div>
                    <form  action="Login" method="post">
                        Name: <input  type="text" name="userName"/>Password:
                
                        <input type="password" name="password"  />
                
                        <input type="submit" value="Ingresar" ></input>
                    </form>
                </div>
                );
    }
}
ReactDOM.render(<MyComponent />, document.getElementById('app'));